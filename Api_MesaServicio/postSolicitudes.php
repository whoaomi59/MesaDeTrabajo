<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

$host = "localhost";
$user = "root"; // Cambiar si es necesario
$pass = "";
$dbname = "mesa_de_servicio";

$conn = new mysqli($host, $user, $pass, $dbname);

if ($conn->connect_error) {
    die(json_encode(["error" => "Error de conexión: " . $conn->connect_error]));
}

// Leer los datos JSON recibidos
$data = json_decode(file_get_contents("php://input"));

if ($data === null) {
    echo json_encode(["error" => "Error al decodificar JSON"]);
    exit();
}

// Verificar que todos los datos requeridos están presentes
if (!isset($data->nombre_completo, $data->correo_electronico, $data->numero_contacto, $data->lugar_apoyo, $data->sede, $data->descripcion, $data->Tecnico_asignado)) {
    echo json_encode(["error" => "Datos incompletos"]);
    exit();
}

// Preparar la consulta con los 7 valores correctos
$stmt = $conn->prepare("INSERT INTO solicitudes (`nombre_completo`, `correo_electronico`, `numero_contacto`, `lugar_apoyo`, `sede`, `descripcion`, `Tecnico_asignado`) VALUES (?, ?, ?, ?, ?, ?, ?)");
$stmt->bind_param("sssssss", $data->nombre_completo, $data->correo_electronico, $data->numero_contacto, $data->lugar_apoyo, $data->sede, $data->descripcion, $data->Tecnico_asignado);

if ($stmt->execute()) {
    echo json_encode(["message" => "Solicitud enviada"]);
} else {
    echo json_encode(["error" => "Error al guardar", "detalle" => $stmt->error]);
}

$stmt->close();
$conn->close();
?>
