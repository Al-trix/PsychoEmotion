import cookies from "js-cookie";
import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  signInWithCustomToken,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import {
  loginAdminApi,
  registerAdminApi,
  verifyTokenAdmin,
  logOutAdminApi,
} from "../api/userAdmin";
import { createTokenCookie } from "../api/surveyResponse.js";
import { validateTokenAnalysis } from "../api/analysisSurvey";

const authContext = createContext();
//hook personalizado para llamar el contexto
const useAuth = () => {
  const context = useContext(authContext);

  if (!context) throw new Error("There is not auth provaider");
  return context;
};
const AuthProvaider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userAdmin, setUserAdmin] = useState(null);
  const [modifyQuestion, setModifyQuestion] = useState(false);
  const [loading, setLoading] = useState(true);
  const [responseSurvey, setResponseSurvey] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
   useEffect(() => {
     if (user && !cookies.get("token")) {
       const createCookie = async () => {
         try {
           await createTokenCookie({ id: user.uid });
         } catch (error) {
           console.log(error);
         }
       };
       createCookie();
     }
   }, [user]);


  //Estados globales para logear y reistrar usuarios
  const singup = async (email, password) =>
    await createUserWithEmailAndPassword(auth, email, password);

  //!-----------------------loginuser-------------------------------
  const login = async (email, password) =>
    await signInWithEmailAndPassword(auth, email, password);

  //-------------------------loginusergoogle-----------------------------
  const loginWithGoogle = () => {
    const googleProviderNew = new GoogleAuthProvider();
    return signInWithPopup(auth, googleProviderNew);
  };
  //--------------------------logoutuser----------------------------
  const logOut = () => signOut(auth);
  //-------------------------questionuser-----------------------------
  const [question, setQuestion] = useState({
    question: "",
    response: "",
  });
  const [valueChecked, setValueChecked] = useState("");

  //----------------------------user--------------------------

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unSubscribe();
  }, []);
  //-----------------------------cookiequestion-------------------------
  useEffect(() => {
    const analysisSurveyCookie = async () => {
      try {
        const cookie = cookies.get("token");
        if (cookie && !analysis) {
          const analysisToken = await validateTokenAnalysis();
          setAnalysis(analysisToken);
        }
      } catch (error) {
        console.log(error);
        setAnalysis([]);
      }
    };
    analysisSurveyCookie();
  }, [analysis]);

  //-----------------------------cookiequestion-------------------------

  useEffect(() => {
    const userAdminCookie = async () => {
      try {
        const cookie = cookies.get();
        if (cookie.tokenAdmin) {
          const adminToken = await verifyTokenAdmin();
          setUserAdmin(adminToken.data);
          setLoading(false);
        }
      } catch (error) {
        setUser(null);
      }
    };
    userAdminCookie();
  }, []);

  //-----------------------------responsesurvey-------------------------
  const responsedSurvey = (response) => {
    setResponseSurvey(response);
  };
  const modifyQuestions = (modify) => {
    setModifyQuestion(modify);
  };

  //-----------------------------loginAdmin----------------------------
  const loginAdmin = async (user) => {
    try {
      const currentUser = await loginAdminApi(user);
      setUserAdmin(currentUser.data);
      setLoading(false);
      setError(null);
      navigate("/");
    } catch (err) {
      setError(err.response.data.error);
    }
  };

  //-----------------------------resgiterAdmin------------------------
  const registerAdmin = async (user) => {
    try {
      const currentUser = await registerAdminApi(user);
      setUserAdmin(currentUser.data);
      setLoading(false);
      setError(null);
      navigate("/");
    } catch (err) {
      setError(err.response.data.error);
    }
  };

  //----------------------------logoutadmin-----------------
  const logOutAdmin = async () => {
    try {
      await logOutAdminApi(user);
      setUserAdmin(null);
      setError(null);
    } catch (err) {
      setError(err.response.data.error);
    }
  };

  return (
    <authContext.Provider
      value={{
        singup,
        login,
        logOutAdmin,
        loginAdmin,
        error,
        modifyQuestion,
        modifyQuestions,
        registerAdmin,
        user,
        userAdmin,
        logOut,
        loading,
        responsedSurvey,
        responseSurvey,
        loginWithGoogle,
        question,
        setQuestion,
        valueChecked,
        setValueChecked,
        analysis,
      }}
    >
      {children}
    </authContext.Provider>
  );
};

export { AuthProvaider, useAuth, authContext };
