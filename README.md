# bsc-app

Project Online Business Management Project with Vue 3, Pinia

## Project Setup

```sh
yarn
```

### Compile and Hot-Reload for Development

```sh
yarn dev
```

### Type-Check, Compile and Minify for Production

```sh
yarn build
```

### Lints and fixes files

```sh
yarn lint
```

## ⚠️ IMPORTANT

## Environment Variables

> Copy the `.env.example` file as `.env.local` and complete the values:

| Variable                | Description                                                       |
| ----------------------- | ----------------------------------------------------------------- |
| `VITE_APP_TITLE`        | The title of the application.                                     |
| `VITE_APP_API_BASE_URL` | Base URL for your backend API.                                    |
| `VITE_APP_BASE_URL`     | Base URL for the frontend app (used for routing or links).        |
| `VITE_SUBDOMAIN`        | Optional subdomain (used for multi-tenant setups or API context). |
