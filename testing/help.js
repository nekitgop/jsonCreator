$(function(){
    calc([3,5,1,3,9,8,7]);

    $.get('json_example.json', function(json){
        var data =  $.parseJSON(json);

        var newJson = {};

        convert(data.data, newJson)
    })
});

//TODO: добавить работу с массивами
// Convert JSON from app to user JSON.
function convert(obj, newObj){

    for(var i = 0; i < obj.length; i++){
        if(obj[i].val instanceof Array){
            convert(obj[i].val, newObj[obj[i].key] = {})
        } else {
            newObj[obj[i].key] = obj[i].val;
        }
    }
    console.log(newObj)
}