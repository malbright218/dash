$(document).ready(function() {
  // NAVBAR PERSONALIZATION
  $.get("/api/user_data", showName);
  function showName(data) {
    $("#nameTarget").append("Welcome, " + data.name);
    var name = data.name;
    var names = name.split(" ");
    var first = names[0].charAt(0);
    var second = names[1].charAt(0);
    var initial = first + second;
    sessionStorage.setItem("initials", data.name);
  }

  var tableOffset = $("#jobTarget").offset().top;
  var $header = $("#jobTarget > thead").clone();
  var $fixedHeader = $("#header-fixed").append($header);
  
  $(window).bind("scroll", function() {
      var offset = $(this).scrollTop();
      
      if (offset >= tableOffset && $fixedHeader.is(":hidden")) {
          $fixedHeader.show();
      }
      else if (offset < tableOffset) {
          $fixedHeader.hide();
      }
  });





  var currentJobNo = {};
  $("#newJobIndex").text(currentJobNo[0]);

  $("#statusButton").on("click", function() {
    if ($(this).val() === "active") {
      $(this).attr("value", "inactive");
      $(this).removeClass("btn-primary");
      $(this).addClass("btn-secondary");
      $(this).text("Repeat");
    } else if ($(this).val() === "inactive") {
      $(this).attr("value", "active");
      $(this).removeClass("btn-secondary");
      $(this).addClass("btn-primary");
      $(this).text("New");
    }
  });

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

  $.get("/api/jobs", display);

  function display(data) {
    // console.log(data);

    for (var i = 3000; i < data.length; i++) {
      if (i + 1 == data.length) {
        currentJobNo.number = data[i].jobNo + 1;
      }

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
      if (data[i].newJob === "Yes") {
        blankrow.addClass("newJob");
      }
      var coating = $("<td>"); // The type of coating, mainly to distinguish UV coating
      var done = $("<td>"); // If the job is done through cutting
      var close = $("<td>"); // If the job is ok to close
      var closeby = $("<td>"); // Who closed the job
      var closedate = $("<td>"); // The date the job was closed
      var aby = $("<td>"); // Who analyzed the job
      var comments = $("<td>"); // Any comments for this particular job
      // var needsa = $("<td>"); // If the job still needs to be analyzed

      var closeColumn = $("<td>");
      var closebtn = $("<button>");
      var a = data[i].doneCutting;
      var b = data[i].oktoClose;
      var closeCheck = new Date(data[i].closedDate);
      var y = jQuery.type(closeCheck);
      if (y === "date" && closeCheck.getFullYear() > 2010) {
        closebtn.css("visibility", "hidden");
      } else if (a.toLowerCase() === "x" && b.toLowerCase() === "x") {
        closebtn.addClass("btn btn-success");
        closebtn.append("X");
        closebtn.attr("case", "close");
        closebtn.attr("id", data[i].id);
      } else {
        closebtn.css("visibility", "hidden");
      }
      // var closeCheck = new Date(data[i].closedDate);
      // var y = jQuery.type(closeCheck);
      // if (y === "date" && closeCheck.getFullYear() > 2010) {
      //   closebtn.addClass("btn btn-danger disabled ");
      //   closebtn.append("-");
      //   closebtn.attr("status", "disabled");

      // } else {
      //   closebtn.addClass("btn btn-success disabled");
      //   closebtn.append("X");
      //   closebtn.attr("status", "enabled");
      // }
      // if (
      //   data[i].doneCutting.toLowerCase() === "x" &&
      //   data[i].oktoClose.toLowerCase() === "x" &&
      //   closeCheck.getFullYear() > 2010
      // ) {
      // } else if (
      //   data[i].doneCutting.toLowerCase() === "x" &&
      //   data[i].oktoClose.toLowerCase() === "x"
      // ) {
      //   closebtn.removeClass("disabled");
      // }

      closeColumn.append(closebtn);

      job.append(data[i].jobNo);
      cust.append(data[i].customer);
      var createdTime = data[i].createdDate;
      var createdDate = moment(createdTime).format("MM-DD-YY");
      created.append(createdDate);
      // Creating initials for table for created by field
      var createName = data[i].createdBy;
      var names1 = createName.split(" ");
      var first1 = names1[0].charAt(0);
      var second1 = names1[1].charAt(0);
      var createinitial = first1 + second1;
      createdby.append(createinitial);
      // Creating initials for table for csr field
      var csrname = data[i].csr;
      var names2 = csrname.split(" ");
      var first2 = names2[0].charAt(0);
      var second2 = names2[1].charAt(0);
      var csrinitial = first2 + second2;
      csr.append(csrinitial);

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

      if (data[i].doneCutting === "x" || data[i].doneCutting === "X") {
        var doneCuttingBtn = $("<button>");
        doneCuttingBtn.addClass("btn btn-danger disabled");
        doneCuttingBtn.append("✓");
        doneCuttingBtn.attr("id", data[i].id);
        doneCuttingBtn.attr("status", "disabled");
        doneCuttingBtn.attr("case", "done");
        done.append(doneCuttingBtn);
      } else {
        var doneCuttingBtn = $("<button>");
        doneCuttingBtn.addClass("btn btn-success");
        doneCuttingBtn.append("X");
        doneCuttingBtn.attr("id", data[i].id);
        doneCuttingBtn.attr("case", "done");
        done.append(doneCuttingBtn);
      }

      if (data[i].oktoClose === "x" || data[i].oktoClose === "X") {
        var okBtn = $("<button>");
        okBtn.addClass("btn btn-danger disabled");
        okBtn.append("✓");
        okBtn.attr("id", data[i].id);
        okBtn.attr("case", "ok");
        close.append(okBtn);
      } else {
        var okBtn = $("<button>");
        okBtn.addClass("btn btn-success");
        okBtn.append("X");
        okBtn.attr("id", data[i].id);
        okBtn.attr("case", "ok");
        close.append(okBtn);
      }

      // Creating initials for table for closedby field
      var closedName = data[i].closedby;
      var names3 = closedName.split(" ");
      var first3 = names3[0].charAt(0);
      var second3 = names3[1].charAt(0);
      var closedinitial = first3 + second3;
      closeby.append(closedinitial);

      var closedTime = data[i].closedDate;
      if (closedTime === "1900-01-01" || closedTime === "") {
        var closedDate = "";
      } else {
        var closedDate = moment(closedTime).format("MM-DD-YY");
      }

      closedate.append(closedDate);
      aby.append(data[i].analyzedBy);
      // comments.append(data[i].comments);

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
        aby,
        closeColumn
        // comments
      );

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
        "<th>Analyzed By</th>" +
        "<th>Close</th>" +
        "</tr></thead>"
    );
      
    $("#jobTarget").prepend(headrow);
    $("#newJobIndex").text(currentJobNo.number);
  } // End of display function

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

    gobabygo(newJobObject);
  });

  function gobabygo(x) {
    $.post("/api/jobs", x);
    document.location.reload(true);
  }

  $(".toggle").on("click", function() {
    var tclass = $(this).attr("class");
  });

  // MARK A JOB DONE THROUGH CUTTING OR OK TO CLOSE

  function updateDoneCutting(x) {
    $.ajax({
      method: "PUT",
      url: "/api/jobs",
      data: x
    });
    location.reload();
  }

  $(document).on("click", ".btn", function() {
    console.log(this.id);
    if ($(this).attr("status") === "disabled") {
      console.log("this butting is disabled fuck face");
    } else if ($(this).attr("case") === "done") {
      console.log("i can do something");
      $(this).removeClass("btn-success");
      $(this).addClass("btn-danger disabled");
      $(this).attr("status", "disabled");
      $(this).text("✓");
      var q = confirm("Are you sure this is done through cutting?");
      if (q == true) {
        var updateJobLine = {};
        updateJobLine.id = this.id;
        updateJobLine.doneCutting = "X";
        updateDoneCutting(updateJobLine);
        // do the updating function
      } else {
        // dont do anything
      }
    } else if ($(this).attr("case") === "ok") {
      $(this).removeClass("btn-success");
      $(this).addClass("btn-danger disabled");
      $(this).attr("status", "disabled");
      $(this).text("✓");
      var r = confirm("Are you sure this is ok to close?");
      if (r == true) {
        var updateJobLine = {};
        updateJobLine.id = this.id;
        updateJobLine.oktoClose = "X";
        updateDoneCutting(updateJobLine);
        // do the updating function
      } else {
        // dont do anything
      }
    } else if ($(this).attr("case") === "close") {
      $(this).removeClass("btn-success");
      $(this).css("visibility", "hidden");
      var s = confirm("Are you sure you want to close this job?");
      if (s == true) {
        var updateJobLine = {};
        updateJobLine.id = this.id;
        updateJobLine.closedDate = new Date();
        updateDoneCutting(updateJobLine);
      }
    }
  });
});
