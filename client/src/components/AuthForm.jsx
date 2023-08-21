import { useState } from "react";

const AuthForm = ({ setToken }) => {
  const [alert, setAlert] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameRegister, setUsernameRegister] = useState("");
  const [passwordRegister, setPasswordRegister] = useState("");
  const [firstNameRegister, setFirstNameRegister] = useState("");
  const [lastNameRegister, setLastNameRegister] = useState("");
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await fetch("/auth/signIn", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await result.json();

    if (data.token) {
      setAlert("");
      setToken(data.token);
    } else {
      setAlert(<p>Invalid Login</p>);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    const result = await fetch("/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ "firstName": firstNameRegister, "lastName": lastNameRegister, "username": usernameRegister, "password": passwordRegister }),
    });

    const data = await result.json();

    if (data.token) {
      setAlert("");
      setToken(data.token);
    } else {
      setAlert(<p>Invalid Login</p>);
    }
  };

  return (
    <>
      <p>Sign in to see trains</p>
      {alert}
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type="submit">Submit</button>
      </form>

      <br/>
      <br/>
      <br/>
      <div>
        <button onClick={() => setShowForm(true)}>Register</button>
        {showForm && (
          <>
            <p>Register</p>
            <form onSubmit={handleRegister}>
              <label>
                <input
                  type="text"
                  placeholder="First Name"
                  value={firstNameRegister}
                  onChange={(e) => setFirstNameRegister(e.target.value)}
                />
              </label>
              <label>
                <input
                  type="text"
                  placeholder="Last Name"
                  value={lastNameRegister}
                  onChange={(e) => setLastNameRegister(e.target.value)}
                />
              </label>
              <label>
                <input
                  type="text"
                  placeholder="username"
                  value={usernameRegister}
                  onChange={(e) => setUsernameRegister(e.target.value)}
                />
              </label>
              <label>
                <input
                  type="password"
                  placeholder="password"
                  value={passwordRegister}
                  onChange={(e) => setPasswordRegister(e.target.value)}
                />
              </label>
              <button type="submit">Submit</button>
            </form>
          </>
        )}
      </div>
    </>
  );
};

export default AuthForm;
