
export default class Settings {

    private heartbeat: number;
    private sleep: number;
    private trackedEvents: string[];

    constructor(heartbeat: number, sleep: number, trackedEvents: string[]) {
        this.heartbeat = heartbeat;
        this.sleep = sleep;
        this.trackedEvents = trackedEvents;
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

    static getSettings() {
        // TODO make this configurable and read from local storage.
        return new Settings(10, 6, ["click", "keydown", "scroll"]);
    }
}