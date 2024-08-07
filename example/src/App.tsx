import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { upload } from 'react-native-rnblob-util-test';
import { usePickFile } from './usePickFile';

export default function App() {
  const [result, setResult] = useState<number | undefined>();
  const { pickFromFiles } = usePickFile();

  const handlePress = async () => {
    try {
      const response = await pickFromFiles();
      console.log(response);
      upload(decodeURIComponent(response.uri.replace('file://', '')));
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={handlePress}>
        <Text>Test</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
