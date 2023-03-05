

export default class Profile {
    timestamp: string;
    activityLevel: ActivityLevel;
    urls: string[];

    static getActivityLevel(clicks: number, keys: number, scrolls: number): ActivityLevel {

        if (clicks > 0 || keys > 0) {
            return ActivityLevel.Active;
        }

        if (scrolls > 0) {
            return ActivityLevel.Passive;
        }

        return ActivityLevel.Idle;
    };

    constructor(timestamp: string, activityLevel: ActivityLevel, urls: string[]) {
        this.timestamp = timestamp;
        this.activityLevel = activityLevel;
        this.urls = urls;
    }
}

export enum ActivityLevel {
    Active = 1,
    Passive,
    Idle,
}