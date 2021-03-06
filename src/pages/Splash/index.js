import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ILLogo } from '../../assets';
import { Fire } from '../../config';
import { colors, fonts } from '../../utils';

const Splash = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      Fire.auth().onAuthStateChanged((user) => {
        if (user) {
          //user sedang login
          console.log('user', user);
          navigation.replace('MainApp');
        } else {
          //user logout
          navigation.replace('GetStarted');
        }
      });
    }, 3000);
  }, [navigation]);
  return (
    <View style={styles.page}>
      <ILLogo />
      <Text style={styles.title}>My Doctor</Text>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.white,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text.primary,
    marginTop: 20,
    fontFamily: fonts.primary[600],
  },
});
