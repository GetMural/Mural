function insertBackgroundImage($el, src, active=false) {
  const styles = {
    'background-image': `url(${src})`,
    position: active ? 'fixed' : ''
  };
  $el.find('.bg-image').css(styles);
}

function removeBackgroundImage($el) {
  $el.find('.bg-image').removeAttr('style');
}

function fixBackgroundImage($el) {
  const $container = $el.find('.bg-image');
  $container.css('position', 'fixed');
}

function unfixBackgroundImage($el) {
  const $container = $el.find('.bg-image');
  $container.css('position', '');
}

module.exports = {
  insertBackgroundImage,
  removeBackgroundImage,
  fixBackgroundImage,
  unfixBackgroundImage
};
