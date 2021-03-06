import {APIGatewayProxyEvent, APIGatewayProxyResult} from 'aws-lambda';

import axios, {Axios, AxiosResponse} from "axios"; // until Onboarding takes over client registry / just for now

let instance: Axios;

instance = axios.create({
    baseURL: process.env.AUTH_REGISTRATION_BASE_URL,
    headers: {
        "Content-Type": "application/json"
    }
});


export const updateClientInRegistryHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

    let payload: any = event;
    console.log(payload.clientId);
    console.log(payload.serviceId);
    console.log(payload.selfServiceClientId)
    console.log(payload.updates);

    const result = await (await instance).put(`/connect/register/${payload.clientId}`, payload.updates);

    const response: APIGatewayProxyResult = {
        statusCode: 200,
        body: JSON.stringify({...result.data, ...{updates: payload.updates}, ...{serviceId: payload.serviceId}, ...{selfServiceClientId: payload.selfServiceClientId}})
    }
    return response;
}