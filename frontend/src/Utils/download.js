export const saveFile = (uri) => {
  var link = document.createElement('a');
  link.setAttribute('download', '');
  link.href = uri;
  document.body.appendChild(link);
  link.click();
  link.remove();
}
