import {v4 as uuid } from 'uuid'
import AWS from 'aws-sdk';

const dynamodb = new AWS.DynamoDB.DocumentClient();

async function createAuction(event, context) {
  const {title} = JSON.parse(event.body);
  const now = new Date();

  try {
      const auction = {
        id: uuid(),
        title,
        status: "OPEN",
        createdAt: now.toISOString(),
      };
      // save data in dynamo db
      await dynamodb
        .put({
          TableName: "AuctionsTable",
          Item: auction,
        })
        .promise();
      return {
        statusCode: 201,
        body: JSON.stringify(auction),
      };
  } catch (error) {
    throw new Error(error);
  }

}

export const handler = createAuction;


