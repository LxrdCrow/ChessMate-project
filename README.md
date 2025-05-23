# ♟️ ChessMate API

ChessMate is a RESTful API for managing chess games, player notes, and user profiles. Built with Node.js, Express, and TypeScript, it's designed to store and retrieve chess-related data in a structured and scalable way.

## 📦 Features

- JWT-based user authentication
- CRUD operations for:
  - Chess games
  - Notes related to games
- Integration with external chess profile APIs
- Error handling middleware
- Basic project structure following MVC pattern

## 🚀 Technologies Used

- **Node.js** + **Express** – Back-end server
- **TypeScript** – Type safety and modern JavaScript features
- **MySQL** – Relational database
- **JWT (jsonwebtoken)** – Secure authentication
- **dotenv** – Environment variable management
- **cors** – Cross-Origin Resource Sharing
- **morgan** – HTTP request logger

## 🗂️ Project Structure

```

ChessMate-project/
├── src/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── app.ts
│   └── index.ts
├── .env
├── .gitignore
├── package.json
└── tsconfig.json

```

## 📄 .env Configuration

Your `.env` file should look like this:

```

DB\_HOST=localhost
DB\_USER=root
DB\_PASSWORD=
DB\_NAME=chessmate
DB\_PORT=3306
DB\_CHARSET=utf8mb4
JWT\_SECRET=your\_secret\_key\_here

````


## 🔧 Setup & Installation

```bash
# Clone the repo
git clone https://github.com/yourusername/ChessMate-project.git
cd ChessMate-project

# Install dependencies
npm install

# Run the server
npm run dev
````

## 📬 API Endpoints

### Users

* `POST /api/users/register` – Register a new user
* `POST /api/users/login` – Login and receive JWT

### Chess Profiles

* `GET /api/chess-profile?username=USERNAME` – Get public profile data

### Games

* `POST /api/games/` – Create a new chess game
* `PUT /api/games/:id` – Update an existing game
* `DELETE /api/games/:id` – Delete a game

### Notes

* `GET /api/notes/` – Get all notes
* `POST /api/notes/` – Add a new note

## 💡 Development Notes

* The project does **not** use a service layer (e.g., `services/`) for now, due to its small size and scope.
* All logic is implemented directly in the controllers to keep the architecture simple and straightforward.

## 🧪 Future Improvements (Optional)

* Add Swagger for API documentation
* Add integration tests with Jest or Supertest
* Add role-based access control
* Add rate limiting


```

