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

  "type": "message_send",
  "id": "<uuid>",
  "data": {
    {
      "receiver_id": "<uuid>",
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

  "type": "message_send",
  "id": "<uuid>",
  "data": {}
}
```

### Client loads messages

##### `REQ:`

```json
{
	"sender_id": "<user-id>",

	"type":"messages_get",
	"id": "<uuid>",
	"data": {
		"user_id": "<user-id>",
		"amount": int,
		"offset": int
	}
}
```

##### `RES:`

```json
{
	"sender_id": "<iota-id>",

	"type":"messages_get",
	"id": "<uuid>",
	"data": {
  	"messages": [
	    {
		  	"sent_by_self": true,
		  	"timestamp": 0, // UNIX Timestamp for time sent
		    "content": "<markdown (encrypted)>",
		    "files": [
		  	  {
		  	    "name": "<cool name>",
		  	    "id": "<uuid>",
		  	    "type": "[ image | image_top_right | file ]"
		  	  }
		    ],
		    "tint": "<hex color>",
		    "avatar": false, // unless false key is removed
		    "display": false, // unless false key is removed
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
  "data": {}
}
```