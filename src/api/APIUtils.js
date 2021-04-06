import firebase from "firebase";

const getCollection = async (collectionName) => {
    try {
      const db = await firebase.firestore();
      const collection = await db.collection(collectionName);
      return collection;
    } catch (error) {
      return handleError(error, {});
    }
  };
  
  const handleError = (err, defaultType) => {
    console.error("something went wrong: " + err);
    return defaultType;
  };

  export const APIUtils = {
      getCollection: getCollection,
      handleError: handleError
  }

  export default APIUtils;