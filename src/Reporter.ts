import Profile from "./Profile";
import ArrayStorage from "./Storage/ArrayStorage";
import NumberStorage from "./Storage/NumberStorage";
import ProfileStorage from "./Storage/ProfileStorage";

const numberStorage = new NumberStorage();
const arrayStorage = new ArrayStorage();
const profileStorage = new ProfileStorage();

export default class Reporter {



    async report() {

        let clicks = await numberStorage.pop("clicks");
        let keydowns = await numberStorage.pop("keydowns");
        let scrolls = await numberStorage.pop("scrolls");
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