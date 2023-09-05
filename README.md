# Test task 
The text of the task:
"Реализовать модуль аутентификации пользователя для веб-сайта.
Модуль должен предоставлять REST API для прохождения аутентификации и получения данных по пользователю прошедшему аутентификацию.
Для хранения данных используется Postgresql. При реализации необходимо использовать Nest.js и TypeORM."

## Steps to start application
```
1. Open root folder in terminal
2. run command - `sudo docker-compose up`
3. run script - `npm install && npm run migration:run && npm start`
```

## Default user data
```
username - test1
password - test1
```

## Steps to reproduce task
```
1. open 'http://localhost:3000/swagger' in your browser

2. call Post request /auth/login with body : { "username": "test1", "password": "test1"}

3. copy access token, click to "Autorize" button, in modal window paste the copied access token

4. try to send /user/info request. If access token is valid, you will receive user information. 

5. If you got error with "Unauthorized" message, but you logged about 5 minutes ago, 
you need to copy refresh token from 2 step, then in to "Autorize" model window  click "Logout" and paste 
refresh token and click Autorize. App will generate new access token, reproduce 3 and 4 steps with this token 
```