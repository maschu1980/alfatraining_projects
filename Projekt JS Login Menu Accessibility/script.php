<?php
$myPost = file_get_contents('php://input');
$filename = 'user.json';

if (!file_exists($filename)) {
    file_put_contents($filename, $myPost);
} else {
    $myFile = fopen($filename, 'w');
    fwrite($myFile,$myPost);
    fclose($myFile);
}
// JSON decodieren
//$json = json_decode($myPost); 
// in JSON umwandeln
//echo json_encode($json);
echo $myPost;
?>