document.addEventListener("DOMContentLoaded", function (event) {

  function loadAssets() {
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
        populateForms(meta, items);
        loadAssets();
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
            if (typeof item["snippets"] != "undefined") {
              for (j = 0; j < item["snippets"].length; j++) {
                var snippet = item["snippets"][j];
                if (typeof snippet["text"] != "undefined") {
                  function populateText() {
                    var textContent = snippet["text"],
                        textEl = document.createElement('div'),
                        textbox = "/editor/fragment/snippettext",
                        timestamp = Date.now();
                    $(textEl).load(textbox, function( response, status, xhr ) {
                      if ( status !== "error" ) {
                        textarea = this.querySelector('textarea');
                        var tmpName = "text" + timestamp;
                        $(this).find('label').attr('for', tmpName);
                        $(textarea).attr('name', tmpName).attr('id', tmpName);
                        textarea.value = textContent;
                      }
                    });
                    $(textEl).appendTo('.js-ContentDynamic');
                  }
                  populateText();
                } else {
                  // must be image - I hate doing it this way though
                  for (var n = 0; n < Object.keys(snippet)[n]; n++) {
                    console.log(snippet[n]);
                  }
                }
              }
            }
            addAssets();
            $('input, textarea').each(function () {
              var name = this.name;
              for (var i = 0; i < Object.keys(item).length; i++) {
                var key = Object.keys(item)[i];
                if (this.tagName.toLowerCase() == "input") {
                  if (this.type == "checkbox" && this.name == name) {
                    if (item[name] == true) {
                      this.checked = true;
                    }
                  } else {
                    this.value = item[name];
                  }
                }
                if (this.tagName.toLowerCase() == "textarea") {
                  this.value = item[name];
                }
              }
            });
          }
        }
      }
    }
  };

  function addAssets() {
    $('.js-AddText').bind('click', function (event) {
      event.preventDefault();
      var timestamp = Date.now();
      var textbox = "/editor/fragment/snippettext",
          textEl = document.createElement('div');
      $(textEl).load(textbox, function ( response, status, xhr ) {
        if ( status !== "error" ) {
          var tmpName = "text" + timestamp;
          $(this).find('label').attr('for', tmpName);
          textarea = this.querySelector('textarea');
          $(textarea).attr('name', tmpName);
          $(textarea).attr('id', tmpName);
          textarea.focus();
        }
      });
      $(textEl).appendTo('.js-ContentDynamic');
    });
    $('.js-AddImage').bind('click', function (event) {
      event.preventDefault();
      var timestamp = Date.now(),
          imagebox = "/editor/fragment/snippetimage",
          imageEl = document.createElement('div');
      $(imageEl).load(imagebox, function ( response, status, xhr ) {
        if ( status !== "error" ) {
          var tmpName = "src" + timestamp;
          var tmpCreditsName = "credits" + timestamp;
          $(this).find('label').each( function () {
            if ($(this).attr('for') == "src") {
              var forSrc = $(this);
              $(forSrc).attr('for', tmpName);
            }
            if ($(this).attr('for') == "credits") {
              var forCredits = $(this);
              $(forCredits).attr('for', tmpCreditsName);
            }
          });
          $(this).find('input').each( function (){
            if ($(this).attr('name') == "src") {
              var src = $(this);
              $(src).attr('name', tmpName);
              $(src).attr('id', tmpName);
              $(src).focus();
            }
            if ($(this).attr('name') == "credits") {
              var credits = $(this);
              $(credits).attr('name', tmpCreditsName);
              $(credits).attr('id', tmpCreditsName);
            }
          });
        }
      });
      $(imageEl).appendTo('.js-ContentDynamic');
    });
  }

  function saveData() {

    var data = {};

      var self = this;
      $('input, textarea').each( function (){
        if (this.type == "checkbox") {
          data[this.name] = this.checked;
        } else {
          data[this.name] = this.value;
        }
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
