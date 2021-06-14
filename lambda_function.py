import json
import boto3
import traceback
from botocore.exceptions import *

ddb = boto3.resource("dynamodb")
table = ddb.Table("NameAgeTable")


def lambda_handler(event, context):
    responseObject = {
        "statusCode": 200,
        "headers": {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
        },
    }
    try:
        method = event['httpMethod']

        if method == "GET":
            name = event["queryStringParameters"]["Name"]
            try:
                get_item_response = table.get_item(Key={'Name': name})
                item = get_item_response["Item"]
                response = {
                    "Info": {
                        "Name": name,
                        "Age": int(item["Age"]),
                    }
                }
            except KeyError:
                response = {
                    "message": f"You do not exist!!!, {name}"
                }
        elif method == "POST":
            new_item = json.loads(event["body"])
            try:
                test_int = int(new_item["Age"])
            except ValueError as e:
                raise Exception("Age was not a whole number")
            if test_int < 0:
                raise Exception("Age was not a whole number")
            table.put_item(Item=new_item)
            response = {
                "message": "Item added successfully!"
            }
        responseObject["body"] = json.dumps(response)
        return responseObject
    except Exception as e:
        response = {
            "message": traceback.format_exc()
        }
        responseObject["body"] = json.dumps(response)
        return responseObject


