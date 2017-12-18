var $ = jQuery;
// handle nav change event
document.addEventListener('DOMContentLoaded', function () {
	$('.js-Nav').on('change', function () {
		var target = $(this).find(':selected');
		var link = target.attr('value');
		var bodyElement = document.getElementsByClassName('js-Load');
		$(bodyElement).load(link);
	});
});

// Drag and Drop
var source;

function isbefore(a, b) {
    if (a.parentNode == b.parentNode) {
        for (var cur = a; cur; cur = cur.previousSibling) {
            if (cur === b) {
                return true;
            }
        }
    }
    return false;
}

function dragenter(e) {
    var targetelem = e.target;
    if (targetelem.nodeName == "a") {
        targetelem = targetelem.parentNode;
    }

    if (isbefore(source, targetelem)) {
        targetelem.parentNode.insertBefore(source, targetelem);
    } else {
        targetelem.parentNode.insertBefore(source, targetelem.nextSibling);
    }
}

function dragstart(e) {
    source = e.target;
    e.dataTransfer.effectAllowed = 'move';
}
