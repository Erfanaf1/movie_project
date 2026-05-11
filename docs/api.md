# 📁 Movie Collection - API Documentation

## Base URLs
- Development: `http://localhost:8008/api/`
- Production: `http://178.173.144.194:8008/api/`
- No authentication required

---

## Endpoints

### Get all movies
GET /api/movies/

### Get single movie
GET /api/movies/{id}/

### Add movie
POST /api/movies/
Body: { "title": "Inception", "director": "Christopher Nolan", "year": "2014", "genres": "Sci-Fi", "status": "want-to-watch" }

### Update movie
PUT /api/movies/{id}/

### Delete movie
DELETE /api/movies/{id}/

### Search external API (moviesapi.ir)
GET /api/external/search/?q={name}

### Get external movie details
GET /api/external/movies/{movie_id}/

### Get genres
GET /api/genres/
GET /api/external/genres/

### Get movies by genre
GET /api/external/genres/{genre_id}/movies/

### Register user
POST /api/external/register/
Body: { "name": "Erfan", "email": "erfan@example.com", "password": "123456" }

### Login user
POST /api/external/login/
Body: { "username": "erfan@example.com", "password": "123456" }

### Sync external movie to local database
POST /api/sync/movie/
Body: { "movie_id": 123 }

### Sync all genres
POST /api/sync/genres/

---

## Movie Object Structure
| Field | Type | Example |
|-------|------|---------|
| id | integer | 1 |
| title | string | "Inception" |
| director | string | "Christopher Nolan" |
| year | string | "2010" |
| genres | string | "Action, Sci-Fi" |
| poster | string | URL |
| imdb_rating | string | "8.8" |
| imdb_id | string | "tt1375666" |
| status | string | "watched" or "want-to-watch" |
| user_rating | integer | 1-10 |
| user_note | text | "Great movie" |
| is_watched | boolean | true/false (read-only) |

---

## Status Codes
200 = Success (GET, PUT)
201 = Created (POST)
204 = Deleted (DELETE)
400 = Bad request
404 = Not found
500 = Server error

---

## Notes for Frontend
- is_watched is read-only, don't send it in POST/PUT
- Use /api/external/search/ for searching movies
- Use POST /api/movies/ to add to local database
- No token or special headers needed currently