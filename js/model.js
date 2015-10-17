var BuildModel = function() {
    return {
        randomGenerator: function() {
            return Math.random().toString(36).substring(8);
        },

        addTodo: function(text) {
            var randomNum = this.randomGenerator();
            var newItem = {
                id: randomNum,
                text: text,
                checked: false,
            };

            localStorage.setItem(newItem.id, JSON.stringify(newItem));
            return newItem.id;
        },

        destroyTodo: function(id) {
            localStorage.removeItem(id);
        },

        destroyAll: function() {
            localStorage.clear();
        },

        toggleCompleted: function(id) {
            var item = JSON.parse(localStorage.getItem(id));
            item.checked = !item.checked;
            localStorage.setItem(id, JSON.stringify(item));
            return item.checked;
        },

        getAll: function() {
            var keys = Object.keys(localStorage);
            var len = keys.length;
            var arr = [];
            for (var i = 0; i < len; i++) {
                var key = keys[i];
                arr.push(
                    JSON.parse(localStorage.getItem(keys[i]))
                );
            }
            return arr;
        }
    };
};
