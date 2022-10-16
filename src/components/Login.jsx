import React, { useState } from "react";

function Login({ loggedIn, allUsers, logInToggle, onSetUser, onCreateUser }) {
  const [hasAccount, setHasAccount] = useState(true);
  const [createAccount, setCreateAccount] = useState({
    name: "",
    password: "",
    btc: 0,
    eth: 0,
  });
  const [formData, setFormData] = useState({
    name: "",
    password: "",
    notRobot: false,
  });
  //console.log("createAccount: ", createAccount);
  //console.log("onCreateUser: ", onCreateUser);

  //============================================================

  const handleLogIn = (e) => {
    e.preventDefault();
    console.log("logging");
    const user = allUsers.filter((user) => {
      return (
        user.name === formData.name &&
        user.password === formData.password &&
        formData.notRobot === true
      );
    });
    if (user) {
      logInToggle();
      onSetUser(user);
    }
    console.log("user", user);
  };
  //console.log("formData: ", formData);

  const handleDontHaveAccount = () => {
    setHasAccount(!hasAccount);
  };

  const handleCreateUser = () => {
    console.log("in handleCreateUser");
    setHasAccount(true);
    onCreateUser(createAccount);
  };

  return (
    <div>
      {hasAccount ? (
        <div>
          <h1>OPEN MARKET</h1>
          <h2>Please Log In</h2>
          <form action="" onSubmit={handleLogIn}>
            <label htmlFor="userName">
              User Name
              <input
                type="text"
                id="userName"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </label>
            <label htmlFor="passWord">
              Password
              <input
                type="password"
                id="passWord"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            </label>
            <label htmlFor="capcha">
              I am not a robot
              <input
                type="checkbox"
                name=""
                id="capcha"
                checked={formData.notRobot === true}
                onChange={(e) =>
                  setFormData({ ...formData, notRobot: !formData.notRobot })
                }
              />
            </label>
            <button type="submit">Log In</button>
            <button onClick={handleDontHaveAccount}>
              Don't Have an Account?
            </button>
          </form>
        </div>
      ) : (
        <form onSubmit={handleCreateUser}>
          <label htmlFor="newName">
            User Name
            <input
              type="text"
              name=""
              id="newName"
              value={createAccount.name}
              onChange={(e) =>
                setCreateAccount({ ...createAccount, name: e.target.value })
              }
            />
          </label>
          <label htmlFor="newPassword">
            Choose a Password{" "}
            <input
              type="password"
              name=""
              id="newPassword"
              value={createAccount.password}
              onChange={(e) =>
                setCreateAccount({ ...createAccount, password: e.target.value })
              }
            />
          </label>
          <label htmlFor="btc">
            How much Bitcoin do you own?{" "}
            <input
              type="number"
              name=""
              id="btc"
              value={createAccount.btc}
              onChange={(e) =>
                setCreateAccount({
                  ...createAccount,
                  btc: Number(e.target.value),
                })
              }
            />
          </label>
          <label htmlFor="eth">
            How much ethereum do you own?{" "}
            <input
              type="number"
              name=""
              id="eth"
              value={createAccount.eth}
              onChange={(e) =>
                setCreateAccount({
                  ...createAccount,
                  eth: Number(e.target.value),
                })
              }
            />
          </label>
          <button type="submit">Create Account</button>
        </form>
      )}
    </div>
  );
}

export default Login;
