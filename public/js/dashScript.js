$(document).ready(function() {
  // NAVBAR PERSONALIZATION
  $.get("/api/user_data", showName);
  function showName(data) {
    $("#nameTarget").append("Welcome, " + data.name);
  }

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

    for (var i = 3150; i < data.length; i++) {
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
      if (data[i].flute === "B") { // Checking flute profile and assigning class based on it
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
        blankrow.addClass("newJob")
      }
      var coating = $("<td>"); // The type of coating, mainly to distinguish UV coating
      var done = $("<td>"); // If the job is done through cutting
      var close = $("<td>"); // If the job is ok to close
      var closeby = $("<td>"); // Who closed the job
      var closedate = $("<td>"); // The date the job was closed
      var aby = $("<td>"); // Who analyzed the job
      var comments = $("<td>"); // Any comments for this particular job
      // var needsa = $("<td>"); // If the job still needs to be analyzed

      job.append(data[i].jobNo);
      cust.append(data[i].customer);
      var createdTime = data[i].createdDate;
      var createdDate = moment(createdTime).format("MM-DD-YY");
      created.append(createdDate);
      createdby.append(data[i].createdBy);
      csr.append(data[i].csr);
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
      done.append(data[i].doneCutting);
      close.append(data[i].oktoClose);
      closeby.append(data[i].closedby);
      var closedTime = data[i].closedDate;
      var closedDate = moment(closedTime).format("MM-DD-YY");
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
        aby
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
        // "<th>Comments</th>"+
        "</tr></thead>"
    );

    $("#jobTarget").prepend(headrow);
  } // End of display function
});
