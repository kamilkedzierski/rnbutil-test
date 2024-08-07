import DocumentPicker from 'react-native-document-picker';
import { launchImageLibrary } from 'react-native-image-picker';

export const usePickFile = () => {
  const pickFromFiles = async (): Promise<any> => {
    try {
      const response = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.allFiles],
        copyTo: 'cachesDirectory',
        mode: 'open',
      });

      const { name, size, type, uri } = response;

      if (!name || !size || !type || !uri) {
        throw Error('Missing required asset properties');
      }

      return { name, size, type, uri };
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User cancelled the picker');
      } else {
        throw err;
      }
    }
  };
  const pickFromPhotoGallery = async (): Promise<any> => {
    return new Promise((resolve, reject) => {
      launchImageLibrary({ mediaType: 'mixed' }, async (response) => {
        if (response.didCancel) {
          resolve(null);
        } else if (response.errorCode) {
          reject(response.errorMessage);
        } else if (response.assets && response.assets.length > 0) {
          const asset = response.assets[0];

          if (!asset.uri) {
            reject('Asset URI is missing');
            return;
          }

          const { fileName, fileSize, type, uri } = asset;

          if (!fileName || !fileSize || !type) {
            reject('Missing required asset properties');
            return;
          }
          resolve({
            name: fileName,
            size: fileSize,
            type: type,
            uri: uri,
          });
        } else {
          reject('No assets found');
        }
      });
    });
  };
  return {
    pickFromPhotoGallery,
    pickFromFiles,
  };
};
