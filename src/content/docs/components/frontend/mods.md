---
title: Mods
---

> **Mods can expose sensitive data, look trough them and before you add them and only do so if you fully trust them!**

## Introduction

When creating a mod you need to choose which intentions (intents) your mod has.
They will give you access to the contexts (websocket, users, theme, page, messages, encryption, crypto, community and call). With these contexts you can modify the client very heavily.
You can find mods at https://mods.tensamin.methanium.net/ **(not yet availble!)**

## Development

Your mod has to always start with the intents, you cannot add a comment after the intents but under the intents. They will give your mod easy access to the contexts.

**Works**

```js
["usePageContext"];
// ^ These are your intents
```

**Does not work**

```js
["usePageContext"]; // These are your intents
```

After adding the intents you can access them using the `intents` Object.
Here is an example for auto launching the chat for a specific user:

```js
["usePageContext"];
intents.usePageContext.setPage({ name: "chat", data: "<uuid>" });
```

And here is an example for opening the settings by default and joining a call when the page loads:

```js
["usePageContext", "useCallContext"];
intents.usePageContext.setPage({ name: "settings", data: "" });
intents.useCallContext.setCallId("877778bd-bade-428a-bde9-d82f838dac9c");
intents.useCallContext.setCallSecret("ca51012b-d76e-4754-b6ef-111f67817b62");
intents.useCallContext.startCall();
```

These are all the valid intents:

- `useCallContext`
- `useCryptoContext`
- `useEncryptionContext`
- `useMessageContext`
- `usePageContext`
- `useThemeContext`
- `useUsersContext`
- `useWebSocketContext`

[Download Example Mod](https://tensamin.methanium.net/example-mod.json)
