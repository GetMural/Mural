document.addEventListener("DOMContentLoaded", function (event) {

  var url = 'data/storyboard.json';

  var xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function() {
    if (xhr.readyState == XMLHttpRequest.DONE) {
      var data = JSON.parse(xhr.responseText),
          meta = data["meta"],
          items = data["items"];
      populateFields(meta, items);
    }
  }

  xhr.open('GET', url, true);
  xhr.send(null);

  var populateFields = function(meta, items) {

    var elements = {
      "title": "title",
      "author": "author",
    };

    var dataSet = {
      "title": meta["title"],
      "author": meta["author"]
    };
    
  };

});
