import {collection, addDoc, Timestamp} from 'firebase/firestore';
import { useEffect, useReducer, useState } from 'react';
import {db} from '../firebase/config'
const initialState = {
    loading: null,
    error: null
}

const insertReducer = (state, action) => {
    switch (action.type) {
        case "LOADING":
            return { loading: true, error: null }
        case "ÏNSERTED_DOC":
            return { loading: false, error: null }
        case "ERROR": 
            return {loading: false, error: action.payload}
        default: state
    }
}

export const useInsertDocument = (docCollection) => {
    const [response, dispatch] = useReducer(insertReducer, initialState);

    const [cancelled, setCancelled] = useState(false)

    const checkCancelBeforeDispatch = (action) => {
        if(!cancelled){
            dispatch(action)
        }
    }

      const insertDocument = async (document) => {
        try {
            checkCancelBeforeDispatch({
                type: "LOADING",
                payload: insertDocument
            })
            const newDocument = {...document, createdAt: Timestamp.now()}
            const insertDocument = await addDoc(
                collection(db, docCollection),
                newDocument
            )

            checkCancelBeforeDispatch({
                type: "ÏNSERTED_DOC",
                payload: insertDocument
            })
        } catch (error) {
            checkCancelBeforeDispatch({
                type: "ERROR",
                payload: error.message
            })
        }
      }

      useEffect(() => {
        return () => setCancelled(true)
      }, [])

      return { insertDocument, response}
}