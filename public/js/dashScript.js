$(document).ready(function() {
  // NAVBAR PERSONALIZATION
  $.get("/api/user_data", showName);
  function showName(data) {
    $("#nameTarget").append("Welcome, " + data.name);
  }

  // SIDE BAR COLLAPSE FUNCTIONS
  $("#body-row .collapse").collapse("hide");

  // COLLAPSE/EXPAND ICON
  $("#collapse-icon").addClass("fa-angle-double-left");

  // COLLAPSE CLICK
  $("[data-toggle=sidebar-colapse]").click(function() {
    SidebarCollapse();
  });

  function SidebarCollapse() {
    $(".menu-collapsed").toggleClass("d-none");
    $(".sidebar-submenu").toggleClass("d-none");
    $(".submenu-icon").toggleClass("d-none");
    $("#sidebar-container").toggleClass("sidebar-expanded sidebar-collapsed");

    // Treating d-flex/d-none on separators with title
    var SeparatorTitle = $(".sidebar-separator-title");
    if (SeparatorTitle.hasClass("d-flex")) {
      SeparatorTitle.removeClass("d-flex");
    } else {
      SeparatorTitle.addClass("d-flex");
    }

    // Collapse/Expand icon
    $("#collapse-icon").toggleClass(
      "fa-angle-double-left fa-angle-double-right"
    );
  }
  // END SIDE BAR FUNCTIONS
  var newsArr = []
  for (var i = 0; i < 36; i++) {
      newsArr.push(i+1)
  }

  $(".menu-collapsed").on("click", function() {
      clear();
  })

  $("#newsOn").on("click", function() {
    event.preventDefault();
    clear();
    var queryURL = buildQueryURL();
  
    // Make the AJAX request to the API - GETs the JSON data at the queryURL.
    // The data then gets passed as an argument to the updatePage function
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(updatePage);            
  });

  function buildQueryURL() {
    var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?";
    var queryParams = { "api-key": "jbOGcvT6mc43Uuc3zlwjGGUJIsQ5Pera" };
    queryParams.q = 'packaging+pulp+paper'
    
    // console.log("---------------\nURL: " + queryURL + "\n---------------");
    // console.log(queryURL + $.param(queryParams));
    return queryURL + $.param(queryParams);
  }
  
  /**
   * takes API data (JSON/object) and turns it into elements on the page
   @param {object} NYTData - object containing NYT API data
   */
  function updatePage(NYTData) {  
    // BUILDING ELEMENTS FOR THE PAGE
    for (var i = 0; i < 11; i++) {
        // ELEMENT VARIABLES
        var parent = $("<div>")
        var blankCard = $("<div>")
        var blankHead = $("<div>")
        var head = $("<h2>")
        var button = $("<button>")
        var acc = $("<div>")
        var body = $("<div>")
        var a = $("<a>")
        // ADDING CLASSES TO ELEMENTS
        parent.addClass("accordion")
        blankCard.addClass("card")
        blankHead.addClass("card-header")
        head.addClass("mb-0")
        button.addClass("btn btn-link collapsed")
        acc.addClass("collapse")
        body.addClass("card-body")
        // ADDING ATTRIBUTES TO ELEMENTS
        parent.attr("id", "accordion"+i)
        blankHead.attr("id", "heading"+i)
        button.attr("type", "button")
        button.attr("data-toggle", "collapse")
        button.attr("data-target", "#collapse"+i)
        button.attr("aria-expanded", "true")
        button.attr("aria-controls", "collapse"+i)
        acc.attr("id", "collapse"+i)
        acc.attr("aria-labelledby", "heading"+i)
        acc.attr("data-parent", "#accordion"+i)
        a.attr("href", NYTData.response.docs[i].web_url)
        a.attr("target", "_blank")
        // ADDING TEXT TO ELEMENTS
        button.append(NYTData.response.docs[i].headline.main)
        a.append("LINK")
        body.append(NYTData.response.docs[i].lead_paragraph, "<br>", a)
        // CONSOLIDATING
        acc.append(body)
        head.append(button)
        blankHead.append(button)
        blankCard.append(blankHead, acc)
        parent.append(blankCard)
        $("#target").append(parent)

    }
  }
  
  // Function to empty out the articles
  function clear() {
    $("#target").empty();
  }
  
  // CLICK HANDLERS
  // ==========================================================
  
  // .on("click") function associated with the Search Button
  $("#run-search").on("click", function(event) {
    // This line allows us to take advantage of the HTML "submit" property
    // This way we can hit enter on the keyboard and it registers the search
    // (in addition to clicks). Prevents the page from reloading on form submit.
    event.preventDefault();
  
    // Empty the region associated with the articles
    clear();
  
    // Build the query URL for the ajax request to the NYT API
    var queryURL = buildQueryURL();
  
    // Make the AJAX request to the API - GETs the JSON data at the queryURL.
    // The data then gets passed as an argument to the updatePage function
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(updatePage);
  });


  

  
});
