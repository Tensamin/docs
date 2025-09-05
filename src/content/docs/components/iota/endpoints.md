---
title: Endpoints
---

All messages to the `Iota` are either from the `Omikron` directly, from a `Client` or another `Iota` trying to message a `User` on the `Iota`.
All messages will be marked with a `sender_id` this will be added on the `Omikron`.
It is important to note that the `Iota ID` is not shared with others as it is what verifies the `Iota` users to Tensamin.
In the response the `sender_id` & `receiver_id` must be swapped as sender.
When a message comes from an iota without a `sender-id` that the iota has access to or is designated for the client (`33333333-3333-3333-3333-333333333333`) the message will not be send.

## Messages

### Client messages someone

##### `REQ:`

```json
{
  "sender_id": "<user-id>",
  "receiver_id": "<user-id>",

  "type": "message",
  "id": "<uuid>",
  "log": {
    "message": "Message from user",
    "log_level": 0
  },
  "data": {
    "user": {
      "avatar": true,
      "display": true,
      "timestamp": true
    },
    "body": {
      "tint": "<hex color>",
      "content": "<markdown (encrypted)>",
      "files": [
        {
          "name": "<cool name>",
          "id": "<uuid>",
          "type": "[ image | image_top_right | file ]"
        }
      ]
    }
  }
}
```

##### `RES:`

```json
{
  "sender_id": "<user-id>",
  "receiver_id": "<user-id>",

  "type": "message_response",
  "id": "<uuid>",
  "log": {
    "message": "Message from user received",
    "log_level": 0
  },
  "data": {}
}
```

### Client loads messages

##### `REQ:`

```json
{
	"sender_id": "<user-id>",

	"type":"message_get",
	"id": "<uuid>",
	"log": {
		"message": "User requesting message Chunk",
		"log_level": 0
	},
	"data": {
		"chat_partner_id": "<user-id>",
		"get_amount": int,
		"has_amount": int
	}
}
```

##### `RES:`

```json
{
	"sender_id": "<iota-id>",

	"type":"message_chunk",
	"id": "<uuid>",
	"log": {
		"message": "Message chunk loaded",
		"log_level": 0
	},
	"data": {
    	"messages": [
		  {
			"data": {
				"timestamp": long, // UNIX Timestamp for time sent
				"sent_by_self": true
			},
		    "user": {
			  "avatar": true, // if not defined value is true | default: true
			  "display": true,
			  "timestamp": true,
		    },
		    "body": {
			  "tint": "<hex color>", // 30%
			  "content": "<markdown (encrypted)>",
			  "files": [
				{
				  "name": "<cool name>",
				  "id": "<uuid>",
				  "type": "[ image | image_top_right | file ]"
				}
			  ]
			}
		  }
		]
	}
}
```

### Send a message to other Iota

##### `REQ:`

```json
{
  "sender_id": "<user_id>",
  "receiver_id": "<user_id>",

  "type": "message",
  "id": "<uuid>",
  "log": {
    "message": "Message from other user",
    "log_level": 0
  },
  "data": {
    "message_content": "<message>"
  }
}
```

##### `RES:`

```json
{
  "sender_id": "<user_id>",
  "receiver_id": "<user_id>",

  "type": "message",
  "id": "<uuid>",
  "log": {
    "message": "Message from other user received",
    "log_level": 0
  },
  "data": {}
}
```

## Friends

### User sends friend request to other User

A friend request should be send with the first message, it should contain a target user, a `shared secret` that is encrypted with the users own `public key` as well as another one encrypted with the target users `public key` to the later a signature should be added so it can be verified.

### Client -> Iota

#### `REQ:`

```json
{
  "sender_id": "<user_id>", // handeled by Omikron
  "id": "<message_id>",
  "type": "shared_secret_set",
  "log": {
    "log_level": 1,
    "message": "<user_id> sent <user_id> a friend request"
  },
  "data": {
    "receiver_id": "<uuid>",
    "shared_secret_own": "",
    "shared_secret_other": "",
    "shared_secret_sign": ""
  }
}
```

#### `RES:`

```json
{
  "receiver_id": "<user_id>", // handeled by Omikron
  "id": "<message_id>",
  "type": "shared_secret_return",
  "log": {
    "log_level": 0,
    "message": "Friend request was received"
  },
  "data": {}
}
```

#### Possible errors:

`Not a valid UUID provided` level: `2`
`These users allready have a shared secret` level: `0`
`The target Iota isn't responding` level: `0`
`The target Iota isn't responding correctly` level: `0`

###### -> From Omega:

`The user you are searching has no online Iota` level: `1`
`The user you are searching has no Iota` level: `2`
`The user you are searching does not exist` level: `2`
`Not a valid UUID provided` level: `2`
`The omikron with the users Iota is full try again later` level: `0`

### Iota -> Iota

#### `REQ:`

```json
{
  "sender_id": "<user_id>", // checked by Omikron
  "receiver_id": "<user_id>", // handeled by Omikron
  "id": "<message_id>",
  "type": "shared_secret_set",
  "log": {
    "log_level": 1,
    "message": "<user_id> sent <user_id> a friend request"
  },
  "data": {
    "shared_secret_own": "",
    "shared_secret_other": "",
    "shared_secret_sign": ""
  }
}
```

#### `RES:`

```json
{
  "sender_id": "<user_id>", // checked by Omikron
  "receiver_id": "<user_id>", // handeled by Omikron
  "id": "<message_id>",
  "type": "shared_secret_return",
  "log": {
    "log_level": 0,
    "message": "Friend request was received"
  },
  "data": {}
}
```

#### Possible errors:

###### -> From Omikron:

`Users Iota is not connected` level: `1`

##### -> From Iota:

`User does not accept friend request` level: `0`

### Client getting friends

#### `REQ:`

```json
{
  "sender_id": "<user_id>", // handeled by Omikron
  "id": "<message_id>",
  "type": "shared_secret_get",
  "log": {
    "log_level": 1,
    "message": "<user_id> gets <user_id>'s shared secret "
  },
  "data": {}
}
```

#### `RES:`

```json
{
	"receiver_id": "<user_id>",   // needed by Omikron
	"id": "<message_id>",
	"type": "shared_secret_return",
	"log": {
		"log_level": 0,
		"message": "the shared secret"
	},
	"data": {
		"user_ids": [
			{
				"user_id": "<uuid>",
				"last_message_at": unixTimestamp
			},
			{
				"user_id": "<uuid>",
				"last_message_at": unixTimestamp
			}
		]
	}
}
```

### Getting the shared secret of one friend

#### `REQ:`

```json
{
  "sender_id": "<user_id>", // handeled by Omikron
  "id": "<message_id>",
  "type": "shared_secret_get",
  "log": {
    "log_level": 1,
    "message": "<user_id> sent <user_id> a friend request"
  },
  "data": {
    "user_id": "<other user id>"
  }
}
```

#### `RES:`

```json
{
  "receiver_id": "<user_id>", // needed by Omikron
  "id": "<message_id>",
  "type": "shared_secret_return",
  "log": {
    "log_level": 0,
    "message": "shared secret"
  },
  "data": {
    "shared_secret_own": "secret"
  }
}
```
