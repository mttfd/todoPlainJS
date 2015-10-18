$(function() {
    var ENTER_KEY = 13;

    var model = BuildModel();
    var items = model.getAll();
    var count = items.filter(function(i) {
    	return !i.checked;
    }).length;
    var controller = BuildController(count);
    items.forEach(function(i) {
        console.log(i.id + " " + i.text + " " + i.checked);
        controller.createItemDOM(i.id, i.text, i.checked);
    });

    $("#creator").on("keydown", function(e) {

        if (e.which == ENTER_KEY) {
            controller.createItem(e.target.value, model);
            e.target.value = "";
        }
    });

    $("#items").on("click", ".delete", function(evt) {
        var uuid = $(this).parent().attr("id");
        controller.deleteItem(uuid, model);
    });


    $("#items").on("change", ".complete", function(evt) {
        var uuid = $(this).parent().attr("id");
        controller.toggleItem(uuid, model, this);
    });


    $("#deleteAll").on("click", function() {
        controller.clearItems(model);
    });


});
