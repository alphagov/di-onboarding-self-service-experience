import axios, {Axios, AxiosResponse} from "axios";
import {OnboardingTableItem} from "../../../@types/OnboardingTableItem";
import {User} from "../../../@types/User";
import {Service} from "../../../@types/Service";
import LambdaFacadeInterface from "./LambdaFacadeInterface";

class LambdaFacade implements LambdaFacadeInterface {
    private instance: Axios;

    constructor(baseURL: string) {
        this.instance = axios.create({
            baseURL: baseURL,
            headers: {
                "Content-Type": "application/json"
            }
        });
    }

    async putUser(user: OnboardingTableItem, accessToken: string): Promise<AxiosResponse> {
        return await (await this.instance).post('/Prod/put-user', user, {
            headers: {
                "authorised-by": accessToken
            }
        });
    }

    async getUserByCognitoId(cognitoId: string, accessToken: string): Promise<AxiosResponse> {
        return await (await this.instance).post('/Prod/get-user', cognitoId, {
            headers: {
                "authorised-by": accessToken
            }
        });
    }

    async newService(service: Service, user: User, accessToken: string): Promise<AxiosResponse> {
        let body = {
            service: service,
            user: user
        }
        console.log("SENDING TO STEP FUNCTION ".repeat(10))
        console.log(JSON.stringify(body))
        return await (await this.instance).post('/Prod/new-service', JSON.stringify(body), {
            headers: {
                "authorised-by": accessToken
            }
        });
    }
}
export const lambdaFacadeInstance = new LambdaFacade(process.env.API_BASE_URL as string);