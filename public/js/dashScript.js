$(document).ready(function () {

    // NAVBAR PERSONALIZATION
    $.get("/api/user_data", showName)
    function showName(data) {
        $("#nameTarget").append("Welcome, " + data.name)
    }
    
    // SIDE BAR COLLAPSE FUNCTIONS
    $('#body-row .collapse').collapse('hide');

    // COLLAPSE/EXPAND ICON
    $('#collapse-icon').addClass('fa-angle-double-left');

    // COLLAPSE CLICK
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
    // END SIDE BAR FUNCTIONS

    var newsArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    // NEWS API FUNCTION
    // AJAX CALL
    var queryURL = buildQueryURL()
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(updatePage)
    // FUNCTION TO BUILD THE ACTUAL QUERY
    function buildQueryURL() {
        var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?";
        var queryParams = { "api-key": "jbOGcvT6mc43Uuc3zlwjGGUJIsQ5Pera" };
        queryParams.q = 'paper+packaging'
        console.log("---------------\nURL: " + queryURL + "\n---------------");
        console.log(queryURL + $.param(queryParams));
        return queryURL + $.param(queryParams);
    }
    // DISPLAY QUERY DATA ON PAGE
    function updatePage(NYTData) {
        // RANDOMIZING THE NEWS ARTICLES
        function shuffle(arr) {
            var currentIndex = arr.length, temporaryValue, randomIndex;
            while (0 !== currentIndex) {
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex -= 1;
                temporaryValue = arr[currentIndex];
                arr[currentIndex] = arr[randomIndex];
                arr[randomIndex] = temporaryValue;
            }
            return arr
        }
        var empty = []
        newsArr = shuffle(newsArr)
        for (var i = 0; i < 5; i++) {
            empty.push(newsArr[i])
        }

       $("#newsTitle1".append(NYTData.response.docs[newsArr[0]].headline.main));
        console.log(NYTData)
        console.log(NYTData.response.docs[0].abstract)
        $("#loc1").append('<h5>' + NYTData.response.docs[x].headline.main + '<h5>')
        $("#loc2").append(NYTData.response.docs[y].headline.main)
        $("#loc3").append(NYTData.response.docs[z].headline.main)
    }






})