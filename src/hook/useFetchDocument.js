import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";

// O uid vai ser para pegar os dados do usuario

export const useFecthDocuments = (docCollection, search = null, uid = null) => {
    const [documents, setDocuments] = useState(null);
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(null)

    // deal with memory leak
    const [cancelled, setCancelled] = useState(false);

    useEffect(() => {
        async function loadData() {
            if(cancelled) return
            setLoading(true)
            const collectionRef = await collection(db, docCollection)
            
            try {
                let q;
                if(search){
                    q = await query(
                        collectionRef,
                        where("tags", "array-contains", search),
                        orderBy("createdAt", "desc")
                    )
                } else {
                    q = await query(collectionRef, orderBy("createdAt", "desc"));
                }

                await onSnapshot(q, (querySnapshot) => {
                    setDocuments(
                        querySnapshot.docs.map((doc) => ({
                            id: doc.id,
                            ...doc.data(),
                        }))
                    );
                })

                setLoading(false);
            } catch (error) {
                console.log(error)
                setError(error.message)
                setLoading(false);
            }
        }
        
        loadData()
    }, [docCollection, search, uid, cancelled])

    useEffect(() => {
        return () => setCancelled(true)
    }, []);
    // As dependencias sao para buscar os dados

    return {documents, loading, error}
}