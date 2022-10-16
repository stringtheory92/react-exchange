import React, { useState, useEffect } from "react";

function Exchange({
  user,
  btcPrice,
  updateBtcPrice,
  ethPrice,
  updateEthPrice,
  egldPrice,
  updateEgldPrice,
}) {
  console.log("user", user);

  //================= FORM DATA =================================
  const [userSelect, setUserSelect] = useState("BTC");
  const [lpsSelect, setLpsSelect] = useState("Bitcoin");

  const userWallet = [{ btc: user.btc }, { eth: user.eth }];

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

  const handleLpsChange = (e) => {
    setLpsSelect(e.target.value);
  };

  //============ GENERATE DROPDOWN FROM USER WALLET ================
  const userDropdown = userWallet.map((token) => {
    const coinQuantity = Object.values(token)[0];
    const coinType = Object.keys(token)[0];
    return (
      <option
        value={coinType}
      >{`${coinType.toUpperCase()}: ${coinQuantity} = $${(
        (coinType === "btc" ? btcPrice : ethPrice) * coinQuantity
      ).toFixed(2)}`}</option>
    );
  });

  return (
    <div>
      <h2>Open AMM</h2>
      <h3>Trade 24/7</h3>
      {/* <img
        src="https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579"
        alt=""
      /> */}
      <form action="">
        <label htmlFor="user-tokens">
          What do you have to trade?
          <select
            name=""
            id="user-tokens"
            onChange={(e) => handleUserSelectChange(e)}
          >
            {userDropdown}
          </select>
        </label>
        <label htmlFor="lps">
          What would you like?
          <select name="" id="lps" onChange={(e) => handleLpsChange(e)}>
            <option value="btc">Bitcoin: ${btcPrice.toFixed(2)}</option>
            <option value="eth">Ethereum: ${ethPrice.toFixed(2)}</option>
            <option value="egld">Egold: ${egldPrice.toFixed(2)}</option>
          </select>
        </label>
      </form>
    </div>
  );
}

export default Exchange;
