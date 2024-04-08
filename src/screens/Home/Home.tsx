import {
  Alert,
  Dimensions,
  FlatList,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {fontFamilyBold, fontFamilyRegular} from '../../styles/globalStyles';
import CustomHeader from '../../components/CustomHeader/CustomHeader';
import {useSelector} from 'react-redux';
import CustomButton from '../../components/CustomButton/CustomButton';
import {TemporaryData} from '../../assets/mockData/TemporaryData';
import Icon from 'react-native-vector-icons/FontAwesome';
import Modal from '../../components/Modal/Modal';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { addTodo, addTodoItems, deleteTodo, getTodoItemById, getTodoListByEmail, updateTodoDone } from '../../firebaseApis';
import { useFocusEffect } from '@react-navigation/native';
import  firestore from '@react-native-firebase/firestore';

const Home = () => {
  const {fontScale} = useWindowDimensions();
  const styles = makeStyles(fontScale);
  const authState = useSelector((state: any) => state.authState);
  const [modalVisible, setModalVisible] = useState(false);
  const [innerModalVisible, setInnerModalVisible] = useState(false);
  const [name, setName] = useState('');
  const [list, setList] = useState(TemporaryData);
  const [tasks,setTasks] = useState({
    completedTask: 0,
    remainingTasks: 0
  })
  const [selected, setSelected] = useState({
    items: {},
    completedTask: 0,
    remainingTask: 0,
  });
  useFocusEffect(
    useCallback(()=>{
    getTodoListByEmail(setList)
  },[]))
  const backgroundColor = [
    '#5cd859',
    '#24a6d9',
    '#595bd9',
    '#8022d9',
    '#d159d8',
    '#d85963',
    '#d88589',
  ];
  const [color, setColor] = useState(backgroundColor[0]);
  const iconNames = [
    'rocket',
    'star',
    'heart',
    'bell',
    'user',
    'globe',
    'camera',
    'coffee',
  ];
  const getRandomIndex = () => {
    return Math.floor(Math.random() * iconNames.length);
  };
  const renderColor = () => {
    return backgroundColor.map((color: string) => {
      return (
        <TouchableOpacity
          style={[styles.colorPicker, {backgroundColor: color}]}
          onPress={() => {
            setColor(color);
          }}
        />
      );
    });
  };
  const renderItems = (items: any) => {
    const completedItems = items.todos.filter((todo: any) => todo.done)?.length;
    const remainingItem = items?.todos.length - completedItems;
    return (
      <TouchableOpacity
        onPress={() => {
          setInnerModalVisible(true),
          getTodoItemById(items?.id,setSelected)
            // setSelected({
            //   items: items,
            //   completedTask: completedItems,
            //   remainingTask: remainingItem,
            // });
        }}
        style={[styles.ItemContainer, {backgroundColor: items?.color}]}>
        <View>
          <Text style={styles.Itemname}>{items.title}</Text>
          <Text style={styles.ItemRemaining}>
            Items Remaining: {remainingItem}
          </Text>
          <Text style={styles.ItemCompleted}>
            Items Completed: {completedItems}
          </Text>
        </View>
        <View style={{alignSelf: 'center'}}>
          <Icon
            name={iconNames[getRandomIndex()]}
            size={50}
            color="#ffffff"
            style={styles.ItemIcon}
          />
        </View>
      </TouchableOpacity>
    );
  };
  const renderTodoList = (items: any, index: number) => {
    return (
      <View style={{flexDirection: 'row', marginVertical: 10, gap: 12}}>
        <AntDesign
          name={items?.done ? 'checksquare' : 'checksquareo'}
          color={items?.done?'grey':selected?.items?.color}
          size={24}
          onPress={() => {toggleTodoList(index, items)}}
        />
        <View style={{flexDirection:'row', justifyContent:'space-between',width: width/1.3}}>
        <Text
          style={[
            styles?.Itemname,
            {
              color: items?.done ?'grey':'#000',
              fontSize: 16 / fontScale,
              textDecorationLine: items?.done ? 'line-through' : 'none',
            },
          ]}>
          {items?.name}
        </Text>
        <AntDesign
        name='delete'
        size={20}
        color={'red'}
        onPress={()=>{deleteTodo(selected?.id,index,setSelected,setList)}}
        />
        </View>
      </View>
    );
  };
  const createTodo = () => {
    if(name==""){
      Alert.alert('Please Enter the name')
    }else{
      addTodo({
        name: name,
        color: color,
        todos: [],
        email: authState?.userDetails?.email,
      },setList);
      setModalVisible(false);
      setName('')
      setColor(backgroundColor[0])
    }
  };
  const onAddTask = () =>{
    if(name==""){
      Alert.alert("Please Enter the task name")
    }else{
      console.log("slected at on add", selected)
      let formData = {
        name: name,
        done: false,
        email: authState?.userDetails?.email,
        docId: selected?.id
      };
      addTodoItems(formData,setSelected,setList)
      setName('')
    }
  }
  const toggleTodoList = (index: number, items: any) => {
    let data = selected?.items;
    data.todos[index].done = !data.todos[index].done;
    updateTodoDone(selected?.id,index,setSelected,setList)
  };
  return (
    <View style={styles.container}>
      <CustomHeader title="Actionex" />
      <View style={{padding: 32}}>
        <View style={styles.mainContainer}>
          <Text style={styles.lists}>All Lists</Text>
          <CustomButton
            variant="secondary"
            title="Add Item"
            onPress={() => {
              setModalVisible(true);
            }}
            style={styles.btn}
          />
        </View>
        <FlatList
          contentContainerStyle={{paddingVertical: 20, paddingBottom: 100}}
          showsVerticalScrollIndicator={false}
          data={list}
          renderItem={({item}) => renderItems(item)}
          keyExtractor={(_, index) => index.toString()}
        />
      </View>
      {/* Add items Modal */}
      <Modal
        isVisible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <KeyboardAvoidingView behavior="padding" style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.closeBtn}
            onPress={() => setModalVisible(false)}>
            <AntDesign name="close" size={26} color="grey" />
          </TouchableOpacity>
          <Text style={styles.modalHeaderText}>Create Todo List</Text>
          <TextInput
            style={styles.input}
            placeholder="Add Name"
            placeholderTextColor={'grey'}
            onChangeText={text => setName(text)}
            value={name}
          />
          <View style={styles.colorContainer}>{renderColor()}</View>
          <CustomButton
            title="Create"
            onPress={() => {
              createTodo();
            }}
            style={{width: width / 1.3, backgroundColor: color}}
          />
        </KeyboardAvoidingView>
      </Modal>
      {/* Edit Item Modal */}
      <Modal
        isVisible={innerModalVisible}
        onRequestClose={() => setInnerModalVisible(false)}>
        <View>
          <View style={styles.headerContainer}>
            <Text style={[styles.modalHeaderText, {paddingBottom: 10}]}>
              {selected?.items?.title}
            </Text>
            <Text style={styles.subtitle}>
              {`${selected?.completedTask} of ${selected?.remainingTask} tasks`}
            </Text>
            <View
              style={[
                styles.divider,
                {backgroundColor: selected?.items?.color},
              ]}
            />
          </View>
          <TouchableOpacity
            style={styles.closeBtn}
            onPress={() => setInnerModalVisible(false)}>
            <AntDesign name="close" size={26} color="grey" />
          </TouchableOpacity>
          <View style={{paddingHorizontal: 32}}>
            <FlatList
              data={selected?.items?.todos}
              renderItem={({item, index}) => renderTodoList(item, index)}
              keyExtractor={(__, index) => index.toString()}
            />
          </View>
        </View>
        <KeyboardAvoidingView
          behavior="padding"
          style={{padding: 32, position: 'absolute', bottom: 20}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              gap: 10,
            }}>
            <TextInput
              placeholder="Add Tasks"
              placeholderTextColor={'grey'}
              style={[styles.input, {width: width / 1.5}]}
              onChangeText={text => setName(text)}
              value={name}
            />
            <CustomButton
              onPress={() => {onAddTask()}}
              title="Add"
              style={{
                width: 84,
                height: 50,
                alignSelf: 'center',
                marginTop: 20,
                backgroundColor: selected?.items?.color,
              }}
            />
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
};

export default Home;
const {width} = Dimensions.get('window');
const makeStyles = (fontScale: number) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f4f4f4',
    },
    mainContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    lists: {
      fontSize: 20 / fontScale,
      fontFamily: fontFamilyBold,
      color: '#000',
    },
    btn: {
      width: width / 5,
      height: 50,
    },
    ItemContainer: {
      width: width / 1.18,
      backgroundColor: '#fff',
      padding: 20,
      borderRadius: 8,
      marginVertical: 6,
      shadowOffset: {
        width: 5,
        height: 3,
      },
      shadowOpacity: 0.07,
      shadowRadius: 6.65,
      elevation: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    Itemname: {
      fontSize: 20 / fontScale,
      fontFamily: fontFamilyBold,
      color: '#fff',
    },
    ItemRemaining: {
      fontSize: 16 / fontScale,
      fontFamily: fontFamilyBold,
      color: '#fff',
      marginVertical: 5,
    },
    ItemCompleted: {
      fontSize: 16 / fontScale,
      fontFamily: fontFamilyBold,
      color: '#fff',
    },
    ItemIcon: {
      backgroundColor: 'transparent',
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
    },
    modalContainer: {
      justifyContent: 'center',
      backgroundColor: '#fff',
      alignItems: 'center',
      flex: 1,
    },
    headerContainer: {
      marginVertical: 30,
      paddingLeft: 80,
      alignSelf: 'flex-start',
    },
    modalHeaderText: {
      fontSize: 26 / fontScale,
      fontFamily: fontFamilyBold,
      color: '#000',
    },
    closeBtn: {
      position: 'absolute',
      top: 30,
      right: 20,
    },
    input: {
      borderWidth: StyleSheet.hairlineWidth,
      borderRadius: 6,
      color: '#000',
      fontSize: 16 / fontScale,
      fontFamily: fontFamilyRegular,
      padding: 10,
      width: width / 1.3,
      marginTop: 20,
    },
    colorPicker: {
      width: 30,
      height: 30,
      padding: 10,
      margin: 8,
      borderRadius: 100 / 2,
    },
    colorContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 20,
    },
    divider: {
      width: width / 1.2,
      backgroundColor: 'grey',
      height: 2,
    },
    subtitle: {
      fontSize: 14 / fontScale,
      fontFamily: fontFamilyRegular,
      color: '#000',
      paddingBottom: 8,
      marginLeft: 5,
    },
  });
