$.ajax({
  type: "POST",
  url: "https://api.rootnet.in/covid19-in/notifications",
  datatype: "html",
  data: {},
  success: function (response) {
    // ans = [];
    // response["data"]["notifications"][1].title.replace(
    //   /(\d{2}\/\d{2}\/\d{4}) |(.+$)/g,
    //   (_, date, text) => {
    //     ans.push(date || text);
    //   }
    // );

    var card = document.getElementById("card");
    for (var i in response["data"]["notifications"]) {
      var div = document.createElement("div");
      div.classList.add("card", "card-advisories", "col-12");
      var title = document.createTextNode(
        response["data"]["notifications"][i].title
      );
      var link = document.createElement("div");
      var anchor = document.createElement("a");
      anchor.href = response["data"]["notifications"][i].link;
      anchor.classList.add("link-card");
      var linkTextNode = document.createTextNode(
        response["data"]["notifications"][i].link
      );
      anchor.appendChild(linkTextNode);
      link.appendChild(anchor);
      div.appendChild(title);
      div.appendChild(link);
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
