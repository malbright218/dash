$(document).ready(function() {
  /////////////////////////////////////////////////
  var currentJobNo = {}; // Setting global for a current job holder
  /////////////////////////////////////////////////
  $("#newJobIndex").text(currentJobNo[0]); // filling the modal with the current job number
  /////////////////////////////////////////////////
  // NAVBAR PERSONALIZATION
  $.get("/api/user_data", showName);
  function showName(data) {
    $("#nameTarget").append("Welcome, " + data.name);
    // var name = data.name;
    // var names = name.split(" ");
    // var first = names[0];
    // var second = names[1];
    // var initial = first + second;
    sessionStorage.setItem("initials", data.name);
  }
  /////////////////////////////////////////////////
  // $("#statusButton").on("click", function() {
  //   if ($(this).val() === "active") {
  //     $(this).attr("value", "inactive");
  //     $(this).removeClass("btn-primary");
  //     $(this).addClass("btn-secondary");
  //     $(this).text("Repeat");
  //   } else if ($(this).val() === "inactive") {
  //     $(this).attr("value", "active");
  //     $(this).removeClass("btn-secondary");
  //     $(this).addClass("btn-primary");
  //     $(this).text("New");
  //   }
  // });

  /////////////////////////////////////////////////
  ///// TABLE SEARCH FUNCTION ////////////////////
  $("#myInput").on("keyup", function() {
    var value = $(this)
      .val()
      .toLowerCase();
    $("#jobTarget tr").filter(function() {
      $(this).toggle(
        $(this)
          .text()
          .toLowerCase()
          .indexOf(value) > -1
      );
    });
  });
  /////////////////////////////////////////////////
  ///// ADD COMMAS TO NUMBERS IN TABLE/////////////
  function addCommas(nStr) {
    nStr += "";
    x = nStr.split(".");
    x1 = x[0];
    x2 = x.length > 1 ? "." + x[1] : "";
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
      x1 = x1.replace(rgx, "$1" + "," + "$2");
    }
    return x1 + x2;
  }
  /////////////////////////////////////////////////
  ///// FUNCTION TO DISPLAY JOBS IN TABLE /////////
  $.get("/api/jobs", display);
  function display(data) {
    for (var i = 0; i < data.length; i++) {
      if (i + 1 == data.length) {
        currentJobNo.number = data[i].jobNo + 1;
      }
      // Variables below to help set up the table for population
      var blankrow = $("<tr>"); // A new blank row
      var job = $("<td>"); // The job number
      var cust = $("<td>"); // The customer name
      var created = $("<td>"); // The date it was created
      var createdby = $("<td>"); // The user that created it
      var csr = $("<td>"); // The csr rep for the job/customer
      var sheets = $("<td>"); // The number of sheets
      var roll = $("<td>"); // The current roll size
      var chop = $("<td>"); // The current chop size
      var optimum = $("<td>"); // The optimum roll size
      var flute = $("<td>"); // The flute profile
      if (data[i].flute === "B") {
        // Checking flute profile and assigning class based on it
        flute.addClass("bflute");
      } else if (data[i].flute === "E") {
        flute.addClass("eflute");
      } else {
        flute.addClass("fflute");
      }
      var top = $("<td>"); // The top sheet type
      var med = $("<td>"); // The medium type
      var liner = $("<td>"); // The liner type
      var mill = $("<td>"); // The top sheet mill
      var lays = $("<td>"); // The number of lays, if none then 1
      var status = $("<td>"); // The class of the job, new or repeat
      if (data[i].newJob === "new") {
        // If the job is new, add the class newJob to highlight
        blankrow.addClass("newJob");
      }
      var coating = $("<td>"); // The type of coating, mainly to distinguish UV coating
      var done = $("<td>"); // If the job is done through cutting
      var close = $("<td>"); // If the job is ok to close
      var closeby = $("<td>"); // Who closed the job
      var closedate = $("<td>"); // The date the job was closed
      var action1 = $("<td>"); // Who analyzed the job
      var comments = $("<td>"); // Any comments for this particular job

      // Appending data to the <td> elements above
      job.append(data[i].jobNo);
      cust.append(data[i].customer);
      // Timestamp for the creation of a new table row, i.e. a new job number
      var createdTime = data[i].createdDate;
      var createdDate = moment(createdTime).format("MM-DD-YY");
      created.append(createdDate);
      //////////////////////////////////////
      // Setting names to be initials to save horizontal space
      var name = data[i].createdBy;
      var names = name.split(" ");
      var first = names[0].charAt(0);
      var second = names[1].charAt(0);
      var initial = first + second;
      createdby.append(initial);
      //////////////////////////////////////
      // Setting names to be initials to save horizontal space
      var csrName = data[i].csr;
      var csrNames = csrName.split(" ");
      var csrFirst = csrNames[0].charAt(0);
      var csrSecond = csrNames[1].charAt(0);
      var csrInitial = csrFirst + csrSecond;
      csr.append(csrInitial);
      //////////////////////////////////////
      var num = data[i].sheets;
      num = addCommas(num);
      sheets.append(num);
      roll.append(data[i].rollSize);
      chop.append(data[i].chopSize);
      optimum.append(data[i].optimumRoll);
      flute.append(data[i].flute);
      top.append(data[i].topSheet);
      med.append(data[i].medium);
      liner.append(data[i].liner);
      mill.append(data[i].mill);
      lays.append(data[i].lays);
      status.append(data[i].newJob);
      coating.append(data[i].coating);
      /////////////////////////////////////////
      ////////////// BUTTON WORK //////////////
      /////////////////////////////////////////
      // console.log(data[0])
      // console.log(data[1])
      // console.log(data[2])

      if (data[i].doneCutting != "yes") { // If the job is not done through cutting, add a button that allows us to mark it so
        var doneBtn = $("<button>");
        doneBtn.addClass("btn btn-primary");
        doneBtn.append("X");
        doneBtn.attr("id", "cut|"+data[i].id)
        done.append(doneBtn);
      } else {  // If the job is done through cutting, append the status 'yes'
        done.append(data[i].doneCutting);
      }

      if (data[i].oktoClose != "yes") {
        var okBtn = $("<button>");
        okBtn.addClass("btn btn-primary");
        okBtn.append("X");
        okBtn.attr("id", "ok|"+data[i].id)
        close.append(okBtn);
      } else {
        close.append(data[i].oktoClose);
      }

      var x = new Date(data[i].closedDate);
      var y = x.getFullYear();
      if (
        data[i].doneCutting === "yes" &&
        data[i].oktoClose === "yes" &&
        y < 2000
      ) {
        var closingBtn = $("<button>")
        closingBtn.addClass("btn btn-primary")
        closingBtn.append("X")
        closingBtn.attr("id","close|"+data[i].id)
        action1.append(closingBtn)
      } else if (
        data[i].doneCutting === "yes" &&
        data[i].oktoClose === "yes" &&
        y >= 2000
      ) {
        closeby.append(data[i].closedby);
        closedate.append(data[i].closedDate);
      }
      //////////////////////////////////////
      // Appending all elements to a row
      blankrow.append(
        job,
        cust,
        created,
        createdby,
        csr,
        sheets,
        roll,
        chop,
        optimum,
        flute,
        top,
        med,
        liner,
        mill,
        lays,
        status,
        coating,
        done,
        close,
        closeby,
        closedate,
        action1
        // comments
      );
      //////////////////////////////////////
      // Appending the row to the table
      $("#jobTarget").append(blankrow);
    } // End of for loop
    var headrow = $(
      "<thead><tr>" +
        "<th>Job No</th>" +
        "<th>Customer</th>" +
        "<th>Date Created</th>" +
        "<th>Created By</th>" +
        "<th>CSR</th>" +
        "<th>Sheets</th>" +
        "<th>Roll Size</th>" +
        "<th>Chop Size</th>" +
        "<th>Optimum Roll</th>" +
        "<th>Flute</th>" +
        "<th>Top Sheet</th>" +
        "<th>Medium</th>" +
        "<th>Liner</th>" +
        "<th>Mill</th>" +
        "<th>Lays</th>" +
        "<th>Job Class</th>" +
        "<th>Coating</th>" +
        "<th>Done Cutting</th>" +
        "<th>Ok to Close</th>" +
        "<th>Closed By</th>" +
        "<th>Closed Date</th>" +
        "<th>Action</th>" +
        // "<th>Comments</th>"+
        "</tr></thead>"
    );

    $("#jobTarget").prepend(headrow);
    $("#newJobIndex").text(currentJobNo.number);
  } // End of display function
  console.log(currentJobNo);

  // Function to add new jobs
  $("#addNewJobClick").on("click", function() {
    var newJobObject = {};
    var d = new Date();
    var month = d.getMonth() + 1;
    var day = d.getDate();
    var output =
      d.getFullYear() +
      "-" +
      (month < 10 ? "0" : "") +
      month +
      "-" +
      (day < 10 ? "0" : "") +
      day;

    var statusClass = $("#statusButton").val();

    if (statusClass === "active") {
      newJobObject.newJob = statusClass;
    } else {
      newJobObject.newJob = "repeat";
    }

    newJobObject.jobNo = $("#newJobIndex").text();
    newJobObject.customer = $("#customerName")
      .val()
      .trim();
    newJobObject.createdDate = output;
    newJobObject.createdBy = sessionStorage.getItem("initials");
    newJobObject.csr = $("#csrSelector")
      .val()
      .trim();
    newJobObject.sheets = $("#sheetCount")
      .val()
      .trim();
    newJobObject.rollSize = $("#rollSizeInput")
      .val()
      .trim();
    newJobObject.chopSize = $("#chopSizeInput")
      .val()
      .trim();
    newJobObject.optimumRoll = $("#optimumRoll")
      .val()
      .trim();
    newJobObject.flute = $("#fluteSelector")
      .val()
      .trim();
    newJobObject.topSheet = $("#topSelector")
      .val()
      .trim();
    newJobObject.medium = $("#mediumSelector")
      .val()
      .trim();
    newJobObject.liner = $("#linerSelector")
      .val()
      .trim();
    newJobObject.mill = $("#millSelector")
      .val()
      .trim();
    newJobObject.lays = $("#layInput")
      .val()
      .trim();
    newJobObject.coating = $("#coatingSelector")
      .val()
      .trim();
    newJobObject.doneCutting = "";
    newJobObject.oktoClose = "";
    newJobObject.closedby = "";
    newJobObject.closedDate = output;
    newJobObject.analyzedBy = "";
    newJobObject.comments = "";
    newJobObject.needsAnalysis = 0;
    newJobObject.createdAt = output;
    newJobObject.updatedAt = output;

    console.log(newJobObject);
    gobabygo(newJobObject);
  });

  // FUNCTION TO UPDATE STATUS OF JOBS
  $(document).on("click", ".btn-primary", function() {
    console.log(this.id)
    var clicked = this.id;
    var action = clicked.split("|");
    console.log(action)
    if (action[0] === "cut") {
      var updateJob = {}
      updateJob.id = action[1]
      updateJob.doneCutting = "yes"
      update(updateJob)
    } else if(action[0] === "ok") {
      var updateJob = {}
      updateJob.id = action[1]
      updateJob.oktoClose = "yes"
      update(updateJob)
    } else if (action[0] === "close"){
      var updateJob = {}
      updateJob.id = action[1]
      updateJob.closedby = sessionStorage.getItem("initials")
      updateJob.closedDate = new Date()
      update(updateJob)
    }
  })


  function update(x) {
    $.ajax({
        method: "PUT",
        url: "/api/jobs",
        data: x
    })
    location.reload()
}







  function gobabygo(x) {
    $.post("/api/jobs", x);
    location.reload();
  }

  $(".toggle").on("click", function() {
    console.log("toggled");
    var tclass = $(this).attr("class");
    console.log(tclass);
  });

  // A function to populate the repeat job modal with relevant information
  $("#findLastJob").on("click", function() {
    var number = $("#lastJobInput").val();
    $.get("/api/jobs/" + number, function(data) {
      console.log(data);
      console.log(data.customer);
      console.log(number);
      console.log(currentJobNo);
      $("#repeatCustomerTarget").html(data.customer);
      $("#repeatCSRTarget").html(data.csr);
      $("#repeatRollSizeTarget").html(data.rollSize);
      $("#repeatChopSizeTarget").html(data.chopSize);
      $("#repeatOptimumRollTarget").html(data.optimumRoll);
      $("#repeatFluteTarget").html(data.flute);
      $("#repeatTopSheetTarget").html(data.topSheet);
      $("#repeatMediumTarget").html(data.medium);
      $("#repeatLinerTarget").html(data.liner);
      $("#repeatMillTarget").html(data.mill);
      $("#repeatCoatingTarget").html(data.coating);
    });
  });

  // Function to add repeat jobs
  $("#addRepeatJobClick").on("click", function() {
    console.log(
      $("#sheetCount")
        .val()
        .trim()
    );
    var newJobObject = {};
    var d = new Date();
    var month = d.getMonth() + 1;
    var day = d.getDate();
    var output =
      d.getFullYear() +
      "-" +
      (month < 10 ? "0" : "") +
      month +
      "-" +
      (day < 10 ? "0" : "") +
      day;
    newJobObject.jobNo = currentJobNo.number;
    newJobObject.customer = $("#repeatCustomerTarget").text();
    newJobObject.createdDate = output;
    newJobObject.createdBy = sessionStorage.getItem("initials");
    newJobObject.csr = $("#repeatCustomerTarget").text();
    newJobObject.sheets = $("#sheetCount2")
      .val()
      .trim();
    newJobObject.rollSize = $("#repeatRollSizeTarget").text();
    newJobObject.chopSize = $("#repeatChopSizeTarget").text();
    newJobObject.optimumRoll = $("#repeatOptimumRollTarget").text();
    newJobObject.flute = $("#repeatFluteTarget").text();
    newJobObject.topSheet = $("#repeatTopSheetTarget").text();
    newJobObject.medium = $("#repeatMediumTarget").text();
    newJobObject.liner = $("#repeatLinerTarget").text();
    newJobObject.mill = $("#repeatMillTarget").text();
    newJobObject.lays = $("#layInput2")
      .val()
      .trim();
    newJobObject.coating = $("#repeatCoatingTarget").text();
    newJobObject.doneCutting = "";
    newJobObject.oktoClose = "";
    newJobObject.closedby = "";
    newJobObject.closedDate = output;
    newJobObject.analyzedBy = "";
    newJobObject.newJob = "repeat";
    newJobObject.comments = "";
    newJobObject.needsAnalysis = 0;
    newJobObject.createdAt = output;
    newJobObject.updatedAt = output;

    console.log(newJobObject);
    gobabygo(newJobObject);
  });
});
