import AWS from "aws-sdk";
import createError from "http-errors";
import commonMiddlewares from "../libs/commonMiddlewares";
const dynamodb = new AWS.DynamoDB.DocumentClient();

async function getAuction(event, context) {
  let auction;
  const { id } = event.pathParameters;
  try {
    const result = await dynamodb
      .get({
        TableName: process.env.AUCTIONS_TABLE_NAME,
        Key: { id },
      })
      .promise();

    auction = result.Item;
  } catch (error) {
    console.error(error);
    throw new createError.InternalServerError(error);
  }
  if (!auction) {
    throw new createError.NotFound(`Not Fount ${id}`);
  }
  return {
    statusCode: 200,
    body: JSON.stringify(auction),
  };
}

export const handler = commonMiddlewares(getAuction);
