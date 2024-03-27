import {StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-ionicons';

export default function CoppyButton(props: any) {
  return (
    <TouchableOpacity
      style={styles.addButton}
      activeOpacity={0.8}
      onPress={() => props.onCreateDay()}>
      <Icon name="copy" size={40} color="#fff" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  addButton: {
    backgroundColor: '#0063ff',
    height: 70,
    width: 70,
    position: 'absolute',
    bottom: 100,
    right: 20,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
