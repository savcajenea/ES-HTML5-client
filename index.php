<?php
//$url = 'http://easyting.dk/easyscreen/webservice?action=getContentForPreview&ESPageId=1&ESPageMode=draft';

$url = 'http://local.easyting:8000/easyscreen/webservice';
//?action=getContentForPreview&ESPageId=1&ESPageMode=draft
//header("Location: " . $url . '?' . $_SERVER['QUERY_STRING']);

$site = file_get_contents($url . '?' . $_SERVER['QUERY_STRING']);
echo $site;
?>
