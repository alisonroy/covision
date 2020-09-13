$(window).on("load", function () {
  $("#status").delay(700).fadeOut("slow");
  $("#preloader").delay(800).fadeOut("slow");
});
$.ajax({
  type: "POST",
  url: "https://api.rootnet.in/covid19-in/hospitals/medical-colleges",
  datatype: "html",
  data: {},
  success: function (response) {
    response["data"]["medicalColleges"].sort(function (a, b) {
      return a.state < b.state ? -1 : a.state > b.state ? 1 : 0;
    });
    var statelist = document.getElementById("listofstate");
    var ownerlist = document.getElementById("listofowner");
    var owtype = new Array();
    var state = new Array();
    for (var i in response["data"]["medicalColleges"]) {
      var owner = response["data"]["medicalColleges"][i].ownership;
      if (owtype.includes(owner)) {
      } else {
        owtype.push(owner);
        var option = document.createElement("option");
        var owTextNode = document.createTextNode(owner);
        option.value = owner;
        option.appendChild(owTextNode);
        ownerlist.appendChild(option);
      }
      var st = response["data"]["medicalColleges"][i].state;
      if (state.includes(st)) {
      } else {
        state.push(st);
        var option = document.createElement("option");
        var stTextNode = document.createTextNode(st);
        option.value = st;
        option.appendChild(stTextNode);
        statelist.appendChild(option);
      }
    }
    $(function () {
      $("#view-col").on("click", function (e) {
        e.preventDefault();
        document.getElementById("medview").classList.add("d-none");
        document.getElementById("medtable").classList.remove("d-none");
        document.getElementById("medtable").classList.remove("d-block");
      });
    });

    // var table = document.getElementById("hostable");
    // for (var i in response["data"]["regional"]) {
    //   if (response["data"]["regional"][i].state != "INDIA") {
    //     var row = document.createElement("tr");
    //     var state = document.createElement("td");
    //     var rh = document.createElement("td");
    //     var rb = document.createElement("td");
    //     var uh = document.createElement("td");
    //     var ub = document.createElement("td");
    //     var th = document.createElement("td");
    //     var stateTextNode = document.createTextNode(
    //       response["data"]["regional"][i].state
    //     );
    //     state.appendChild(stateTextNode);
    //     var rhTextNode = document.createTextNode(
    //       response["data"]["regional"][i].ruralHospitals
    //     );
    //     rh.appendChild(rhTextNode);
    //     var rbTextNode = document.createTextNode(
    //       response["data"]["regional"][i].ruralBeds
    //     );
    //     rb.appendChild(rbTextNode);
    //     var uhTextNode = document.createTextNode(
    //       response["data"]["regional"][i].urbanHospitals
    //     );
    //     uh.appendChild(uhTextNode);
    //     var ubTextNode = document.createTextNode(
    //       response["data"]["regional"][i].urbanBeds
    //     );
    //     ub.appendChild(ubTextNode);
    //     var thTextNode = document.createTextNode(
    //       response["data"]["regional"][i].totalHospitals
    //     );
    //     th.appendChild(thTextNode);
    //     var tbTextNode = document.createTextNode(
    //       response["data"]["regional"][i].totalBeds
    //     );
    //     tb.appendChild(tbTextNode);
    //     row.appendChild(state);
    //     row.appendChild(rh);
    //     row.appendChild(rb);
    //     row.appendChild(uh);
    //     row.appendChild(ub);
    //     row.appendChild(th);
    //     row.appendChild(tb);
    //     table.appendChild(row);
    //   }
    // }
  },
  error: function (error) {},
});
