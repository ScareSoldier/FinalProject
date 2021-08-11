import React, { useContext, createContext, useState, useEffect } from "react";

export const CurrentUserContext = createContext(null);

export const CurrentUserProvider = ({ children }) => {
  const [password1, setPassword1] = useState("");
  const [email1, setEmail1] = useState("");

  const createAccount = (email1, password1) => {
    console.log(email1);
    console.log(password1);
    fetch("/users/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email1, password1 }),
    })
      .then((response) => response.json())
      .then((data) => {});
  };
  return (
    <CurrentUserContext.Provider
      value={{ email1, password1, setEmail1, setPassword1 }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
};

export default CurrentUserProvider;
