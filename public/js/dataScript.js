$(document).ready(function() {
  var sales = [];
  var thisWeek = [];
  var nextWeek = [];
  var thirdWeek = [];

  Date.prototype.getWeek = function() {
    var onejan = new Date(this.getFullYear(), 0, 1);
    var today = new Date(this.getFullYear(), this.getMonth(), this.getDate());
    var dayOfYear = (today - onejan + 1) / 86400000;
    return Math.ceil(dayOfYear / 7);
  };

  $.get("/api/orders", show)

  function show(data) {
    // console.log(data)
    for (var i = 0; i < data.length; i++) {
      if (data[i].OrderNo >=14000) {
        var o = {};
        o.order = data[i].OrderNo;
        o.value = data[i].SellingPrice
        sales.push(o)
      }
    }
    console.log(sales)
  }

  $.get("/api/sales", display);
  
  function display(data) {
    //console.log(data)
    // console.log(data)
    //console.log(data[501].ScheduleShip_Date);

    // jQuery(function() {
    //     var today = new Date(data[501].ScheduleShip_Date);
    //     var weekno = today.getWeek();
    //     console.log(weekno)
    // })

    for (var i = 0; i < data.length; i++) {
      var runDate = new Date(data[i].ScheduleShip_Date);
      var today = new Date();
      var runWeek = runDate.getWeek();
      var weekno = today.getWeek();
      if (runWeek === weekno) {
        var qty = data[i].RequestedQuantity;
        thisWeek.push(qty);
      }
      if (runWeek === weekno + 1) {
        var qty = data[i].RequestedQuantity;
        nextWeek.push(qty);
      }
      if (runWeek === weekno + 2) {
        var qty = data[i].RequestedQuantity;
        thirdWeek.push(qty);
      }

      var x = thisWeek.reduce((a, b) => a + b, 0);
      var y = nextWeek.reduce((a, b) => a + b, 0);
      var z = thirdWeek.reduce((a, b) => a + b, 0);
    }
    //console.log(x);
    //console.log(y);
    //console.log(z);

    function formatNumber(num) {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }

    //console.log(formatNumber(x))
    //console.log(formatNumber(y))
    //console.log(formatNumber(z))

    var xx = $("<h1>")
    xx.append("Cartons this week: " + formatNumber(x))
    var yy = $("<h1>")
    yy.append("Cartons next week: " + formatNumber(y))
    var zz = $("<h1>")
    zz.append("Cartons the following week: " + formatNumber(z))
    $("#target").append(xx,yy,zz)
  }
});
