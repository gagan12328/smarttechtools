import request from 'Utils/request'
import { FILE_STATUS } from './constants';

const createFormData = ({ bin }) => {
  const formData = new FormData()
  formData.append('authentication', 'rtyuio')
  formData.append('doc_type', bin.type.split('/')[1])
  formData.append('convert_doc', bin)
  return formData;
}

export const uploadFilesSequence = (url, files, fileSizeLimit, updateFilesStatus) => {
  files.forEach(async (file) => {
    if (file.bin.size > fileSizeLimit) {
      return;
    }

    const formData = createFormData(file);
    updateFilesStatus({
      ...file,
      status: FILE_STATUS.UPLOADING,
    });

    try {
      const response = await request(url, {
        method: 'post',
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        // onUploadProgress: (e) => {
        //   // updateFilesStatus({
        //   //   ...file,
        //   //   status: FILE_STATUS.UPLOADING,
        //   // });
        // }
      })
      if (response && response.file_path) {
        updateFilesStatus({
          ...file,
          download: response.file_path,
          status: FILE_STATUS.PROCESSED,
        });
      } else {
        updateFilesStatus({
          ...file,
          status: FILE_STATUS.FAILED,
        });
      }
    } catch (err) {
      updateFilesStatus({
        ...file,
        status: FILE_STATUS.FAILED,
      });
    }
  })
}
