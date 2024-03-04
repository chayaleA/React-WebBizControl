import axios from 'axios';
import { observable, action, makeObservable, computed, runInAction } from 'mobx';

class BusinessData {
    data = {};

    constructor() {
        makeObservable(this, {
            data: observable,
            createOrUpdateBusinessdata: action,
            getBusinessDataFromServer: action,
            getData: computed
        })
        this.data = this.getData;
    }

    get getData() {
        this.getBusinessDataFromServer();
        return this.data;
    }

    getBusinessDataFromServer() {
        axios.get("http://localhost:8787/businessData").then((res) => {
            runInAction(() => {
                this.data = res.data; 
            })
        })
    }

    createOrUpdateBusinessdata(data) {
        fetch("http://localhost:8787/businessData", {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: data.name,
                address: data.address,
                phone: data.phone,
                owner: data.owner,
                logo: data.logo,
                description: data.description,
            })
        }).then(() => {
            this.data = data;
        })
    }
};

// eslint-disable-next-line import/no-anonymous-default-export
export default new BusinessData();