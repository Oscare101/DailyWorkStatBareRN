import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '../redux';
import {DailyWork} from '../constants/interfaces';
import {GetWeekDay} from '../constants/functions';
import taskNames from '../constants/taskNames';
import colors from '../constants/colors';

const months = [
  'Січень',
  'Лютий',
  'Березень',
  'Квітень',
  'Червень',
  'Червень',
  'Липень',
  'Серпень',
  'Вересень',
  'Жовтень',
  'Листопад',
  'Грудень',
];

const workHours = 8;

export default function StatisticsScreen({navigation}: any) {
  const dailyWork: any = useSelector((state: RootState) => state.dailyWork);

  function GetSortedDays() {
    let daysArr: any = [];
    dailyWork.forEach((i: any) => {
      daysArr.push(i);
    });
    daysArr.sort((a: any, b: any) => b.timestamp - a.timestamp);
    return daysArr;
  }

  function GetMonthData() {
    const groupedData = dailyWork.reduce((result: any, item: any) => {
      const {year, month} = item;
      const key = `${year}-${month}`;

      if (!result[key]) {
        result[key] = [];
      }

      result[key].push(item);

      return result;
    }, {});

    const resultArray = Object.entries(groupedData).map(([key, value]) => ({
      year: parseInt(key.split('-')[0]),
      month: parseInt(key.split('-')[1]),
      data: value,
    }));

    return resultArray;
  }
  function GetAllMonthTasks(data: any) {
    let tasksFinished: number = 0;
    data.forEach((d: any) => {
      tasksFinished += d.tasks + d.chats;
    });
    return tasksFinished;
  }

  function RenderMonthData({item}: any) {
    const monthData = item.data;

    function RenderDaysData({item}: any) {
      return (
        <TouchableOpacity
          onPress={() => navigation.navigate('WorkingDayScreen', {data: item})}
          activeOpacity={0.8}
          style={{
            backgroundColor: '#fff',
            flex: 1,
            marginTop: 4,
            borderRadius: 3,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: 5,
          }}>
          <Text style={{color: colors.main}}>
            {GetWeekDay(item.year, item.month, item.date)} {item.date}
          </Text>
          <Text style={{color: colors.main}}>{item.tasks + item.chats}</Text>
        </TouchableOpacity>
      );
    }

    function RenderTasksNames({item}: any) {
      return (
        <Text style={styles.monthTasksNamesTitle}>
          {item}:{' '}
          <Text style={styles.monthTasksNamesValue}>
            {monthData.filter((d: DailyWork) => d.taskName === item).length}
          </Text>
        </Text>
      );
    }

    return (
      <View
        style={{
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#fff',
          width: '100%',
          paddingBottom: 5,
          marginTop: 5,
          borderRadius: 10,
        }}>
        <Text style={styles.monthTitle}>
          {item.data[0].year} {months[item.data[0].month - 1]}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '92%',
          }}>
          <Text style={styles.monthStatTitle}>
            Всього задач:{' '}
            <Text style={styles.monthStatValue}>
              {GetAllMonthTasks(item.data)}
            </Text>
          </Text>
          <Text style={styles.monthStatTitle}>
            Задач за годину:{' '}
            <Text
              style={[
                styles.monthStatValue,
                {
                  color:
                    +(
                      GetAllMonthTasks(item.data) /
                      item.data.length /
                      workHours
                    ).toFixed() >= 8
                      ? colors.successTitle
                      : colors.errorTitle,
                },
              ]}>
              {(
                GetAllMonthTasks(item.data) /
                item.data.length /
                workHours
              ).toFixed(2)}
            </Text>
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '92%',
            borderTopColor: '#eee',
            borderTopWidth: 1,
            paddingTop: 5,
            marginTop: 5,
          }}>
          <FlatList
            numColumns={3}
            data={Object.values(taskNames)}
            renderItem={RenderTasksNames}
          />
        </View>

        <FlatList
          style={{
            width: '98%',
            backgroundColor: '#eee',
            paddingHorizontal: 4,
            paddingBottom: 4,
            borderRadius: 5,
          }}
          scrollEnabled={false}
          data={item.data.sort((a: any, b: any) => b.timestamp - a.timestamp)}
          renderItem={RenderDaysData}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        style={{width: '92%'}}
        data={GetMonthData().reverse()}
        renderItem={RenderMonthData}
        showsVerticalScrollIndicator={false}
      />
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
  },
  monthTitle: {
    fontSize: 18,
    width: '100%',
    alignSelf: 'center',
    textAlign: 'center',
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    marginBottom: 5,
    paddingBottom: 5,
    color: colors.main,
  },
  monthStatTitle: {fontSize: 16, color: colors.comment},
  monthStatValue: {fontSize: 16, fontWeight: '500', color: colors.main},
  monthTasksNamesTitle: {
    fontSize: 13,
    width: '33%',
    opacity: 0.8,
    color: colors.comment,
  },
  monthTasksNamesValue: {fontSize: 14, color: colors.main},
});
