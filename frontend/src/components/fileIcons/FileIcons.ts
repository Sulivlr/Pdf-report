const getFileBadge = (filename: string) => {
  const ext = filename.split('.').pop()?.toLowerCase();

  if (!ext) return 'FILE';

  switch (ext) {
    case 'pdf':
      return 'PDF';
    case 'doc':
    case 'docx':
      return 'DOC';
    case 'xls':
    case 'xlsx':
      return 'XLS';
    case 'jpg':
    case 'jpeg':
    case 'png':
      return 'IMG';
    case 'zip':
    case 'rar':
      return 'ZIP';
    case 'mp4':
    case 'mov':
      return 'VID';
    case 'mp3':
    case 'wav':
      return 'AUD';
    case 'txt':
      return 'TXT';
    default:
      return ext.toUpperCase();
  }
};

export default getFileBadge;
