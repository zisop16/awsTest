import json

def lambda_handler(event, context):
    inputs = event["queryStringParameters"]
    name = inputs["name"]
    age = inputs["age"]

    response = {
        "Your Name": name,
        "Your Age": age,
        "Message": "You are cringe"
    }

    response_object = {
        "statusCode": 200,
        "headers": {
            "Content-Type": "application/json"
        },
        "body": json.dumps(response)
    }

    return response_object