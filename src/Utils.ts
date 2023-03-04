
export const executeSafe = (fn: (() => void)) => {
    try {
        if (chrome.runtime && !!chrome.runtime.getManifest()) {
            fn();
        }
    } catch (e) {
        // ignore
    }
}