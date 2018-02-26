$(function() {
    $('#save').on('click', function (e) {
        var action = $('#frm-item-editor').attr('action');

        e.preventDefault();
        e.stopPropagation();
        // TODO: refactor this to save to pouchDB instead of making POST requests
        // IMPORTANT: unless preview.html is refactored to use pouchDB for reads, every editor update
        //  will have to make a POST to the server to save the new data to the filesystem.
        $.post(action, $('#frm-item-editor').serialize(), function(data) {
            // TODO: fix data in routes/editor.js, as it will deliver an html page render
            // it only needs to deliver a status and/or update errors
            $('#item-editor').html("Item Updated.");
            parent.$(parent.document).trigger('refresh-preview');
        });
    });
})