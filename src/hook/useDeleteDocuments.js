import {deleteDoc, doc, Timestamp} from 'firebase/firestore';
import { useEffect, useReducer, useState } from 'react';
import {db} from '../firebase/config'
const initialState = {
    loading: null,
    error: null
}

const deleteReducer = (state, action) => {
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

export const useDeleteDocument = (docCollection) => {
    const [response, dispatch] = useReducer(deleteReducer, initialState);

    const [cancelled, setCancelled] = useState(false)

    const checkCancelBeforeDispatch = (action) => {
        if(!cancelled){
            dispatch(action)
        }
    }

      const deleteDocument = async (id) => {
        try {
            checkCancelBeforeDispatch({
                type: "LOADING",
            })
            
            const deletedDocument = await deleteDoc(doc(db, docCollection, id))

            checkCancelBeforeDispatch({
                type: "DELETED_DOC",
                payload: deletedDocument
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

      return { deleteDocument, response}
}