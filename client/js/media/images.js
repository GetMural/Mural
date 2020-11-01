function imageLoadPromise(src) {
  const loadPromise = new Promise((resolve) => {
    const image = new Image();

    image.onload = () => {
      resolve();
    }

    image.onerror = () => {
      resolve();
    }

    image.src = src;
  });

  return loadPromise;
}

function insertBackgroundImage($el, src, active=false) {
  return imageLoadPromise(src).then(() => {
    const isFixed = $el.find('.bg-image').not('.no-stick').length && active;
    const styles = {
      'background-image': `url(${src})`,
       position: isFixed ? 'fixed' : ''
    };
    $el.find('.bg-image').css(styles);
  });
}

function fixBackgroundImage($el) {
  const $container = $el.find('.bg-image, .bg-gradient').not('.no-stick');
  $container.css('position', 'fixed');
}

function unfixBackgroundImage($el) {
  const $container = $el.find('.bg-image, .bg-gradient');
  $container.css('position', '');
}

function loadImages($el) {
  const loadPromises = [];
  $el.find('img').each(function () {
    const src = this.dataset.src;
    const loadPromise = imageLoadPromise(src).then(() => {
      this.src = this.dataset.src;
    });

    loadPromises.push(loadPromise);
  });

  return Promise.all(loadPromises);
}

module.exports = {
  insertBackgroundImage,
  fixBackgroundImage,
  unfixBackgroundImage,
  loadImages,
  imageLoadPromise
};
