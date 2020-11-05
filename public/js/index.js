$(function() {
    $('#btn-download').on('click', function() {
        window.open('/editor/buyusbeer', '', 'width=620,height=700');
    });

    // Preview Refresh Event Listener
    $(document).on('refresh-preview', function() {
        $('#preview').attr( 'src', function ( i, val ) { return val; });
    });

    // on filename select
    $('#story-selector').on('change', function() {
        const filename = this.value;
        $.post('/preferences/storyboard', {filename: filename}, function(response) {
            console.log('storyboard preference has been updated', response);
            $('#preview').attr( 'src', function ( i, val ) { return val; });
            $('#editor').attr( 'src', function ( i, val ) { return val; });
        });
    });

    $('#btn-copy-story').on('click', function() {
        vex.dialog.open({
            message: 'Enter the new story name:',
            input: '<input name="filename" type="text" placeholder="Story Name" required />',
            buttons: [
                $.extend({}, vex.dialog.buttons.YES, { text: 'Save' }),
                $.extend({}, vex.dialog.buttons.NO, { text: 'Cancel' })
            ],
            callback: function (data) {
                if (!data) {
                    console.log('Cancelled');
                } else {
                    console.log('Filename', data.filename);
                    $.post('/copy-story', {filename: data.filename}, function(response) {
                        console.log('story has been copied', response);
                        location.reload(true);
                    });
                }
            }
        })
    });

    $('#btn-delete-story').on('click', function() {
        if ($('#story-selector').val() === 'default.json') {
            vex.dialog.alert('Sorry, you can not delete the default story!')
            return false;
        }
        vex.dialog.confirm({
            message: 'Are you absolutely sure you want to delete the current story?',
            callback: function (value) {
                if (value) {
                    $.ajax({
                        url: '/delete-story',
                        type: 'DELETE',
                        success: function (response) {
                            console.log('Successfully deleted the story.')
                            location.reload(true);
                        }
                    });
                } else {
                    console.log('Delete cancelled.')
                }
            }
        })
    });

    $('#btn-phone').on('click', function() {
        $('#editor').width('calc(100vw - 375px)');
        $('#preview').width('375px').height('667px');
        $('#preview').attr( 'src', function ( i, val ) { return val; });
        $("#preview").get(0).contentWindow.screen.orientation.lock('portrait');
    });

    $('#btn-tablet').on('click', function() {
        $('#editor').width('calc(100vw - 600px)');
        $('#preview').width('600px').height('800px');
        $('#preview').attr( 'src', function ( i, val ) { return val; });
        $("#preview").get(0).contentWindow.screen.orientation.lock('portrait');
    });

    $('#btn-desktop').on('click', function() {
        $('#editor').width('0px');
        $('#preview').width('100vw').height('100vh');
        $('#preview').attr( 'src', function ( i, val ) { return val; });
        $("#preview").get(0).contentWindow.screen.orientation.lock('landscape');
    });
});
