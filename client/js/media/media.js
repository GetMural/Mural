function canPlayThroughPromise(media, srcs) {
  return new Promise(function(resolve, reject) {
    function canPlayThrough() {
      media.removeEventListener('canplaythrough', canPlayThrough);
      media.removeEventListener('loadeddata', loadedMetaData);
      resolve();
    }

    function loadedMetaData() {
      // media is in browser cache
      if (media.readyState > 3) {
        media.removeEventListener('canplaythrough', canPlayThrough);
        media.removeEventListener('loadeddata', loadedMetaData);
        resolve();
      }
    }

    media.addEventListener('canplaythrough', canPlayThrough);
    media.addEventListener('loadeddata', loadedMetaData);

    media.onerror = function(e) {
      media.onerror = null;
      resolve();
    }

    const sources = srcs.filter(src => src.src !== undefined);
    sources.forEach((src, i) => {
      const source = document.createElement('source'); 
      source.type = src.type;
      source.src = src.src;
      media.appendChild(source);

      // resolve if error on sources (404)
      if (i === sources.length - 1) {
        source.addEventListener('error', function(e) {
          resolve();
        });
      }
    });

    // resolve incase of invalid sources.
    if (!sources.length) {
      resolve();
    }
  });
}


module.exports = {
  canPlayThroughPromise
};
