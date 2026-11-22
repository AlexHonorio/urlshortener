# URL Shortener

A full-stack URL shortening application built with **Java, Spring Boot, React, and PostgreSQL**.

The application allows users to generate short URLs from long links, manage link expiration dates, track clicks, and authenticate using a session-based authentication system.

## Features

- **URL Shortening:** Generate unique short URLs using Base62 encoding.
- **URL Redirection:** Redirect users to the original URL.
- **Click Tracking:** Automatically count how many times a shortened URL is accessed.
- **Link Expiration:** Set an optional expiration date for shortened URLs.
- **Input Validation:** Validate URLs and expiration dates.
- **User Authentication:** User registration, login, and logout.
- **Session Management:** Authentication using HTTP sessions and CSRF protection.
- **Persistent Storage:** Store URLs and user data in PostgreSQL.
- **REST API:** Backend communication through HTTP endpoints.

## Technologies

### Backend
- Java 21
- Spring Boot
- Spring Web
- Spring Data JPA
- Spring Security
- PostgreSQL
- Flyway
- Maven

### Frontend
- React
- TypeScript
- Vite
- Tailwind CSS

## Project Structure

```text
urlshortener/
│
├── front/
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── vite.config.ts
│
├── src/
│   └── main/
│       ├── java/
│       └── resources/
│
├── .env.example
├── .gitignore
├── pom.xml
└── README.md
```

## Requirements

Before running the application, make sure you have installed:

- Java 21 or later
- Node.js and npm
- PostgreSQL
- Git

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/AlexHonorio/urlshortener
cd urlshortener
```

### 2. Configure the database

Create a PostgreSQL database:

```sql
CREATE DATABASE urlshortener;
```

Flyway will automatically execute the database migrations when the backend starts.

### 3. Configure environment variables

Create a `.env` file in the project root or configure the variables directly in your execution environment.

Use `.env.example` as a reference:

```env
DB_URL=jdbc:postgresql://localhost:5432/urlshortener
DB_USERNAME=your_username
DB_PASSWORD=your_password

APP_BASE_URL=http://localhost:8080
```

The backend expects the following environment variables:

| Variable | Description |
|---|---|
| `DB_URL` | PostgreSQL connection URL |
| `DB_USERNAME` | Database username |
| `DB_PASSWORD` | Database password |
| `APP_BASE_URL` | Base URL used to generate shortened links |

**Important:** Spring Boot does not automatically load `.env` files. Make sure these variables are available in the backend execution environment.

### 4. Run the backend

From the project root:

```bash
./mvnw spring-boot:run
```

On Windows PowerShell:

```powershell
.\mvnw.cmd spring-boot:run
```

The backend will be available at:

```text
http://localhost:8080
```

### 5. Run the frontend

Open another terminal:

```bash
cd front
npm install
npm run dev
```

The Vite development server will be available at:

```text
http://localhost:5173
```

## API Endpoints

### URL Management

| Method | Endpoint | Description |
|---|---|---|
| POST | `/shorten` | Create a shortened URL |
| GET | `/{id}` | Redirect to the original URL |

### Authentication

| Method | Endpoint | Description |
|---|---|---|
| POST | `/auth/register` | Register a new user |
| POST | `/auth/login` | Authenticate a user |
| GET | `/auth/csrf` | Retrieve the CSRF token |
| GET | `/auth/me` | Retrieve the authenticated user |
| POST | `/auth/logout` | Log out the current user |

## URL Shortening Example

**Request:**

```http
POST /shorten
Content-Type: application/json
```

```json
{
  "url": "https://www.example.com/some/very/long/url",
  "expiration": "2027-12-31"
}
```

The expiration field is optional and can be set to `null`.

**Example response:**

```json
{
  "id": "aB12xYz",
  "originalUrl": "https://www.example.com/some/very/long/url",
  "shortUrl": "http://localhost:8080/aB12xYz",
  "numClick": 0,
  "expiration": "2027-12-31"
}
```

## Security

The application uses Spring Security with session-based authentication and CSRF protection.

Database credentials are managed through environment variables instead of being stored directly in the application configuration.

## Future Improvements

- Deploy the application to a cloud environment.
- Add a dashboard for managing shortened URLs.
- Allow authenticated users to manage their own links.
- Improve link analytics and usage statistics.

## Author

Developed as a full-stack portfolio project to practice Java backend development, REST API design, database management, authentication, and React integration.