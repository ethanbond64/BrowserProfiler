import Profile from "../models/Profile";
import ArrayStorage from "./ArrayStorage";

export default class ProfileStorage extends ArrayStorage<Profile> {

    private static readonly KEY = "profiles";

    constructor() {
        super();
    }

    get() {
        return super.get(ProfileStorage.KEY);
    }

    setProfiles(value: Profile[]) {
        super.set(ProfileStorage.KEY, value);
    }

    appendProfile(value: Profile) {
        return super.append(ProfileStorage.KEY, value);
    }

    pop() {
        return super.pop(ProfileStorage.KEY);
    }

    evaluate(fn: (s: Profile[]) => void) {
        return new Promise((resolve, reject) => {
            chrome.storage.local.get([ProfileStorage.KEY], function (result) {
                if (result[ProfileStorage.KEY] === undefined) {
                    resolve(fn([]));
                } else {
                    resolve(fn(result[ProfileStorage.KEY]));
                }
            });
        });
    }
}