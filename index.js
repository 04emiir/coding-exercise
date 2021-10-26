window.onload = function () {
    /* Example array. [TASK NAME, DONE STATUS]*/
    var arrayTask = [
        ["Get up early", true],
        ["Do some meditation", true],
        ["Eat healthy breakfast", false],
        ["Drink plenty of water", false],
        ["Exercise", false],
        ["Smile :)", false],
    ];

    fillTask(arrayTask);

    /* Handle the enter key press and avoid empty tasks*/
    document.addEventListener("keyup", function (event) {
        /* Get input value */
        let input_task = document.getElementById("input_task").value;
        if (event.code === "Enter" && input_task != null && input_task != "") {
            /* new task; clear the input*/
            addTask(input_task);
            document.getElementById("input_task").value = "";
        }
    });

    /* Create the row (task) using DOM; two params; HTML => task name ; state => true or false (done / not done) */
    function singleTaskDOM(html, state) {
        // TASKS CONTAINER
        let task_list = document.getElementById("task_list");

        // ROW CONTAINER
        let new_task = document.createElement("DIV");
        new_task.className = "single_task";
        task_list.appendChild(new_task);

        // TASK NAME
        let paragraph = document.createElement("P");
        paragraph.innerHTML = html;
        paragraph.addEventListener("click", function (event) {
        event.target.classList.toggle("isdone");
        });

        /* When creating the task, now if it is completed */
        if (state) 
            paragraph.className = "isdone";
        new_task.appendChild(paragraph);

        // BUTTON
        let button = document.createElement("BUTTON");
        button.innerText = "Delete";
        button.className = "delete-task";
        button.addEventListener("click", deleteTask);

        new_task.appendChild(button);
    }

    /* create tasks (if any) when the page load */
    function fillTask(array) {
        for (let task of array) {
            singleTaskDOM(task[0], task[1]);
        }
    }

    /* create a row; used when pressing ENTER*/
    function addTask(html) {
        singleTaskDOM(html, false);

    }

    function deleteTask() {
        var row = this.parentNode;
        var task_state = this.previousElementSibling;
        /* Small prompt to not remove uncompleted task by mistake */
        if (task_state.classList.contains("isdone")) {
            row.remove();
        } else {
            let choice = confirm("Task not complete. Do you want to delete?");
            choice ? row.remove() : '';
        }    
    }
};

/* outside onload because im calling this function with a onclick */
function clearAll() {
    let node = document.getElementById("task_list");
    /* if there is not elements to remove. the button does nothing */
    if (node.childNodes.length != 0) {
        /* prompt and remove all tasks */
        let choice = confirm("This will delete all the tasks. Proceed?");
        choice ? node.querySelectorAll("*").forEach((n) => n.remove()) : '';
        document.getElementById("input_task").value = "";
    }
}
