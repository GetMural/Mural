export default function getMediaPath(relativeUrl: string) {
  return window.electron.directories.media + '/' + relativeUrl
}
