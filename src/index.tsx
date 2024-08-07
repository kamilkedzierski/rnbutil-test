import ReactNativeBlobUtil from 'react-native-blob-util';

// const LINKING_ERROR =
//   `The package 'react-native-rnblob-util-test' doesn't seem to be linked. Make sure: \n\n` +
//   Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
//   '- You rebuilt the app after installing the package\n' +
//   '- You are not using Expo Go\n';

// // @ts-expect-error
// const isTurboModuleEnabled = global.__turboModuleProxy != null;

// const RnblobUtilTestModule = isTurboModuleEnabled
//   ? require('./NativeRnblobUtilTest').default
//   : NativeModules.RnblobUtilTest;

// const RnblobUtilTest = RnblobUtilTestModule
//   ? RnblobUtilTestModule
//   : new Proxy(
//       {},
//       {
//         get() {
//           throw new Error(LINKING_ERROR);
//         },
//       }
//     );

// export function multiply(a: number, b: number): Promise<number> {
//   return RnblobUtilTest.multiply(a, b);
// }

export function upload(uri: string): void {
  let data = '';
  ReactNativeBlobUtil.fs
    .readStream(
      // file path
      uri,
      // encoding, should be one of `base64`, `utf8`, `ascii`
      'base64',
      // (optional) buffer size, default to 4096 (4095 for BASE64 encoded data)
      // when reading file in BASE64 encoding, buffer size must be multiples of 3.
      4095
    )
    .then((ifstream) => {
      ifstream.open();
      console.log('IFSTREAM', ifstream);
      ifstream.onData((chunk) => {
        // when encoding is `ascii`, chunk will be an array contains numbers
        // otherwise it will be a string
        console.log('CHUNK', chunk);
        data += chunk;
      });
      ifstream.onError((err) => {
        console.log('oops', err);
      });
      ifstream.onEnd(() => {
        console.log('EOF');
      });
    });
}
