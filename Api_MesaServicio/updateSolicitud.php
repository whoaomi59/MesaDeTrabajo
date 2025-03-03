<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, OPTIONS");
header("Content-Type: application/json");

include 'conexion.php'; // Asegúrate de que tienes un archivo para conectar a la DB

$input = json_decode(file_get_contents("php://input"), true);

if (isset($input['id']) && isset($input['estado']) && isset($input['comentario_solucion'])) {
    $id = $input['id'];
    $estado = $input['estado'];
    $comentario = $input['comentario_solucion'];

    $query = "UPDATE solicitudes SET estado = ?, comentario_solucion = ?, Fecha_Solucion = NOW() WHERE id = ?";
    $stmt = $conexion->prepare($query);
    $stmt->bind_param("ssi", $estado, $comentario, $id);

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
