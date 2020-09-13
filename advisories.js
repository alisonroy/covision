$.ajax({
  type: "POST",
  url: "https://api.rootnet.in/covid19-in/contacts",
  datatype: "html",
  data: {},
  success: function (response) {
    console.log(response["data"]["contacts"]["regional"]);
  },
  error: function (error) {},
});
