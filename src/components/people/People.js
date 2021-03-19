import { React, useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";

import { TextField, Button } from "@material-ui/core/";
import firebase from "firebase";

import { HOME_ROUTE, ABOUT_US_ROUTE } from "../../constants";
import userCharlie, { usersEcho } from "../../helpers/echo";
import { green } from "@material-ui/core/colors";

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
  },
}));

const People = () => {
  const classes = useStyles();
  const history = useHistory();

  const [charlieInput, setCharlieInput] = useState("");
  const [echoInput, setEchoInput] = useState("");
  const [echoMembers, setEchoMembers] = useState(usersEcho);
  const [charlieMembers, setCharlieMembers] = useState(userCharlie);
  const [couples, setCouples] = useState([]);
  const db = firebase.firestore();

  useEffect(async () => {
    db.collection("users")
      .get()
      .then((querySnapshot) => {
        const users = [];
        querySnapshot.forEach((doc) => {
          console.log(doc.data());
          const { member } = doc.data();
          const { id } = doc;
          users.push({ id, member });
        });
        setCharlieMembers(users);
      })
      .catch((err) => console.log("err:", err));
  }, []);

  const onButtonClick = (path) => {
    history.push(path);
  };
  const addMemberEcho = (member) => {
    console.log("addding ", member);
    const newEchoMemebers = [...echoMembers, member];
    console.log(("new", newEchoMemebers));
    setEchoMembers(newEchoMemebers);
    setEchoInput("");
  };

  const addMemberCharlie = async (member) => {
    const newCharlieMemebers = [...charlieMembers, member];
    db.collection("users")
      .doc()
      .set({ member })
      .then((res) => console.log("success adding user to firebase"))
      .catch((err) => console.log("failed adding: ", member, err));
    setCharlieMembers(newCharlieMemebers);
    setCharlieInput("");
  };

  const removeUser = (user, list) => {
    const newList = list.filter((member) => user !== member);
    setCharlieMembers(newList);
  };

  return (
    <div className="container">
      <h1>Alpha Stars</h1>
      <h2>{charlieInput}</h2>
      <TextField
        id="outlined-search"
        className={classes.textInput}
        value={charlieInput}
        onChange={(e) => setCharlieInput(e.target.value)}
        label="Add Star"
        type="search"
        variant="outlined"
      />
      <Button
        variant="contained"
        size="large"
        color="primary"
        className={classes.buttton}
        onClick={() => addMemberCharlie(charlieInput)}
      >
        ADD
      </Button>
      <div className="team-container">
        <ul className="member-list">
          {charlieMembers.map((user) => (
            <li key={user.id} className="member">
              {user.member}
              <div
                className="remove"
                onClick={() => removeUser(user, charlieMembers)}
              >
                -
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default People;
