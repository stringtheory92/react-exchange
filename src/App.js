import React, { useState, useEffect } from "react";
//import "./components/context-styles.css";
import "./components/navStyles.css";
import Home from "./components/Home";
import Login from "./components/Login";
import Nav from "./components/Nav";
import UserData from "./components/UserData";
import Exchange from "./components/Exchange";
import UserDropdownOption from "./components/UserDropdownOption";

//free coingecko api urls:
// https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin&include_market_cap=true (bitcoin current price)
// https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd&include_market_cap=true (eth current price)
// https://api.coingecko.com/api/v3/simple/price?ids=elrond-erd-2&vs_currencies=usd&include_market_cap=true (elrond current price)
// vs_currencies: usd, btc, eth

// https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=elrond-erd-2
// https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=ethereum

//process.env.{keyName}

// const dataUrl = "http://localhost:4000/myTodos";

function App() {
  const btcUrl =
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin&include_market_cap=true";
  const ethUrl =
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=ethereum";

  const egldUrl =
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=elrond-erd-2";
  // const egldUrl =
  //   "https://api.coingecko.com/api/v3/simple/price?ids=elrond-erd-2&vs_currencies=usd&include_market_cap=true";

  //======== USER STATES ===================
  const [loggedIn, setLoggedIn] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const [user, setUser] = useState("");

  //======= USER DATA SCREEN / EXCHANGE SCREEN TOGGLE =========
  const [userDataScreen, setUserDataScreen] = useState(false);

  //======= API/PRICE STATES ================
  const [btcPrice, setBtcPrice] = useState(0);
  const [ethPrice, setEthPrice] = useState(0);
  const [egldPrice, setEgldPrice] = useState(0);

  //==============================================
  //==============================================
  // Initialize allUsers
  useEffect(() => {
    fetch("http://localhost:3000/users")
      .then((res) => res.json())
      .then((data) => setAllUsers(data));
  }, []);
  //console.log("allUsers: ", allUsers);

  //=========== PRICE UPDATE CALLBACKS =========
  const updateBtcPrice = () => {
    fetch(btcUrl)
      .then((res) => res.json())
      .then((data) => {
        console.log("BTCdata", data);
        setBtcPrice(data[0].current_price);
      });
  };
  console.log("btcPrice: ", btcPrice);

  const updateEthPrice = () => {
    fetch(ethUrl)
      .then((res) => res.json())
      .then((data) => {
        console.log("ETHdata", data);
        setEthPrice(data[0].current_price);
      });
  };

  console.log("ethPrice: ", ethPrice);
  const updateEgldPrice = () => {
    fetch(egldUrl)
      .then((res) => res.json())
      .then((data) => {
        console.log("EGLDdata: ", data);
        setEgldPrice(data[0].current_price);
      });
  };

  console.log("egldPrice: ", egldPrice);

  //======== USER CALLBACKS =============
  const logInToggle = () => {
    if (loggedIn) setUser("");
    setLoggedIn(!loggedIn);
  };

  const onSetUser = (user) => {
    setUser(user[0]);
  };

  const onCreateUser = (user) => {
    // Update Frontend
    setAllUsers([...allUsers, user]);
    console.log("in onCreateUser");
    // Update Backend
    const configObj = {
      method: "POST",
      headers: {
        "content-type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify(user),
    };
    fetch("http://localhost:3000/users", configObj)
      .then((res) => res.json())
      .then((data) => console.log("posted!", data));
  };

  //======================================================
  //======================================================
  return (
    <div>
      {loggedIn ? (
        <div>
          <Nav className="nav" />
          <button onClick={updateBtcPrice}>btcPricelog</button>
          <button onClick={updateEthPrice}>ethPricelog</button>
          <button onClick={updateEgldPrice}>egldPricelog</button>
          <Home className="home" user={user}>
            {userDataScreen ? (
              <UserData btcPrice={btcPrice} ethPrice={ethPrice} user={user} />
            ) : (
              <Exchange
                btcPrice={btcPrice}
                ethPrice={ethPrice}
                egldPrice={egldPrice}
                user={user}
                updateBtcPrice={updateBtcPrice}
                updateEthPrice={updateEthPrice}
                updateEgldPrice={updateEgldPrice}
              >
                {/* <UserDropdownOption
                  btcPrice={btcPrice}
                  ethPrice={ethPrice}
                  user={user}
                  updateBtcPrice={updateBtcPrice}
                  updateEthPrice={updateEthPrice}
                /> */}
              </Exchange>
            )}
          </Home>
        </div>
      ) : (
        <Login
          className="login"
          loggedIn={loggedIn}
          allUsers={allUsers}
          logInToggle={logInToggle}
          onSetUser={onSetUser}
          onCreateUser={onCreateUser}
        />
      )}
    </div>
  );
}

export default App;

//========= DB.JSON data =====================
// const myTodos = [
//   { id: 1, description: "Create a new todo", completed: false },
//   { id: 2, description: "Update an existing todo", completed: false },
//   { id: 3, description: "Delete an existing todo", completed: false },
// ];
// console.log(JSON.stringify(yTodos));
