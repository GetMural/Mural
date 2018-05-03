function insertBackgroundImage($el, src, active=false) {
  const loadPromise = new Promise((resolve) => {
    const image = new Image();

    image.onload = () => {
      const styles = {
        'background-image': `url(${src})`,
         position: active ? 'fixed' : ''
      };
      $el.find('.bg-image').css(styles);
      resolve();
    }

    image.src = src;
  });

  return loadPromise;
}

function fixBackgroundImage($el) {
  const $container = $el.find('.bg-image');
  $container.css('position', 'fixed');
}

function unfixBackgroundImage($el) {
  const $container = $el.find('.bg-image');
  $container.css('position', '');
}

function loadImages($el) {
  const loadPromises = [];
  $el.find('img').each(function () {
    const loadPromise = new Promise((resolve) => {
      this.onload = () => {
        resolve();
      }
    });

    this.src = this.dataset.src;
    loadPromises.push(loadPromise);
  });

  return Promise.all(loadPromises);
}

module.exports = {
  insertBackgroundImage,
  fixBackgroundImage,
  unfixBackgroundImage,
  loadImages
};
