# HackMate

A Tinder-style app for finding hackathon teammates. Swipe on developers, designers and ML people, match with the ones whose skills complement yours, and chat to form a team.

> Status: in development (backend setup and auth done)

## Tech Stack
- Node.js, Express
- MongoDB Atlas, Mongoose
- JWT authentication, bcrypt
- Planned: React (Vite), Socket.io, Tailwind CSS

## Features
- [x] User registration and login (JWT)
- [x] Protected routes with auth middleware
- [x] Profile with role, skills and bio
- [ ] Swipe and match logic
- [ ] Real-time chat between matches
- [ ] Hackathon events and team creation

## API Endpoints
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | /api/auth/register | No | Create an account |
| POST | /api/auth/login | No | Log in and get a token |
| GET | /api/auth/me | Yes | Get the current user |
| GET | /api/users/profile | Yes | Get your profile |
| PUT | /api/users/profile | Yes | Update your profile |

## Run Locally
```bash
git clone https://github.com/rudraa22/Hackmate.git
cd Hackmate
npm install
```
Create a `.env` file:
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret
```
Then start the server:
```bash
npm run dev
```
