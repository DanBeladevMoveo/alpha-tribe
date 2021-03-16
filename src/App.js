import { usersEcho } from "./helpers/echo";
import { userCharlie } from "./helpers/charlie";
import "./App.css";
import { useState } from "react";

function App() {
  const [charlieInput, setCharlieInput] = useState("");
  const [echoInput, setEchoInput] = useState("");
  const [echoMembers, setEchoMembers] = useState(usersEcho);
  const [charlieMembers, setCharlieMembers] = useState(userCharlie);
  const [couples, setCouples] = useState([]);
  const addMemberEcho = (member) => {
    console.log("addding ", member);
    const newEchoMemebers = [...echoMembers, member];
    console.log(("new", newEchoMemebers));
    setEchoMembers(newEchoMemebers);
    setEchoInput("");
  };

  const addMemberCharlie = (member) => {
    console.log("addding ", member);
    const newCharlieMemebers = [...charlieMembers, member];
    console.log(("new", newCharlieMemebers));
    setCharlieMembers(newCharlieMemebers);
    setCharlieInput("");
  };

  const removeUser = (user, list, team) => {
    const newList = list.filter((member) => user !== member);
    if (team.includes("echo")) {
      setEchoMembers(newList);
    } else {
      setCharlieMembers(newList);
    }
  };

  const formatDate = (d) => {
    let month = "" + (d.getMonth() + 1);
    let day = "" + d.getDate();
    let year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return `${month}/${day}/${year}`;
  };

  const removeItemOnce = (arr, value) => {
    var index = arr.indexOf(value);
    if (index > -1) {
      arr.splice(index, 1);
    }
    return arr;
  };

  const shuffle = () => {
    console.log("here");
    const alphaCouples = [];
    let alpha = echoMembers.concat(charlieMembers);
    let date = new Date("03/17/2021");
    let formattedDate = formatDate(date);
    while (alpha.length > 1) {
      const randomIndexFirst = Math.floor(Math.random() * alpha.length);
      const firstUser = alpha[randomIndexFirst];
      alpha = removeItemOnce(alpha, firstUser);
      const randomIndexSecond = Math.floor(Math.random() * alpha.length);
      const secondUser = alpha[randomIndexSecond];
      alpha = removeItemOnce(alpha, secondUser);
      let couple = {
        first: firstUser,
        second: secondUser,
        date: formattedDate,
      };
      let string = `${couple.first} - ${couple.second} - ${couple.date}`;
      alphaCouples.push(string);
      setCouples(alphaCouples);
      date.setDate(date.getDate() + 7);
      formattedDate = formatDate(date);
    }
  };

  return (
    <div className="container">
      <h1>Alpha Tribe</h1>
      <h2>{echoInput}</h2>
      <div className="members-container">
        <div className="team-container">
          <h2>Echo Members</h2>
          <div className="input-container">
            <input
              onChange={(e) => setEchoInput(e.target.value)}
              placeholder="add member"
              className="add-input"
              value={echoInput}
            />
            <button
              className="add-button"
              onClick={() => addMemberEcho(echoInput)}
            >
              +
            </button>
          </div>
          <ul className="member-list">
            {echoMembers.map((user) => (
              <li key={user} className= "member">
                {user}
                <div
                  className="remove"
                  onClick={() => removeUser(user, echoMembers, "echo")}
                >
                  -
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="team-container">
          <h2>Charlie Members</h2>
          <h2>{charlieInput}</h2>
          <div className="input-container">
            <input
              onChange={(e) => setCharlieInput(e.target.value)}
              placeholder="add member"
              className="add-input"
              value={charlieInput}
            />
            <button
              className="add-button"
              onClick={(e) => addMemberCharlie(charlieInput)}
            >
              +
            </button>
          </div>
          <ul className="member-list">
            {charlieMembers.map((user) => (
              <li key={user} className= "member">
                {user}
                <div
                  className="remove"
                  onClick={() => removeUser(user, charlieMembers, "charlie")}
                >
                  -
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="result-container">
        <buttton onClick={() => shuffle()} className="shuffle-btn">Shuffle</buttton>
        <div className="result-list">
          <ul className="result-list">
            {couples.map((couple) => (
              <li className="member result-member">{couple}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
