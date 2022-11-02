import axios from "axios";

const BASE_URL = "https://console.dev.phone.do"
class Api {
    constructor() {
        this.api_token = null;
        this.client = null;
        this.api_url = BASE_URL;
    }

    init = () => {
        // this.api_token ;

        let headers = {
            "Accept": "application/ld+json",
            "Content-Type": "application/ld+json",
        };

        if (this.api_token) {
            headers.Authorization = `Bearer ${this.api_token}`;
        }

        this.client = axios.create({
            baseURL: this.api_url,
            timeout: 31000,
            headers: headers,
        });

        return this.client;
    };

    getAgentsList = (params) => {
        return this.init().get("/users", { params: params });
    };

    regRequestCode = async (data = {}) => {
        return await this.init().post("/api/signup_token_codes", data);
    };
    regCreateCode = async (link, data = {}) => {
        console.log("🚀 ~ file: api.js ~ line 40 ~ Api ~ regCreateCode= ~ link", link)
        return await this.init().put(link + "/request_code", data);
    }
}

export const api = new Api() 