import { APIRequestContext } from "@playwright/test";

export class APIClient {
    private request: APIRequestContext

    constructor(request: APIRequestContext) {
        this.request = request
    }

    private async makeRequest(endpoint: string, method: string, reqBody?: object, token?: string) {
        const response = await this.request[method]("/notes/api" + endpoint, {
            headers: token ? {'X-Auth-Token': token} : {},
            data: reqBody
        })
        return response
    }

    async getRequest(endpoint: string, token?: string) {
        return this.makeRequest(endpoint, 'get', undefined, token)
    }

    async postRequest(endpoint: string, reqBody?: object, token?: string) {
        return this.makeRequest(endpoint, 'post', reqBody, token)
    }

    async putRequest(endpoint: string, reqBody?: object, token?: string) {
        return this.makeRequest(endpoint, 'put', reqBody, token)
    }

    async deleteRequest(endpoint: string, token?: string) {
        return this.makeRequest(endpoint, 'delete', undefined, token)
    }
}