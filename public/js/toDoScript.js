$(document).ready(function () {

    var showName = sessionStorage.getItem("name")
    $("#nameTarget").append("Welcome, "+showName)

    $(".add-todo").focus()
    // Collapse/Expand icon
    $('#collapse-icon').addClass('fa-angle-double-left');

    // Collapse click
    $('[data-toggle=sidebar-colapse]').click(function () {
        SidebarCollapse();
    });

    function SidebarCollapse() {
        $('.menu-collapsed').toggleClass('d-none');
        $('.sidebar-submenu').toggleClass('d-none');
        $('.submenu-icon').toggleClass('d-none');
        $('#sidebar-container').toggleClass('sidebar-expanded sidebar-collapsed');

        // Treating d-flex/d-none on separators with title
        var SeparatorTitle = $('.sidebar-separator-title');
        if (SeparatorTitle.hasClass('d-flex')) {
            SeparatorTitle.removeClass('d-flex');
        } else {
            SeparatorTitle.addClass('d-flex');
        }

        // Collapse/Expand icon
        $('#collapse-icon').toggleClass('fa-angle-double-left fa-angle-double-right');
    }

    $('.add-todo').on('keypress', function (e) {
        e.preventDefault
        if (e.which == 13) {
            if ($(this).val() != '') {
                var todo = $(this).val();
                createTodo(todo);
                
                // countTodos();
            } else {
                // some validation
            }
        }
    });

    function createTodo(data) {
        location.reload()
        
        var listItem = $("<li>")
        listItem.addClass("toDoRow")
        var listRow = $("<div>")
        listRow.addClass("row list-row")

        var col10 = $("<div>")
        col10.addClass("col-md-10")
        var col10div = $("<div>")
        col10div.addClass("task-title")
        var span = $("<span>")
        span.addClass("task-title-sp")
        var spanInput = $("<input type='text' class='toDoForm' disabled>")
        spanInput.attr("placeholder", data)
        span.append(spanInput)
        col10div.append(span)
        col10.append(col10div)

        var col2 = $("<div>")
        col2.addClass("col-md-2")
        var col2div = $("<div>")
        col2div.addClass("taskIcon")
        var btn1 = $("<button>")
        var btn2 = $("<button>")
        var btn3 = $("<button>")
       
        btn1.addClass("btn btn-success btn-xs")
        btn2.addClass("btn btn-primary btn-xs")
        btn3.addClass("btn btn-danger btn-xs")
        var icon1 = $("<i style='color: #fff'>")
        var icon2 = $("<i style='color: #fff'>")
        var icon3 = $("<i style='color: #fff'>")
        icon1.addClass("fas fa-check")
        icon2.addClass("fas fa-pencil-alt")
        icon3.addClass("far fa-trash-alt")
        btn1.append(icon1)
        btn2.append(icon2)
        btn3.append(icon3)
        col2div.append(btn1, btn2, btn3)
        col2.append(col2div)

        listRow.append(col10, col2)
        listItem.append(listRow)
        $("#toDoTarget").append(listItem)
        $(".add-todo").val('')

        var newTask = {}
        newTask.textBody = data
        newTask.taskStatus = 'active'
        newTask.UserId = sessionStorage.getItem("id")

        addTask(newTask)

    }

    function addTask(data) {
        $.post("/api/tasks", data)
        

    }

    // Function to mark a task as complete
    $(document).on("click", ".btn-success", function() {
        console.log(this.id)
        var updateTask = {}
        updateTask.id = this.id
        updateTask.taskStatus = "completed"
        complete(updateTask)
    })

    function complete(x) {
        $.ajax({
            method: "PUT",
            url: "/api/tasks",
            data: x
        })
        location.reload()
    }
    // End complete function
    ////////////////////////
    // Function to edit the text in the task
    $(document).on("click", ".btn-primary", function() {
        console.log(this.id)
        var a = $("#span"+this.id).attr("placeholder")
        console.log(a)
        $("#span"+this.id).removeAttr("disabled")
        $("#span"+this.id).focus()
        $('.toDoForm').on('keypress', function (z) {
            z.preventDefault
            if (z.which == 13) {
                if ($(this).val() != '') {
                    var todo = $(this).val();
                    console.log(todo);
                    $("#span"+this.id).attr("placeholder", todo)
                    var updateTask = {}
                    updateTask.id = this.id.slice(-2)
                    updateTask.textBody = todo
                    console.log(updateTask)                   
                    complete(updateTask)                    

                } else {
                    location.reload()
                }
            }
        });
    })
    // End edit function
    ////////////////////////
    // Function to delete task
    $(document).on("click", ".btn-danger", function() {
        console.log(this.id)
        var z = this.id
        console.log(z)
        deletePost(z)
    })

    function deletePost(id) {
        $.ajax({
            method: "DELETE",
            url: "/api/tasks/" + id
        })
        location.reload()
    }



    // function update(x) {
    //     $.ajax({
    //         method: "PUT",
    //         url: "/api/tasks",
    //         data: x
    //     })
    // }





    var userID = sessionStorage.getItem("id")
    $.get("/api/user/" + userID, display)

    function display(data) {
        // console.log(data.Tasks)
        for (var i = 0; i < data.Tasks.length; i++) {

            /////// COMPLETED TASKS
            var cTask = data.Tasks[i].textBody
            var cListItem = $("<li>")
            cListItem.addClass("toDoRow")
            var cListRow = $("<div>")
            cListRow.addClass("row list-row")

            var Ccol10 = $("<div>")
            Ccol10.addClass("col-md-12")
            var Ccol10div = $("<div>")
            Ccol10div.addClass("task-title")
            var p = $("<p>")
            p.addClass("task-title-sp toDoForm task-complete")
            p.append(cTask)
            // var CspanInput = $("<input type='text' class='toDoForm' disabled>")
            // CspanInput.addClass("task-complete")
            // CspanInput.attr("placeholder", cTask)
            // CspanInput.attr("id", "span"+data.Tasks[i].id)
            // Cspan.append(p)
            Ccol10div.append(p)
            Ccol10.append(Ccol10div)
            cListRow.append(Ccol10)
            cListItem.append(cListRow)
            $("#completedTarget").append(cListItem)
            if (data.Tasks[i].taskStatus === 'active') {
                // console.log(data.Tasks[i].textBody)
                var task = data.Tasks[i].textBody
                var listItem = $("<li>")
                listItem.addClass("toDoRow")
                var listRow = $("<div>")
                listRow.addClass("row list-row")
    
                var col10 = $("<div>")
                col10.addClass("col-md-10")
                var col10div = $("<div>")
                col10div.addClass("task-title")
                var span = $("<span>")
                span.addClass("task-title-sp")
                var spanInput = $("<input type='text' class='toDoForm' disabled>")
                spanInput.attr("placeholder", task)
                spanInput.attr("id", "span"+data.Tasks[i].id)
                span.append(spanInput)
                col10div.append(span)
                col10.append(col10div)
    
                var col2 = $("<div>")
                col2.addClass("col-md-2")
                var col2div = $("<div>")
                col2div.addClass("taskIcon")
                var btn1 = $("<button>")
                btn1.attr("id", data.Tasks[i].id)
                var btn2 = $("<button>")
                btn2.attr("id", data.Tasks[i].id)
                var btn3 = $("<button>")
                btn3.attr("id", data.Tasks[i].id)
                btn1.addClass("btn btn-success btn-xs")
                btn2.addClass("btn btn-primary btn-xs")
                btn3.addClass("btn btn-danger btn-xs")
                var icon1 = $("<i style='color: #fff'>")
                var icon2 = $("<i style='color: #fff'>")
                var icon3 = $("<i style='color: #fff'>")
                icon1.addClass("fas fa-check")
                icon2.addClass("fas fa-pencil-alt")
                icon3.addClass("far fa-trash-alt")
                btn1.append(icon1)
                btn2.append(icon2)
                btn3.append(icon3)
                col2div.append(btn1, btn2, btn3)
                col2.append(col2div)
    
                listRow.append(col10, col2)
                listItem.append(listRow)
                $("#toDoTarget").append(listItem)
                $(".add-todo").val('')
                





            }
                       
        }
    }
})