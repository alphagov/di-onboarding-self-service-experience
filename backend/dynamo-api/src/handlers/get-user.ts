import {APIGatewayProxyEvent, APIGatewayProxyResult} from 'aws-lambda';
import DynamoClient from "../client/DynamoClient";

const tableName = process.env.TABLE;
const client = new DynamoClient(tableName as string);

export const getUserHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const cognitoId = JSON.parse(event.body as string);

    // Do whatever validation we want to do on the user

    let response = {statusCode: 200, body: JSON.stringify("OK")};
    await client
        .queryBySortKey(cognitoId)
        .then((queryCommandOutput) => {
            response.statusCode = 200;
            response.body = JSON.stringify(queryCommandOutput);
        })
        .catch((queryCommandOutput) => {
            console.error(queryCommandOutput);
            response.statusCode = 500;
            response.body = JSON.stringify(queryCommandOutput)
        });

    return response;
};
