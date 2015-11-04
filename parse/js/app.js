/*
    script for the index.html file
*/
<<<<<<< HEAD
// Parse.initialize("HwGkNK09YRPy3ZajicPwpZMfX9vqCyc4ghFl2eh7", "14BQF3zAPvaOR1sh6aEzXX5Wk1LTnBFQopjr1Rbj");
// this is kevin's
Parse.initialize("rnPVLff4nz9OW4qu9GnkdD18TV4AzzxfLducfGQh", "x62CpPBIqQwvj2nW1eRSo50VWvUMxFSoyJG8NuVB");


$(function() {
    'use strict';

    // think of this as the table name
    var Task = Parse.Object.extend('Task');
    // new query that will return all tasks ordered by createAt
    var tasksQuery = new Parse.Query(Task); // queries the task class defined above
    tasksQuery.ascending('createdAt');
    tasksQuery.notEqualTo('done', true);

    // reference to the task list element
    var taskList = $('#tasks-list');

    // reference to our rating element
    var ratingElem = $('#rating');

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
=======


//OK to call this before the DOM is ready
Parse.initialize("u8fq2u4IqxKXBa9PuPjHB40HA39gqnxMq8lKJYkG", "R9zpakOjl4dXU3quSQ9tvTwwe0uQA2IJj3GdNKTt");

//when the document is ready...
$(function() {
    'use strict';

    //define a new Task object class with Parse
    var Task = Parse.Object.extend('Task');

    //define a query for querying Task objects
    var tasksQuery = new Parse.Query(Task);
    tasksQuery.ascending('createdAt');

    //varible to hold the current list of tasks
    var tasks = [];

    //reference to our error message alert
    var errorMessage = $('#error-message');

    //reference to the tasks list element
    var tasksList = $('#tasks-list');

    function displayError(err) {
        errorMessage.text(err.message);
        errorMessage.fadeIn();
    }

    function clearError() {
        errorMessage.hide();
>>>>>>> 0e1f3c03a332ce37c172bdee43ad742a11ba4994
    }

    function showSpinner() {
        $('.fa-spin').show();
    }

    function hideSpinner() {
        $('.fa-spin').hide();
    }

<<<<<<< HEAD
    // .text vs .html
    // .text doesn't interpret what you pass as html
    // if you try to pass script elements, it'll encrypt that as literal text

    function fetchTasks() {
        showSpinner();
        tasksQuery.find().then(onData, displayError)
            .always(hideSpinner);
    }

=======
>>>>>>> 0e1f3c03a332ce37c172bdee43ad742a11ba4994
    function onData(results) {
        tasks = results;
        renderTasks();
    }

    function renderTasks() {
<<<<<<< HEAD
        // clear the list
        taskList.empty();

        tasks.forEach(function(task) {
           var li = $(document.createElement('li'))
               // if you do html then it comes out as html
               // .text(task.get('title') + ": " + task.get('rating'))
               .text(task.get('title'))

               // adds a class to the li
               .addClass(task.get('done') ? 'completed-task' : '')
               .appendTo(taskList)
                .click(function() {
                   task.set('done', !task.get('done'));
                   task.save().then(renderTasks, displayError);

            });

            $(document.createElement('span'))
                .raty({readOnly: true,
                    // score: task.get('rating'),
                    // if you do it with ||0 integer will be coarsed to true, if rating was zero it'll still evaluate to false and will use the right side of the zero
                    // handles undefined case
                    score: (task.get('rating') || 0),
                    hints:['crap', 'awful', 'ok', 'nice', 'awesome']})
                .appendTo(li);
        });
    }

    function showMessage(message) {
        message = message || "Hello";
        alert(message);
    }

    showMessage('World');

    // when the user submits a new task form...
    // evt is the event object
    $('#new-task-form').submit(function(evt) {
        evt.preventDefault();

        var titleInput = $(this).find('[name="title"]');

        // get current value
        var title = titleInput.val();


        var task = new Task();
        // set the title to the new title
        task.set('title', title);
        task.set('rating', ratingElem.raty('score'));

        // save the new task to your Parse database
        // if save if successful, fetch the tasks again
        // other wise display the error
        // regardless, clear the title input
        // so the user can enter the next new task
=======
        tasksList.empty();
        tasks.forEach(function(task) {
            $(document.createElement('li'))
                .text(task.get('title'))
                .appendTo(tasksList);
        });
    }

    function fetchTasks() {
        showSpinner();
        tasksQuery.find()
            .then(onData, displayError)
            .always(hideSpinner);
    }

    $('#new-task-form').submit(function(evt) {
        //tell the browser not to do its default behavior
        evt.preventDefault();

        //find the input element in this form 
        //with a name attribute set to "title"
        var titleInput = $(this).find('[name="title"]');
        
        //get the current value
        var title = titleInput.val();

        //create a new Task and set the title
        var task = new Task();
        task.set('title', title);

        //save the new task to your Parse database
        //if save is successful, fetch the tasks again
        //otherwise display the error
        //regardless, clear the title input
        //so the user can enter the next new task
>>>>>>> 0e1f3c03a332ce37c172bdee43ad742a11ba4994
        task.save()
            .then(fetchTasks, displayError)
            .then(function() {
                titleInput.val('');
<<<<<<< HEAD
                ratingElem.raty('set', {});
        });

        return false;
    })

    // fetch tasks from the server
    fetchTasks();

    ratingElem.raty();
    // if you want to make it read only do ratingElem.raty({readOnly: true});



    // refreshes the list
    window.setInterval(fetchTasks, 3000);

});
=======
            });

        //some browsers also require that we return false to
        //prevent the default behavior
        return false;
    }); //on new task form submit

    //fetch the tasks to kick everything off...
    fetchTasks();

    //refetch the tasks every so often
    //to get new tasks created by others
    window.setInterval(fetchTasks, 10000);
}); //on doc ready
>>>>>>> 0e1f3c03a332ce37c172bdee43ad742a11ba4994
