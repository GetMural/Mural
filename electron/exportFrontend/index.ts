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
  webm?: string
}

interface Slideshow {
  id: string
  title?: string
  light?: boolean
  images?: {
    title?: string
    credits?: string
    srcphone?: string
    srcmedium?: string
    srcmain?: string
  }[]
  files?: string[]
}

type OffsetPortraitVideo = {
  left: boolean
  centre: boolean
  right: boolean
  custom: boolean
  value: number
}

export type Items =
  | {
      imageaudio: {
        id: string
        light: boolean
        audio?: {
          loop: boolean
          mp3?: string
          ogg?: string
          audio_credits?: string
        }
        image?: {
          srcmain: string
          srcmedium: string
          srcphone: string
          alt?: string
          image_caption?: string
          image_credits?: string
        }
      }
    }
  | {
      imagebackground: {
        id: string
        format?: {
          fullpage: boolean
        }
        title?: string
        subtitle?: string
        text?: string
        image?: {
          srcmain: string
          srcphone?: string
          srcmedium?: string
        }
        audio?: {
          mp3: string
          ogg: string
        }
      }
    }
  | {
      videobackground: {
        id: string
        format?: {
          fullpage: boolean
        }
        title?: string
        subtitle?: string
        text?: string
        video?: Video
        image?: {
          loading: string
        }
        backgroundprops?: {
          active?: {
            value?: string
            opacity?: string
          }
        }
        offset?: OffsetPortraitVideo
      }
    }
  | {
      imageparallax: {
        id: string
        title?: string
        subtitle?: string
        image?: {
          srcmain: string
          srcmedium: string
          srcphone: string
        }
      }
    }
  | {
      videofullpage: {
        id: string
        format?: {
          fullpage: boolean
        }
        title?: string
        text?: string
        loop: boolean
        autoAdvance?: boolean
        video?: Video
        image?: {
          loading: string
        }
        offset?: OffsetPortraitVideo
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
        title?: string
        subtitle?: string
        light?: 'on' | 'off' | null | undefined
        intro?: string
        snippets?: {
          align?: string
          title?: string
          src?: string
          credits?: string
          text?: string
        }[]
        files?: string[]
      }
    }
  | {
      embedVideo: {
        id: string
        showControls?: boolean
        autoAdvance?: boolean
        embed?: {
          id: string
          url: string
          source: 'youtube' | 'vimeo' | 'dailymotion'
          embed: string
        }
      }
    }
  | {
      paywallSeparator: {
        id: string
      }
    }
  | {
      paywallSeparatorEnd: {
        id: string
      }
    }
export interface Storyboard {
  payment: {
    enabled: boolean
    pointers: {
      name: string
      pointer: string
      share: number
    }[]
    accessCode?: string
    rot: number
  }
  meta: {
    title?: string
    site_name?: string
    site_img?: string
    subtitle?: string
    author?: string
    rsspingback?: string
    description?: string
    src?: string
    analytics?: string
    font_base_link?: string
    font_base_rules?: string
    font_headers_rules?: string
    custom_css?: string
  }
  items: Items[]
  nav: {
    id: string
    title: string
  }[]
}
