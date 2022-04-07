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
$sql="insert into clientes VALUES( null,'".$json->nombre."',".$json->dni.",".$json->dni.",0,CURRENT_DATE());";

$sentencia = $db->query($sql);
$consulta="SELECT * FROM clientes where dni=".$json->dni.";";
$resultado  = $db->query($consulta);

  while($filas=$resultado->fetch_object()){
                            $cliente[]=$filas;
                        }
            if (empty($resultado)) {
                $cliente=false;
            }

echo json_encode([
    "resultado" => $sentencia,
    "query"=>$sql,
    "cliente"=>$cliente

]);
	


