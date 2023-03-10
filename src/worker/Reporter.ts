import Profile from "../models/Profile";
import Settings from "../models/Settings";
import ArrayStorage from "../storage/ArrayStorage";
import NumberStorage from "../storage/NumberStorage";
import ProfileStorage from "../storage/ProfileStorage";

const numberStorage = new NumberStorage();
const arrayStorage = new ArrayStorage();
const profileStorage = new ProfileStorage();

export default class Reporter {

    private settings: Settings;

    constructor(settings: Settings) {
        this.settings = settings;
    }

    async report() {

        //
        // TODO use the list of tracked events from settings to pop these
        // will need some kind of data structure to configre how to translate 
        // tracked events to activity levels
        //
        let clicks = await numberStorage.pop("click");
        let keydowns = await numberStorage.pop("keydown");
        let scrolls = await numberStorage.pop("scroll");

        let urls = new Set(await arrayStorage.pop("urls") as string[]);

        chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
            if (tabs.length > 0 && tabs[0].url && tabs[0].id && !tabs[0].url.startsWith("chrome://")) {

                urls.add(tabs[0].url);

                //
                // Check if video playing TODO chaining this is a mess
                //
                try {
                    chrome.tabs.sendMessage(tabs[0].id, { action: "isVideoPlaying" }, (response) => {

                        console.log("video playing: " + JSON.stringify(response));

                        // TODO adding to scrolls to keep concept of video playing out of activity resolver for now
                        if (response && response.videoPlaying) {
                            scrolls++;
                        }

                        this.putProfile(clicks, keydowns, scrolls, urls);
                    });
                } catch (e) {
                    this.putProfile(clicks, keydowns, scrolls, urls);
                }
            } else {
                this.putProfile(clicks, keydowns, scrolls, urls);
            }
        });
    };

    private putProfile(clicks: number, keydowns: number, scrolls: number, urls: Set<string>) {
        console.log("reporting... " + clicks + " " + keydowns + " " + scrolls + " " + urls.size);

        let activityLevel = Profile.getActivityLevel(clicks, keydowns, scrolls);

        let profile = new Profile(new Date().toISOString(), activityLevel, Array.from(urls));

        profileStorage.appendProfile(profile);
    }
}