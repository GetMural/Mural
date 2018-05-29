document.addEventListener('DOMContentLoaded', function () {

	$('.js-Nav a').on('click', function (e) {
		var link = $(this).attr('href');

		e.preventDefault();
		e.stopPropagation();

		$('#item-editor').load(link);
	});

    var el = document.getElementById('sortable-items');
    var saveButton = document.getElementById('reorder-save');
    saveButton.addEventListener('click', saveStory);

    var currentOrder = [];
    for (let i=0, length = el.children.length; i < length; i++) {
        currentOrder.push(i);
    }

    var updatedList;

    var sortableItems = Sortable.create(el, {
        onUpdate: function (e) {
            // TODO: send new ordered list of items to the server to be saved
            const oldItem = currentOrder.splice(e.oldIndex, 1);
            currentOrder.splice(e.newIndex, 0, oldItem[0]);

            if (isReOrdered(currentOrder)) {
                saveButton.disabled = false;
            } else {
                saveButton.disabled = true;
            }

            updatedList = e.to;
        }
    });

    function isReOrdered(items) {
        let reordered = false;
        for (let i = 0, length = items.length - 1; i < length; i++) {
            if (items[i] > items[i+1]) {
                reordered = true;
                break;
            }
        }

        return reordered
    }

    function saveStory() {
        $.post('/editor/reorder', {order: currentOrder}, function(response) {
            saveButton.disabled = true;

            // need to update ids on client side as well so that further fragment editing works.
            // really needs to be rewritten.

            const listLength = updatedList.children.length;

            for (let i = 0; i < listLength; i++) {
                const li = updatedList.children[i];
                const a = li.children[0];
                const segments = a.pathname.split('/');

                segments.pop();
                segments.push(i);
                a.href = segments.join('/');
            }

            currentOrder = [];
            for (let i=0, length = el.children.length; i < length; i++) {
                currentOrder.push(i);
            }

            parent.$(parent.document).trigger('refresh-preview');
        });
    }

});

parent.$(parent.document).trigger('refresh-preview');
