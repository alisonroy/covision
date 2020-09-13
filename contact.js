$.ajax({
  type: "POST",
  url: "https://api.rootnet.in/covid19-in/contacts",
  datatype: "html",
  data: {},
  success: function (response) {
    response["data"]["contacts"]["regional"].sort(function (a, b) {
      return a.loc < b.loc ? -1 : a.loc > b.loc ? 1 : 0;
    });
    var card = document.getElementById("card");
    for (var i in response["data"]["contacts"]["regional"]) {
      var div = document.createElement("div");
      div.classList.add("card", "card-custom");
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
    var update = document.getElementById("updated");
    var upddiv = document.createElement("div");
    var lastRefreshedTextnode = document.createTextNode(
      "Last Refreshed : " +
        response["lastRefreshed"].replace("T", " ").replace("Z", "")
    );
    var refdiv = document.createElement("div");
    var lastOriginTextnode = document.createTextNode(
      "Last Origin Updated : " +
        response["lastOriginUpdate"].replace("T", " ").replace("Z", "")
    );

    upddiv.appendChild(lastRefreshedTextnode);
    refdiv.appendChild(lastOriginTextnode);
    update.appendChild(upddiv);
    update.appendChild(refdiv);
  },
  error: function (error) {},
});
