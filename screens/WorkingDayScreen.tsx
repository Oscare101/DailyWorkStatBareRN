import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {GetWeekDay} from '../constants/functions';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../redux';
import {DailyWork} from '../constants/interfaces';
import {updateDailyWork} from '../redux/dailyWork';
import StatBlock from '../components/StatBlock';
import Categories from '../components/Categories';
import Header from '../components/Header';

export default function WorkingDayScreen({route, navigation}: any) {
  const dailyWork = useSelector((state: RootState) => state.dailyWork);
  const userInfo = useSelector((state: RootState) => state.userInfo);

  const dispatch = useDispatch();

  function DeleteDay() {
    let newDailyWork: any = [];
    dailyWork.forEach((d: DailyWork) => {
      if (d.timestamp !== route.params.data.timestamp) {
        newDailyWork.push(d);
      }
    });
    navigation.goBack();

    dispatch(updateDailyWork(newDailyWork));
  }

  return (
    <View style={styles.container}>
      <Header
        title={`${route.params.data.date}.${route.params.data.month}.${
          route.params.data.year
        } ${GetWeekDay(
          route.params.data.year,
          route.params.data.month,
          route.params.data.date,
        )}`}
        action="back"
      />
      <StatBlock data={route.params.data} />
      <Categories data={route.params.data} />
      <View style={{flex: 1}}></View>
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
    paddingBottom: 50,
  },
});
