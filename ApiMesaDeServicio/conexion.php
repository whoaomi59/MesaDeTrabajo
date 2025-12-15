<?php
$host = "localhost"; // Cambia esto si tu base de datos está en otro servidor
$usuario = "sisottsa_hacker"; // Usuario de la base de datos
$contrasena = "aAeewMH_WsgE"; // Contraseña de la base de datos
$base_datos = "sisottsa_mesaservicio"; // Nombre de tu base de datos

$conexion = new mysqli($host, $usuario, $contrasena, $base_datos);

if ($conexion->connect_error) {
    die(json_encode(["error" => "Error de conexión: " . $conexion->connect_error]));
}

$conexion->set_charset("utf8"); // Asegurar codificación de caracteres
?>
