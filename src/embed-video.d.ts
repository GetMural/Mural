declare module 'embed-video' {
  interface EmbedVideo {
    (url: string, opts?: any): string
    vimeo: (id: string, opts?: any) => string
    youtube: (id: string, opts?: any) => string
    dailymotion: (id: string, opts?: any) => string
    info(url: string): {
      id: string
      url: string
      source: 'youtube' | 'vimeo' | 'dailymotion'
    }
  }

  const EmbedVideo: EmbedVideo

  export = EmbedVideo
}
