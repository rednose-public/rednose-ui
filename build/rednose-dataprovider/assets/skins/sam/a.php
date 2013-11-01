<?php

$base64 = file_get_contents('spinner.gif');
$base64 = base64_encode($base64);

die($base64);
