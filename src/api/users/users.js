import firebase from "firebase";

const addUser = async (user) => {
  try {
    const collection = await getCollection("users");
    const res = await collection.doc().set({ user: user });
    console.log("success adding user to firebase ", res);
    return res;
  } catch (error) {
    return handleError(error);
  }
};
const getUsers = async () => {
  try {
    const collection = await getCollection("users");
    const querySnapshot = await collection.get();
    const users = [];
    querySnapshot.forEach((doc) => {
      const { user } = doc.data();
      const { id } = doc;
      users.push({ id, user });
    });
    console.log('users: ', users)
    return users;
  } catch (error) {
    return handleError(error);
  }
};

const setUsers = async (users) => {
  try {
    const db = await getCollection("users");
    users.forEach(async (user) => {
      await db.doc().set({ user });
    });
  } catch (error) {
    return handleError(error, []);
  }
};

const removeUser = async (user) => {
  try {
    const db = await getCollection("users");
    const res = await db.doc(user.id).delete();
    console.log(res + " was deleted");
  } catch (error) {
    return handleError(error, "");
  }
};

const getCollection = async (collectionName) => {
  try {
    const db = await firebase.firestore();
    const collection = await db.collection(collectionName);
    return collection;
  } catch (error) {
    return handleError(error);
  }
};

const handleError = (err, defaultType) => {
  console.error("something went wrong: " + err);
  return defaultType;
};

export const API = {
  addUser: addUser,
  getUsers: getUsers,
  setUsers: setUsers,
  removeUser: removeUser,
};

export default API;
