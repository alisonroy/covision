$.ajax({
  type: "POST",
  url: "https://api.rootnet.in/covid19-in/contacts",
  datatype: "html",
  data: {},
  success: function (response) {
    // var parsedResponse = JSON.parse(response);
    var card = document.getElementById("card");
    for (var i in response["data"]["contacts"]["regional"]) {
      var div = document.createElement("div");
      div.classList.add("card");
      var location = document.createTextNode(
        response["data"]["contacts"]["regional"][i].loc
      );
      var divpho = document.createElement("div");
      var anchor = document.createElement("a");
      anchor.href = "tel:" + response["data"]["contacts"]["regional"][i].number;
      anchor.classList.add("phone-card");
      var number = document.createTextNode(
        response["data"]["contacts"]["regional"][i].number
      );
      anchor.appendChild(number);
      divpho.appendChild(anchor);
      div.appendChild(location);
      div.appendChild(divpho);
      card.appendChild(div);
    }
  },
  error: function (error) {},
});
