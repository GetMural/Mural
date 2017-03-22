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
        var save = document.getElementById('save');
        if (typeof save !== "undefined") {
          save.addEventListener('click', function (event){
            event.preventDefault();
            event.stopPropagation();
            saveData();
          });
        }
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
      $('input, textarea').each(function () {
        var id = this.name;
        for (var i = 0; i < Object.keys(meta).length; i++) {
          var key = Object.keys(meta)[i];
          if (key == id) {
            if (this.tagName.toLowerCase() == "input") {
              this.value = meta[id];
            }
            if (this.tagName.toLowerCase() == "textarea") {
              this.innerText = meta[id];
            }
          }
        }

      });
    }

  };

  function saveData() {

    var data = {};

      var self = this;
      $('input, textarea').each(function (){
        data[this.name] = this.value;
      });
      console.log(data);

      $.ajax({
        url: '/update',
        type: 'POST',
        data: data,
        success: postSuccessHandler
      });

    };

  function postSuccessHandler() {
    console.log("Posted data");
  }

});
