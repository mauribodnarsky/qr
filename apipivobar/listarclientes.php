<?php 
header("Access-Control-Allow-Headers: *");
  header('Access-Control-Allow-Origin: *'); 
    header("Access-Control-Allow-Credentials: true");
    header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
    header('Access-Control-Max-Age: 1000');
    header('content-type: application/json; charset=utf-8');

require_once('config/db.php');


    $db = Database::connect();


$sql="SELECT * FROM clientes ";
$resultado  = $db->query($sql);

  while($filas=$resultado->fetch_object()){
                            $vendedores[]=$filas;
                        }
            if (empty($resultado)) {
                $vendedores=false;
            }
        
    $json=$vendedores;
    header('content-type: application/json; charset=utf-8');
        
echo json_encode([
    
    "clientes"=>$json

]);
	