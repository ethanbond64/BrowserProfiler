
export default class Settings {

    private heartbeat: number;
    private sleep: number;
    private trackedEvents: string[];
    private syncMode: boolean;
    private syncUrl: string;

    constructor(heartbeat: number, sleep: number, trackedEvents: string[], syncMode: boolean = false,
        syncUrl: string = "") {

        this.heartbeat = heartbeat;
        this.sleep = sleep;
        this.trackedEvents = trackedEvents;
        this.syncMode = syncMode;
        this.syncUrl = syncUrl;
    }

    static fromJson(json: any) {
        return new Settings(json.heartbeat, json.sleep, json.trackedEvents, json.syncMode, json.syncUrl);
    }

    getHeartbeat() {
        return this.heartbeat;
    }

    getSleep() {
        return this.sleep;
    }

    getTrackedEvents() {
        return this.trackedEvents;
    }

    getSyncMode() {
        return this.syncMode;
    }

    getSyncUrl() {
        return this.syncUrl;
    }

    save() {
        chrome.storage.local.set({ settings: this });
        return this;
        // TODO save to local storage.
    }

    static async getSettings(fn: (settings: Settings) => void) {

        chrome.storage.local.get("settings", (result) => {
            console.log("SETTINGS FROM STORAGE", result);
            if (result.settings) {
                fn(Settings.fromJson(result.settings));
            } else {
                let settings = fn(Settings.getDefaultSettings().save());
            }
        });
    }
    static getDefaultSettings(): Settings {
        return new Settings(10, 6, ["click", "keydown", "scroll"]);
    }
}