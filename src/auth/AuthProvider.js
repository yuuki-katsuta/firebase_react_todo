import React, { useEffect, useState } from 'react';
import { app } from '../base.js';
//認証に必要なロジック

// contextオブジェクトの作成
export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  //currentUserは現在ログインしているユーザーの状態を表す
  const [currentUser, setCurrentUser] = useState(null);

  // ユーザーをログインさせる関数
  const login = async (email, password, history) => {
    try {
      ////メールアドレスとパスワードを使用してユーザーのログインを行う
      await app.auth().signInWithEmailAndPassword(email, password);
      history.push('/');
    } catch (error) {
      alert(error);
    }
  };

  // 新しいユーザーを作成しログインさせる関数
  const signup = async (email, password, history) => {
    try {
      //新しいユーザーを登録する
      await app.auth().createUserWithEmailAndPassword(email, password);
      history.push('/');
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    //認証状態オブザーバーを設定し、ユーザーデータを取得する
    //firebase.auth().onAuthStateChanged 関数で、認証状態の変化を監視します。認証されていれば user オブジェクトに値が設定され、未認証であれば、null が設定される
    app.auth().onAuthStateChanged(setCurrentUser);
  }, []);

  return (
    // Contextを使用して認証に必要な情報をコンポーネントツリーに流し込む。
    // コンテキストの適用範囲をきめる
    // AuthProviderのchildren内で認証ロジックが使える
    <AuthContext.Provider
      //valueプロパティで実際に渡すデータを指定
      value={{
        login: login,
        signup: signup,
        currentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
