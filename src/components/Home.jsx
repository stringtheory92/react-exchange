import React from "react";
import "./navStyles.css";
import Exchange from "./Exchange";

function Home({ user, children }) {
  console.log("user: ", user);
  return (
    <div>
      <h1>Welcome, {user.name}</h1>
      {children}
    </div>
  );
}

export default Home;
