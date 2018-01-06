function insertBackgroundImage($el, src, active=false) {
  const styles = {
    'background-image': `url(${src})`,
    position: active ? 'fixed' : 'absolute'
  };
  $el.find('.bg-image').css(styles);
}

module.exports = {
  insertBackgroundImage
};
