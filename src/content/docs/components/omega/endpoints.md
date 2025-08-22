---
title: Endpoints
---

The `Omega` can be reached by HTTPS request from `Client` and `Iota`.
`Omikron` servers establish a Secure Websocket when booting.

This documentation is split into `Omikron` (WSS) and `HTTPS`.

## Omikron
### Identification
Any message to the `Omega` will be ignored until Identification.
##### `REQ:`
```json
{
	"type": "identification",
	"log": {
		"message": "Omikron signing in",
		"log_level": 0
	},
	"data": {
		"uuid": "<omikron-id>",
		"password": "<string>"
	}
}
```
##### `RES:`
```json
{
	"type": "identification_response",
	"log": {
	    "message": "Omikron signed in",
	    "log_level": 0
	},
	"data": {
	    "accepted": boolean,
	}
}
```

## HTTPS
#### GET `/api/find_omikron/`
Retrieves the `Omikron` node currently associated with the `Iota` linked to the specified `user-id`. This is used to track or reconnect to a user’s existing Omikron connection.
```json
{
	"type": "omikron",
	"log": {
	    "message": "The Omikron you where provided has a useage of XX%",
	    "log_level": 0
	},
	"data": {
		"omikron": "omikron.tensamin.methanium.net"
	}
}
```
#### Possible errors:
`No Omikron found` level: `2`
#### GET `/api/find_omikron/<user-id>`
Find the `Omikron` that the `Iota` of a `User` is connected to.
The client can input its `user-id` to find the `Omikron` where its `Iota` is connected to .
##### `RES:`
```json
{
	"type": "omikron",
	"log": {
		"message": "The iota you are searching is on the provided Omikron",
		"log_level": 0
	},
	"data": {
		"omikron": "omikron.tensamin.methanium.net"
	}
}
```
#### Possible errors:
`The user you are searching has no online iota` level: `1`
`The user you are searching has no iota` level: `2`
`The user you are searching does not exist` level: `2`
`Not a valid UUID provided` level: `2`
`The omikron with the users iota is full try again later` level: `0`