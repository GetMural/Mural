const ipcRenderer = require("electron").ipcRenderer;

ipcRenderer.on("story-download", () => {
  window.open(
    "/editor/buyusbeer",
    "Download your story",
    "width=620,height=700"
  );
});

// Preview Refresh Event Listener
$(document).on("refresh-preview", function () {
  $("#preview").attr("src", function (i, val) {
    return val;
  });
});

ipcRenderer.on("STORY_OPEN", (event, args) => {
  $("#preview").attr("src", function (i, val) {
    return val;
  });
  $("#editor").attr("src", function (i, val) {
    return val;
  });
});

ipcRenderer.on("story-copy", () => {
  vex.dialog.open({
    message: "Enter the new story name:",
    input:
      '<input name="filename" type="text" placeholder="Story Name" required />',
    buttons: [
      $.extend({}, vex.dialog.buttons.YES, { text: "Save" }),
      $.extend({}, vex.dialog.buttons.NO, { text: "Cancel" }),
    ],
    callback: function (data) {
      if (!data) {
        console.log("Cancelled");
      } else {
        console.log("Filename", data.filename);
        $.post("/copy-story", { filename: data.filename }, function (response) {
          console.log("story has been copied", response);
          location.reload(true);
        });
      }
    },
  });
});

ipcRenderer.on("story-delete", () => {
  vex.dialog.confirm({
    message: "Are you absolutely sure you want to delete the current story?",
    callback: function (value) {
      if (value) {
        $.ajax({
          url: "/delete-story",
          type: "DELETE",
          success: function (response) {
            if (response.error) {
              alert(response.error);
            }
            location.reload(true);
          },
        });
      } else {
        console.log("Delete cancelled.");
      }
    },
  });
});

ipcRenderer.on("preview-phone", () => {
  $("#editor").width("calc(100vw - 375px)");
  $("#preview").width("375px").height("667px");
  $("#preview").attr("src", function (i, val) {
    return val;
  });
});

ipcRenderer.on("preview-tablet", () => {
  $("#editor").width("calc(100vw - 600px)");
  $("#preview").width("600px").height("800px");
  $("#preview").attr("src", function (i, val) {
    return val;
  });
});

ipcRenderer.on("preview-desktop", () => {
  $("#editor").width("0px");
  $("#preview").width("100vw").height("100vh");
  $("#preview").attr("src", function (i, val) {
    return val;
  });
});
