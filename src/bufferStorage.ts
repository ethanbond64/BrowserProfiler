
export const incrementStorageValue = async (key: string) => {
    console.log("incrementing storage value");
    chrome.storage.local.get(key, function (result) {
        var value = result[key] || 0;
        chrome.storage.local.set({ [key]: value + 1 });
    });
}

export const appendStorageArray = async (key: string, value: string) => {
    console.log("appending storage array");
    chrome.storage.local.get(key, function (result) {
        var array = result[key] || [];
        array.push(value);
        chrome.storage.local.set({ [key]: array });
    });
}


export const getAndLog = async (key: string) => {
    chrome.storage.local.get([key]).then((result) => console.log(result));
};

export const getAndClear = async (key: string): Promise<number> => {
    return new Promise((resolve, reject) => chrome.storage.local.get([key], (result) => {
        let value = result[key] || 0;
        chrome.storage.local.set({ [key]: 0 });
        resolve(value);
    }));
};

export const getLogAndClear = async (key: string) => {
    chrome.storage.local.get([key]).then((result) => {
        console.log(result);
    });
    chrome.storage.local.set({ [key]: 0 });
};

export const getAndClearArray = async (key: string): Promise<string[]> => {
    return new Promise((resolve, reject) => chrome.storage.local.get([key], (result) => {
        let value = result[key] || [];
        chrome.storage.local.set({ [key]: [] });
        resolve(value);
    }));
};