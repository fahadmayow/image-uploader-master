<?php

	class Upload
	{
		private $dragedFile;

		// the constructor function
		public function __construct($file)
		{
			$this->uploader($file);
		}

		// this functions handles the upload process
		public function uploader($file)
		{
			$this->dragedFile  = $file;

			// chech if there is selected file
			if(file_exists($this->dragedFile['tmp_name']))
			{
				$getDragedFileName		= $this->dragedFile['name'];
				$getDragedFileSize		= $this->dragedFile['size'];
				$getDragedFileTmp		= $this->dragedFile['tmp_name'];
				$getDragedFileError		= $this->dragedFile['error'];

				// get file extension
				$getdragedFileExtension	= explode('.', $getDragedFileName);
				$fileExtension 			= strtolower(end($getdragedFileExtension));
				$allowedExtensions		= array('jpeg', 'jpg', 'png');

				$maxAllowedImageSize	= 1000000;

				// check if the image has one of the allowed extensions
				if(in_array($fileExtension, $allowedExtensions))
				{
					// check if the image is not bigger than allowed size
					if($getDragedFileSize <= $maxAllowedImageSize)
					{
						// chek if there is any error with uploading
						if($getDragedFileError == 0)
						{
							$imageRename	= 'devchallenges-fullstack-image-uploader' . uniqid('.', true) . '.' . $fileExtension;
							$uploadDest		= 'uploads/' . $imageRename;
							move_uploaded_file($getDragedFileTmp, $uploadDest);

							echo $uploadDest;
						}
						else
						{
							echo 'There was an error!';
						}
					}
					else
					{
						echo 'The image you are trying to upload is bigger than the allowed size';
					}
				}
				else
				{
					echo 'You can only upload \'png\' \'jpeg\' \'jpg\' formats';
				}
			}
		}
	}