import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb'

const client = new DynamoDBClient({
    region: 'us-east-1',
}); // Change this endpoint to your AWS DynamoDB endpoint
export const dynamo = DynamoDBDocumentClient.from(client);
export const tableNameUsers = 'explore-colombia-user';