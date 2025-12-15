<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

$host = "localhost";
$user = "sisottsa_hacker"; 
$pass = "aAeewMH_WsgE";
$dbname = "sisottsa_mesaservicio";

mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT); // Muestra errores de MySQL

try {
    // Conectar a la base de datos
    $conn = new mysqli($host, $user, $pass, $dbname);
    $conn->set_charset("utf8mb4"); // Asegurar la codificaci¨®n UTF-8

    // Consulta segura
    $sql = "SELECT * FROM `solicitudes` ORDER BY estado;";
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    $result = $stmt->get_result();

    $solicitudes = $result->fetch_all(MYSQLI_ASSOC);

    // Si hay datos, enviarlos como JSON, si no, enviar mensaje vac¨ªo
    echo json_encode($solicitudes ?: ["message" => "No hay solicitudes registradas"], JSON_PRETTY_PRINT);

    // Cerrar conexi¨®n
    $stmt->close();
    $conn->close();
} catch (Exception $e) {
    // Manejo de errores
    echo json_encode(["error" => "Error: " . $e->getMessage()], JSON_PRETTY_PRINT);
}
?>
