---
title: "major-project_presentation_content"
---

## Features
1. **Profile**
	1. Photo
	2. About You
3. **Chat**
	1. E2E Encryption
	2. Persistence
4. **Recommendation Engine**
	1. Data-Warehousing
	2. Unsupervised Learning - K-modes clustering
5. **Match**

---
## Roadmap

**P1**
- Design Phase

**P2**
- Chat Messenger Implemetation

**P3**
- Feature Additions

---

## Matrix

Matrix is an open protocol for decentralised, secure communications.

**We believe:**
- People should have full control over their own communication.
- People should not be locked into centralised communication silos, but instead be free to pick who they choose to host their communication without limiting who they can reach.
- The ability to converse securely and privately is a basic human right.
- Communication should be available to everyone as a free and open, unencumbered, standard and global network.


---

## Elements of Matrix

### 1. Homeserver
A homeserver is a piece of software hosting accounts of Matrix users. It is bound to a single domain that cannot change over time.

![[stuff/Pasted image 20231101133538.png]]

---

### 2. Client

Homeservers communicate between each other with the Server-Server / Federation API, but they also communicate with clients in a standard way: the Client-Server API.

Clients are pieces of software that can use a Matrix account to send and receive events from a specific homeserver. The clients themselves only ever talk to the homeserver of the account they're using. If a client uses the `@alice:example.com` account, they will only talk to `example.com`.


---

## Voice Call

Implementation of voice call uses WebRTC, a peer-to-peer protocol for communication.

WebRTC is a decentralized protocol, meaning that users can communicate directly with each other without the need for a central server.

![[stuff/Pasted image 20231101143540.png]]

---
## Current Progress

**Chat Messenger:**
1. Single Sign-On(SSO): Google 
2. Encrypted Messaging
3. Group Chatting
4. Voice Call