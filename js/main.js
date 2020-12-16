	
var i,

	// get site url
	siteUrl = document.getElementById('siteUrl').getAttribute('data-siteDir'),
	// get the container element
	container = document.getElementById('container'),
	// get the form that handles the uploading file
	formData = document.getElementById('formData'),
	// get the input file selectors
	fileSelector = document.querySelectorAll('.file-selector');

// check if the input file exists
if(fileSelector.length > 0)
{
	for(i = 0; i < fileSelector.length; i++)
	{
		fileSelector[i].addEventListener('change', function()
		{
			// check if the container element is exist
			if(container)
			{
				// view loader in the container div 
				container.innerHTML = `

					<div id="loader" class="loader">
						<h2 class="loader__title">Uploading...</h2>
						<div class="loader__animation">
							<span class="loader__animation__snake"></span>
						</div>
					</div>
				`;
			}

			// this var handles the form data
			var formDataObj = new FormData(formData),
				// this var handles ajax http request
				httpReq =  new XMLHttpRequest();

			// function to execute when the ajax http response become ready
			httpReq.onreadystatechange = function()
			{	
				// check if the response was successfully done!
				if(httpReq.readyState == 4 && httpReq.status == 200)
				{
					// check if the container element is exist
					if(container)
					{
						// check if there is any errors with the file upload response!
						if(httpReq.responseText == 'There was an error!' || httpReq.responseText == 'The image you are trying to upload is bigger than the allowed size' ||  httpReq.responseText == 'You can only upload \'png\' \'jpeg\' \'jpg\' formats')
						{
							// view uploaded image in the container div
							container.innerHTML = `

								<div id="view" class="view">
									<div class="view__header">
										<i class="fas fa-times-circle" style="color:red;"></i>
										<h2 class="view__header__title">Error!</h2>
									</div>
									<div class="view__uploaded" style="color:#a7a7a7;line-height:25px;">
										${httpReq.responseText}
									</div>
									<a href="${siteUrl}" class="btn-main" style="display:block;">Try again</a>
								</div>
							`;
						}
						else if(httpReq.responseText == '') // if there is no response do this
						{
							// view uploaded image in the container div
							container.innerHTML = `

								<div id="view" class="view">
									<div class="view__header">
										<i class="fas fa-times-circle" style="color:red;"></i>
										<h2 class="view__header__title">Error!</h2>
									</div>
									<div class="view__uploaded" style="color:#a7a7a7;line-height:25px;">
										There is was an error while uploading the image, please make sure image size is under 1MB
									</div>
									<a href="${siteUrl}" class="btn-main" style="display:block;">Try again</a>
								</div>
							`;
						}
						else // if there is no errors with the file upload response do this!
						{
							// view uploaded image in the container div
							container.innerHTML = `

								<div id="view" class="view">
									<div class="view__header">
										<i class="fas fa-check-circle"></i>
										<h2 class="view__header__title">Uploaded Successfully!</h2>
									</div>
									<div class="view__uploaded">
										<img src="${siteUrl + '/' + httpReq.responseText}">
									</div>
									<div class="view__link">
										<input type="text" disabled id="imageLink" value="${siteUrl + '/' + httpReq.responseText}">
										<button id="copyImageLink" class="btn-main">Copy Link</button>
									</div>
								</div>
							`;
						}
					}

					// get image link url from this input field
					var imageLink = document.getElementById('imageLink'),
						// get the button that will handle the copying process
						copyImageLink = document.getElementById('copyImageLink');

					// check the if the copy button is exit
					if(copyImageLink)
					{	
						// when the copy button clicked do this!
						copyImageLink.addEventListener('click', function()
						{
							// check if the image link url field is exist
							if(imageLink)
							{
								// remove the disabled attribute to anable the copying process
								imageLink.removeAttribute('disabled');
								// select image link text in the field
								imageLink.select();
								// select image link text in the field [this is for mobile devices]
								imageLink.setSelectionRange(0, 99999);
								// copy the selected text
								document.execCommand('copy');
								// set the disabled attribute to disable editing
								imageLink.setAttribute('disabled', 'disabled');
							}
						});
					}
				}
			}

			// prepare the ajax http request
			httpReq.open(formData.method, siteUrl + '/index.php', true);
			// send the ajax http request
			httpReq.send(formDataObj);
		});
	}
}