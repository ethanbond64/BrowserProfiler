import React, { useEffect, useState } from 'react';
import Settings from '../models/Settings';
import ProfileStorage from '../storage/ProfileStorage';

const profileStorage = new ProfileStorage();

export const DownloadView = (props: { settings: Settings, recordCount: number }) => {

    const [secondsRecorded, setSecondsRecorded] = useState<number>(0);

    useEffect(() => {
        calculateSecondsRecorded(props.recordCount);
    }, [props.recordCount]);

    const calculateSecondsRecorded = async (recordCount: number) => {
        let seconds = recordCount * props.settings.getHeartbeat();
        setSecondsRecorded(seconds);
    };

    const downloadJson = async () => {
        let data = await profileStorage.pop();
        var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data));
        var downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", "BrowserProfile.json");
        document.body.appendChild(downloadAnchorNode); // required for firefox
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
    }

    return (
        <div className="container w-48 h-64 rounded-lg bg-white">
            <div>
                Seconds recorded: {secondsRecorded}
            </div>
            <div className="button w-10 h-10 rounded-lg bg-blue text-blue cursor-pointer" onClick={downloadJson}>
                Download
            </div>
        </div>
    );
};