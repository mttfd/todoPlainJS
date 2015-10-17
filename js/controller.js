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
        controller.toggleItem(uuid, model);
    });


    $("#deleteAll").on("click", function() {
        controller.clearItems(model);
    });


})

function BuildController(count) {
	var count = count;
	$("#remain").html(count+" ");
    return {
        createItemDOM: function(id, text, checked) {
            var template = "<div id=" + id + " class='item'><input type='checkbox'" + (checked ? " checked" : "") + " class='complete'><span class='title'>" + text + "</span><span class='delete'>×</span></div>";
            $("#items").append(template);
        },

        createItem: function(text, model) {
            var id = model.addTodo(text);
            this.createItemDOM(id, text, false);
            ++count;
            this.updateFooter();
        },

        deleteItem: function(id, model) {
            console.log($("#" + id).html());
            $("#" + id).remove();
            model.destroyTodo(id);
            --count;
            this.updateFooter();
        },

        clearItems: function(model) {
            $("#items").empty();
            model.destroyAll();
            count = 0;
            this.updateFooter();
        },

        toggleItem: function(id, model) {
            var checked = model.toggleCompleted(id);
            checked ? (--count) : (++count);
            this.updateFooter();
        },

        updateFooter: function() {
        	$("#remain").html(count+" ");
        }
    };
}
