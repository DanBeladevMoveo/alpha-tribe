/* eslint-disable react-hooks/exhaustive-deps */
import { React, useEffect, useState } from "react";
import usersAlpha from "../../helpers/alpha";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import SaveIcon from "@material-ui/icons/Save";
import { AlphsTimeAPI } from "../../api/alpha-time/alpha-time";

const AlphaTime = () => {
  const [couples, setCouples] = useState([]);
  const [id, setID] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [startDate, setStartDate] = useState(new Date());


  useEffect(() => {
    async function fetchData() {
      try {
        const currentAlphaTime = await AlphsTimeAPI.getCurrentAlphaTime();
        console.log("get alpha time successfuly", currentAlphaTime);
        const isEmpty = currentAlphaTime.empty;
        if (!isEmpty) {
          const current =
            currentAlphaTime.docs[currentAlphaTime.docs.length - 1];
          setID(current.id);
          const { alphaCouples } = current.data();
          setCouples(alphaCouples);
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  const saveCouples = async (alphaCouples) => {
    console.log("going to save: ", alphaCouples);
    await AlphsTimeAPI.saveCouples(alphaCouples);
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

  const getPayload = (index) => {
    const firstValue = document.getElementById("first" + index).value;
    const secondValue = document.getElementById("second" + index).value;
    const dateValue = document.getElementById("date" + index).value;

    let payload = {
      first: firstValue,
      second: secondValue,
      date: dateValue,
    };
    return payload;
  };

  const saveWeek = async (couple, i) => {
    if (isSaveIconDisabled(couple, i)) return;

    let payload = getPayload(i);

    const newArray = [...couples];
    newArray[i] = payload;
    const res = await AlphsTimeAPI.setCurrentAlphaTime(id, newArray);
    console.log("res: ", res);
    setCouples(newArray);
    alert("updated successfully");
  };

  const Edit = () => {
      var return_value = prompt("Password:");
      if(return_value==="11"){
        setEditMode(!editMode);
      } 
  }

  const isSaveIconDisabled = (couple, i) => {
    const firstValue = document.getElementById("first" + i)?.value;
    const secondValue = document.getElementById("second" + i)?.value;
    const dateValue = document.getElementById("date" + i)?.value;
    return (
      couple.first === firstValue &&
      couple.second === secondValue &&
      couple.date === dateValue
    );
  };

  const getCouple = (alpha, formattedDate) => {
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

    return couple;
  }

  const Shuffle = () => {
    const alphaCouples = [];
    let alpha = [...usersAlpha];
    let date = new Date(startDate);
    let formattedDate = formatDate(date);
    while (alpha.length > 0) {
      const couple = getCouple(alpha, formattedDate);
      alphaCouples.push(couple);
      date.setDate(date.getDate() + 7);
      formattedDate = formatDate(date);
    }
    setCouples(alphaCouples);
    saveCouples(alphaCouples);
  };

  const dateOver = (date) => {
    return new Date(date) < new Date() 
  }

  return (
    <div className="container">
      <div className="result-container">
          {!editMode && <button onClick={() => Edit()} className="shuffle-btn">
            Edit
          </button>}
          {editMode && <div className="btn-container">
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
        </div>}
        <div className="result-list">
          <ul className="result-list">
            {couples &&
              couples.map((couple, i) => (
                <li key={couple.first} className="member result-member">
                  <input
                    id={`first${i}`}
                    className={dateOver(couple.date) ?'member-input done' : 'member-input'}
                    defaultValue={couple.first}
                  />
                  <span className="operator">+</span>
                  <input
                    id={`second${i}`}
                    className={dateOver(couple.date) ?'member-input done' : 'member-input'}
                    defaultValue={couple.second}
                  />{" "}
                  <span className="operator">=</span>
                  <input
                    id={`date${i}`}
                    className={dateOver(couple.date) ?'member-input done' : 'member-input'}
                    defaultValue={couple.date}
                  />
                  {editMode && <SaveIcon
                    className="save"
                    onClick={() => saveWeek(couple, i)}
                  ></SaveIcon>}
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AlphaTime;
