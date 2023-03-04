import { ProfileLog } from "./profileLog";


const PROFILE_LOG = "profilelogs";

export const addProfileLog = async (value: ProfileLog) => {
    chrome.storage.local.get(PROFILE_LOG, function (result) {
        var array = result[PROFILE_LOG] || [];
        array.push(value);
        chrome.storage.local.set({ [PROFILE_LOG]: array });
    });
};

export const getMostRecentProfileLog = async (count: number): Promise<ProfileLog[]> => {
    return chrome.storage.local.get(PROFILE_LOG).then((result) => {
        var array = result[PROFILE_LOG] || [];
        if (array.length < count) {
            return array;
        }
        return array.slice(array.length - count - 1, array.length - 1);
    });
};


export const getProfileLogs = async (): Promise<ProfileLog> => {
    return new Promise((resolve, reject) => {
        chrome.storage.local.get([PROFILE_LOG], function (result) {
            if (result[PROFILE_LOG] === undefined) {
                reject();
            } else {
                chrome.storage.local.set({ [PROFILE_LOG]: [] });
                resolve(result[PROFILE_LOG]);
            }
        });
    });
};

// export const logProfileLogs = async () => {
//     chrome.storage.local.get(PROFILE_LOG).then((result) => {
//         console.log(result);
//         if (result[PROFILE_LOG].length > 100) {
//             chrome.storage.local.set({ [PROFILE_LOG]: [] });
//         }
//     });
// };