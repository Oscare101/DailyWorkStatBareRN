import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import Icon from './Icon';
import colors from '../constants/colors';

export default function DeleteBlock(props: {delete: any}) {
  const [modal, setModal] = useState<boolean>(false);
  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => setModal(true)}
          style={styles.button}>
          <Text style={styles.deleteTitle}>Видалити</Text>
          <Icon icon="trash" size={20} color={colors.errorTitle} />
        </TouchableOpacity>
      </View>
      <Modal transparent visible={modal} style={styles.modal}>
        <View style={styles.modalBG}>
          <View style={styles.modalBlock}>
            <Text style={styles.text}>Видалити робочий день</Text>
            <View style={styles.rowBetween}>
              <TouchableOpacity
                style={styles.exitButton}
                activeOpacity={0.8}
                onPress={() => setModal(false)}>
                <Text style={[styles.buttonTitle]}>Скасувати</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.exitButton}
                activeOpacity={0.8}
                onPress={() => {
                  props.delete();
                  setModal(false);
                }}>
                <Text style={[styles.buttonTitle, {color: colors.errorTitle}]}>
                  Видалити
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '92%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: 30,
  },
  button: {
    alignSelf: 'flex-end',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteTitle: {
    marginRight: 10,
    color: colors.errorTitle,
  },

  modal: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalBG: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#66666666',
  },
  modalBlock: {
    width: '90%',
    paddingBottom: 20,
    paddingTop: 20,

    borderRadius: 16,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  exitButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {fontSize: 16, marginBottom: 20, color: colors.main},
  buttonTitle: {fontSize: 20},
  rowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '80%',
  },
});
