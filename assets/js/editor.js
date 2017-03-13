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

    var save = document.getElementById('save');
    var data = {"meta":{}};

    save.addEventListener('click', function (e){
      e.preventDefault();
      $('input, textarea').each(function(){
        if (this.tagName == "textarea") {
          data["meta"][this.id] = this.innerText;
        } else {
          data["meta"][this.id] = this.value;
        }
      });
      $.ajax({
        url: url,
        dataType: 'json',
        contentType: 'application/json; charset=UTF-8',
        data: data,
        type: 'POST',
        complete: function() {
          console.log(data);
        }
      });
      // console.log("This is where you'd match the object you're editing to the correct json object and overwrite it");
    });

  };

});
