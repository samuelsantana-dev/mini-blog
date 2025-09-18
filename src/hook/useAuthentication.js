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

  function checkIfIsCancelled() {
     if (cancelled) {
      return;
    }
  }

  const logout = () => {
    checkIfIsCancelled();
    signOut(auth);
  }

  const createUser = async (data) => {
     checkIfIsCancelled();
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
  checkIfIsCancelled();
  setLoading(true);
  setError("");
  try {
    await signInWithEmailAndPassword(auth, data.email, data.password);
  } catch (error) {
    let systemErrorMessage;

    switch (error.code) {
      case "auth/user-not-found":
        systemErrorMessage = "Usuário não encontrado.";
        break;
      case "auth/wrong-password":
        systemErrorMessage = "Senha incorreta.";
        break;
      case "auth/invalid-credential":
        systemErrorMessage = "Credenciais inválidas. Verifique e-mail e senha.";
        break;
      case "auth/too-many-requests":
        systemErrorMessage = "Muitas tentativas. Tente novamente mais tarde.";
        break;
      default:
        systemErrorMessage = "Ocorreu um erro, tente novamente mais tarde.";
        break;
    }

    setError(systemErrorMessage);
  } finally {
    setLoading(false);
  }
};


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
