export default async function handleFileInput(file: File) {
  let location = await window.electron.storeFile({
    name: 'name.file',
    // @ts-ignore
    filename: file.path,
  })
  return location
}
