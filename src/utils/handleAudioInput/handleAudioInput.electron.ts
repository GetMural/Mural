export default async function handleAudioInput(file: File) {
  let location = await window.electron.storeAudio({
    name: 'name.file',
    // @ts-ignore
    filename: file.path,
  })
  return location
}
