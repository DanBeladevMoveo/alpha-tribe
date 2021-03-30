/* eslint-disable react-hooks/exhaustive-deps */
import { React, useEffect, useState } from "react";
import firebase from "firebase";
import usersAlpha from "../../helpers/alpha";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AlphaTime = () => {
  const [couples, setCouples] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const db = firebase.firestore();

  useEffect(() => {
    async function fetchData() {
    db.collection("alpha-time")
      .get()
      .then((res) => {
         console.log("get alpha time successfuly", res);
         const isEmpty = res.empty;
          if (!isEmpty) {
            const current = res.docs[res.docs.length - 1];
             console.log(current.data());
            const { alphaCouples } = current.data();
             setCouples(alphaCouples);
         }
        })
      .catch((err) => {
          console.error("failed get alpha time");
        });
      }
      fetchData();
  }, []);


  const saveCouples = (alphaCouples) => {
      console.log('going to save: ', alphaCouples);
    db.collection("alpha-time")
    .doc()
    .set({alphaCouples})
    .then((res) => {
       console.log("update alpha time successfuly" + res)})
    .catch((err) => {
        console.error("failed set alpha time")});
  }

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

  const Shuffle = () => {
    const alphaCouples = [];
    let alpha = [...usersAlpha];
    let date = new Date(startDate);
    let formattedDate = formatDate(date);
    while (alpha.length > 0) {
      const randomIndexFirst = Math.floor(Math.random() * alpha.length);
      const firstUser = alpha[randomIndexFirst];
      alpha = removeItemOnce(alpha, firstUser);
      const randomIndexSecond = Math.floor(Math.random() * alpha.length);
      const secondUser = alpha[randomIndexSecond];
      alpha = removeItemOnce(alpha, secondUser);
      let couple = {
        first: firstUser?.name,
        second: secondUser?.name,
        date: formattedDate,
      };
      let string = couple.second
        ? `${couple.first} - ${couple.second} - ${couple.date}`
        : `${couple.first} - ${couple.date}`;
      alphaCouples.push(string);
      setCouples(alphaCouples);
      date.setDate(date.getDate() + 7);
      formattedDate = formatDate(date);
    }
    saveCouples(alphaCouples);
  };

return (
    <div className="container">
      <div className="result-container">
        <div className="btn-container">
        <buttton onClick={() => Shuffle()} className="shuffle-btn">
          Shuffle
        </buttton>
          <div className="date-container">
            <span className="date-text">Start Date</span>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
            />
          </div>
        </div>
        <div className="result-list">
          <ul className="result-list">
            {couples.map((couple) => (
              <li className="member result-member" key={couple.toString()}>
                {couple}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AlphaTime;
