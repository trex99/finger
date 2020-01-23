import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
} from 'react-native';

import TouchID from 'react-native-touch-id';

export default class App extends React.Component {
  runFingerPrintAuth() {
    const optionalConfigObject = {
      title: '[지문 인증]', // Android
      imageColor: '#e00606', // Android
      imageErrorColor: '#ff0000', // Android
      sensorDescription: '지문센서에 손가락을 대주세요.', // Android
      sensorErrorDescription: '발가락 말고..손가락으로 다시~', // Android
      cancelText: '취소', // Android
      fallbackLabel: 'Show Passcode', // iOS (if empty, then label is hidden)
      unifiedErrors: false, // use unified error messages (default false)
      passcodeFallback: false, // iOS - allows the device to fall back to using the passcode, if faceid/touch is not available. this does not mean that if touchid/faceid fails the first few times it will revert to passcode, rather that if the former are not enrolled, then it will use the passcode.
    };

    TouchID.isSupported(optionalConfigObject)
    .then(biometryType => {
      // Success code
      if (biometryType === 'FaceID') {
          console.log('FaceID is supported.');
      } else {
          console.log('TouchID is supported.');
      }
    })
    .catch(error => {
      // Failure code
      console.log(error);
    });

    TouchID.authenticate('공대리 손가락으로 지문인증 부탁하네..', optionalConfigObject)
    .then(success => {
      alert('감사하네~~~');
    }, fail => {
      alert('취소 버튼은 왜 누르시나..')
    })
    .catch(error => {
      alert('이럴수가...');
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Android Finger Print Auth</Text>
        <Button
          title={'Finger Auth'}
          onPress={() => {this.runFingerPrintAuth()}}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
});
