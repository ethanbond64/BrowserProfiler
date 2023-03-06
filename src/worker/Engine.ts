import Profile, { ActivityLevel } from "../models/Profile";
import Reporter from "./Reporter";
import Settings from "../models/Settings";
import ProfileStorage from "../storage/ProfileStorage";
import Exporter from "./Exporter";

export default class Engine {

    //
    // Set on construction
    //
    private settings: Settings;
    private reporter: Reporter;

    //
    // Set internally
    //
    private profileStorage: ProfileStorage;
    private awake: boolean;
    private first: boolean;

    // constructor
    constructor(settings: Settings, reporter: Reporter) {
        this.settings = settings;
        this.reporter = reporter;

        this.profileStorage = new ProfileStorage();
        this.awake = false;
        this.first = false;
    }

    // start loop
    start() {
        if (!this.awake) {
            console.log("starting...");
            Exporter.export();

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
        Exporter.export();
        this.awake = false;
    }

    // do loop
    private loop() {

        console.log("looping...");

        // do work
        this.reporter.report();
        // check if awake

        // if awake, do loop
        this.scheduleLoop();
    }

    private scheduleLoop() {
        this.profileStorage.evaluate((profiles: Profile[]) => {

            //
            // If we have less than SLEEP logs, then we need to keep polling
            //
            if (this.awake && (profiles.length < this.settings.getSleep() || this.sleepThreshold(profiles) || this.first)) {
                setTimeout(() => this.loop(), this.settings.getHeartbeat() * 1000);
                this.first = false;
            } else {
                this.stop();
            }
        });
    }

    private sleepThreshold(profiles: Profile[]): boolean {
        return !profiles.slice(-this.settings.getSleep()).every((profile: Profile) => {
            return profile.activityLevel === ActivityLevel.Idle;
        });
    }
}