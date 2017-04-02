document.addEventListener("DOMContentLoaded", function (event) {

  function loadAssets() {
    $.material.init();
  };

  $('.dropdown').on('click', function () {
    $(this).toggleClass('open');
    $(this).find('.dropdown-toggle').each( function () {
      $(this).on('click', function (event) {
        event.preventDefault();
      });
    });
  });

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
        window.id = parseInt(this.dataset.id);
        window.type = this.dataset.type;
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

    // Meta Information
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

    // Text Centred
    var textCentredFormEl = $('.js-TextCentred')[0];

    if (typeof textCentredFormEl != "undefined") {
      for (var i = 0; i < Object.keys(items).length; i++) {
        var item = items[i];
        if (typeof item["textcentred"] != "undefined") {
          if (window.id == item["textcentred"]["id"]) {
            item = item["textcentred"];
            // console.log(item); // uncomment this to see the item
            if (typeof item["snippets"] != "undefined") {
              for (j = 0; j < item["snippets"].length; j++) {
                var snippet = item["snippets"][j];
                if (typeof snippet["text"] != "undefined") {
                  function populateText() {
                    var textContent = snippet["text"],
                        textEl = document.createElement('div'),
                        textBox = "/editor/fragment/snippettext",
                        timestamp = Date.now();
                    $(textEl).load(textBox, function( response, status, xhr ) {
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
                  function populateImage() {
                    // console.log(Object.keys(snippet), snippet);
                    var imageEl = document.createElement('div'),
                        imageBox = "/editor/fragment/snippetimage",
                        timestamp = Date.now(),
                        thisItem = {};
                    for (key in snippet) {
                      thisItem[key] = snippet[key];
                    }
                    $(imageEl).load(imageBox, function( response, status, xhr ) {
                      if ( status !== "error" ) {
                        $(this).find('input').each( function () {
                          if ($(this).attr('type') == "radio") {
                            var tmpRadioName = "radio" + timestamp;
                            $(this).attr('name', tmpRadioName);
                            for (key in thisItem) {
                              if ($(this).val() == thisItem[key]) {
                                $(this).parent().parent().find('input').each( function () {
                                  if ($(this).attr('type') == 'radio') {
                                    $(this).attr('checked', false);
                                  }
                                });
                                $(this).attr('checked', true).click();
                              }
                            }
                          } else {
                            var tmpName = "text" + timestamp;
                            for (key in thisItem) {
                              if ($(this).attr('name') == key) {
                                $(this).val(thisItem[key]);
                              }
                            }
                          }
                        });
                      }
                    });
                    $(imageEl).appendTo('.js-ContentDynamic');
                  }
                  populateImage();
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

    // Video Background
    var videoBackgroundEl = $('.js-VideoBackground')[0];

    if (typeof videoBackgroundEl != "undefined") {
      for (var i = 0; i < Object.keys(items).length; i++) {
        var item = items[i];
        if (typeof item["videobackground"] != "undefined") {
          if (window.id == item["videobackground"]["id"]) {
            item = item["videobackground"];
            // console.log(item); // uncomment this to see the item
            $('fieldset').each( function () {
              if ($(this).hasClass('js-VideoSources')) {
                $(this).find('input, textarea').each(function () {
                  var name = this.name;
                  for (key in item["video"]) {
                    if (name == key) {
                      $(this).val(item["video"][key]);
                    }
                  }
                });
              } else if ($(this).hasClass('js-PosterImage')) {
                $(this).find('input, textarea').each(function () {
                  var name = this.name;
                  for (key in item["image"]) {
                    if (name == key) {
                      $(this).val(item["image"][key]);
                    }
                  }
                });
              } else {
                $(this).find('input, textarea').each(function () {
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
            });
          }
        }
      }
    }

    // Image Background
    var imageBackgroundEl = $('.js-ImageBackground')[0];

    if (typeof imageBackgroundEl != "undefined") {
      for (var i = 0; i < Object.keys(items).length; i++) {
        var item = items[i];
        if (typeof item["imagebackground"] != "undefined") {
          if (window.id == item["imagebackground"]["id"]) {
            item = item["imagebackground"];
            // console.log(item); // uncomment this to see the item
            $('fieldset').each( function () {
              if ($(this).hasClass('js-ImageSources')) {
                $(this).find('input').each( function () {
                  for (key in item["image"]) {
                    if ($(this).attr('name') == key) {
                      $(this).val(item["image"][key]);
                    }
                  }
                });
              } else {
                $(this).find('input, textarea').each( function () {
                  for (key in item) {
                    if ($(this)[0].tagName.toLowerCase() == "input") {
                      if ($(this).attr('type') == "checkbox") {
                        if (item["format"][$(this).attr('name')] === true) {
                          $(this).attr('checked', true);
                        } else {
                          $(this).attr('checked', false);
                        }
                      } else if ($(this).attr('name') == key) {
                        $(this).val(item[key]);
                      }
                    } else {
                      if ($(this).attr('name') == key) {
                        $(this).val(item[key]);
                      }
                    }
                  }
                });
              }
            })
          }
        }
      }
    }

    // Slideshow Horizontal
    var slideshowHorizontalEl = $('.js-SlideshowHorizontal')[0];

    if (typeof slideshowHorizontalEl != "undefined") {
      for (var i = 0; i < Object.keys(items).length; i++) {
        var item = items[i];
        if (typeof item["slideshowhorizontal"] != "undefined") {
          if (window.id == item["slideshowhorizontal"]["id"]) {
            if (typeof item["slideshowhorizontal"]["images"] != "undefined") {
              var images = item["slideshowhorizontal"]["images"];
              for (j = 0; j < images.length; j++) {
                var image = images[j];
                // console.log(image);
                function populateImage() {
                  // console.log(Object.keys(snippet), snippet);
                  var imageEl = document.createElement('div'),
                      imageBox = "/editor/fragment/slide",
                      timestamp = Date.now(),
                      thisItem = {};
                  for (key in image) {
                    thisItem[key] = image[key];
                  }
                  $(imageEl).load(imageBox, function( response, status, xhr ) {
                    if ( status !== "error" ) {
                      $(this).find('input').each( function () {
                        var tmpName = "text" + timestamp;
                        for (key in thisItem) {
                          if ($(this).attr('name') == key) {
                            $(this).val(thisItem[key]);
                          }
                        }
                      });
                    }
                  });
                  $(imageEl).appendTo('.js-ContentDynamic');
                }
                populateImage();
              }
            }
            addAssets();
            $('input, textarea').each(function () {
              var name = this.name;

              // console.log(item);
              for (key in item) {
                var thisItem = item[key];
                if (this.tagName.toLowerCase() == "input") {
                  if (this.type == "checkbox" && this.name == name) {
                    if (this.checked == true) {
                      this.checked = false;
                      if (thisItem["format"][name] == true) {
                        this.checked = true;
                      }
                    }
                  } else {
                    this.value = thisItem[name];
                  }
                } else {
                  this.value = thisItem[name];
                }
              }
            });
          }
        }
      }
    }
  };

  function addAssets() {
    // Add Text Block
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
    // Add Image Block
    $('.js-AddImage').bind('click', function (event) {
      event.preventDefault();
      var timestamp = Date.now(),
          imagebox = "/editor/fragment/snippetimage",
          imageEl = document.createElement('div');
      $(imageEl).load(imagebox, function ( response, status, xhr ) {
        if ( status !== "error" ) {
          var tmpName = "src" + timestamp;
          var tmpTitleName = "title" + timestamp;
          var tmpAlignmentName = "alignment" + timestamp;
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
            if ($(this).attr('name') == "title") {
              var src = $(this);
              $(src).attr('name', tmpTitleName);
              $(src).attr('id', tmpTitleName);
              $(src).focus();
            }
            if ($(this).attr('name') == "alignment") {
              var radio = $(this);
              $(radio).attr('name', tmpAlignmentName);
              $(radio).attr('id', tmpAlignmentName);
            }
            if ($(this).attr('name') == "src") {
              var src = $(this);
              $(src).attr('name', tmpName);
              $(src).attr('id', tmpName);
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
    $('.js-AddSlide').bind('click', function (event) {
      event.preventDefault();
      var timestamp = Date.now(),
          imagebox = "/editor/fragment/slide",
          imageEl = document.createElement('div');
      $(imageEl).load(imagebox, function ( response, status, xhr ) {
        if ( status !== "error" ) {
          var tmpName = "src" + timestamp;
          var tmpTitleName = "title" + timestamp;
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
            if ($(this).attr('name') == "title") {
              var src = $(this);
              $(src).attr('name', tmpTitleName);
              $(src).attr('id', tmpTitleName);
              $(src).focus();
            }
            if ($(this).attr('name') == "src") {
              var src = $(this);
              $(src).attr('name', tmpName);
              $(src).attr('id', tmpName);
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

    var type = window.type,
        postData = {},
        snippets = [],
        snippetImage = [],
        slides = [],
        slideImage = [],
        posterImage = {};
      var i = 0;
      postData[type] = {};
      if (window.type != "meta") {
        postData[type]["id"] = window.id;
      }
      $('fieldset').each( function () {
        if ($(this).hasClass('js-SnippetText')) {
          $(this).find('input, textarea').each( function () {
            snippets.push(this.value);
          });
        } else if ($(this).hasClass('js-SnippetImage')) {
          $(this).find('input').each( function () {
            if ((this.type == "radio") && (this.checked == true)) {
              snippetImage.push(this.dataset.name + ":" + this.value);
            }
            if (this.type == "text") {
              snippetImage.push(this.dataset.name + ": " + this.value);
            }
          });
          snippets.push(snippetImage);
          snippetImage = [];
        } else if ($(this).hasClass('js-Slides')) {
          $(this).find('input').each( function () {
            console.log($(this)[0]);
            slideImage.push(this.dataset.name + ": " + this.value);
          });
          slides.push(slideImage);
          slideImage = [];
        } else if ($(this).hasClass('js-VideoSources')) {
          postData[type]["video"] = {};
          $(this).find('input').each( function () {
            postData[type]["video"][this.dataset.name] = this.value;
          });
        } else if ($(this).hasClass('js-PosterImage')) {
          postData[type]["image"] = {};
          $(this).find('input').each( function () {
            postData[type]["image"][this.dataset.name] = this.value;
          });
        } else if ($(this).hasClass('js-Format')) {
          postData[type]["format"] = {};
          $(this).find('input').each( function () {
            postData[type]["format"][this.dataset.name] = this.checked;
          });
        } else if ($(this).hasClass('js-ImageSources')) {
          postData[type]["image"] = {}
          $(this).find('input').each( function () {
            postData[type]["image"][this.dataset.name] = this.value;
          });
        } else {
          $(this).find('input, textarea').each( function () {
            if (this.type == "checkbox") {
              postData[type][this.dataset.name] = this.checked;
            }
            if ((this.type == "text") || (this.type == "textarea")) {
              postData[type][this.dataset.name] = this.value;
            }
          });
        }
      });

      if (slides.length > 0) {
        postData[type]["images"] = [];
        for (slideImage in slides) {
          var imageAttr = {};
          for (var i = 0; i < slides[slideImage].length; i++) {
            var key = slides[slideImage][i].split(":")[0];
            if (slides[slideImage][i].split(":").length > 2) {
              var value = slides[slideImage][i].split(":")[1] + ":" + slides[slideImage][i].split(":")[2];
            } else {
              var value = slides[slideImage][i].split(":")[1];
            }
            imageAttr[key] = value;
          }
          postData[type]["images"].push(imageAttr);
        }
      }

      if (snippets.length > 0) {
        postData[type]["snippets"] = [];
        for (snippet in snippets) {
          if (typeof snippets[snippet] == "string") {
            postData[type]["snippets"].push({"text": snippets[snippet]});
          } else {
            var imageAttr = {};
            for (var i = 0; i < snippets[snippet].length; i++) {
              var key = snippets[snippet][i].split(":")[0];
              if (snippets[snippet][i].split(":").length > 2) {
                var value = snippets[snippet][i].split(":")[1] + ":" + snippets[snippet][i].split(":")[2];
              } else {
                var value = snippets[snippet][i].split(":")[1];
              }
              imageAttr[key] = value;
            }
            postData[type]["snippets"].push(imageAttr);
          }
        }
      }

      // console.log(postData);

      $.ajax({
        url: '/update',
        type: 'POST',
        data: postData,
        success: postSuccessHandler(postData)
      });

    };

  function postSuccessHandler(postData) {
    console.log("Posted data: ", postData);
  }

});
