import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {DailyWork} from '../constants/interfaces';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../redux';
import {updateDailyWork} from '../redux/dailyWork';
import colors from '../constants/colors';
import Header from '../components/Header';
import Icon from '../components/Icon';

const calendarItemHeight: number = 50;

export default function NewDayScreen({navigation}: any) {
  const dailyWork = useSelector((state: RootState) => state.dailyWork);
  const dispatch = useDispatch();

  const [newDate, setNewDate] = useState<Date>(new Date());

  function NextDate() {
    const date = new Date(newDate);
    date.setDate(date.getDate() + 1);
    setNewDate(date);
  }

  function PreviousDate() {
    const date = new Date(newDate);
    date.setDate(date.getDate() - 1);
    setNewDate(date);
  }

  function Disabled() {
    return !!dailyWork.find(
      (d: DailyWork) =>
        d.year === newDate.getFullYear() &&
        d.month === newDate.getMonth() + 1 &&
        d.date === newDate.getDate(),
    );
  }

  function CreateNewDay() {
    const stamp: string = new Date(
      `${newDate.getFullYear()}-${newDate.getMonth() + 1}-${newDate.getDate()}`,
    )
      .getTime()
      .toString();
    const newDay: DailyWork = {
      timestamp: stamp,
      year: newDate.getFullYear(),
      month: newDate.getMonth() + 1,
      date: newDate.getDate(),
      tasks: 0,
      chats: 0,
      workingDay: true,
    };

    const newDailyWork = [...dailyWork, newDay];
    dispatch(updateDailyWork(newDailyWork));
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <Header title="Новий робочий день" action="back" />
      <View style={styles.dateBlock}>
        <TouchableOpacity
          style={styles.dateButton}
          activeOpacity={0.8}
          onPress={PreviousDate}>
          <Icon icon="back" size={30} color={colors.main} />
        </TouchableOpacity>
        <Text style={styles.dateTitle}>
          {newDate.getDate()}-{newDate.getMonth() + 1}-{newDate.getFullYear()}
        </Text>
        <TouchableOpacity
          style={styles.dateButton}
          activeOpacity={0.8}
          onPress={NextDate}>
          <Icon icon="forward" size={30} color={colors.main} />
        </TouchableOpacity>
      </View>

      <View style={{flex: 1}} />

      <TouchableOpacity
        style={[
          styles.createButton,
          {
            backgroundColor: Disabled() ? colors.errorBg : colors.button,
          },
        ]}
        activeOpacity={0.8}
        onPress={CreateNewDay}
        disabled={Disabled()}>
        <Text
          style={[
            styles.createButtonText,
            {color: Disabled() ? colors.errorTitle : colors.card},
          ]}>
          {Disabled() ? 'Такий день вже існує' : 'Створити'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#eee',
    flex: 1,
    paddingBottom: 20,
  },
  title: {
    fontSize: 24,
  },
  dateBlock: {
    backgroundColor: colors.card,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 10,
    width: '92%',
    height: 60,
  },
  dateButton: {
    height: '100%',
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  createButton: {
    width: '92%',
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  createButtonText: {
    fontSize: 20,
  },

  dateTitle: {
    textAlign: 'center',
    fontSize: 24,
    alignSelf: 'center',
    marginVertical: 10,
    color: colors.main,
  },
});
