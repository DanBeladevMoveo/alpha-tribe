/* eslint-disable react-hooks/exhaustive-deps */
import { React, useState, useEffect, Fragment } from "react";
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
  const [members, setMembers] = useState([]);

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

  const setColor = (member) => {
    let color = '';
    switch (member.user.team) {
      case 'Charlie':
        color = 'rebeccapurple';
        break;
      case 'Hotel':
        color = 'red'
        break;
      case 'Echo':
        color = 'orange'
        break;
      case 'Alpha':
          color = 'grey'
        break;
      default:
        color = 'rebeccapurple';
        break;
    }

    return color;
  }

  const addMember = async (user) => {
    db.collection("users")
      .doc()
      .set({ user })
      .then(() => console.log("success adding user to firebase"))
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
      <h1 className="alpha-title" onClick={()=> { 
        if(window.confirm('Are you sure you wish to add all users to list?')) addToFirebase()
        }}>Alpha Stars</h1>
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
          {members && members.map((member) => (
            <li key={member.id} className="member">
              <Fragment>
              <div className="remove" onClick={() => {  
                if(window.confirm('Are you sure you wish to remove '+ member.user.name + '?')) {
                  var return_value = prompt("Password:");
                  if(return_value==="11") removeUser(member);
                }
              }}>
                <img alt="" src="https://upload.wikimedia.org/wikipedia/commons/d/de/OOjs_UI_icon_trash-destructive.svg"></img>
              </div>
                {member.user.name}
                <br></br>
                <span className="team" style={{color: setColor(member) }}>{member.user.team}</span>
              </Fragment>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default People;
