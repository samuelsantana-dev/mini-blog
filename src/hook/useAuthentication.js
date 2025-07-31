import {
  updateProfile,
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword
} from "firebase/auth";

import { auth } from "../firebase/config";
import { useState, useEffect } from "react";

export const useAuthentication = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [cancelled, setCancelled] = useState(false);

  function checkIfCancelled() {
    if (cancelled) return true;
    return false;
  }

  const logout = () => {
    checkIfCancelled();
    console.log("logout");
    signOut(auth);
  }

  const createUser = async (data) => {
    if (checkIfCancelled()) return;

    try {
      setLoading(true);
      setError("");

      const { user } = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      await updateProfile(user, {
        displayName: data.displayName
      });


      return user;
    } catch (error) {
      console.error("Firebase Error:", error.message);

      let systemErrorMessage;

      if (error.message.includes("password")) {
        systemErrorMessage = "A senha precisa conter pelo menos 6 caracteres.";
      } else if (error.message.includes("email-already")) {
        systemErrorMessage = "E-mail já cadastrado.";
      } else {
        systemErrorMessage = "Ocorreu um erro, por favor tente mais tarde.";
      }

      setError(systemErrorMessage);
    } finally {
      setLoading(false);
    }
  };

  const login = async (data) => {
    checkIfCancelled();
      setLoading(true);
      setError("");
    try {
          setLoading(false);
      await signInWithEmailAndPassword(auth, data.email, data.password);
      
    } catch (erro) {
      let systemErrorMessage;

      if(erro.message.includes("INVALID_LOGIN_CREDENTIALS")){
        systemErrorMessage = "Usuário não encontrado.";
      } 
      setLoading(false);
      setError(systemErrorMessage);
    }
  }

  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  return {
    createUser,
    error,
    loading,
    auth,
    logout,
    login
  };
};
