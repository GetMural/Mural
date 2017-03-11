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

    var elDOM = [];

    for(var element in elements) {
      var el = document.getElementById(elements[element]);
      elDOM.push(el);
    };

    for(var data in dataSet) {
      for (var i = 0; i < elDOM.length; i++) {
        if (elDOM[i].id == data) {
          $(elDOM[i]).val(dataSet[data]);
        }
      }
    };
    
  };

});
