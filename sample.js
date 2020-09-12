$.ajax({
  type: "POST",
  url: "https://api.rootnet.in/covid19-in/contacts",
  datatype: "html",
  data: {},
  success: function (response) {
    // var parsedResponse = JSON.parse(response);
    console.log(response["data"]);
  },
  error: function (error) {},
});
