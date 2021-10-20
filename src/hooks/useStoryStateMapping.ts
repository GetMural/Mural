import React from 'react'
import { useAppSelector } from 'store/hooks'
import convertToHtml from 'utils/convertToHtml'

const media = (relativePath: string) => {
  return './media/' + relativePath
}

export default function useStoryStateMapping() {
  const state = useAppSelector((state) => state)
  const mapped = React.useMemo(() => {
    return {
      meta: {
        title: state.story.metadata.title,
        site_name: state.story.metadata.siteName,
        site_img: state.story.metadata.siteImage
          ? media(state.story.metadata.siteImage.medium.path)
          : undefined,
        author: state.story.metadata.author,
        rsspingback: state.story.metadata.rssPingbkack,
        description: state.story.metadata.description,
        src: state.story.metadata.canonicalUrl,
        analytics: state.story.metadata.googleAnalyticsId,
      },
      nav: state.story.items.flatMap((item) => {
        if ('navigationTitle' in item && item.navigationTitle) {
          return [{ title: item.navigationTitle, id: item.id }]
        }
        return []
      }),
      items: state.story.items?.map((item) => {
        switch (item.type) {
          case 'imageAudio':
            return {
              imageaudio: {
                id: item.id,
                light: false,
                audio: item.audio
                  ? {
                      loop: true,
                      mp3: media(item.audio.path),
                      // ogg: string
                      // audio_credits: string
                    }
                  : undefined,
                image: item.image
                  ? {
                      srcmain: media(item.image?.big.path),
                      srcmedium: media(item.image?.medium.path),
                      srcphone: media(item.image?.small.path),
                      alt: item.altText,
                      image_caption: item.title,
                      image_credits: item.subtitle,
                    }
                  : undefined,
              },
            }
          case 'fullpageVideo':
            return {
              videofullpage: {
                id: item.id,
                format: {
                  fullpage: true,
                },
                // title:
                text: convertToHtml(item.text),
                loop: Boolean(item.loopVideo),
                // autoAdvance: boolean
                video: item.video
                  ? {
                      mp4: media(item.video.path),
                    }
                  : undefined,
                image: item.representativeImage
                  ? {
                      loading: media(item.representativeImage.big.path),
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
                title: convertToHtml(item.title),
                subtitle: convertToHtml(item.subtitle),
                text: convertToHtml(item.text),
                image: item.image && {
                  srcmain: media(item.image.big.path),
                  srcphone: media(item.image.small.path),
                  srcmedium: media(item.image.medium.path),
                },
              },
            }
          case 'backgroundVideo':
            return {
              videobackground: {
                id: item.id,
                format: {
                  fullpage: !!item.fullPage,
                },
                video: item.video
                  ? {
                      mp4: media(item.video.path),
                    }
                  : undefined,
                title: item.title,
                subtitle: item.subtitle,
                text: convertToHtml(item.text),
                image: item.posterImage
                  ? {
                      loading: media(item.posterImage.big.path),
                    }
                  : undefined,
              },
            }
          case 'parallaxImage':
            return {
              imageparallax: {
                id: item.id,
                format: {
                  fullpage: !!item.fullPage,
                },
                title: item.title,
                subtitle: convertToHtml(item.subtitle),
                image: item.image && {
                  srcmain: media(item.image.big.path),
                  srcphone: media(item.image.small.path),
                  srcmedium: media(item.image.medium.path),
                },
              },
            }
          case 'verticalSlideshow':
            return {
              slideshowvertical: {
                id: item.id,
                title: convertToHtml(item.slideShowTitle),
                images: item.slides
                  ? item.slides.map((slide) => ({
                      title: slide.slideTitle,
                      credits: slide.slideCredits,
                      srcphone: slide.image
                        ? media(slide.image.small.path)
                        : undefined,
                      srcmedium: slide.image
                        ? media(slide.image.medium.path)
                        : undefined,
                      srcmain: slide.image
                        ? media(slide.image.big.path)
                        : undefined,
                    }))
                  : undefined,
              },
            }
          case 'horizontalSlideshow':
            return {
              slideshowhorizontal: {
                id: item.id,
                title: convertToHtml(item.slideShowTitle),
                images: item.slides
                  ? item.slides.map((slide) => ({
                      title: slide.slideTitle,
                      credits: slide.slideCredits,
                      srcphone: slide.image
                        ? media(slide.image.small.path)
                        : undefined,
                      srcmedium: slide.image
                        ? media(slide.image.medium.path)
                        : undefined,
                      srcmain: slide.image
                        ? media(slide.image.big.path)
                        : undefined,
                    }))
                  : undefined,
              },
            }
          case 'text':
            return {
              textcentred: {
                id: item.id,
                title: item.title,
                subtitle: convertToHtml(item.subtitle),
                // light:
                intro: convertToHtml(item.introduction),
                // snippets: {}
              },
            }
          case 'embedVideo':
            return {
              embedVideo: {
                id: item.id,
                showControls: item.showControls,
                autoAdvance: item.autoAdvance,
                embed: item.embed,
              },
            }
          case 'paywallSeparator':
            return {
              paywallSeparator: {
                id: item.id,
              },
            }
          default:
            throw Error(`Should never happen`)
        }
      }),
    }
  }, [state])
  return mapped
}
