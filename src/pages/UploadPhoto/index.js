import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { Button, Gap, Header, Link } from '../../components';
import { IconAddPhoto, IconRemovePhoto, ILNullPhoto } from '../../assets';
import { colors, fonts, storeData } from '../../utils';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { showMessage } from 'react-native-flash-message';
import { Fire } from '../../config';

const UploadPhoto = ({ navigation, route }) => {
  const { fullName, profession, uid } = route.params;

  const [hasPhoto, setHasPhoto] = useState(false);
  const [imageForDB, setImageForDB] = useState('');
  const [photo, setPhoto] = useState(ILNullPhoto);
  const getImage = () => {
    launchImageLibrary(
      { quality: 0.75, maxHeight: 200, maxWidth: 200, includeBase64: true },
      (response) => {
        console.log('response:', response.assets[0]);
        if (response.didCancel || response.error) {
          showMessage({
            message: 'oops, sepertinya anda tidak memilih fotonya',
            type: 'default',
            backgroundColor: colors.error,
            color: colors.white,
          });
        } else {
          const source = { uri: response.assets[0].uri };
          setImageForDB(`data:${response.assets[0].type};base64, ${response.assets[0].base64}`);
          setPhoto(source);
          setHasPhoto(true);
        }
      },
    );
  };

  const uploadAndContinue = () => {
    Fire.database()
      .ref('users/' + uid + '/')
      .update({ photo: imageForDB });

    //data yang akan disimpan kedalam local storage
    const data = route.params;
    //menambahkan properti photo yg diambil dari imagefordb
    data.photo = imageForDB;

    storeData('user', data);

    navigation.replace('MainApp');
  };

  return (
    <View style={styles.page}>
      <Header title="Upload Photo" />
      <View style={styles.content}>
        <View style={styles.profile}>
          <TouchableOpacity style={styles.avatarWrapper} onPress={getImage}>
            <Image source={photo} style={styles.avatar} />
            {hasPhoto && <IconRemovePhoto style={styles.addPhoto} />}
            {!hasPhoto && <IconAddPhoto style={styles.addPhoto} />}
          </TouchableOpacity>
          <Text style={styles.name}>{fullName}</Text>
          <Text style={styles.profession}>{profession}</Text>
        </View>
        <View>
          <Button disable={!hasPhoto} title="Upload and Continue" onPress={uploadAndContinue} />
          <Gap height={30} />
          <Link
            title="Skip for this"
            align="center"
            onPress={() => navigation.replace('MainApp')}
          />
        </View>
      </View>
    </View>
  );
};

export default UploadPhoto;

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: colors.white },
  profile: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  content: {
    paddingHorizontal: 40,
    paddingBottom: 64,
    flex: 1,
    justifyContent: 'space-between',
  },
  avatar: { width: 110, height: 110, borderRadius: 110 / 2 },
  avatarWrapper: {
    width: 130,
    height: 130,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 130 / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addPhoto: { position: 'absolute', bottom: 8, right: 6 },
  name: {
    fontSize: 24,
    color: colors.text.primary,
    fontFamily: fonts.primary[600],
    textAlign: 'center',
  },
  profession: {
    fontSize: 18,
    fontFamily: fonts.primary.normal,
    textAlign: 'center',
    color: colors.text.secondary,
  },
});
