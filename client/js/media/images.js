function insertBackgroundImage($el, src, active=false) {
  const styles = {
    'background-image': `url(${src})`,
    position: active ? 'fixed' : ''
  };
  $el.find('.bg-image').css(styles);
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
  fixBackgroundImage,
  unfixBackgroundImage
};
