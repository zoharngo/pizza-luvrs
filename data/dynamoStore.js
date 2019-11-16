const AWS = require('aws-sdk');

AWS.config.update({
    region: 'eu-central-1'
});

const dynamodb = new AWS.DynamoDB.DocumentClient();

async function putItem(table, item) {
    return new Promise((res, rej) => {
        const params = {
            TableName: table,
            Item: item,
        }

        dynamodb.put(params, (err, data) => {
            if (err) {
                rej(err);
            } else {
                res(data);
            }
        });
    });
}


async function getAllItems(table) {
    return new Promise((res, rej) => {
        const params = {
            TableName: table,
        }

        dynamodb.scan(params, (err, data) => {
            if (err) {
                rej(err);
            } else {
                res(data.Items);
            }
        });
    });
}

async function getItem(table, idKey, id) {
    return new Promise((res, rej) => {
        const params = {
            TableName: table,
            Key: {
                [idKey]: id
            }
        }

        dynamodb.get(params, (err, data) => {
            if (err) {
                rej(err);
            } else {
                res(data.Item);
            }
        });
    });
}


module.exports = {
    putItem,
    getAllItems,
    getItem
}