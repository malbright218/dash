$(document).ready(function () {
    sessionStorage.clear();
    var clicks = [];

    $("#loginButton").on("click", login)
    $(document).on('keypress', function (e) {
        e.preventDefault
        if (e.which == 13) {
            login()
        }
    });

    function login() {
        $.get("/api/user", getUser)
        function getUser(data) {
            for (var i = 0; i < data.length; i++) {
                if ((data[i].userName == $("#inputUser").val().trim()) && (data[i].password == $("#inputPassword").val().trim())) {
                    window.location.href = "dash.html"
                    sessionStorage.setItem("username", data[i].userName)
                    sessionStorage.setItem("admin", data[i].isAdmin)
                    sessionStorage.setItem("id", data[i].id)
                    sessionStorage.setItem("name", data[i].firstName)
                    break;
                } else {
                    clicks.push(1)
                    var message = $("<p></p>");
                    message.attr("id", "loginError")
                    message.append("Your username or password is incorrect");
                    $("#messages").html(message)
                }
            }

            if (clicks.length >= 3) {
                var div = $("<div></div>")
                div.addClass("d-flex justify-content-center")
                var a = $("<a href='#'></a>")
                a.append("Forgot your password?")
                div.append(a)
                $("#messages").html(div)
            }
        };
    }
})