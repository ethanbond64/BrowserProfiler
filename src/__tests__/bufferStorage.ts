import { chrome } from "jest-chrome";
import { getAndClear, incrementStorageValue } from "../bufferStorage";

test("Simple Increment And Clear", async () => {
    let key = "testKey";
    incrementStorageValue(key);
    incrementStorageValue(key);
    expect(await getAndClear(key)).toBe(2);
    expect(await getAndClear(key)).toBe(0);
});

