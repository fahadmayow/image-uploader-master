<?php
	// require config file
	require_once 'includes/config.php';

	// require upload class
	require 'includes/Upload.php';
	
	if(isset($_FILES['dragedImageFile']) || isset($_FILES['choosedImageFile']))
	{
		new Upload($_FILES['dragedImageFile']);
		new Upload($_FILES['choosedImageFile']);
	}
	else
	{	
		// header
		require_once 'components/header.php';
	?>

	<div id="container" class="container">
		<!-- uploader form -->
		<div class="form">
			<!-- image upload form header -->
			<div class="form__header">
				<h2 class="form__header__title">Upload your image</h2>
				<p class="form__header__tagline">File should be jpeg, Png..</p>
			</div>
			<!-- image upload form body -->
			<div class="form__body" id="siteUrl" data-siteDir="<?php echo $url . '://' . SITE_HOST_NAME . '/' . $siteDirName; ?>">
				<form action="<?php echo $url . '://' . SITE_HOST_NAME . '/' . $siteDirName . '/index.php'?>" method="POST" enctype="multipart/form-data" class="form__body__item" id="formData">
					<!-- image drag and drop box -->
					<div class="form__body__item__dragBox">
						<?php include 'img/image.svg' ?>
						<span id="selectedName">Drag & Drop your image here</span>
						<input type="file" name="dragedImageFile" class="file-selector" id="dragedImageFile">
					</div>
					<span>Or</span>
					<!-- image selector button -->
					<div type="submit" name="submit" class="form__body__item__selector">
						<button id="file" class="btn-main">Choose a file</button>
						<input type="file" name="choosedImageFile" class="file-selector" id="choosedImageFile">
					</div>
				</form>
			</div>
		</div>		
	</div>

	<?php
		// footer
		require_once 'components/footer.php';
	}
?>