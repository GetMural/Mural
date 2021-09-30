import React from 'react'
import { useAppSelector } from 'store/hooks'
import { RootState } from 'store/store'
import convertToHtml from 'utils/convertToHtml'

const render = (state: RootState) => {
  window.electron.renderPreview({
    meta: {
      title: state.story.metadata.title,
      site_name: 'string',
      site_img: 'string',
      subtitle: 'string',
      author: 'string',
      keywords: 'string',
      rsspingback: 'string',
      description: 'string',
      src: 'string',
      share: true,
      facebook: true,
      twitter: true,
    },
    nav: [],
    items: state.story.items?.map((item) => {
      switch (item.type) {
        case 'fullpageVideo':
          return {
            videofullpage: {
              id: item.id,
              // format: {
              //   fullpage: item.
              // }
              // title:
              text: (item.text && convertToHtml(item.text)) || '',
              loop: Boolean(item.loopVideo),
              // autoAdvance: boolean
              video: {
                mp4: item.video.path,
                webm: item.video.path,
              },
              image: item.representativeImage
                ? {
                    loading: item.representativeImage?.path,
                  }
                : undefined,
            },
          }
        case 'backgroundImage':
          return {
            imagebackground: {
              id: item.id,
              // format: {
              //   fullpage: item.
              // }
              title: (item.title && convertToHtml(item.title)) || '',
              subtitle: (item.subtitle && convertToHtml(item.subtitle)) || '',
              text: (item.text && convertToHtml(item.text)) || '',
              image: item.image && {
                srcmain: item.image.path,
                // srcphone: null,
                // srcmedium: null,
              },
              // audio: {
              //   mp3: ,
              //   ogg: ,
              // },
            },
          }
        // case 'text':
        //   return {
        //     textcentred: {
        //       intro: item.introduction,
        //     },
        //   }
        default:
          throw Error(`Type ${item.type} no implemented`)
      }
    }),
  })
}

export default function usePreview() {
  const state = useAppSelector((state) => state)

  React.useEffect(() => {
    render(state)
  }, [state])

  return {
    render,
  }
}
