var $ = jQuery;
$(function() {
    $('#btn-refresh-preview').on('click', function() {
        $('#preview').attr( 'src', function ( i, val ) { return val; });
    });
    $('#btn-download').on('click', function() {
        window.open('/editor/download');
    });

    // Preview Refresh Event Listener
    $(document).on('refresh-preview', function() {
        $('#preview').attr( 'src', function ( i, val ) { return val; });
    });

    // on filename select
    $('#story-selector').on('change', function() {
        const filename = this.value;
        console.log('updating storyboard preference', filename);
        $.post('/preferences/storyboard', {filename: filename}, function(response) {
            console.log('storyboard preference has been updated', response);
            $('#preview').attr( 'src', function ( i, val ) { return val; });
            $('#editor').attr( 'src', function ( i, val ) { return val; });
        });
    });
})