# Active Recall Coach - Production Blueprint

## Architecture
- **Backend**: FastAPI (Python 3.11+)
- **Frontend**: React (served as static files)
- **Database**: SQLite (Development) / PostgreSQL (Production ready via SQLModel)
- **Auth**: JWT (OAuth2 Password Flow) with Bcrypt hashing

## Project Structure
```
/active-recall
  ├── backend/
  │   └── app/
  │       ├── main.py       # API Entry Point & Routes
  │       ├── models.py     # Database Schema (SQLModel)
  │       ├── auth.py       # JWT & Security Logic
  │       └── database.py   # Connection Management
  ├── frontend/             # Optimized React Frontend
  ├── run.ps1               # Automation Startup Script
  └── active_recall.db      # Production Database
```

## API Reference
| Endpoint | Method | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `/api/auth/register` | POST | Create a new account | No |
| `/api/auth/login` | POST | Get JWT Access Token | No |
| `/api/user/me` | GET | Current user stats (XP, Streak) | Yes |
| `/api/analyze` | POST | Run AI heuristic analysis | Yes |
| `/api/sessions` | GET/POST | Manage study history | Yes |
| `/api/folders` | GET/POST | Categorize sessions | Yes |

## Deployment Recommendations
1. **Containerization**: Use the provided (conceptual) Docker setup for consistent deployment.
2. **Environment Variables**:
   - `DATABASE_URL`: Set to a PostgreSQL string in production.
   - `SECRET_KEY`: Use a long, random string.
3. **CI/CD**: Use GitHub Actions to run `pytest` for backend and `eslint` for frontend before deploying to platforms like Railway, Render, or AWS.

## Security Best Practices Implemented
- **No Client-Side Secrets**: API keys and analysis logic are handled on the server.
- **HTTP-Only Cookies**: Recommended for token storage in browser environments.
- **Input Validation**: Pydantic/SQLModel ensures no corrupted data enters the DB.
- **CORS**: Configured to prevent unauthorized domain access.
