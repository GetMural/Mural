export default async function handleImageInput(file: File) {
  let location = await window.electron.storeImage({
    name: 'name.file',
    // @ts-ignore
    filename: file.path,
  })
  return location
}
