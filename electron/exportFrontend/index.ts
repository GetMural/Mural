import * as Mustache from 'mustache'
import fs from 'fs'
import path from 'path'

export default function exportStory(story: Storyboard) {
  const index = fs.readFileSync(path.join(__dirname, 'preview.html'), {
    encoding: 'utf8',
  })

  var output = Mustache.render(index, story)
  return output
}

interface Video {
  mp4: string
  webm: string
}

interface Slideshow {
  id: string
  title: string
  images: {
    title: string
    credits: string
    srcphone: string
    srcmedium: string
    srcmain: string
  }[]
  files: string[]
}

export interface Storyboard {
  meta: {
    title: string
    site_name: string
    site_img: string
    subtitle: string
    author: string
    keywords: string
    rsspingback: string
    description: string
    src: string
    share: boolean
    facebook: boolean
    twitter: boolean
  }
  items: (
    | {
        imagebackground: {
          id: string
          format: {
            fullpage: boolean
          }
          title: string
          subtitle: string
          text: string
          image: {
            srcmain: string
            srcphone: string
            srcmedium: string
          }
          audio: {
            mp3: string
            ogg: string
          }
        }
      }
    | {
        videobackground: {
          id: string
          format: {
            fullpage: boolean
          }
          title: string
          subtitle: string
          text: string
          video: Video
          image: {
            loading: string
          }
          backgroundprops?: {
            active?: string
            value?: string
            opacity?: string
          }
          offset?: {
            left: boolean
            centre: boolean
            right: boolean
            custom: boolean
            value: string
          }
        }
      }
    | {
        imageparallax: {
          id: string
          format: {
            fullpage: boolean
          }
          title: string
          subtitle: string
          image: {
            srcmain: string
            srcmedium: string
            srcphone: string
          }
        }
      }
    | {
        videofullpage: {
          id: string
          format: {
            fullpage: boolean
          }
          title: string
          text: string
          loop: boolean
          autoAdvance: boolean
          video: Video
          image: {
            loading: string
          }
        }
      }
    | {
        slideshowvertical: Slideshow
      }
    | {
        slideshowhorizontal: Slideshow
      }
    | {
        textcentred: {
          id: string
          title: string
          subtitle: string
          light: 'on' | 'off' | null | undefined
          intro: string
          snippets: {
            align: string
            title: string
            src: string
            credits: string
            text: string
          }[]
          files: string[]
        }
      }
  )[]
  nav: {
    id: number
    title: string
  }[]
}
