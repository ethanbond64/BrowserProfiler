import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { getProfileLogs } from "./loggingStorage";

const Popup = () => {
  const [jsonUrl, setJsonUrl] = useState<string>();
  const [jsonName, setJsonName] = useState<string>("browserData.json");


  useEffect(() => {
    createJsonFile();
  }, []);

  const createJsonFile = async () => {
    let data = await getProfileLogs();
    let blob = new Blob([JSON.stringify(data)], { type: "octet/stream" })
    let url = URL.createObjectURL(blob);
    setJsonUrl(url);
  };

  return (
    <>
      <h1>Browser Profiler Data</h1>
      <a href={jsonUrl} download={jsonName}>Download your data</a>
    </>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Popup />
  </React.StrictMode>,
  document.getElementById("root")
);
