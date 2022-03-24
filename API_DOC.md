# Endpoints

## GET /messages

Get all messages([Message](#Message))

## GET /messages/{messageId}

Get a single [Message](#Message) with messageId param

**Parameters**

| Name | Located in | Required | Schema |
| ---- | ----------  | -------- | ---- |
| messageId | path | yes | number |

**Responses**

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 |  | [Message](#Message) |
| 400 | Invalid request | [ErrorResult](#ErrorResult)|
| 404 | not found | |
| 500 | Error fetching | |

## POST /messages

Create a new message

**Parameters**

| Name | Located in | Required | Schema |
| ---- | ----------  | -------- | ---- |
| MessageRequestBody | body | yes | [MessageRequestBody](#MessageRequestBody) |

**Responses**

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | | [Message](#Message) |
| 400 | Invalid request | [ErrorResult](#ErrorResult)|
| 500 | Error adding message | |

## DELETE /messages/{messageId}

**Parameters**

| Name | Located in | Required | Schema |
| ---- | ----------  | -------- | ---- |
| messageId | path | yes | number |

**Responses**

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 204 | Message deleted | |
| 400 | Invalid request | [ErrorResult](#ErrorResult)|
| 404 | Message not found | |
| 500 | Error deleting message | |


## Models

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

### MessageRequestBody

| Name | Type | Required | Notes |
| ---- | ---- | ----------- | -------- |
| username | string | yes | the nickname for the user, if no existing user is found it will be created |
| message | string | yes | the text for the message |


### ErrorResult

```
{
  "error": "<error message>"
}
```