// Meta Information
function populateForms (meta) {
	var metaFormEl = $('.js-Meta')[0];

	if (typeof metaFormEl !== 'undefined') {
		$('input, textarea').each(function () {
			var name = this.name;
			for (var i = 0; i < Object.keys(meta).length; i++) {
				var key = Object.keys(meta)[i];
				if (key === name) {
					if (this.tagName.toLowerCase() === 'input') {
						this.value = meta[name];
					}
					if (this.tagName.toLowerCase() === 'textarea') {
						this.innerText = meta[name];
					}
				}
			}
		});
	}
};
