import React, { useEffect, useState } from 'react';
import Settings from '../models/Settings';

export const DownloadView = (props: any) => {

    const [secondsRecorded, setSecondsRecorded] = useState<number>(0);
    // const [jsonUrl, setJsonUrl] = useState<string>();
    // const [jsonName, setJsonName] = useState<string>("browserData.json");

    useEffect(() => {
        calculateSecondsRecorded(props.recordCount);
    }, [props.recordCount]);

    const calculateSecondsRecorded = async (recordCount: number) => {
        let settings = await Settings.getSettings();
        let seconds = recordCount * settings.getHeartbeat();
        setSecondsRecorded(seconds);
    };

    // useEffect(() => {
    //     createJsonFile();
    // }, []);

    // const createJsonFile = async () => {
    //     let data = await profileStorage.get();
    //     setProfileCount(data.length);
    // let blob = new Blob([JSON.stringify(data)], { type: "octet/stream" })
    // let url = URL.createObjectURL(blob);
    // setJsonUrl(url);
    // };

    return (
        <div className="container w-48 h-64 rounded-lg bg-white">
            <div>
                Seconds recorded: {secondsRecorded}
            </div>
            <div className="button w-10 h-10 rounded-lg bg-blue">
                Download
            </div>
        </div>
    );
};