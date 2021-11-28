function imageLoadPromise(src) {
  const loadPromise = new Promise((resolve) => {
    const image = new Image()

    image.onload = () => {
      resolve()
    }

    image.onerror = () => {
      resolve()
    }

    image.src = src
  })

  return loadPromise
}

function insertBackgroundImage($el, src) {
  return imageLoadPromise(src).then(() => {
    const $bgImage = $el.find('.bg-image')
    if ($bgImage.length) {
      const styles = {
        'background-image': `url(${src})`,
      }
      $bgImage.css(styles)
      return false
    } else {
      $el.find('img').get(0).src = src
      return true
    }
  })
}

module.exports = {
  insertBackgroundImage,
  imageLoadPromise,
}
