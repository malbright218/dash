$(document).ready(function () {


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
    }

   


})

// countTodos();


// $("#sortable").sortable();
    // $("#sortable").disableSelection();
    // // all done btn
    // $("#checkAll").click(function () {
    //     AllDone();
    // });

    // //create todo
    // $('.add-todo').on('keypress', function (e) {
    //     e.preventDefault
    //     if (e.which == 13) {
    //         if ($(this).val() != '') {
    //             var todo = $(this).val();
    //             createTodo(todo);
    //             countTodos();
    //         } else {
    //             // some validation
    //         }
    //     }
    // });
    // // mark task as done
    // $('.todolist').on('change', '#sortable li input[type="checkbox"]', function () {
    //     if ($(this).prop('checked')) {
    //         var doneItem = $(this).parent().parent().find('label').text();
    //         $(this).parent().parent().parent().addClass('remove');
    //         done(doneItem);
    //         countTodos();
    //     }
    // });

    // //delete done task from "already done"
    // $('.todolist').on('click', '.remove-item', function () {
    //     removeItem(this);
    // });

    // // count tasks
    // function countTodos() {
    //     var count = $("#sortable li").length;
    //     $('.count-todos').html(count);
    // }

    // //create task
    // function createTodo(text) {
    //     var markup = '<li class="ui-state-default"><div class="checkbox"><label><input type="checkbox" value="" />' + text + '</label></div></li>';
    //     $('#sortable').append(markup);
    //     $('.add-todo').val('');
    // }

    // //mark task as done
    // function done(doneItem) {
    //     var done = doneItem;
    //     var markup = '<li>' + done + '<button class="btn btn-default btn-xs pull-right  remove-item"><span class="glyphicon glyphicon-remove"></span></button></li>';
    //     $('#done-items').append(markup);
    //     $('.remove').remove();
    // }

    // //mark all tasks as done
    // function AllDone() {
    //     var myArray = [];

    //     $('#sortable li').each(function () {
    //         myArray.push($(this).text());
    //     });

    //     // add to done
    //     for (i = 0; i < myArray.length; i++) {
    //         $('#done-items').append('<li>' + myArray[i] + '<button class="btn btn-default btn-xs pull-right  remove-item"><span class="glyphicon glyphicon-remove"></span></button></li>');
    //     }

    //     // myArray
    //     $('#sortable li').remove();
    //     countTodos();
    // }

    // //remove done task from list
    // function removeItem(element) {
    //     $(element).parent().remove();
    // }