# r-url-shortener

## Table of Contents

- [About](#about)
- [Getting Started](#getting_started)
- [Usage](#usage)
- [Contributing](../CONTRIBUTING.md)

## About <a name = "about"></a>

A nodejs app for serve a url shortener api.

## Getting Started <a name = "getting_started"></a>

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See [deployment](#deployment) for notes on how to deploy the project on a live system.

### Prerequisites

you need a mongodb running to store the source url and the shortened url.

### Installing


To run app, first clone the repo, create a .env file based on .env.example in project files.

Install dependencies

```
npm install
```

and start server

```
node index.js
```


## Usage <a name = "usage"></a>

To generate a url shortened send a post to base url server:

request: 
```
POST http://url-server:server-port/v1/
```
request-body:
```
{
  "sourceUrl": "https://www.google.com"
}
```

response:
```
{
  "code": "p1fYcb24Z",
  "sourceUrl": "https://www.google.com",
  "shortUrl": "http://url-server:server-port/v1/p1fYcb24Z"
}
```
To access origin link just get shortUrl prop from response an access it.
```
http://server-url:server-port/v1/p1fYcb24Z
```
