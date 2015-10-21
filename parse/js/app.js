/*
    script for the index.html file
*/
Parse.initialize("HwGkNK09YRPy3ZajicPwpZMfX9vqCyc4ghFl2eh7", "14BQF3zAPvaOR1sh6aEzXX5Wk1LTnBFQopjr1Rbj");


$(function() {
    'use strict';

    // think of this as the table name
    var Task = Parse.Object.extend('Task');
    // new query that will return all tasks ordered by createAt
    var tasksQuery = new Parse.Query(Task); // queries the task class defined above
    tasksQuery.ascending('createdAt');

    // reference to the task list element
    var taskList = $('#tasks-list');

    // reference to the error message alert
    var errorMsg = $('#error-message');

    // $('#idname); selects the html id

    // current set of tasks
    var tasks = [];

    function displayError(err) {
        errorMsg.text(err.message);
        errMsg.fadeIn();
    }

    function clearError() {
        errMsg.hide();
    }

    function showSpinner() {
        $('.fa-spin').show();
    }

    function hideSpinner() {
        $('.fa-spin').hide();
    }

    // .text vs .html
    // .text doesn't interpret what you pass as html
    // if you try to pass script elements, it'll encrypt that as literal text

    function fetchTasks() {
        showSpinner();
        tasksQuery.find().then(onData, displayError)
            .always(hideSpinner);
    }

    function onData(results) {
        tasks = results;
        renderTasks();
    }

    function renderTasks() {
        // clear the list
        taskList.empty();

        tasks.forEach(function(task) {
           $(document.createElement('li'))
               .text(task.get('title'))
               .appendTo(taskList);
        });
    }

    // when the user submits a new task form...
    // evt is the event object
    $('#new-task-form').submit(function(evt) {
        evt.preventDefault();

        var titleInput = $(this).find('[name="title"]');
        var title = titleInput.val();
        var task = new Task();
        // set the title to the new title
        task.set('title', title);
        task.save().then(fetchTasks, displayError).then(function() {
            titleInput.val('');
        });

        return false;
    })

    // fetch tasks from the server
    fetchTasks();

    // refreshes the list
    window.setInterval(fetchTasks, 3000);

});