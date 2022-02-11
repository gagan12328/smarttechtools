import { writable } from 'svelte/store'
import request from 'Utils/request'

export const fileUploadStore = writable({
  isUploading: false,
  uploadProgress: 0,
})

export const onFilesChange = (files, url) => {
  if (files) {
    if (files instanceof FileList) {
      files = Array.from(files)
    }
    console.log(files)
    if (files.length) {
      const file = files[0]
      fileUploadStore.set({
        isUploading: true,
        uploadProgress: 0,
      })
      const formData = new FormData()
      formData.append('authentication', 'rtyuio')
      formData.append('doc_type', file.type.split('/')[1])
      formData.append('convert_doc', file)
      console.log({ url, formData })
      request(url, {
        method: 'post',
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (e) => {
          fileUploadStore.set({
            isUploading: false,
            uploadProgress: e.loaded,
          })
        }
      })
        .then((res) => {
          console.log(res)
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(() => {
          fileUploadStore.set({
            isUploading: false,
            uploadProgress: 0,
          })
        })
    }
  }
}
