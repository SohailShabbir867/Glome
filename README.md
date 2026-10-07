# Glome

Mid-range online mall (shoes, clothing and more) built with the MERN stack.
Three role-based dashboards: Customer store, Sales, Admin (with one Super Admin).

## Structure

```
glome/
  client/   React + Vite + Tailwind (feature-based folders)
  server/   Node + Express + MongoDB (routes -> controllers -> services -> models)
```

### Server (`server/src`)

- `config/` env validation (Zod) and database connection
- `constants/` roles and order status (single source of truth)
- `models/` Mongoose models (User, Category, Product)
- `routes/` URL definitions only
- `controllers/` read the request, call a service, send the response
- `services/` business logic (the place for real rules)
- `middlewares/` auth, role check, validation, error handling
- `validators/` Zod schemas per feature
- `sockets/` Socket.IO (chat, notifications)
- `jobs/` background tasks, `templates/emails/` email templates, `utils/` helpers

### Client (`client/src`)

- `features/<name>/` everything for one feature (pages, components, api, slice)
- `layouts/` StoreLayout and DashboardLayout
- `routes/` router and role-based route guard
- `components/ui` and `components/common` shared UI
- `lib/` axios instance and React Query client
- `app/` Redux store

## Run

```
npm install
copy server\.env.example server\.env     (PowerShell)
copy client\.env.example client\.env
npm run dev
```

API health check: http://localhost:5000/api/v1/health
