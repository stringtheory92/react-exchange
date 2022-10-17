import React, { useState, useEffect } from "react";

function Exchange({
  user,
  btcPrice,
  updateBtcPrice,
  ethPrice,
  updateEthPrice,
  egldPrice,
  updateEgldPrice,
  onUpdateUserWallet,
}) {
  console.log("user", user);

  //================= FORM DATA =================================
  const [userSelect, setUserSelect] = useState("BTC");
  const [userAmount, setUserAmount] = useState(0);
  const [lpsSelect, setLpsSelect] = useState("Bitcoin");
  const [lpsAmount, setLpsAmount] = useState(0);

  const userWallet = [{ btc: user.btc }, { eth: user.eth }];

  console.log("userSelect", userSelect);
  //================ STATE GOVERNS PRICE UPDATE ===================
  useEffect(() => {
    updateBtcPrice();
    updateEthPrice();
    updateEgldPrice();
  }, [userSelect]);

  //================= GET UPDATED PRICES AND HANDLE FORM UPDATES =========================
  const handleUserSelectChange = (e) => {
    setUserSelect(e.target.value);
  };
  const handleUserAmountChange = (e) => {
    setUserAmount(e.target.value);
  };

  const handleLpsChange = (e) => {
    setLpsSelect(e.target.value);
  };
  const handleLpsAmountChange = (e) => {
    setLpsAmount(e.target.value);
  };

  //============ GENERATE DROPDOWN FROM USER WALLET ================
  const userDropdown = userWallet.map((token) => {
    const coinQuantity = Object.values(token)[0];
    const coinType = Object.keys(token)[0];
    return (
      <option
        key={coinType}
        value={coinType}
      >{`${coinType.toUpperCase()}: ${coinQuantity} = $${(
        (coinType === "btc" ? btcPrice : ethPrice) * coinQuantity
      ).toFixed(2)}`}</option>
    );
  });

  //================== STYLES =========================================

  const mainPage = {
    backgroundColor: "#333",
    color: "white",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };

  const formStyles = {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#444",
    width: "30rem",
    height: "30rem",
    padding: "3rem",
    color: "#b0afae",
    boxShadow: "0 0 4px #999",
  };

  const swapText = {
    textAlign: "left",
  };

  const inputDiv = {
    backgroundColor: "#333",
  };

  const numberInput = {
    padding: "0.5rem 0.5rem",
    borderRadius: "6px",
    border: "none",
    outline: "none",
    backgroundColor: "#333",
    color: "#b0afae",
  };

  const dropDownInput = {
    backgroundColor: "#333",
    borderRadius: "6px",
    padding: "0.5rem 0.5rem",
    color: "#b0afae",
  };

  const confirmBtn = {
    width: "8rem",
    backgroundColor: "dodgerBlue",
    padding: "0.5rem 0.9rem",
    borderRadius: "10px",
    ouline: "none",
    border: "none",
    color: "white",
  };

  //==================================================================================
  //==================================================================================
  return (
    <div style={mainPage}>
      <h2>Open AMM</h2>
      <h3>Trade 24/7</h3>
      {/* <img
        src="https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579"
        alt=""
      /> */}
      <form style={formStyles} onSubmit={() => onUpdateUserWallet(user)}>
        <label htmlFor="user-tokens" style={swapText}>
          Swap From:
        </label>
        <div style={inputDiv}>
          <input
            style={numberInput}
            type="number"
            value={userAmount}
            onChange={(e) => handleUserAmountChange(e)}
          />
          <select
            style={dropDownInput}
            name=""
            id="user-tokens"
            value={userSelect}
            onChange={(e) => handleUserSelectChange(e)}
          >
            {userDropdown}
          </select>
        </div>

        <label htmlFor="lps" style={swapText}>
          Swap To:
        </label>
        <div style={inputDiv}>
          <input
            style={numberInput}
            type="number"
            name=""
            id=""
            value={lpsAmount}
            onChange={(e) => handleLpsAmountChange(e)}
          />
          <select
            style={dropDownInput}
            name=""
            id="lps"
            value={lpsSelect}
            onChange={(e) => handleLpsChange(e)}
          >
            <option value="btc">Bitcoin: ${btcPrice.toFixed(2)}</option>
            <option value="eth">Ethereum: ${ethPrice.toFixed(2)}</option>
            <option value="egld">Egold: ${egldPrice.toFixed(2)}</option>
          </select>
        </div>

        <button type="submit" style={confirmBtn}>
          Confirm Trade
        </button>
      </form>
      <p>Exchange Rate</p>
      <p>Slippage</p>
      <p>Minimum received</p>
    </div>
  );
}

export default Exchange;
