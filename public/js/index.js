var $ = jQuery;
$(function() {
    $('#btn-refresh-preview').on('click', function() {
        console.log("Refreshing Preview");
        $('#preview').attr( 'src', function ( i, val ) { return val; });
    });
    $('#btn-download').on('click', function() {
        window.open('/editor/download');
    });

    // Preview Refresh Event Listener
    $(document).on('refresh-preview', function() {
        console.log("Refreshing Preview");
        $('#preview').attr( 'src', function ( i, val ) { return val; });
    });
})