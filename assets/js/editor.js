document.addEventListener("DOMContentLoaded", function (event) {

  function loadMaterial() {
    $.material.init();
  };

  var url = '/data/storyboard.json';

  function loadPages() {
    var nav = document.getElementsByClassName('js-Nav'),
        navItems = document.getElementsByClassName('js-NavLink'),
        bodyElement = document.getElementsByClassName('js-Load');

    for (var i = 0; i < navItems.length; i++) {
      navItems[i].addEventListener('click', function (event) {
        event.preventDefault();
        var navItem = this,
            link = this.href;
        window.id = this.dataset.id;
        $(bodyElement).load(link, function (response, status, xhr) {
          if ( status !== "error" ) {
            loadData();
          }
        });
      });
    };
  };
  loadPages();

  function loadData(meta, items) {


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

  function populateForms(meta, items) {

    // meta information
    var metaFormEl = $('.js-Meta')[0];

    if (typeof metaFormEl != "undefined") {
      $('input, textarea').each(function () {
        var name = this.name;
        for (var i = 0; i < Object.keys(meta).length; i++) {
          var key = Object.keys(meta)[i];
          if (key == name) {
            if (this.tagName.toLowerCase() == "input") {
              this.value = meta[name];
            }
            if (this.tagName.toLowerCase() == "textarea") {
              this.innerText = meta[name];
            }
          }
        }

      });
    }

    // meta information
    var textCentredFormEl = $('.js-TextCentred')[0];

    if (typeof textCentredFormEl != "undefined") {
      for (var i = 0; i < Object.keys(items).length; i++) {
        var item = items[i];
        if (typeof item["textcentred"] != "undefined") {
          if (window.id == item["textcentred"]["id"]) {
            item = item["textcentred"];
            for (j = 0; j < item["snippets"].length; j++) {
              var snippet = item["snippets"][j];
              if (typeof snippet["text"] != "undefined") {
                var textContent = snippet["text"],
                    textEl = document.createElement('div'),
                    textbox = "/editor/fragment/snippettext";
                $(textEl).load(textbox, function( response, status, xhr ) {
                  if ( status !== "error" ) {
                    textarea = this.querySelector('textarea');
                    textarea.value = textContent;
                  }
                });
                $(textEl).appendTo('.js-ContentDynamic');
              } else {
                // must be image - I hate doing it this way though
                for (var n = 0; n < Object.keys(snippet)[n]; n++) {
                  console.log(snippet[n]);
                }
              }
            }
          }
        }
      }

      $('input, textarea').each(function () {
        var name = this.name;
        for (var i = 0; i < Object.keys(item).length; i++) {
          var key = Object.keys(item)[i];
          if (key == name) {
            if (this.tagName.toLowerCase() == "input") {
              this.value = item[name];
            }
            if (this.tagName.toLowerCase() == "textarea") {
              this.innerText = item[name];
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
