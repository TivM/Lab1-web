<?php
session_start();
$start = microtime(true);
$x = $_GET['x'];
$y = $_GET['y'];
$r = $_GET['r'];
$count = 0;

if ((($x!="-4") & ($x!="-3") & ($x!="-2") & ($x!="-1") & ($x!="0") & ($x!="1") & ($x!="2") & ($x!="3")
& ($x!="4")) || (($r!="1") & ($r="1.5") & ($r!="2.5") & ($r!="2") & ($r!="3"))){
   echo "err" . "#" . "-" . "#" . "-" . "#" . "-" . "#" . "-" . "#" . "-". "#";
}
 else{
     $check = false;
     $fail = "";



     if ($y >= (-$r) && $y - (2 * $x) >= 0 && $y<=0 && $x >= 0 && $x <= ($r / 2)) {$check = true;}

     if ($y <= 0 && $y >= -$r && $x <= 0 && $x >= (-$r / 2)) {$check = true;}

     if ($y >= 0 && $x <= 0 && ($y ** 2) + ($x ** 2) <= (($r**2) / 4)) {$check = true;}

     $time = number_format(microtime(true) - $start, 6);
     $dt = new DateTime("now", new DateTimeZone('Europe/Moscow'));
     $dt = $dt->format('H:i:s');

     $otv = "";
     if ($check) {
         $otv = "Попадает";
     }
     else {
         $otv = "Не попадает";
     }

     $result = $dt . "#" . $time . "#" . $x . "#" . $y . "#" . $r . "#" . $otv . "#";

     if (!isset($_SESSION['results'])) {
         $_SESSION['results'] = array();
     }
     array_push($_SESSION['results'], $result);


     echo $dt . "#" . $time . "#" . $x . "#" . $y . "#" . $r . "#" . $otv. "#";
 }
