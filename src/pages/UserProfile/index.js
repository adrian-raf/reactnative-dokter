import { StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Gap, Header, List, Profile } from '../../components';
import { ILNullPhoto } from '../../assets';
import { getData } from '../../utils';

const UserProfile = ({ navigation }) => {
  const [profile, setProfile] = useState({
    fullName: '',
    proffesion: '',
    photo: ILNullPhoto,
  });
  useEffect(() => {
    getData('user').then((res) => {
      const data = res;
      data.photo = { uri: res.photo };
      setProfile(data);
    });
  }, []);
  return (
    <View style={styles.page}>
      <Header title="Profile" onPress={() => navigation.goBack()} />
      <Gap height={10} />
      {profile.fullName.length > 0 && (
        <Profile name={profile.fullName} desc={profile.proffesion} photo={profile.photo} />
      )}
      <Gap height={14} />
      <List
        name="Edit Profile"
        desc="Last Update Yesterday"
        type="next"
        icon="edit-profile"
        onPress={() => navigation.navigate('UpdateProfile')}
      />
      <List name="Language" desc="Lat Update Yesterday" type="next" icon="language" />
      <List name="Give Us Rate" desc="Lat Update Yesterday" type="next" icon="rate" />
      <List name="Logout" desc="Lat Update Yesterday" type="next" icon="help" />
    </View>
  );
};
export default UserProfile;

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: 'white' },
});
