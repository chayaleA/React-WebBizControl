import axios from 'axios';
import { observable, action, makeObservable, computed, runInAction } from 'mobx';

class Meetings {
    meetings = []

    constructor() {
        makeObservable(this, {
            meetings: observable,
            addMeeting: action,
            getMeetingsDataFromServer: action,
            getMeetings: computed
        })
        this.meetings = this.getMeetings;
    }

    get getMeetings() {
        this.getMeetingsDataFromServer();
        return this.meetings;
    }

    getMeetingsDataFromServer() {
        axios.get("http://localhost:8787/appointments").then((res) => {
            runInAction(() => {
                this.meetings = res.data;
            })
        })
    }
    addMeeting(mit) {
        fetch("http://localhost:8787/appointment", {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: mit.id,
                serviceName: mit.serviceName,
                serviceDescription: mit.serviceDescription,
                servicePrice: mit.servicePrice,
                dateTime: mit.dateTime,
                clientName: mit.clientName,
                clientPhone: mit.clientPhone,
                clientEmail: mit.clientEmail
            })

        }).then((response) => {
            if (response.status === 400) {
                alert("This date is already caught, try again!!!!!!!!")
            }
            else {
                runInAction(() => {
                    this.meetings = [...this.meetings, mit];
                });
            }

        })
    }
};

// eslint-disable-next-line import/no-anonymous-default-export
export default new Meetings();