# Endpoints

## GET /messages

Gets all [Message](#Message)


## GET /messages/{messageId}

## POST /messages

## DELETE /messages/{messageId}


### Message

| Name | Type | Required | Notes |
| ---- | ---- | ----------- | -------- |
| id | number | yes |  |
| text | string | yes | the actual message |
| userId | number | yes | id for the user creating the message |
| createdAt | Date | no | set by the database on create |
| updatedAt | Date | no | set by the database on update |

### User

| Name | Type | Required | Notes |
| ---- | ---- | ----------- | -------- |
| id | number | yes |  |
| username | string | yes | the nickname for the user, must be unique |
| createdAt | Date | no | set by the database on create |
| updatedAt | Date | no | set by the database on update |


