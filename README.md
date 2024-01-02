## How to run

### Packages

`pip install uvicorn fastapi`


### Frontend

1. change to frontend directory 
`cd frontend`

2. install packages `npm i`

3. run the nextjs app
    `npm run dev`

note: if you see the error `next` not installed, install it by running `npm i next`

The frontend will run on `https://localhost:3000` and run the app

To exit the frontend, use `Ctrl-C`

### Backend 

1. change to backend directory
`cd backend/app`

2. run the fast api app
`python3 -m uvicorn main:app --reload` or `python -m uvicorn main:app --reload`

The backend server will run on `http://127.0.0.1:8000`

If the server runs successfully upon opening the link it should say `{"message":"Hello, FastAPI!"}`

To exit the server, use `Ctrl-C`

### To contribute


Clone the repository using `git clone`:
```
git clone https://github.com/Usgupta/capstone.git
```
### Working on a new feature

When working on a new feature, create a **new branch** first with the following format `<name>-<featurename>` and commands:
```
# Get updated main branch
git checkout main
git pull origin main

# Create new branch
git checkout -b <backend/frontend/AI>-<featurename>

# Example
git checkout main
git pull origin main
git checkout -b AI-rawgat-confidencescores
```

### Commiting and Pushing your changes

Stage your changes:
```
git add .
```

Commit your changes:
```
git commit -m "INSERT COMMIT MESSAGE HERE"

# Example
git commit -m "Implemented the entire app"
```

Push to your branch using `git push` command:
```
git push origin <name>-<featurename>

# Examples
git push origin AI-rawgat-confidencescores
git push origin frontend-homepage
```

Submit a Pull Request (PR) to the `main` branch using the GitHub website
```
Repo main page > Pull requests > New pull request
```
The `base` branch should be `dev` and the `compare` branch should be your branch.
