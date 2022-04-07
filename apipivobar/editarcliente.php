<?php 
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Headers: *");
  header('Access-Control-Allow-Origin: *'); 
    header("Access-Control-Allow-Credentials: true");
    header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
    header('Access-Control-Max-Age: 1000');
    header('content-type: application/json; charset=utf-8');

require_once('config/db.php');


	$db = Database::connect();
$json = json_decode(file_get_contents("php://input"));
if (!$json) {
    exit("No hay datos");
}
$sql="UPDATE clientes SET cliente='".$json->cliente."',fecha_alta='".$json->fecha_alta."' proximo_pago='".$json->proximo_pago."',ultimo_pago='".$json->ultimo_pago."',observaciones=".$json->observaciones."' WHERE id=".$json->id;
$sentencia = $db->query($sql);
echo json_encode([
    "resultado" => $sentencia,
    "query"=>$sql
]);
	


