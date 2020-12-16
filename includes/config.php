<?php 
	// get site directory
	$fileDirName = dirname($_SERVER['PHP_SELF']);
	$fileDirPath = explode('/', $fileDirName);
	$siteDirName = $fileDirPath[1] . '/' . $fileDirPath[2];

	// SITE PATH NAME
	define('SITE_DIR_NAME', $siteDirName);
	define('SITE_HOST_NAME', $_SERVER['HTTP_HOST']);

	// the protocol
	if(isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] != 'off')
	{
		$url = 'https';
	}
	else
	{
		$url = 'http';
	}