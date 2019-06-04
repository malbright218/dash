$(document).ready(function () {

    var showName = sessionStorage.getItem("name")
    $("#nameTarget").append("Welcome, "+showName)

    $("form input[type=text], form input[type=email]").prop("disabled", true)
    $("#profileEdit").addClass("profileEditVisible")
    $("#profileSubmit").addClass("profileSubmitHidden")
    $('#body-row .collapse').collapse('hide');


    $.get("/api/user", display)

    function display(data) {
        console.log(data)
        var i = sessionStorage.getItem("id") - 1
        console.log(i)
        console.log(data[i])
        var first3 = data[i].phoneNumber.substring(0,3)
        console.log(first3)
        var last4 = data[i].phoneNumber.slice(-4)
        console.log(last4)
        var mid3 = data[i].phoneNumber.substring(3,6)
        console.log(mid3)

        $("#firstNameInput").attr("placeholder", data[i].firstName)
        $("#lastNameInput").attr("placeholder", data[i].lastName)
        $("#phoneInput").attr("placeholder", data[i].phoneNumber)
        $("#extensionInput").attr("placeholder",data[i].extension)
        $("#emailInput").attr("placeholder", data[i].email)
    }

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

    $("#phoneInput").on("change keyup paste", function () {
        var output;
        var input = $("#phoneInput").val();
        input = input.replace(/[^0-9]/g, '');
        var area = input.substr(0, 3);
        var pre = input.substr(3, 3);
        var tel = input.substr(6, 4);
        if (area.length < 3) {
            output = "(" + area;
        } else if (area.length == 3 && pre.length < 3) {
            output = "(" + area + ")" + " " + pre;
        } else if (area.length == 3 && pre.length == 3) {
            output = "(" + area + ")" + " " + pre + "-" + tel;
        }
        $("#phoneInput").val(output);
    });

    $("#profileEdit").on("click", function () {
        console.log("test")
        $("form input[type=text], form input[type=email]").removeAttr("disabled")
        $("#profileEdit").removeClass("profileEditVisible").addClass("profileEditHidden")
        $("#profileSubmit").removeClass("profileSubmitHidden").addClass("profileSubmitVisible")

        var f = $("#firstNameInput").attr("placeholder")
        var l = $("#lastNameInput").attr("placeholder")
        var p = $("#phoneInput").attr("placeholder")
        var x = $("#extensionInput").attr("placeholder")
        var e = $("#emailInput").attr("placeholder")

        $("#firstNameInput").val(f)
        $("#lastNameInput").val(l)
        $("#phoneInput").val(p)
        $("#extensionInput").val(x)
        $("#emailInput").val(e)


    })

    $("#profileSubmit").on("click", function () {
        console.log("submit test")
        var userId = sessionStorage.getItem("id")
        var name1 = $("#firstNameInput").val().trim()
        var name2 = $("#lastNameInput").val().trim()
        var phone = $("#phoneInput").val().trim()
        var ext = $("#extensionInput").val().trim()
        var email1 = $("#emailInput").val().trim()
        var d = new Date();

        var month = d.getMonth() + 1;
        var day = d.getDate();

        var output = d.getFullYear() + '/' +
            (('' + month).length < 2 ? '0' : '') + month + '/' +
            (('' + day).length < 2 ? '0' : '') + day;

        var updateUser = {}


        updateUser.id = userId;

        

        updateUser.firstName = name1;
        updateUser.lastName = name2;
        updateUser.phoneNumber = phone;
        updateUser.extension = ext;
        updateUser.email = email1;
        updateUser.updatedAt = output;

        update(updateUser)
    })

    function update(x) {
        $.ajax({
            method: "PUT",
            url: "/api/user",
            data: x
        })
    }



})