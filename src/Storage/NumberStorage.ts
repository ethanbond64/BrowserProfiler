import BufferStorage from "./BufferStorage";

export default class NumberStorage implements BufferStorage<number> {

    private _default: number;

    constructor(defaultValue: number = 0) {
        this._default = defaultValue;
    }

    get(key: string): Promise<number> {
        return new Promise((resolve, reject) => chrome.storage.local.get([key], (result) => {
            resolve(result[key] || this._default);
        }));
    }

    set(key: string, value: number): void {
        chrome.storage.local.set({ [key]: value });
    }

    increment(key: string): void {
        chrome.storage.local.get(key, (result) => {
            var value = result[key] || this._default;
            chrome.storage.local.set({ [key]: value + 1 });
        });
    }

    clear(key: string): void {
        chrome.storage.local.set({ [key]: this._default });
    }

    pop(key: string): Promise<number> {
        return new Promise((resolve, reject) => chrome.storage.local.get([key], (result) => {
            let value = result[key] || this._default;
            chrome.storage.local.set({ [key]: this._default });
            resolve(value);
        }));
    }
}