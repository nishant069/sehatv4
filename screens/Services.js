import React, { useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Services = () => {
  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const scheduleInfo = [
    {
      time: '09:00 AM',
      doctor: 'Manav, Pune',
    },
    {
      time: '10:00 AM',
      doctor: 'Rohit, Delhi',
    },
    {
      time: '11:00 AM',
      doctor: 'Mansi, Patna',
    },
  ];


  const getDayOfWeek = (year, month, day) => {
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const date = new Date(year, month, day);
    return daysOfWeek[date.getDay()];
  };

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const isLeapYear = (year) => (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
  const getDaysInMonth = (year, month) => [31, isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];

  const scrollViewRef = React.useRef(null);

  useEffect(() => {
    setSelectedDate(new Date());

    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();
    const date = selectedDate.getDate();
    const dayIndex = new Date(year, month, date).getDate() - 1;
    const itemWidth = 60;
    const margin = 10;
    const scrollToX = dayIndex * (itemWidth + margin) - 50;
    scrollViewRef.current.scrollTo({ x: scrollToX, animated: true });
  }, []);



  const renderDateItem = (day, index) => {
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const date = index + 1;

    if (date <= daysInMonth) {
      const dayOfWeek = getDayOfWeek(year, month, date);

      return (
        <TouchableOpacity
          key={index}
          style={{
            backgroundColor: 'transparent',
            padding: 10,
            marginLeft: 10,
            borderRadius: 10,
            marginTop: 30,
            height: 60,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => {
            const newDate = new Date(year, month, date);
            setSelectedDate(newDate);
          }}>

          <View style={{ borderRadius: 20, height: 35, width: 35, justifyContent: 'center', alignItems: 'center', backgroundColor: selectedDate.getDate() === date ? '#e48a87' : 'transparent' }}>
            <Text style={{ color: selectedDate.getDate() === date ? '#fff' : '#000', fontWeight: 'bold' }}>{date}</Text>
          </View>
          <Text style={{ color: '#000', fontWeight: 'bold', marginTop: 10 }}>{day}</Text>
        </TouchableOpacity>
      );
    }

    return null;
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#Fbdbda',
      }}
    >
      <Text style={{
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 10,
      }}>Appointments</Text>
      <View>
        <View style={{ marginTop: 40, marginLeft: 10 }}>
          <Text style={{ color: "#e48a87", fontWeight: 'bold' }}>{`${selectedDate.getDate()} ${months[selectedDate.getMonth()]} ${selectedDate.getFullYear()}`}</Text>
          <Text style={{ color: "#000", fontWeight: 'bold', fontSize: 16 }}>Schedule</Text>
        </View>

        <ScrollView
          ref={scrollViewRef}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={{ backgroundColor: '#Fbdbda', }}
        >
          {Array.from({ length: getDaysInMonth(selectedDate.getFullYear(), selectedDate.getMonth()) }, (_, index) => renderDateItem(getDayOfWeek(selectedDate.getFullYear(), selectedDate.getMonth(), index + 1), index))}
        </ScrollView>

      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ backgroundColor: '#fff', borderTopLeftRadius: 30, borderTopRightRadius: 30, flex: 1, marginTop: 25 }}
      >
        <Text style={{ color: "#000", fontWeight: 'bold', marginLeft: 10, marginTop: 20 }}>List of Schedule</Text>
        {scheduleInfo.map((item, index) => (
          <View key={index} style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20, alignItems: 'center' }}>
            <View style={{ marginLeft: 20, width: 70 }}>
              <Text>{item.time}</Text>
            </View>
            <TouchableOpacity style={{
              backgroundColor: ['#5dbe99', '#87ceeb', '#e48a87'][index % 3], 
              height: 50,
              padding: 10,
              borderRadius: 10,
              marginHorizontal: 10,
              flex: 1,
              justifyContent: 'center',
            }}>
              <Text style={{ color: '#fff', fontWeight: 'bold' }}>{item.doctor}</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

    </SafeAreaView>
  );
}


export default Services;