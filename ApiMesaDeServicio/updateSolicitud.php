<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Manejar preflight request (solicitud OPTIONS)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204); // Sin contenido
    exit();
}

include 'conexion.php'; // Asegúrate de que este archivo existe y tiene la conexión correcta.

$input = json_decode(file_get_contents("php://input"), true);

if (isset($input['id']) && isset($input['estado']) && isset($input['comentario_solucion']) && ($input['Tecnico_asignado'])) {
    $id = $input['id'];
    $estado = $input['estado'];
    $Tecnico_asignado = $input['Tecnico_asignado'];
    $comentario = $input['comentario_solucion'];
    $evidencia = $input['evidencia'];

    $query = "UPDATE solicitudes SET estado = ?, comentario_solucion = ?, Tecnico_asignado=?,evidencia=?, Fecha_Solucion = NOW() WHERE id = ?";
    $stmt = $conexion->prepare($query);
    $stmt->bind_param("ssssi", $estado, $comentario,$Tecnico_asignado,$evidencia, $id);

    if ($stmt->execute()) {
        echo json_encode(["mensaje" => "Solicitud actualizada correctamente"]);
    } else {
        echo json_encode(["error" => "Error al actualizar la solicitud"]);
    }

    $stmt->close();
} else {
    echo json_encode(["error" => "Datos incompletos"]);
}

$conexion->close();
?>
