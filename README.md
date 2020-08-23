# Linkr

Linkr is a Svelte/Sapper app which lets users create boards, add links to these boards and share them. This project structure is from the default [Sapper](https://github.com/sveltejs/sapper) template, available for Rollup and webpack.

Linkr uses [Svelte 3](https://svelte.dev) and [Tailwind CSS](https://tailwindcss.com/) for UI Components.

## Getting started

Clone the repository, you can install dependencies and run the project in development mode with:

```bash
cd linkr-svelte
npm install # or yarn
npm run dev # or yarn dev
```

Open up [localhost:3000](http://localhost:3000) and start clicking around.

Consult [sapper.svelte.dev](https://sapper.svelte.dev) for help getting started.

## Structure

Sapper expects to find two directories in the root of your project — `src` and `static`.

### src

The [src](src) directory contains the entry points for your app — `client.js`, `server.js` and (optionally) a `service-worker.js` — along with a `template.html` file and a `routes` directory.

#### src/routes

This is the heart of your Sapper app. There are two kinds of routes — _pages_, and _server routes_.

**Pages** are Svelte components written in `.svelte` files. When a user first visits the application, they will be served a server-rendered version of the route in question, plus some JavaScript that 'hydrates' the page and initialises a client-side router. From that point forward, navigating to other pages is handled entirely on the client for a fast, app-like feel. (Sapper will preload and cache the code for these subsequent pages, so that navigation is instantaneous.)

**Server routes** are modules written in `.js` files, that export functions corresponding to HTTP methods. Each function receives Express `request` and `response` objects as arguments, plus a `next` function. This is useful for creating a JSON API

Read more from [Sapper docs](https://sapper.svelte.dev/docs).

## Bundler config

Linkr uses Rollup to provide code-splitting and dynamic imports, as well as compiling your Svelte components.

## Bugs and feedback

Sapper is in early development, and may have the odd rough edge here and there. Please be vocal over on the [Sapper issue tracker](https://github.com/sveltejs/sapper/issues).

## License

MIT
