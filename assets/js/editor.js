document.addEventListener("DOMContentLoaded", function (event) {

  var url = 'data/storyboard.json';

  var saveData = function(meta, items) {

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
        url: '/update',
        dataType: 'json',
        contentType: 'application/json; charset=UTF-8',
        data: JSON.stringify(data),
        type: 'POST',
        complete: function() {
          console.log(data);
        }
      });
    });

  };

});
