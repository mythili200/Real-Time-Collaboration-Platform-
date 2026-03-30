.

🚀 Real-Time Collaboration Chat App

A real-time collaborative chat application built with React, Socket.io, Node.js, Express, MongoDB, and Cloudinary for file uploads. Features include live messaging, typing indicators, chat history persistence, and image/file sharing.
--------------------------------------------------------
Features ==>
Real-time messaging with Socket.io
Typing indicator similar to WhatsApp
Messages are stored in MongoDB
File uploads (images, documents) with Cloudinary and Multer
Smooth UI animations with Framer Motion
User authentication with JWT stored in cookies
Auto-scroll to the latest message
Responsive and visually appealing UI with MUI
Temporary message display for instant feedback before server confirmation

-------------------------------------------------------------
Tech Stack ==>
Frontend: React, Material-UI, Framer Motion, Axios, Socket.io-client
Backend: Node.js, Express, Socket.io, Mongoose (MongoDB), JWT authentication, Multer, Cloudinary
Database: MongoDB
File Storage: Cloudinary

---------------------------------------------------------------
Usage ==>
Open the app in two browser tabs
Login with any registered user
Send messages and watch them appear in real-time
When a user types, "User is typing..." appears in other tabs

---------------------------------------------------------------
Future Improvements ==>
Display usernames in the typing indicator
Support multiple chat rooms
Add message reactions
Implement file sharing (images, documents)
Add dark/light theme toggle


-----------------------------------------------------------------

Socket.io Events ==>
Frontend emits:
joinRoom – join a chat room
sendMessage – send a new message
typing – user is typing
stopTyping – user stopped typing

------------------------------------------------------------------
Backend emits:
loadMessages – load last 50 messages for a room
receiveMessage – broadcast a new message
userTyping – broadcast typing user
userStopTyping – broadcast stopped typing user
