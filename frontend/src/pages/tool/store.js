import { writable } from "svelte/store";

export const fileUploadStore = writable({
  isUploading: false,
  uploadProgress: 0
});

export const onFilesChange = (files, baseURL, url) => {
  if (files) {
    if (files instanceof FileList) {
      files = Array.from(files);
    }
    console.log(files);
    if (files.length) {
      const file = files[0];
      fileUploadStore.set({
        isUploading: true,
        uploadProgress: 0
      });
      const formData = new FormData();
      formData.append("authentication", "rtyuio");
      formData.append("doc_type", file.type.split('/')[1]);
      formData.append("convert_doc", file);
      axios.defaults.baseURL = baseURL;
      console.log({url, formData})
      axios.request({
        method: 'post',
        url,
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      }).then((res) => {
        console.log(res);
      }).catch(err => {
        console.log(err);
      }).finally(() => {
        fileUploadStore.set({
          isUploading: false,
          uploadProgress: 0
        });
      })
    }
  }
}
