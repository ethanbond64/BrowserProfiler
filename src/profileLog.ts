

export class ProfileLog {
    timestamp: string;
    activityLevel: ActivityLevel;
    urls: string[];

    constructor(timestamp: string, activityLevel: ActivityLevel, urls: string[]) {
        this.timestamp = timestamp;
        this.activityLevel = activityLevel;
        this.urls = urls;
    }
}

export enum ActivityLevel {
    Active = 1,
    Passive,
    Paused,
    Idle,
}