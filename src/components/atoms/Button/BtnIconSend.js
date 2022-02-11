import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { colors } from '../../../utils';
import { IconSendDark, IconSendLight } from '../../../assets';

const BtnIconSend = ({ disable }) => {
  return (
    <View style={styles.container(disable)}>
      {disable && <IconSendDark />}
      {!disable && <IconSendLight />}
    </View>
  );
};

export default BtnIconSend;

const styles = StyleSheet.create({
  container: (disable) => ({
    backgroundColor: disable ? colors.disable : colors.tertiary,
    width: 45,
    height: 45,
    borderRadius: 10,
    paddingTop: 3,
    paddingBottom: 8,
    paddingRight: 3,
    paddingLeft: 8,
  }),
});
