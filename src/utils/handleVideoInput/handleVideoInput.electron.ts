export default async function handleVideoInput(file: File) {
  let location = await window.electron.storeVideo({
    name: 'name.file',
    // @ts-ignore
    filename: file.path,
  })
  return location
}
