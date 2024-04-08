import firestore from '@react-native-firebase/firestore';
import { client } from '../utils/helpers';

export const addUserDetails = formState => {
  firestore()
    .collection('users')
    .add({
      ...formState,
    })
    .then(() => {
      console.log('User added!');
    })
    .catch(error => {
      console.log('Error adding user: ', error);
    });
};
export const getTodoListByEmail = async(setList) =>{
const {email} = await client.getUserDetails()
    firestore().collection('todos').where("createdBy", "==", email).get().then((querySnapshot) => {
        const data = []
        querySnapshot.docs.forEach((doc) => {
              const docData = {...doc.data(), id: doc.id};
              data.push(docData);
        });
        setList(data)
    }).catch((e) => {
        console.log(e)
    })
}
export const addTodo = (todoState,setList) =>{
    firestore()
      .collection('todos')
      .add({
        title: todoState?.name,
        color: todoState?.color,
        todos: [],
        createdBy: todoState?.email,
      })
      .then(docRef => {
        console.log('Document written with ID: ', docRef.id);
        getTodoListByEmail(setList)
      })
      .catch(error => {
        console.error('Error adding document: ', error);
      });
}

export const addTodoItems = (todoState,setSelected,setList) => {
  firestore()
    .collection('todos').doc(todoState?.docId)
    .update({
      todos: firestore.FieldValue.arrayUnion({
        name: todoState?.name,
        done: todoState?.done,
        email: todoState?.email,
      }),
    })
    .then(docRef => {
        getTodoItemById(todoState?.docId, setSelected);
        getTodoListByEmail(setList)
    })
    .catch(error => {
      console.error('Error adding document: ', error);
    });
};

export const updateTodoDone = async(id ,arrayIndex, setSelected, setList) =>{
   try {
      const documentRef = firestore().collection('todos').doc(id);
      const documentSnapshot = await documentRef.get();

      if (documentSnapshot.exists) {
        const data = documentSnapshot.data();
        data.todos[arrayIndex].done = !data.todos[arrayIndex].done;
        await documentRef.update({
          todos: data.todos,
        }).then(()=>{
            getTodoItemById(id,setSelected);
            getTodoListByEmail(setList);
        })
        console.log('Boolean value updated successfully!');
      } else {
        console.log('Document does not exist.');
      }
    } catch (error) {
      console.error('Error updating boolean value:', error);
    }
}

export const deleteTodo = async (id, arrayIndex, setSelected, setList) => {
  try {
    const documentRef = firestore().collection('todos').doc(id);
    const documentSnapshot = await documentRef.get();

    if (documentSnapshot.exists) {
      const data = documentSnapshot.data();
      const newArray = [...data.todos];
      newArray.splice(arrayIndex, 1);
      await documentRef
        .update({
          todos: newArray,
        })
        .then(() => {
          getTodoItemById(id, setSelected);
          getTodoListByEmail(setList);
        });
      console.log('task deleted successfully!');
    } else {
      console.log('Document does not exist.');
    }
  } catch (error) {
    console.error('Error deleting the task', error);
  }
};

export const getTodoItemById = (id,setSelected) => {
  firestore()
    .collection('todos')
    .doc(id)
    .get()
    .then(doc => {
      if (doc.exists) {
        setSelected({
          items: doc.data(),
          id: doc.id,
          completedTask: doc.data().todos.filter((todo: any) => todo.done)?.length,
          remainingTask: doc.data().todos.length - doc.data().todos.filter((todo: any) => todo.done)?.length,
        })
      } else {
        // doc.data() will be undefined in this case
        console.log('No such document!');
      }
    })
    .catch(error => {
      console.log('Error getting document:', error);
    });
};
