# Node-Express-JWT-auth

## JWT Implementation for Authentication and Authorization

## How to run

1. update `.env` file

```bash
    PORT=7070
    MONGO_URI=<YOUR-MONGODB-URL>
    JWT_SECRET_KEY=<YOUR-JWT-SECRET_KEY>
```

2. run `npm install`

3. run `npm start`

## How to test

1. Register a User `POST` `http://localhost:7070/users/register/`

```bash
    {
        "username":"John Doe",
        "email":"john@doe.com",
        "password":"johndoe"
    }

    This will create a user account in the DB.
```

2. Login a User `POST` `http://localhost:7070/users/login/`

```bash
    {
        "email":"john@doe.com",
        "password":"johndoe"
    }

    This will return a JWT token.
```

3. Get User Data `GET` `http://localhost:7070/users/me/ --header 'x-auth-token: my.jwt.token'`

```bash
    This will return user data for the currently logged in user.
```
