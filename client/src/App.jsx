import { useState } from "react";
import Trains from "./components/Trains";
import AuthForm from "./components/AuthForm";
function App() {
  const [token, setToken] = useState(null);

  return (
    <>
      <h1>REACT TRAIN APP</h1>
      <p>Choo Choo!</p>

      {token ? <button onClick={() => setToken(null)}>Sign Out</button> : ""}

      {token ? <Trains token={token} /> : <AuthForm setToken={setToken} />}
    </>
    
  );
}

export default App;
