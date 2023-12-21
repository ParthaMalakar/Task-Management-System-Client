import { createContext, useEffect } from "react";
import { useState } from "react";
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import app from "../firebase/firebase.config";
import axios from "axios";
const auth = getAuth(app);
export const AuthContext = createContext(null);
const Authprovider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const signIn = (email, password, displayName) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password, displayName);
    }


    const signInWithGoogle = ()=>{
        const provider = new GoogleAuthProvider();
        return signInWithPopup(auth, provider);
    }
    const logOut = () => {
        setLoading(true);
        return signOut(auth);
        
    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            setLoading(false);
            
        });
        return () => {
            unSubscribe();
        }
    }, [])
    

  

    const authInfo = {
        user,
        loading,
        createUser,
        signIn,
        signInWithGoogle,
        logOut
    }


   

    return (
        <div>
            <AuthContext.Provider value={authInfo}>
                {children}
            </AuthContext.Provider>
        </div>
    );
};

export default Authprovider;