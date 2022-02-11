import { ScrollView, StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Button, Gap, Header, Input, Profile } from '../../components';
import { colors, getData, storeData } from '../../utils';
import { Fire } from '../../config';
import { showMessage } from 'react-native-flash-message';
import { launchImageLibrary } from 'react-native-image-picker';
import { ILNullPhoto } from '../../assets';

const UpdateProfile = ({ navigation }) => {
  const [profile, setProfile] = useState({
    fullName: '',
    profession: '',
    email: '',
  });
  const [password, setPassword] = useState('');
  const [photo, setPhoto] = useState(ILNullPhoto);
  const [imageForDB, setImageForDB] = useState('');

  useEffect(() => {
    getData('user').then((res) => {
      const data = res;
      // data.imageForDB = res?.photo?.length > 1 ? res.photo : ILNullPhoto;
      // const tempPhoto = res?.photo?.length > 1 ? { uri: res.photo } : ILNullPhoto;
      // setPhoto(tempPhoto);
      setProfile(data);
    });
  }, []);

  const update = () => {
    console.log('profile', profile);
    const data = profile;
    data.photo = imageForDB;

    // Fire.database()
    //   .ref(`users/${profile.uid}/`)
    //   .update(data)
    //   .then(() => {
    //     console.log('success:');
    //     storeData('user', data);
    //   })
    //   .catch((err) => {
    //     showMessage({
    //       message: err.message,
    //       type: 'default',
    //       backgroundColor: colors.error,
    //       color: colors.white,
    //     });
    //   });
  };

  const changeText = (key, value) => {
    setProfile({
      ...profile,
      [key]: value,
    });
  };

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
          console.log('response getImage:', response);
          const source = { uri: response.assets[0].uri };
          setImageForDB(`data:${response.assets[0].type};base64, ${response.assets[0].base64}`);
          setPhoto(source);
        }
      },
    );
  };
  return (
    <View style={styles.page}>
      <Header title="Edit Profile" onPress={() => navigation.goBack()} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Profile isRemove photo={photo} onpress={getImage} />
          <Gap height={26} />
          <Input
            label="Full Name"
            value={profile.fullName}
            onChangeText={(value) => changeText('fullName', value)}
          />
          <Gap height={24} />
          <Input
            label="Pekerjaan"
            value={profile.profession}
            onChangeText={(value) => changeText('profession', value)}
          />
          <Gap height={24} />
          <Input label="Email" value={profile.email} disable />
          <Gap height={24} />
          <Input label="Password" value={password} onChangeText={(value) => setPassword(value)} />
          <Gap height={40} />
          <Button title="Save Profile" onPress={update} />
        </View>
      </ScrollView>
    </View>
  );
};

export default UpdateProfile;
const styles = StyleSheet.create({
  page: { backgroundColor: colors.white, flex: 1 },
  content: { padding: 40, paddingTop: 0 },
});
