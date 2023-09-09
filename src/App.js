import "./App.css";
import "./page/page.css";
import "./components/components.css";

import AppRouter from "./AppRouter";

import { auth } from "./Myfirebase";
import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";

export const userIsLoginContext = React.createContext(); // 로그인 유무 context
export const userInfoContext = React.createContext(); // 유저 정보 context

function App() {
  const [islogin, setislogin] = useState(false); // 로그인 유무
  const [userObj, setuserObj] = useState(null); // 유저 정보

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // 로그인 된 경우
        setuserObj(user); // 유저 정보
        setislogin(true);
        // ...
      } else {
        // 로그아웃 된 경우
        setislogin(false);
      }
    });

    return () => {
      unsubscribe(); // 컴포넌트가 언마운트될 때 구독 해제
    };
  }, []);

  return (
    <div className="App">
      <userIsLoginContext.Provider value={islogin}>
        <userInfoContext.Provider value={userObj}>
          <AppRouter />
        </userInfoContext.Provider>
      </userIsLoginContext.Provider>
    </div>
  );
}

export default App;
