<?php
require_once('sql_queries.php');

$request_body = file_get_contents('php://input');

if($request_body){
    set($request_body);
} else {
    fetch();
}

function set($request_body){

    $request_body = json_decode($request_body);

    if($_SERVER['REQUEST_METHOD'] == 'POST'){

        $new_model_id = save_model($request_body)[0]['id'];

        $dinoArray = array('id'=>$new_model_id, 'cavemanEater'=>true);
        $dinoJSON = json_encode($dinoArray);
        echo $dinoJSON;

    } else {
        update_model($request_body);
    }
}

function fetch(){
    // fetch all collection
    $collection = fetch_collection();
    echo json_encode($collection);
}