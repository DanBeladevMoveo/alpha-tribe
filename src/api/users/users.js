import APIUtils from "../APIUtils";

const addUser = async (user) => {
  try {
    const collection = await APIUtils.APIUtils.getCollection("users");
    const res = await collection.doc().set({ user: user });
    console.log("success adding user to firebase ", res);
    return res;
  } catch (error) {
    return APIUtils.APIUtils.handleError(error, {});
  }
};
const getUsers = async () => {
  try {
    const collection = await APIUtils.getCollection("users");
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
    return APIUtils.handleError(error, []);
  }
};

const setUsers = async (users) => {
  try {
    const db = await APIUtils.getCollection("users");
    users.forEach(async (user) => {
      await db.doc().set({ user });
    });
  } catch (error) {
    return APIUtils.handleError(error, []);
  }
};

const removeUser = async (user) => {
  try {
    const db = await APIUtils.getCollection("users");
    const res = await db.doc(user.id).delete();
    console.log(res + " was deleted");
  } catch (error) {
    return APIUtils.handleError(error, "");
  }
};

export const UsersAPI = {
  addUser: addUser,
  getUsers: getUsers,
  setUsers: setUsers,
  removeUser: removeUser,
};

export default UsersAPI;
