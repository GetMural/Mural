function insertBackgroundImage($el, src, active=false) {
  const styles = {
    'background-image': `url(${src})`,
    position: active ? 'fixed' : 'absolute'
  };
  $el.find('.bg-image').css(styles);
}

function removeBackgroundImage($el) {
  $el.find('.bg-image').css({});
}

function fixBackgroundImage($el) {
  const $container = $el.find('.bg-image');
  $container.css('position', 'fixed');
}

function unfixBackgroundImage() {
  const $container = $el.find('.bg-image');
  $container.css('position', 'absolute');
}

module.exports = {
  insertBackgroundImage,
  removeBackgroundImage,
  fixBackgroundImage,
  unfixBackgroundImage
};
