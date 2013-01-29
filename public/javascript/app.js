$(function () {
    init();
//    initModel();
//    iniView();
//    initController()
});
function init() {

    //TODO:

    // old*
    // Логика:
    // добавляем поле(чистое, без контента не сохраняем в модель(если оно не клонировано с данными)).
    // заполняем поле, если все круто -> показываем транслитный ключ и создается новая модель и добавляется к колекции,
    // когда в коллекции новая модель срабатывает событие (толи change толи add) срабатывает апдейт вьюшки

    // Обязательно сначала создадим модели!

    var Model = Backbone.Model.extend({
        defaults:{
            key: "key hold",
            val: "value hold"
        },

        url: 'http://localhost:3000/jsonCreator/base.php',

      /*  url: function() {
            var base = getValue(this, 'urlRoot') || getValue(this.collection, 'url') || urlError();
            if (this.isNew()) return base;
            return base + (base.charAt(base.length - 1) == '/' ? '' : '/') + encodeURIComponent(this.id);
        },
*/
        initialize: function() {},
        toggle: function() {
            this.save({done: !this.get("done")});
        },
        clear: function() {
            this.destroy();
        }
    });

    var Collection = Backbone.Collection.extend({
        model: Model

        /*url: function() {
            return this.document.url() + '/notes';
        }*/
    });

    var List = new Collection;

    var Item = Backbone.View.extend({

        tagName: 'li',

        template:_.template($('#item-template').html()),

        events: {
            "keypress textarea":"edit" // Обработчик клика на кнопке "Проверить"
        },

        render: function(){

            // Save не на месте
            this.model.save();

            this.$el.html(this.template(this.model.toJSON()));
//            this.$el.toggleClass('done', this.model.get('done'));
            this.inputKey = this.$('.inputKey');
            this.inputValue = this.$('.inputValue');
            return this;
        },
        edit: function(){
            //TODO: do this throw the timeout that clear when changes is continue
            this.model.save({key: this.inputKey.val(), val: this.inputValue.val()});
        }
    });


    var View = Backbone.View.extend({

        initialize: function(){
            // подписываемся на событие в коллекции
            List.bind('add', this.addOne, this);
//            List.bind('reset', this.addOne, this);
        },

        el:$("body"), // DOM элемент widget'а

        events:{
            "click input:button":"add" // Обработчик клика на кнопке "Проверить"
        },

        addOne: function(item){
            var view = new Item({model: item});
            this.$("#view").append(view.render().el);
        },

        add:function () {
            List.add();
        }

    });

    var view = new View;

}

// transform functions
function grouped(){

}