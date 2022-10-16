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

  return (
    <div>
      <h2>Open AMM</h2>
      <h3>Trade 24/7</h3>
      {/* <img
        src="https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579"
        alt=""
      /> */}
      <form action="" onSubmit={() => onUpdateUserWallet(user)}>
        <label htmlFor="user-tokens">
          What do you have to trade?
          <input
            type="number"
            value={userAmount}
            onChange={(e) => handleUserAmountChange(e)}
          />
          <select
            name=""
            id="user-tokens"
            value={userSelect}
            onChange={(e) => handleUserSelectChange(e)}
          >
            {userDropdown}
          </select>
        </label>
        <label htmlFor="lps">
          What would you like?
          <input
            type="number"
            name=""
            id=""
            value={lpsAmount}
            onChange={(e) => handleLpsAmountChange(e)}
          />
          <select
            name=""
            id="lps"
            value={lpsSelect}
            onChange={(e) => handleLpsChange(e)}
          >
            <option value="btc">Bitcoin: ${btcPrice.toFixed(2)}</option>
            <option value="eth">Ethereum: ${ethPrice.toFixed(2)}</option>
            <option value="egld">Egold: ${egldPrice.toFixed(2)}</option>
          </select>
        </label>
        <button type="submit">Confirm Trade</button>
      </form>
    </div>
  );
}

export default Exchange;
