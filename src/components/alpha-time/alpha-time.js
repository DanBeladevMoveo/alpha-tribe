/* eslint-disable react-hooks/exhaustive-deps */
import { React, useEffect, useState } from "react";
import firebase from "firebase";
import usersAlpha from "../../helpers/alpha";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import SaveIcon from '@material-ui/icons/Save';

const AlphaTime = () => {
  const [couples, setCouples] = useState([]);
  const [id, setID] = useState('');
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
            setID(current.id);
            //  console.log('current:', current, ' currentdata: ',current.data());
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

  const saveWeek = (couple, i) => {

    if(isSaveIconDisabled(couple,i)) return

    const firstValue = document.getElementById('first' + i).value;
    const secondValue = document.getElementById('second' + i).value;
    const dateValue = document.getElementById('date' + i).value;

    const payload = {
      first: firstValue, second: secondValue, date: dateValue 
    }
    const newArray = [...couples];
    newArray[i] = payload;
    db.collection("alpha-time")
    .doc(id)
    .set({alphaCouples: newArray})
    .then((res) => {
       console.log("update couple successfuly", res);
        setCouples(newArray);
        alert('updated successfully');
      })
    .catch((err) => {
        console.error("failed get alpha time");
      });
  };

  const isSaveIconDisabled = (couple, i) => {
    const firstValue = document.getElementById('first' + i)?.value;
    const secondValue = document.getElementById('second' + i)?.value;
    const dateValue = document.getElementById('date' + i)?.value;
    return (couple.first === firstValue && couple.second === secondValue && couple.date === dateValue)
  }

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
        first: firstUser?.name || null,
        second: secondUser?.name || null,
        date: formattedDate,
      };
      alphaCouples.push(couple);
      date.setDate(date.getDate() + 7);
      formattedDate = formatDate(date);
    }
    setCouples(alphaCouples);
    saveCouples(alphaCouples);
  };

return (
    <div className="container">
      <div className="result-container">
        <div className="btn-container">
        <button onClick={() => Shuffle()} className="shuffle-btn">
          Shuffle
        </button>
          <div className="date-container">
            <span className="date-text">Start Date</span>
            <DatePicker
              className="date-picker"
              selected={startDate}
              onChange={(date) => setStartDate(date)}
            />
          </div>
        </div>
        <div className="result-list">
          <ul className="result-list">
            {couples && couples.map((couple,i) => (
              <li key={couple.first} className="member result-member">
                <input id={ `first${i}`} className="member-input" defaultValue={couple.first}/><span className="operator">+</span><input id={`second${i}`} className="member-input" defaultValue={couple.second}/> <span className="operator">=</span><input id={`date${i}`} className="member-input" defaultValue={couple.date}/>
                <SaveIcon className="save" onClick = {() => saveWeek(couple,i)}></SaveIcon>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AlphaTime;
