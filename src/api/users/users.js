import firebase from 'firebase'

const db = firebase.firestore();
const users = db.collection('users');


export const addUser = (user) => {
    users.doc()
    .set({ user })
    .then((res) => console.log("success adding user to firebase ", res))
    .catch((err) => handleError(err));
}
export default addUser;


const handleError = (err) => {
    console.error("something went wrong: " + err);
}

