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
    var state = new Array();
    for (var i in response["data"]["medicalColleges"]) {
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
      $("#listofstate").on("change", function (e) {
        var ownerlist = document.getElementById("listofowner");
        ownerlist.innerHTML = "";
        var ownarray = new Array();
        for (var i in response["data"]["medicalColleges"]) {
          var owner = response["data"]["medicalColleges"][i].ownership;
          if (ownarray.includes(owner)) {
          } else {
            if (response["data"]["medicalColleges"][i].state == this.value) {
              ownarray.push(owner);
              var option = document.createElement("option");
              var owTextNode = document.createTextNode(owner);
              option.value = owner;
              option.appendChild(owTextNode);
              ownerlist.appendChild(option);
            }
          }
        }
      });
    });
    $(function () {
      $("#view-col").on("click", function (e) {
        e.preventDefault();
        var stateval = $("#listofstate").val();
        var ownerval = $("#listofowner").val();
        var medtable = document.getElementById("medtable");
        medtable.innerHTML = "";

        var rowhead = document.createElement("tr");
        rowhead.classList.add("table-header", "hos-header");
        var statehead = document.createElement("td");
        var namehead = document.createElement("td");
        var cityhead = document.createElement("td");
        var ownerhead = document.createElement("td");
        var capacityhead = document.createElement("td");
        var bedshead = document.createElement("td");
        var stateheadTextNode = document.createTextNode("State Name");
        statehead.appendChild(stateheadTextNode);
        var nameheadTextNode = document.createTextNode("Name");
        namehead.appendChild(nameheadTextNode);
        var cityheadTextNode = document.createTextNode("City");
        cityhead.appendChild(cityheadTextNode);
        var ownerheadTextNode = document.createTextNode("Owner Type");
        ownerhead.appendChild(ownerheadTextNode);
        var capacityheadTextNode = document.createTextNode(
          "Admission Capacity"
        );
        capacityhead.appendChild(capacityheadTextNode);
        var bedheadTextNode = document.createTextNode("Hospital Beds");
        bedshead.appendChild(bedheadTextNode);

        rowhead.appendChild(statehead);
        rowhead.appendChild(namehead);
        rowhead.appendChild(cityhead);
        rowhead.appendChild(ownerhead);
        rowhead.appendChild(capacityhead);
        rowhead.appendChild(bedshead);
        medtable.appendChild(rowhead);

        for (var i in response["data"]["medicalColleges"]) {
          if (
            response["data"]["medicalColleges"][i].state == stateval &&
            response["data"]["medicalColleges"][i].ownership == ownerval
          ) {
            var row = document.createElement("tr");
            var state = document.createElement("td");
            var name = document.createElement("td");
            var city = document.createElement("td");
            var ownership = document.createElement("td");
            var capacity = document.createElement("td");
            var beds = document.createElement("td");
            var stateTextNode = document.createTextNode(
              response["data"]["medicalColleges"][i].state
            );
            state.appendChild(stateTextNode);
            var nameTextNode = document.createTextNode(
              response["data"]["medicalColleges"][i].name
            );
            name.appendChild(nameTextNode);
            var cityTextNode = document.createTextNode(
              response["data"]["medicalColleges"][i].city
            );
            city.appendChild(cityTextNode);
            var ownerTextNode = document.createTextNode(
              response["data"]["medicalColleges"][i].ownership
            );
            ownership.appendChild(ownerTextNode);
            var capacityTextNode = document.createTextNode(
              response["data"]["medicalColleges"][i].admissionCapacity
            );
            capacity.appendChild(capacityTextNode);
            var bedTextNode = document.createTextNode(
              response["data"]["medicalColleges"][i].hospitalBeds
            );
            beds.appendChild(bedTextNode);

            row.appendChild(state);
            row.appendChild(name);
            row.appendChild(city);
            row.appendChild(ownership);
            row.appendChild(capacity);
            row.appendChild(beds);
            medtable.appendChild(row);
          }
        }
        document.getElementById("medtable").classList.remove("d-none");
      });
    });
  },
  error: function (error) {},
});
