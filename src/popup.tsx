import "./styles/Popup.css";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import ProfileStorage from "./storage/ProfileStorage";
import { DownloadView } from "./components/DownloadView";

const profileStorage = new ProfileStorage();

const Popup = () => {

  const [recordCount, setRecordCount] = useState<number>(0);

  useEffect(() => {
    createJsonFile();
  }, []);

  const createJsonFile = async () => {
    let data = await profileStorage.get();
    setRecordCount(data.length);
  };

  return (
    <div className="container w-48 h-64 rounded-lg bg-white">
      <h1 className="underline text-blue-500">Browser Profiler Data</h1>
      <p className="text-gray-500">Number of Profiles: {recordCount}</p>
      <DownloadView recordCount={recordCount} />
    </div>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Popup />
  </React.StrictMode>,
  document.getElementById("root")
);
