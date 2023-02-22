import * as Mustache from 'mustache'
import fs from 'fs'
import path from 'path'
import electron from 'electron'

export default function exportStory(story: Storyboard) {
  const frontendManifest = fs.readFileSync(
    path.join(
      electron.app.getAppPath(),
      'frontend-assets-build',
      'manifest.json'
    ),
    {
      encoding: 'utf8',
    }
  )

  const frontendManifestJSON = JSON.parse(frontendManifest)

  const template = fs.readFileSync(path.join(__dirname, 'preview.html'), {
    encoding: 'utf8',
  })
  var output = Mustache.render(
    template,
    Object.assign(story, {
      manifest: {
        js: frontendManifestJSON['app.js'],
        css: frontendManifestJSON['app.css'],
      },
    })
  )

  return output
}

interface Video {
  mp4: string
  webm?: string
}

interface Slideshow {
  id: string
  afterPaywall: boolean
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

interface EmbedVideo {
  id: string
  afterPaywall: boolean
  index?: number
  showControls?: boolean
  autoAdvance?: boolean
  embed?: {
    id: string
    url: string
    source: 'youtube' | 'vimeo' | 'dailymotion'
    embed: string
  }
}

type AlignBackgroundImageText = {
  left: boolean
  center: boolean
  right: boolean
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
        afterPaywall: boolean
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
        afterPaywall: boolean
        format?: {
          fullpage: boolean
        }
        title?: string
        subtitle?: string
        align?: AlignBackgroundImageText
        text?: string
        image?: {
          srcmain: string
          srcphone?: string
          srcmedium?: string
        }
        audio?: {
          mp3?: string
          ogg?: string
          loop?: boolean
        }
      }
    }
  | {
      videobackground: {
        id: string
        afterPaywall: boolean
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
        timer?: string
      }
    }
  | {
      imageparallax: {
        id: string
        afterPaywall: boolean
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
        afterPaywall: boolean
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
        afterPaywall: boolean
        title?: string
        subtitle?: string
        light?: boolean
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
      youtube: EmbedVideo
    }
  | {
      dailymotion: EmbedVideo
    }
  | {
      vimeo: EmbedVideo
    }
  | {
      paywallSeparator: {
        id: string
        index?: number
      }
    }
  | {
      paywallSeparatorEnd: {
        id: string
        index?: number
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
    splash_screen_img?: string
    site_img?: string
    site_img_width?: number
    site_img_height?: number
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
    default_auto_advance?: number
  }
  items: Items[]
  nav: {
    id: string
    title: string
  }[]
}
