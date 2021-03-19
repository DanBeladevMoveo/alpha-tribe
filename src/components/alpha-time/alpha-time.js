import {React, useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import firebase from "firebase";
import usersAlpha from '../../helpers/alpha';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

const AlphaTime = () => {
  const [couples, setCouples] = useState([]);
  const db = firebase.firestore();


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
    let alpha = usersAlpha;
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
      <div className="result-container">
        <buttton onClick={() => shuffle()} className="shuffle-btn">
          Shuffle
        </buttton>
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
};

export default AlphaTime;

