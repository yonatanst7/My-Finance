import { useReducer } from 'react';
import { db } from '../firebase/config';
import { collection, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';

let initialState = {
  isLoading: false,
  error: null,
  document: null,
  success: null,
};

const firestoreReducer = (state, action) => {
  switch (action.type) {
    case 'IS_LOADING':
      return { isLoading: true, error: null, document: null, success: null };
    case 'ADDED_DOCUMENT':
      return { isLoading: false, error: null, document: action.payload, success: true };
    case 'DELETED_DOCUMENT':
      return { isLoading: false, error: null, document: null, success: true };
    case 'UPDATED_DOCUMENT':
      return { isLoading: false, error: null, document: action.payload, success: true };
    case 'ERROR':
      return { isLoading: false, error: action.payload, document: null, success: false };
    default:
      return state;
  }
};


export const useFirestore = (collectionName) => {
  const [response, dispatch] = useReducer(firestoreReducer, initialState);

  // collection reference
  const ref = collection(db, collectionName);

  // add a document
  const addDocument = async (doc) => {
    dispatch({ type: 'IS_LOADING' });

    try {
      const newDoc = await addDoc(ref, doc);
      dispatch({ type: 'ADDED_DOCUMENT', payload: newDoc });
    } catch (error) {
      dispatch({ type: 'ERROR', payload: error.code });
    }
  };

  // update a document
  const updateDocument = async (id, updates) => {
    dispatch({ type: 'IS_LOADING' });

    try {
      const docRef = doc(ref, id);
      await updateDoc(docRef, updates);
      dispatch({ type: 'UPDATED_DOCUMENT', payload: updates });
    } catch (error) {
      dispatch({ type: 'ERROR', payload: error.code });
    }
  }

  // delete a document
  const deleteDocument = async (id) => {
    dispatch({ type: 'IS_LOADING' });

    try {
      const docRef = doc(ref, id);
      await deleteDoc(docRef);
      dispatch({ type: 'DELETED_DOCUMENT' });
    } catch (error) {
      dispatch({ type: 'ERROR', payload: error.code });
    }
  }
  
  return { addDocument, updateDocument, deleteDocument, response };
}