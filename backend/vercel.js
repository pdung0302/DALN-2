{
    "builds" [
      {
        "src": "./server.js",
        "use": "@vercel/node"
      }
    ],
    "routes" [
      {
        "src": "/(.*)",
        "dest": "/app.js"
      }
    ]
  }