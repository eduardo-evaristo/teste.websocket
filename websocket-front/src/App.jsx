import { useEffect, useState } from "react";
import styles from "./App.module.css";

function App() {
  const [message, setMessage] = useState("");
  const [ws, setWs] = useState(null);

  useEffect(() => {
    //Creating websocket connection to be used as long as this component is mounted
    const ws = new WebSocket("ws://localhost:8000");
    //Setting it as state to have access anywhere
    setWs(ws);

    //Cleanup
    return () => ws.close();
  }, []);

  //Controlled input
  function handleMessage(e) {
    console.log(e);
    setMessage(e.target.value);
  }

  //Send a message
  function handleSend() {
    console.log(ws);
    if (ws.readyState === 1) {
      ws.send(message);
      setMessage("");
    }
    if (ws.readyState === 3 || ws.readyState === 0) {
      setMessage("Something went wrong");
      setTimeout(() => {
        setMessage("");
      }, 1000);
    }
  }

  return (
    <div className={styles.div}>
      <h1>Digite uma mensagem:</h1>
      <input type="text" value={message} onChange={handleMessage} />
      <button onClick={handleSend} disabled={message === ""}>
        Enviar
      </button>
    </div>
  );
}

export default App;
