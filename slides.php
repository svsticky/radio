<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
$allFiles = scandir('slides');
$files = $allFiles;//array_diff($allFiles, array('.', '..'));
echo json_encode($files);
flush();
