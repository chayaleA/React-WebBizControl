import axios from 'axios';
import { observable, action, makeObservable, computed, runInAction } from 'mobx';

class Services {
    services = [];

    constructor() {
        makeObservable(this, {
            services: observable,
            getServicesFromServer: action,
            addService: action,
            getServices: computed
        })
        this.services = this.getServices;
    }

    get getServices() {
        this.getServicesFromServer();
        return this.services;
    }

    getServicesFromServer() {
        axios.get("http://localhost:8787/services").then((res) => {
            runInAction(() => {
                this.services = res.data;
            })
        })
    }

    addService(ser) {
        fetch("http://localhost:8787/services", {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: ser.id,
                name: ser.name,
                description: ser.description,
                price: ser.price,
                duration: ser.duration,
                serviceMedia: ser.serviceMedia,
                arrPictures: ser.arrPictures
            })
        })
            .then(() => {
                runInAction(() => {
                    this.services = [...this.services, ser];
                });
            })
    }
};

// eslint-disable-next-line import/no-anonymous-default-export
export default new Services();

