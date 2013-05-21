// Проверка конвертеров
$(function(){

//    var image = document.getElementById('image'),
//
//    mouseHandler = {
//        over: function(){
//            image.style.WebkitBoxShadow = '5px 5px 1px #818181';
//        },
//        out: function(){
//            image
//        }
//    };
//
//    image.addEventListener('mouseover', mouseHandler.over);
//    image.addEventListener('mouseout', mouseHandler.out);
    rotate();

    exampleSolution([3,5,1,9,8,7,4,4,2,1,3,2,3,6,5,5,7,9,20, 50,6,1,1], 10);
//    calc([3,5,1,3,9,8,7]);


    /*sss = 0;
    array = [3,5,1,3,9,8,7];

    iter(array, function(){
        console.log('action')

        if(sss < 50) {
            sss++;
            iter(array, arguments.callee)
        } else {
            return;
        }
        console.log('after')

//        iter(array, arguments.callee)
    });*/


//    ex([6,5,3,2], 8);
   /* for(var i = 0; i < 10; i++){
        console.log(10/i)
    }*/

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