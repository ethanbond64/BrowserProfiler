
import BufferStorage from "./BufferStorage";

export default class ArrayStorage implements BufferStorage<[]> {

    private _default: number;

    constructor(defaultValue: number = 0) {
        this._default = defaultValue;
    }

    get(key: string): Promise<[]> {
        return new Promise((resolve, reject) => chrome.storage.local.get([key], (result) => {
            resolve(result[key] || this._default);
        }));
    }

    set(key: string, value: []): void {
        chrome.storage.local.set({ [key]: value });
    }

    append(key: string, value: any): void {
        chrome.storage.local.get(key, (result) => {
            var value = result[key] || this._default;
            chrome.storage.local.set({ [key]: value++ });
        });
    }

    clear(key: string): void {
        chrome.storage.local.set({ [key]: this._default });
    }

    pop(key: string): Promise<[]> {
        return new Promise((resolve, reject) => chrome.storage.local.get([key], (result) => {
            let value = result[key] || this._default;
            chrome.storage.local.set({ [key]: this._default });
            resolve(value);
        }));
    }
}