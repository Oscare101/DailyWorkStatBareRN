import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import colors from '../constants/colors';
import {useNavigation} from '@react-navigation/native';
import Icon from './Icon';

export default function Header(props: {
  title: string;
  action: 'back' | 'none';
}) {
  const navigation: any = useNavigation();
  return (
    <View style={styles.header}>
      {props.action ? (
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.8}
          onPress={() => {
            if (props.action === 'back') {
              navigation.goBack();
            }
          }}>
          <Icon icon="back" size={30} color={colors.main} />
        </TouchableOpacity>
      ) : (
        <View />
      )}
      <Text style={styles.title}>{props.title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: '92%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'center',
    height: 50,
    marginBottom: 20,
  },
  button: {
    height: 40,
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    color: colors.main,
  },
});
