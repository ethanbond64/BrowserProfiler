import Profile, { ActivityLevel } from "./Profile";
import ProfileStorage from "./Storage/ProfileStorage";

export default class Engine {

    private heartbeat: number;
    private sleep: number;
    private profileStorage: ProfileStorage;
    private report: () => void;
    private awake: boolean;
    private first: boolean;

    // constructor
    constructor(heartbeat: number, sleep: number, report: () => void) {
        this.heartbeat = heartbeat;
        this.sleep = sleep;
        this.report = report;
        this.profileStorage = new ProfileStorage();
        this.awake = false;
        this.first = false;
    }

    // start loop
    start() {
        if (!this.awake) {
            console.log("starting...");
            // set awake
            this.awake = true;
            this.first = true;
            // do loop
            this.loop();
        }
    }


    // stop loop
    stop() {
        console.log("stopping...");
        // set asleep

        // refresh data store
        this.awake = false;
    }

    // do loop
    private loop() {

        console.log("looping...");

        // do work
        this.report();
        // check if awake

        // if awake, do loop
        this.scheduleLoop();
    }

    private scheduleLoop() {
        this.profileStorage.evaluate((profiles: Profile[]) => {

            //
            // If we have less than SLEEP logs, then we need to keep polling
            //
            if (this.awake && (profiles.length < this.sleep || this.sleepThreshold(profiles) || this.first)) {
                setTimeout(() => this.loop(), this.heartbeat * 1000);
                this.first = false;
            } else {
                this.stop();
            }
        });
    }

    private sleepThreshold(profiles: Profile[]): boolean {
        return !profiles.slice(-this.sleep).every((profile: Profile) => {
            return profile.activityLevel === ActivityLevel.Idle;
        });
    }
}