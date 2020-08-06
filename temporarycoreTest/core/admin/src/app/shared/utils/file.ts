'use strict';

declare const unescape: any;

export function dataURItoBlob(dataURI) {
  let byteString;

  if (dataURI.split(',')[0].indexOf('base64') >= 0) {
    byteString = atob(dataURI.split(',')[1]);
  } else {
    byteString = unescape(dataURI.split(',')[1]);
  }

  let mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

  let ia = new Uint8Array(byteString.length);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ia], { type: mimeString });
}

export function getFileName({ curName, today }) {
  const prefix = Math.random().toString(36).substring(7);
  const time = today.getTime();
  const ext = curName.split('.').pop();
  return `${prefix}-${time}.${ext}`;
}
