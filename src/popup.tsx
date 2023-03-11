import "./styles/Popup.css";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import ProfileStorage from "./storage/ProfileStorage";
import { DownloadView } from "./components/DownloadView";
import { SyncView } from "./components/SyncView";
import Settings from "./models/Settings";
import { SettingsView } from "./components/SettingsView";

const profileStorage = new ProfileStorage();

const Popup = () => {

  const [recordCount, setRecordCount] = useState<number>(0);
  const [settings, setSettings] = useState<Settings>();
  const [showSettings, setShowSettings] = useState<boolean>(false);

  useEffect(() => {
    Settings.getSettings((settings: Settings) => {
      setSettings(settings);
    });
    countRecords();

    return () => {
      setSettings(undefined); // This worked for me
    };

  }, []);

  const countRecords = async () => {
    let data = await profileStorage.get();
    setRecordCount(data.length);
  };

  return (
    <div className="container w-48 h-64 rounded-lg bg-white">
      <h1 className="underline text-blue-500">Browser Profiler Data</h1>
      <button className="button w-10 h-10 rounded-lg bg-blue text-blue cursor-pointer" onClick={() => setShowSettings(!showSettings)}>
        {showSettings ? "Back" : "Go to Settings"}
      </button>
      {
        settings !== undefined ?
          (showSettings ?
            <SettingsView settings={settings} setSettings={setSettings} /> :

            (settings.getSyncMode() ?
              <SyncView recordCount={recordCount} settings={settings} /> :
              <DownloadView recordCount={recordCount} settings={settings} />)) :
          <div> Loading... </div>
      }
    </div>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Popup />
  </React.StrictMode>,
  document.getElementById("root")
);
