$(window).on("load", function () {
  $("#status").delay(700).fadeOut("slow");
  $("#preloader").delay(800).fadeOut("slow");
});
$.ajax({
  type: "POST",
  url: "https://api.rootnet.in/covid19-in/hospitals/beds",
  datatype: "html",
  data: {},
  success: function (response) {
    response["data"]["regional"].sort(function (a, b) {
      return a.state < b.state ? -1 : a.state > b.state ? 1 : 0;
    });
    var table = document.getElementById("hostable");
    for (var i in response["data"]["regional"]) {
      if (response["data"]["regional"][i].state != "INDIA") {
        var row = document.createElement("tr");
        var state = document.createElement("td");
        var rh = document.createElement("td");
        var rb = document.createElement("td");
        var uh = document.createElement("td");
        var ub = document.createElement("td");
        var th = document.createElement("td");
        var tb = document.createElement("td");
        var stateTextNode = document.createTextNode(
          response["data"]["regional"][i].state
        );
        state.appendChild(stateTextNode);
        var rhTextNode = document.createTextNode(
          response["data"]["regional"][i].ruralHospitals
        );
        rh.appendChild(rhTextNode);
        var rbTextNode = document.createTextNode(
          response["data"]["regional"][i].ruralBeds
        );
        rb.appendChild(rbTextNode);
        var uhTextNode = document.createTextNode(
          response["data"]["regional"][i].urbanHospitals
        );
        uh.appendChild(uhTextNode);
        var ubTextNode = document.createTextNode(
          response["data"]["regional"][i].urbanBeds
        );
        ub.appendChild(ubTextNode);
        var thTextNode = document.createTextNode(
          response["data"]["regional"][i].totalHospitals
        );
        th.appendChild(thTextNode);
        var tbTextNode = document.createTextNode(
          response["data"]["regional"][i].totalBeds
        );
        tb.appendChild(tbTextNode);
        row.appendChild(state);
        row.appendChild(rh);
        row.appendChild(rb);
        row.appendChild(uh);
        row.appendChild(ub);
        row.appendChild(th);
        row.appendChild(tb);
        table.appendChild(row);
      }
    }
  },
  error: function (error) {},
});
