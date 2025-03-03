<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

$host = "localhost";
$user = "root"; 
$pass = "";
$dbname = "mesa_de_servicio";

$conn = new mysqli($host, $user, $pass, $dbname);

if ($conn->connect_error) {
    die(json_encode(["error" => "Error de conexión: " . $conn->connect_error]));
}

// Consulta para obtener todas las solicitudes
$sql = "SELECT * FROM solicitudes";
$result = $conn->query($sql);

$solicitudes = [];

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $solicitudes[] = $row;
    }
    echo json_encode($solicitudes);
} else {
    echo json_encode(["message" => "No hay solicitudes registradas"]);
}

$conn->close();
?>
