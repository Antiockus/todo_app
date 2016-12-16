var todoArray = [];
var myStorage = window.localStorage;
var existingTodos;
var a = $('#todo_list');


(function($) {
    var index;

    if (myStorage.todos) {
        todoArray = JSON.parse(myStorage.todos);
        todoArray.forEach(function(val) {
            $('#todo_list').append('<li><span class="todo_list_text">' + val + '</span><a href="#" class="delete">X</a> <a href="#" class="edit_todo">Edit</a></li>');
        });
    }

    $('.submit_todo').on('click', function(e) {
        e.preventDefault();
        var newTodo = $('#todo_text').val();
        if (newTodo.length == 0) {
            return;
        }
        todoArray.push(newTodo);
        myStorage.todos = JSON.stringify(todoArray);
        $('#todo_list').append('<li><span class="todo_list_text">' + newTodo + '</span><a href="#" class="delete">X</a> <a href="#" class="edit_todo">Edit</a></li>');
        $('#todo_text').val('');
    });

    $('#todo_list').on('click', '.delete', function(e) {
        e.preventDefault();
        var deletedTodo = $(this).prev().text();
        index = todoArray.indexOf(deletedTodo); // <-- Not supported in <IE9
        if (index !== -1) {
            todoArray.splice(index, 1);
            myStorage.todos = JSON.stringify(todoArray);
        }
        $(this).parent().hide();
    });

    $('#todo_list').on('click', ".edit_todo", function(e) {
        e.preventDefault();
        var editTodo = $(this).prev().prev().text();
        $(this).parent().html('<input class="edit_todo_text" type="text" value="' + editTodo + '"/><button class="update">Update</button>');
        index = todoArray.indexOf(editTodo);
    });

    $('#todo_list').on('click', '.update', function(e) {
        e.preventDefault();
        var updatedTodo = $('.edit_todo_text').val();
        $(this).parent().html(
            '<li><span class="todo_list_text">' + updatedTodo + '</span><a href="#" class="delete">X</a> <a href="#" class="edit_todo">Edit</a></li>'
        );
        todoArray[index] = updatedTodo;
        myStorage.todos = JSON.stringify(todoArray);

    });

})(jQuery);