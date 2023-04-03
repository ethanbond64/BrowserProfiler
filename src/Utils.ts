
export const executeSafe = (fn: (() => void)) => {
    console.log("EXECUTE SAFE");
    try {
        if (chrome.runtime && !!chrome.runtime.getManifest()) {
            fn();
        }
    } catch (e) {
        // ignore
    }
}