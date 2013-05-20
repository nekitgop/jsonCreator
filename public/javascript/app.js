// Notes:
// логика проста, для каждого экземпляра коллекии создавать новую вьюшку
// вот только непонятно как делать цикл по пришедшим с сервера данным если мы делаем это с пом. встроенного механизма
// прямо в модели

// Extend ways:
// можно сохранять параметры отображения каждой формы

$(function () {
    init();
//    initModel();
//    iniView();
//    initController()
});
function init() {

    var Model = Backbone.Model.extend({
        defaults:{
            key: "key hold",
            val: "value hold"
        },

        url: 'http://localhost:3000/jsonCreator/app/async_controller.php',

        initialize: function() {},
        toggle: function() {
            this.save({done: !this.get("done")});
        },
        clear: function() {
            this.destroy();
        }
    });

    var Collection = Backbone.Collection.extend({
        model: Model,

        url: 'http://localhost:3000/jsonCreator/app/async_controller.php'

    });

    var List = new Collection;

    // Вьюшка кажжого элемента
    var Item = Backbone.View.extend({

        initialize: function(){
            this.model.bind('change', this.render, this);
        },

        tagName: 'li',

        template:_.template($('#item-template').html()),

        events: {
            "blur textarea":"edit" // Обработчик клика на кнопке "Проверить"
        },

        render: function(){

            // Save не на месте
//            this.model.save();

            this.$el.html(this.template(this.model.toJSON()));
//            this.$el.toggleClass('done', this.model.get('done'));
            this.inputKey = this.$('.inputKey');
            this.inputValue = this.$('.inputValue');
            return this;
        },
        edit: function(){
            this.model.save({key: this.inputKey.val(), val: this.inputValue.val()}/*, {success: function(data, data2){
                console.log(data, data2)
            }}*/);
        }
    });



    // Общая вьюшка
    var View = Backbone.View.extend({

        initialize: function(){
            // это обработчики событий коллекции
            List.bind('add', this.addOne, this);
            List.bind('reset', this.addAll, this);
        },

        el:$("body"), // DOM элемент widget'а

        // это обработчики событий DOM
        events:{
            "click .add":"add",
            "click .addList":"addList"
        },

        addOne: function(item){
            var view = new Item({model: item});
            this.$("#view").append(view.render().el);
        },
        addAll: function(){
            List.each(this.addOne)
        },

        add:function (prop) {
            // Создает и добавляет модель в колекцию List и инициирует событие add в этой коллекции,
            // которое обрабатывается выше, в частности это обработчик addOne вьюшки который уже добавляет
            // элемент c содержимым(дефолтным) в DOM
            //TODO: подумать над рекурсией
            List.add(prop);
        },
        addList: function(){

            // ссылкой на коллекцию будет аттрибут экземпляра модели с именем val.
            // вьюшка для коллекции должна быть другой т.к. нужен контейнер и val не отображается как
            // обьект
            this.add({key: 'имя коллекции', val:  new Collection});

            // логика
            // сначала создать новую модель, потом присвоить val новую коллекцию
            // вопрос как рекурсивно применять свойства типа fetch() add() итд.


        }

    });

    var view = new View;

    List.fetch();



// new init !!
    var newList = new Collection;
/*
    //todo: так не пойдет, нужно оставлять ссылки в глобальном пространстве, хотя хз
    function initView(newCollection){
        var View = Backbone.View.extend({

            initialize: function(){
                // это обработчики событий коллекции
                newCollection.bind('add', this.addOne, this);
                newCollection.bind('reset', this.addAll, this);
            },

            el:$("body"), // DOM элемент widget'а

            // это обработчики событий DOM
            events:{
                "click .add":"add",
                "click .addList":"addList"
            },

            addOne: function(item){
                var view = new Item({model: item});
                this.$("#view").append(view.render().el);
            },
            addAll: function(){
                newCollection.each(this.addOne)
            },

            add:function (prop) {
                // Создает и добавляет модель в колекцию List и инициирует событие add в этой коллекции,
                // которое обрабатывается выше, в частности это обработчик addOne вьюшки который уже добавляет
                // элемент c содержимым(дефолтным) в DOM
                //TODO: подумать над рекурсией
            newCollection.add(prop);
            },
            //TODO: вызывать метод при условии наличия вложенных коллекций или чтото типа того
            addList: function(){

                // ссылкой на коллекцию будет аттрибут экземпляра модели с именем val.
                // вьюшка для коллекции должна быть другой т.к. нужен контейнер и val не отображается как
                // обьект


                this.add({key: 'имя коллекции', val:*//* тут всеже должна быть не новая колекция а наверное ее хеш *//* new Collection});

                // логика
                // сначала создать новую модель, потом присвоить val новую коллекцию
                // вопрос как рекурсивно применять свойства типа fetch() add() итд.


            }

        });
    }
    initView(newList)*/


}

