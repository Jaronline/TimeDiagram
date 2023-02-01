<?php
require_once "includes/functions.php";

$whiteBackground = getQueryBool("bg");
$ratio = floatval(getQueryParameter("r", 1.0));
$totalEnabled = getQueryBool("t");
$duration = intval(getQueryParameter("d", 1));
$hertz = intval(getQueryParameter("h", 1));

$backgroundInputHTML = createCheckboxHTML("background", "background", $whiteBackground);
$ratioInputHTML = createNumberInputHTML("ratio", "ratio", 0.5, null, $ratio, 0.5);
$totalInputHTML = createCheckboxHTML("total-enabled", "total-enabled", $totalEnabled);
$durationInputHTML = createNumberInputHTML("duration", "duration", 1, null, $duration);
$hertzInputHTML = createNumberInputHTML("hertz", "hertz", 1, null, $hertz);
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tijddiagram</title>
    <link rel="stylesheet" href="css/style.css">
    <script defer src="js/script.js"></script>
</head>
<body>
    <div class="mb-2">
        <canvas class="block"></canvas>
        <?=$backgroundInputHTML?>
        <label for="background">Achtergrond wit maken</label>
        <button id="download" type="button">Opslaan</button>
    </div>
    <div class="mb-2">
        <label for="ratio">Schaal 1:</label>
        <?=$ratioInputHTML?>
        <?=$totalInputHTML?>
        <label for="total-enabled">Laat totale tijd zien</label>
    </div>
    <div>
        <label for="duration">Totale tijd (s)</label>
        <?=$durationInputHTML?>
        <label for="hertz">Aantal hertz</label>
        <?=$hertzInputHTML?>
    </div>
</body>
</html>
