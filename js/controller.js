
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
