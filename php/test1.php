<?php
$format = @$_GET['format'];
$callback = @$_GET['callback'];
$name = @$_GET['name'];
$birth_date = @$_GET['birth_date'];
$death_date = @$_GET['death_date'];

if ($format == 'text') {
        echo 'hello';
} elseif ($format == 'xml') {
        header('Content-Type: text/xml');
        echo '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' . "\n";
        echo "<response>hello</response>";
} elseif ($format == 'jsonp') {
        header('Content-Type: text/javascript');
        echo "$callback(";
        echo json_encode(array('response' => 'helllo', 'utf8' => 'Ви́хри'));
        echo ');';
} else {


$db = new Counter;
$db->open();
$row = new CRow;
$row->addColumn("name", $name);
if(!empty($birth_date)) {
    $row->addColumn("birth_date", $birth_date);
}

if(!empty($death_date)) {
    $row->addColumn("death_date", $death_date);
}
$id = $db->insert("person", $row);
echo json_encode(array('response' => $id));
}
?>
