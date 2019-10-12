import React from 'react';
import classnames from 'classnames';
import { observer } from 'mobx-react';

const SnippetDraft = ({
  snippet: {
    align,
    body,
    image: { renditions, alt, credits, title },
  },
}) => {
  const figureClasses = classnames('cms-image', `${align}`);
  let src;
  const srcset = renditions
    .map(({ thumborUrl, scale }) => {
      if (scale === 1) {
        src = thumborUrl;
      }
      return `${thumborUrl} ${scale}x`;
    })
    .join(',');
  return (
    <>
      <figure className={figureClasses}>
        <img srcSet={srcset} src={src} alt={alt} />
        <figcaption>
          <div dangerouslySetInnerHTML={{ __html: title }} />
          <span className="photographer">{credits}</span>
        </figcaption>
      </figure>
      <div dangerouslySetInnerHTML={{ __html: body }} />
    </>
  );
};

export default observer(SnippetDraft);
