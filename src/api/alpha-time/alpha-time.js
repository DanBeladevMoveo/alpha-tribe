// import firebase from "firebase";
import { APIUtils } from "../APIUtils";


const setCurrentAlphaTime = async (id, newArray) => {
    try {
    const db = await APIUtils.getCollection('alpha-time');
    await db.doc(id).set({alphaCouples: newArray});
  } catch (error) {
    return APIUtils.handleError(error, "");
  }
};

const getCurrentAlphaTime = async () => {
    try {
    const db = await APIUtils.getCollection('alpha-time');
    const res = await db.get();
    return res;
  } catch (error) {
    return APIUtils.handleError(error, {});
  }
};


const saveCouples = async (alphaCouples) => {
    try {
    const db = await APIUtils.getCollection('alpha-time');
    const res = db.doc().set({ alphaCouples })
    return res;
  } catch (error) {
    return APIUtils.handleError(error, {});
  }
};

export const AlphsTimeAPI = {
    setCurrentAlphaTime: setCurrentAlphaTime,
    getCurrentAlphaTime: getCurrentAlphaTime,
    saveCouples: saveCouples
};

export default AlphsTimeAPI;
