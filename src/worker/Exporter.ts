import ProfileStorage from "../storage/ProfileStorage";

const profileStorage = new ProfileStorage();

export default class Exporter {

    static async export() {

        console.log("exporting...");

        let profiles = await profileStorage.pop();
        let body = JSON.stringify({ "profiles": [...profiles] });

        console.log(body);

        fetch("http://localhost:8000/put/profiles", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: body
        }).then(response => {
            if (response.status === 200) {
                console.log("Data store synced");
            }
        });
    }
}