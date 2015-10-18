
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
            var checked = $("#" + id + " input")[0].checked;
            $("#" + id).remove();
            model.destroyTodo(id);
            if(!checked) {
                --count;
                this.updateFooter();
            }
        },

        clearItems: function(model) {
            $("#items").empty();
            model.destroyAll();
            count = 0;
            this.updateFooter();
        },

        toggleItem: function(id, model, self) {
            var checked = model.toggleCompleted(id);
            var item = $(self).parent();
            checked ? (--count) && item.addClass("done") : (++count) && item.removeClass("done");
            this.updateFooter();
        },

        updateFooter: function() {
        	$("#remain").html(count+" ");
        }
    };
}
