document.addEventListener("DOMContentLoaded", function (event) {

  var loadMaterial = function () {
    $.material.init();
  };

  var url = '/data/storyboard.json';

  var loadPages = function () {
    var nav = document.getElementsByClassName('js-Nav'),
        navItems = document.getElementsByClassName('js-NavLink'),
        bodyElement = document.getElementsByClassName('js-Load');

    for (var i = 0; i < navItems.length; i++) {
      navItems[i].addEventListener('click', function (event) {
        event.preventDefault();
        var navItem = this,
            link = this.href;
        $(bodyElement).load(link, function (response, status, xhr) {
          if ( status !== "error" ) {
            loadData();
          }
        });
      });
    };
  };
  loadPages();

  var loadData = function (meta, items) {

    var XHR = new XMLHttpRequest();

    XHR.onreadystatechange = function () {
      if (XHR.readyState == XMLHttpRequest.DONE) {
        var data = JSON.parse(XHR.responseText),
            meta = data["meta"],
            items = data["items"];
        loadMaterial();
        populateForms(meta, items);
      };
    };
    XHR.open('GET', url, true);
    XHR.send(null);
  };

  var populateForms = function (meta, items) {

    // check for the forms
    // meta information
    var metaFormEl = $('.js-Meta')[0];
    //
    var textcentredFormEl = $('.js-TextCentred')[0];

    if (typeof metaFormEl != "undefined") {

    }

  };

  var saveData = function (meta, items) {

    var save = document.getElementById('save');
    var meta = {"meta":{}};
    var items = {"items":{}};

    save.addEventListener('click', function (event){
      event.preventDefault();
      $('input, textarea').each(function (){
        if (this.tagName == "textarea") {
          data["meta"][this.id] = this.innerText;
        } else {
          data["meta"][this.id] = this.value;
        };
      });
      $.ajax({
        url: '/update',
        dataType: 'json',
        contentType: 'application/json; charset=UTF-8',
        data: JSON.stringify(data),
        type: 'POST',
        complete: function () {
          console.log("posted");
        }
      });
    });

  };

});
