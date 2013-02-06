<?php

// all requesets
function request($query_string, $booleanResponse)
{
    // connection
    $host = 'localhost';
    $port = 5432;
    $dbname = 'json_creator';
    // TODO: warning: не звбыть удалять host полсе локальных тестов
    $dsn = "pgsql:host=$host;port=$port;dbname=$dbname"; //  host=penreader.com ;
    $username = 'nikita';
    $passwd = 'qwe';
    $dbconn = new PDO($dsn, $username, $passwd);

    try {
        $pre = $dbconn->prepare($query_string);

        $exec = $pre->execute();

        if ($booleanResponse) return $exec;

        $array = array();
        while ($row = $pre->fetchObject()) {
            if (!$row) return $exec;
            $array[] = $row;
        }
        return $array;
    } catch (PDOException $e) {
        print "Error!: " . $e->getMessage() . "<br />";
    }
}

// NEW METHODS

function save_model($request_body){
    request('insert into nodes (key, val, collection) values (\'' . $request_body->key . '\', \'' . $request_body->val . '\', \'' . 'base' . '\')', false);
    return request('select id from nodes order by id desc limit 1', false);
}
function update_model($request_body){
    request('update nodes set key= \'' . $request_body->key . '\', val= \'' . $request_body->val . '\' where id=\'' . $request_body->id . '\'', false);
}
function fetch_collection(){
    return request('select id, key, val from nodes', false);
}

// NEW METHODS END


// Different queries

// get
function get_best( /* some params */)
{
    return request('select u.first_name, u.last_name, s.score, s.total_time, u.img from users as u join sets as s on u.user_id=s.user_id where score > 0 and start_time > date_trunc(\'week\', now() ) order by s.score desc, s.total_time limit 3;', false);
}

// set
function set_new_user($arg)
{
    $rows = 'user_id, first_name, last_name';
    $values = '\'' . $arg['userID'] . '\', \'' . $arg['firstName'] . '\', \'' . $arg['lastName'] . '\'';

    if ($arg['photo']) {
        $rows .= ', img';
        $values .= ', \'' . $arg['photo'] . '\'';
    }
    if ($arg['age']) {
        $rows .= ', age';
        $values .= ', \'' . $arg['age'] . '\'';
    } else {
    }
    $string = 'insert into users (' . $rows . ') values (' . $values . ')';
    $res = request($string, true);
    return $res;
}

function set_new_set($uid)
{
    request('insert into sets (user_id, start_time) values (\'' . $uid . '\', now ())', false);
    $set_id = request('select * from sets where user_id=\'' . $uid . '\' order by start_time desc limit 1', false);
    return $set_id[0][0];
}

function set_update_word($arg)
{
    $set_id = request('select id from sets where user_id=\'' . $arg['userID'] . '\' order by start_time DESC limit 1', false);
    echo $arg['answer'];
    request('update set_words set answer = \'' . $arg['answer'] . '\' where set_id=\'' . $set_id[0][0] . '\' and word_id = \'' . $arg['wordID'] . '\'', false);
}

// update total_time and score
function set_update_set($arg)
{
    echo $arg['score'];
    $set_id = request('select id from sets where user_id=\'' . $arg['userID'] . '\' order by start_time DESC limit 1', false);
    request('update sets set score = \'' . $arg['score'] . '\' where id=\'' . $set_id[0][0] . '\'', false);
    request('update sets set total_time = \'' . $arg['total'] . '\' where id=\'' . $set_id[0][0] . '\'', false);
}

function set_word_set($arg)
{
    return request('insert into set_words (set_id, word_id) values (\'' . $arg['setID'] . '\', \'' . $arg['wordID'] . '\')', false);
}

function get_resultss($arg)
{
    $set_id = request('select id from sets where user_id=\'' . $arg['userID'] . '\' order by start_time DESC limit 1', false);
    $set_id = $set_id[0][0];
    $total_time = request('select total_time from sets where id = ' . $set_id, false);

    $requestString = 'select w.word, s.answer, w.level
from set_words as s join words as w on s.word_id=w.id
where s.set_id = \'' . $set_id.'\'';

}
function set_log($arg){
    $filename = 'log.csv';
    $file = fopen($filename , "a+") or die("Невозможно открыть файл.");

    $str = "userID: ". $arg[userID]."\r\n";

    $str .= "errorName: ". $arg[error][name]."\r\n";
    $str .= "errorLine: ". $arg[error][lineNumber]."\r\n";
    $str .= "errorType: ". $arg[error][message]."\r\n";
    $str .= "userAgent: ". $arg["uAgent"]."\r\n";
    $str .= "\r\n";
    $str .= "\r\n";
    $write = fwrite($file, $str);
    fclose($file);
}