markdown

Run
Copy code
# Social-Web

Social-Web is a full-stack social media web application built with React, Node.js, Express, MySQL, and React Query. Users can create accounts, post content, like posts, comment, follow other users, and update their profile including profile and cover pictures.

## 🚀 Features

### User Authentication
- Sign up, log in, and secure authentication with JWT tokens.
- Persisted login state using cookies and Auth Context.

### Posts
- Create, view, and delete posts.
- Users can like and comment on posts.
- Homepage shows posts from all users.
- Profile pages show posts uploaded by that user only.

### Stories
- Users can post stories (backend ready, frontend can be extended).

### Profile Management
- Update profile information including name, email, password, city, website.
- Upload profile and cover pictures.
- Follow/unfollow other users.
- View followers and following counts.

### Interactions
- Like/unlike posts.
- Comment on posts.
- Follow/unfollow users.

### UI Features
- Dark mode toggle.
- Responsive and user-friendly interface.
- Social media links integration (Facebook, Instagram, Twitter, LinkedIn, Pinterest).

## 💻 Tech Stack
| Frontend                | Backend                   | Database | Others                    |
| ----------------------- | ------------------------- | -------- | ------------------------- |
| React.js                | Node.js                   | MySQL    | Axios                     |
| React Query             | Express.js                | -        | Moment.js                 |
| SCSS / CSS              | JWT Auth                  | -        | Multer (for file uploads) |
| Tailwind CSS (optional) | bcrypt (password hashing) | -        | React Router              |


⚡ API Endpoints

Auth
- POST /api/auth/register – Register a new user
- POST /api/auth/login – User login
- POST /api/auth/logout – Logout

Users
- GET /api/users/find/:userId – Get user info
- PUT /api/users – Update user profile

Posts
- GET /api/posts?userId= – Get posts (all or by specific user)
- POST /api/posts – Create a post
- DELETE /api/posts/:id – Delete a post

Likes
- GET /api/likes?postId= – Get likes for a post
- POST /api/likes – Like a post
- DELETE /api/likes?postId= – Unlike a post

Relationships
- GET /api/relationships?followedUserId= – Get followers
- POST /api/relationships – Follow a user
- DELETE /api/relationships?userId= – Unfollow a user

File Upload
- POST /api/upload – Upload profile, cover, or post images

🔧 Setup Instructions

Backend
cd server
npm install
npm start

Ensure MySQL database is running and connect.js has correct credentials.

Set .env file:
PORT=8800
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=socialweb
JWT_SECRET=your_jwt_secret

Frontend
cd client
npm install
npm start

Open http://localhost:3000 in your browser.

**🖼 Screenshots**
**Login page**<img width="1772" height="891" alt="image" src="https://github.com/user-attachments/assets/b6544777-9442-4c74-b0be-99cee669382b" />

**Signup page**<img width="1630" height="806" alt="image" src="https://github.com/user-attachments/assets/66c1530f-bb84-42b9-a095-65b9a1ed3773" />

**Profile page** <img width="1903" height="904" alt="image" src="https://github.com/user-attachments/assets/accd2824-0b6f-44f5-8bca-825ad9fe1067" />

**Update Profile**<img width="1186" height="861" alt="image" src="https://github.com/user-attachments/assets/759bedd9-8848-4efa-8eca-a9081d94ca15" />

**Home Page**<img width="1920" height="913" alt="image" src="https://github.com/user-attachments/assets/35078eb9-c3a5-4fa4-ae0e-fbccbe041966" />

**User posts** <img width="1102" height="848" alt="image" src="https://github.com/user-attachments/assets/009ddb50-f1c5-4025-a8f7-d2a6b466a2f9" />

**User Story **<img width="1228" height="850" alt="image" src="https://github.com/user-attachments/assets/2ac965ba-6cd2-4a05-b331-1e75ed8ec4c8" />



📌 Future Improvements
- Implement real-time notifications for likes/comments using Socket.io.
- Adding Meassaging feature.
- Improve UI with animations and drag-and-drop uploads.
- Implement search and explore page for posts and users.
"""




