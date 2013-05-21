/*
 *
 *  Select combinations
 *
 *  Функция принимает произвольный массив целых чисел,
 *  и возвращает все комбинации элементов этого массива чьи суммы равны 10.
 *
 *
 *  Функция может возвращать одинаковые комбинации чисел, но каждая комбинация тем не менее включает
 *  разные наборы элементов массива, так как полагалось что это условие задачи.
 *
 *  Если нужно убрать одинаковые значения, это легко доработать.
 *
 * */

function exampleSolution(arr/* array */, sum/* int */) {

    var resultCombinations = [],
        stackSumSize = 2,
        originalArray = null,
        globalIndex = null,
        i;

    arr.sort(function (a, b) {
        if (a > b) return 1;
        else if (a < b) return -1;
        return 0
    });

    for (i = arr.length; i--;) {
        if (arr[i] >= sum) arr = arr.slice(0, i);
    }

    originalArray = arr;

    (function recursive(arr, sum, stackSumSize) {
        var i;
        for (i = arr.length; i > 0; i--) {

            var constructSum = 0,
                subArr = [],
                j;

            for (j = 0; j < stackSumSize; j++) {
                constructSum += arr[(i - 1) - j];
                subArr.push(arr[(i - 1) - j])
            }

            if (constructSum === sum) {
                resultCombinations.push(subArr)
            } else if (constructSum < sum) {

                if (stackSumSize >= 2) {
                    globalIndex = i
                }

                stackSumSize += 1;
                // dive to... . Increment summ elements
                recursive(arr.slice(0, i), sum, stackSumSize);
            }
        }

        // back to first level and continue for all remaining elements
        if (stackSumSize > 2) {
            recursive(originalArray.splice(globalIndex), sum, 2/* original stackSumSize */);
        }

    })(arr, sum, stackSumSize);

    // log result
    console.log(resultCombinations);
    return resultCombinations
}

/*
 * Sort by two keys
 *
 * */

var arr = [
    { name:"Петр", surname:"Петров"},
    { name:"Петр", surname:"Иванов" },
    { name:"Петр", surname:"Семенов" }
];

function sortByName(a, b) {

    if (a.name < b.name) {
        return -1
    } else if (a.name > b.name) {
        return 1
    } else if (a.surname < b.surname) {
        return -1
    } else if (a.surname > b.surname) {
        return 1
    } else {
        return 0
    }
}

arr.sort(sortByName);

//////////

function rotate(params) {
    var defaults = {
            selector:$('img'),
            angle:90,
            bIduration:'600 700'
        },
        settings = $.extend(defaults, params),
        duration = settings.bIduration.split('');

    // event listeners
    settings.selector.bind('mouseover', function () {
        animateTransform($(this), settings.angle, duration[0])
    });
    settings.selector.bind('mouseout', function () {
        animateTransform($(this), 0, duration[1])
    });
}

function animateTransform(element, angle, duration) {
    element.animate({textIndent:angle + 'px'}, {
        queue:false,
        step:function (valueNow) {
            $(this).css('transform', 'rotate(' + valueNow + 'deg)');
        },
        duration:duration
    })
}

rotate();

