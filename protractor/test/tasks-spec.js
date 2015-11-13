/* Test script for the Tasks List app */
// to execute this file, go to terminal and go into the protractor dir
// command-t opens a new tab

// tab 1
// python -m SimpleHTTPServer


// tab 2
// webdriver-manager start
// ^ launches selenium

// original terminal webstorm
// protractor test/protractor-conf.js


// 'the tasks app' describes what we are doing
describe('the tasks app', function() {
    // ng-model should be set into the by.model()
    var taskTitleInp = element(by.model('newTask.title'));
    // catches the button name
    var addTaskBtn = element(by.buttonText('Add Task'));
    // selects all within a section
    var tasksList = element.all(by.repeater('task in tasks'));
    var requiredMsg = $('.title-required-error');

    function addTask(title) {
        taskTitleInp.sendKeys(title);
        addTaskBtn.click();
    }

    function addMultipleTasks(num) {
        var idx;
        for (idx = 0; idx < num; ++idx) {
            addTask('Task ' + idx);
        }
    }


    beforeEach(function() {
        // global variable browser is a protracter object that allows us to manipulate the browser
        browser.get('http://localhost:8000');
    });
    
    it('must have the proper page title', function() {
        // tests what the title of the browser is expected it to be
        // expect tests conditions
        expect(browser.getTitle()).toEqual('My Tasks');
    });

    it('must add a task', function() {
        var title = 'Learn Protractor';
        addTask(title);
        // expect to see at least one task in the list
        expect(tasksList.count()).toEqual(1);
        // test that task list text of li should equal the title
        expect(tasksList.get(0).getText()).toEqual(title);
    });

    it('must add a task hitting enter', function() {
        var title = 'Learn Protractor';
        taskTitleInp.sendKeys(title);
        taskTitleInp.sendKeys(protractor.Key.ENTER);
        expect(tasksList.count()).toEqual(1);
        expect(tasksList.get(0).getText()).toEqual(title);
    });

    it('must clear the title after adding', function() {
        addTask('box should get cleared');
        expect(taskTitleInp.getAttribute('value')).toEqual('');
    });

    it('must add multiple tasks', function() {
        var num = 20;
        addMultipleTasks(num);
        expect(tasksList.count()).toEqual(num);
    });

    it('must show required validation error', function() {
        expect(requiredMsg.isPresent()).toEqual(false);
        taskTitleInp.sendKeys('abc');
        taskTitleInp.clear();
        expect(requiredMsg.isPresent()).toEqual(true);
        taskTitleInp.sendKeys('abc');
        expect(requiredMsg.isPresent()).toEqual(false);
    });

    it('must disable add task button with blank title', function() {
        expect(addTaskBtn.getAttribute('disabled')).toEqual('true');
        taskTitleInp.sendKeys('abc');
        expect(addTaskBtn.getAttribute('disabled')).toBe(null);
        taskTitleInp.clear();
        taskTitleInp.sendKeys('      ');
        expect(addTaskBtn.getAttribute('disabled')).toEqual('true');
    });

    it('must toggle done with click', function() {
        addTask('test style class');
        addTask('not marked as done');
        expect(tasksList.count()).toEqual(2);
        tasksList.get(0).click();
        expect(tasksList.get(0).getAttribute('class')).toContain('completed-task');
        expect(tasksList.get(1).getAttribute('class')).not.toContain('completed-task');
    });

    it('must purge completed tasks', function() {
        addTask('Task 1');
        addTask('Task 2');
        expect(tasksList.count()).toEqual(2);
        tasksList.get(0).click();
        element(by.buttonText('Purge Completed Tasks')).click();
        expect(tasksList.count()).toEqual(1);
        expect(tasksList.get(0).getText(0)).toEqual('Task 2');
    });
});


















