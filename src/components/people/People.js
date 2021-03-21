/* eslint-disable react-hooks/exhaustive-deps */
import { React, useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";

import { TextField, Button } from "@material-ui/core/";
import firebase from "firebase";

import { green } from "@material-ui/core/colors";
import usersAlpha from "../../helpers/alpha";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  appBar: {
    backgroundColor: "black",
  },
  buttton: {
    color: green,
    backgroundColor: "black",
    height: "55px",
    margineft: "10px",
  },
  textInput: {
    marginRight: "14px",
    width: "50%",
  },
}));

const People = () => {
  const classes = useStyles();
  const [input, setInput] = useState("");
  const [members, setMembers] = useState(usersAlpha);

  const db = firebase.firestore();

  useEffect(() => {
    async function fetchData() {
      db.collection("users")
        .get()
        .then((querySnapshot) => {
          const users = [];
          querySnapshot.forEach((doc) => {
            const { user } = doc.data();
            const { id } = doc;
            users.push({ id, user });
          });
          console.log(users);
          setMembers(users);
        })
        .catch((err) => console.log("err:", err));
    }
      fetchData();


  }, []);

  const addMember = async (user) => {
    db.collection("users")
      .doc()
      .set({ user })
      .then((res) => console.log("success adding user to firebase"))
      .catch((err) => console.log("failed adding: ", user, err));
    setInput("");
  };

  const addToFirebase = () => {
    usersAlpha.forEach((user) => {
      db.collection("users")
        .doc()
        .set({ user })
        .then(() => console.log("success adding user to firebase"))
        .catch((err) => console.log("failed adding: ", user, err));
    });
  };

  const removeUser = (user) => {
    const newList = members.filter((member) => user.id !== member.id);
    setMembers(newList);
    db.collection("users")
      .doc(user.id)
      .delete()
      .then(() => console.log(user.user + " successfully removed"))
      .catch((err) => console.log("failed adding: ", user, err));
  };

  return (
    <div className="container">
      <h1 onClick={addToFirebase}>Alpha Stars</h1>
      <TextField
        id="outlined-search"
        className={classes.textInput}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        label="Add Star"
        type="search"
        variant="outlined"
      />
      <Button
        variant="contained"
        size="large"
        color="primary"
        className={classes.buttton}
        onClick={() => addMember(input)}
      >
        ADD
      </Button>
      <div className="team-container">
        <ul className="member-list">
          {members.map((user) => (
            <li key={user.id} className="member">
              <div className="remove" onClick={() => removeUser(user)}>
                -
              </div>
              {user.user}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default People;
