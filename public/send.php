<?php

//$postData = file_get_contents('php://input');
//$data = json_decode($postData, true);

$phone = $_POST['phone'];
//$info = json_decode($info, true);

//$input = json_decode(file_get_contents("php://input"), true);
//$data = json_decode($_REQUEST[$postData]);

//$info = $input->data;

//$count = count($input); // кол-во элементов массива
//$title = $input["title"];
//$result = "";
//for($i = 0; $i < $count; $i++){
//	$newResult = $info[$i]->title.$info[$i]->price;
//	$result = $result.$newResult;
//}




$id = 0;
// $data = $_POST['data'];
// tikondra47@gmail.com , makarovt_t@mail.ru
$to      = 'tikondra47@gmail.com';//
$subject = 'Заявка с сайта ArtHouse';
$headers = 
    'Content-type: text/html' . "\r\n" .
    'X-Mailer: PHP/' . phpversion();

$valid = true;
$message = 'Название: ' . $phone . $id;
 mail($to, $subject, $message, $headers);
 exit;

?>