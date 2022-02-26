import { writable } from 'svelte/store'
import { FILE_STATUS } from './constants';

export const filesStore = writable([]);
export const isFileConverting = writable(false);

export const addFilesToStore = (files) => {
  filesStore.set(files);
}

export const removeFileFromStore = (file) => {
  filesStore.update((files) => files.filter(f => f.id !== file.id));
}

export const updateFile = (file) => {
  filesStore.update((files) => files.map((f) => f.id === file.id ? { ...file } : f))
}

filesStore.subscribe((files) => {
  isFileConverting.set(Boolean(files.find((file) => file.status === FILE_STATUS.UPLOADING)))
})

export const fileUploadStore = writable({
  isUploading: false,
  uploadProgress: 0,
})
