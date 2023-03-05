import Profile from "./Profile";
import Settings from "./Settings";
import ArrayStorage from "./Storage/ArrayStorage";
import NumberStorage from "./Storage/NumberStorage";
import ProfileStorage from "./Storage/ProfileStorage";

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

        chrome.tabs.query({ active: true }, tabs => {
            if (tabs.length > 0 && tabs[0].url) {

                urls.add(tabs[0].url);

                console.log("reporting... " + clicks + " " + keydowns + " " + scrolls + " " + urls.size);

                let activityLevel = Profile.getActivityLevel(clicks, keydowns, scrolls);

                let profile = new Profile(new Date().toISOString(), activityLevel, Array.from(urls));

                profileStorage.appendProfile(profile);
            }
        });
    };
}