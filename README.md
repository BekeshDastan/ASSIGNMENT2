# ASSIGNMENT 2
## Bekesh Dastan


### Set up instruction
Installing express<h6></h6>
<i>npm install express</i><br>
Installing dotEnv<h6></h6>
<i>npm install dotenv</i><br>
Running<h6></h6>
<i>node server</i><br>

Creating env file with:<br>
<img width="585" height="67" alt="image" src="https://github.com/user-attachments/assets/dd12b763-74a2-422d-8c29-7835541cc7e8" /><br><br><br><br><br>



### API
Local development base URL:

http://localhost:3000

GET /api/weather
Fetch current weather for a given city using the OpenWeather API.


GET /api/news
Fetch news articles for a given country (ISO2 code) using World News API.

Description

Health check for the backend.

Returns a simple text message:

Weather API server is running


Variants of weather correct answer:<br>
`{
  "temperature": 12.34,
  "feels_like": 10.5,
  "description": "clear sky",
  "coordinates": {
    "lat": 51.1694,
    "lon": 71.4491
  },
  "wind_speed": 3.6,
  "country": "KZ",
  "rain_3h": 0,
  "city": "Astana"
}`

Possible errors

500 – missing NEWS_API_KEY or invalid JSON from the World News API.

4xx – incorrect parameters/key/limits on the World News API side.<br><br><br>







### Design desicions
1. Separation of responsibilities
Backend:

It works as a thin wrapper on external APIs (OpenWeather, World News API).

Key validation (OPENWEATHER_API_KEY, NEWS_API_KEY) at the start of each request.

The frontend:

Minimal index.html + vanilla JS (Fetch API).

The entire UI logic on the client: displaying results, errors, and downloads.
​

2. Usage .env and dotenv
All secrets (API keys) are stored in environment variables.

dotenv is enabled at the beginning server.js so that process.env is available in the entire file.
​

This makes it easy to deploy the project to different environments (dev/prod).

3. Error handling and logging
For external requests, fetch is used, response.ok is checked, and logs are logged.:

URL

HTTP status

error body (for diagnostics)

In case of errors, JSON with error is returned so that the frontend can correctly display the message to the user.<br><br><br><br>



### Screenshots<br>
<img width="1197" height="899" alt="image" src="https://github.com/user-attachments/assets/d26ad87a-92bd-493f-b092-570b5dba3185" /><br>
<img width="545" height="232" alt="image" src="https://github.com/user-attachments/assets/02327b7b-2020-4066-9524-a23703f60160" /><br>
<img width="568" height="329" alt="image" src="https://github.com/user-attachments/assets/26ccf985-1b4c-4748-8339-8f305f9dcb4f" /><br>
<img width="588" height="285" alt="image" src="https://github.com/user-attachments/assets/f018979e-0e01-458c-8515-b38a3e2b0f46" /><br>
<img width="549" height="637" alt="image" src="https://github.com/user-attachments/assets/02a93248-118b-4ea3-bf60-e603d3b71c01" /><br>





​
