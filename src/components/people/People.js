/* eslint-disable react-hooks/exhaustive-deps */
import { React, useState, useEffect, Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";

import { TextField, Button } from "@material-ui/core/";

import { green } from "@material-ui/core/colors";
import usersAlpha from "../../helpers/alpha";
import { API } from "../../api/users/users";

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


  useEffect(() => {
    async function fetchData() {
      try {
        console.log('users alopha',usersAlpha)
        const users = await API.getUsers();
        setMembers(users);
      } catch (error) {
        console.error(error);
      }
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
    try {
      const payload = {
          name: user,
          team: 'Charlie'
      }
      await API.addUser(payload);
      // setMembers([...members, payload]);
      setInput("");
    } catch (error) {
      console.error(error);
    }
  };

  const addToFirebase = async () => {
      await API.setUsers(usersAlpha);
  };

  const removeUser = async (user) => {
    try {
      const newList = members.filter((member) => user.id !== member.id);
      setMembers(newList);
      const res = await API.removeUser(user);
      console.log('res of removing: ',res);
    } catch (error) {
      console.error(error);
    }
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
        
          {members && members.sort((a, b) => a.user.team > b.user.team ? 1 : -1)
          .map((member, i) => (
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
