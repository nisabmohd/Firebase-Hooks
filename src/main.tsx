import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import FirebaseClient from "./context/FirebaseClient";
import "./index.css";

const config = {
  apiKey: import.meta.env.VITE_APIKEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <FirebaseClient config={config}>
      <App />
    </FirebaseClient>
  </React.StrictMode>
);
