# Assignment 8: My first back-end with Express 5

> **Heads up before you run it:** `package.json` is not in the root of this
> repository. The project lives in the `LAB8/ASSIGNMENT8` folder, so you have to
> go into it first, otherwise npm will complain that it can't find `package.json`
> (I ran into exactly this error myself).
>
> ```bash
> npm install
> npm start
> ```
>
> Then open http://localhost:3000.

## How to install and run

You need Node.js (current LTS).

1. `cd LAB8/ASSIGNMENT8`
2. `npm install` downloads Express 5 from `package.json` / `package-lock.json`
3. `npm start` runs the server with `node server.js`
4. `npm run dev` runs it with `node --watch server.js`, which restarts on every save

The server reads the port from `process.env.PORT` and falls back to `3000`.
It finds the `public/` folder relative to `server.js`, so it works no matter
which folder you launch it from.

## File organization

```
ASSIGNMENT8
 ├─ public/
 │   ├─ index.html   page with one button per API route
 │   ├─ styles.css   styling
 │   └─ app.js       fetch() calls and response display
 ├─ server.js        Express app, middleware, routes, 404 fallback
 ├─ package.json     "type": "module", scripts, express dependency
 ├─ package-lock.json
 ├─ .gitignore       node_modules/ and .env
 └─ README.md
```

## Routes

(short table of the routes, same as in the assignment)

## Middleware

I wrote two middlewares and registered them before the static handler and the
routes, because Express runs things in the order they are registered. If they
came after a route that sends a response, that request would never reach them.

- **Request logger:** prints a timestamp, the method and the URL, then calls `next()`.
- **Request counter:** adds 1 to a counter, then calls `next()`. `GET /api/stats` returns it.

**What is counted:** every request that reaches the server: the page, `styles.css`,
`app.js`, API calls, redirects and 404s, including the request to `/api/stats`
itself. I put the counter first so it has no exceptions and the definition stays
simple ("requests this process has received"). The downside is that loading the
page counts as three requests.

## 404 fallback

The fallback is an `app.use` without a path, registered last, so it only runs when
nothing else matched and can never hide a real route. It also avoids the Express 4
`app.get('*')` style, which Express 5 rejects. Paths starting with `/api` get
`{ "error": "Not found" }`, everything else gets a short HTML message.

## curl evidence

I used `curl.exe --include` (in PowerShell plain `curl` is an alias for something else).

### Successful JSON: GET /api/courses
Calling GET /api/courses ...

### 201: POST /api/subscribe
Calling GET /api/status ...

### 403: GET /api/admin
Calling GET /api/headers ...

### Redirect: GET /old-page
Calling POST /api/subscribe ...

### 404 on an API path: GET /api/nope
Calling GET /api/does-not-exist ...

### 404 on a non-API path: GET /nope
Calling GET /api/does-not-exist ...

## Reasoning questions (Section 8)
i have a thousand of questhion, i will ask them during our lab session


## Self-study notes
i think i should study more about the file placements, because it always an issue for me.


## Challenges I faced

- **npm could not find `package.json`.** My terminal was one folder above the
  project, so `npm install` and `npm start` failed with ENOENT. The fix was to
  `cd` into the project folder, or to open that folder directly in VS Code.
- **`package.json` was set to CommonJS.** `npm init` defaults to `"commonjs"`,
  so I had to change it to `"module"` to use `import`.
- **A JSON syntax mistake.** Missing commas in the `scripts` section made the file invalid.
- **PowerShell's `curl`.** It is an alias, so I used `curl.exe` instead.
- **Running from any folder.** `express.static('public')` depends on the working
  directory, so I built an absolute path from `import.meta.url`.