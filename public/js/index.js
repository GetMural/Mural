var $ = jQuery;
$(function() {
    $('#btn-refresh-preview').on('click', function() {
        $('#preview').attr( 'src', function ( i, val ) { return val; });
    });

    $('#btn-download').on('click', function() {
        window.open('/editor/buyusbeer', '', 'width=620,height=480');
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

    $('#btn-copy-story').on('click', function() {
        vex.dialog.open({
            message: 'Enter the new story name:',
            input: '<input name="filename" type="text" placeholder="new_story.json" required />',
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

    $('#btn-tools').on('click', function() {
        $('#btn-tools').toggleClass('collapsed');
        $('#toolbar').toggleClass('collapsed');
        if ($('#editor').width() === 0) {
            $('#editor').width('50vw');
            $('#preview').width('50vw');
        } else {
            $('#editor').width('0vw');
            $('#preview').width('100vw');
        }
    });
})