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


$consulta="SELECT * FROM clientes where dni=".$json->dni.";";
$result  = $db->query($consulta);
$obj=$result->fetch_object();
$fecha_ultima=$obj->ultima_fecha;

$line=" SELECT TIMESTAMPDIFF(HOUR,CURRENT_TIMESTAMP(),'".$fecha_ultima."') AS 'diferencia'";
$result = $db->query($line);
$diferencia=$result->fetch_object();
$diferencia=$diferencia->diferencia;

if(-12 > $diferencia ){
$sql="UPDATE clientes SET puntos=puntos+1000,ultima_fecha=CURRENT_TIMESTAMP() WHERE dni=".$obj->dni.";";

$sentencia = $db->query($sql);

}
else{
$line="puntos ya cargados";
}
echo json_encode([
    "resultado" => $line

]);
	


