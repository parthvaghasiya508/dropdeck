# Dropdeck `app` service

The `app` service is is the end-user user interface for authoring and viewing presentations in Dropdeck. It is a React app, run behind Nginx under Docker in production. It uses:

- Slate as a rich text editor.
- Redux for state management (note: this is being phased out over time).
- Axios for network calls.

## Dependencies

- `api` - for API services.
- `export-api` (optional) - for exporting decks to PDF and JPEG.

## Project structure

The service entry point can be found in `src/App.js`. The code base is organised as follows:

- `deployment` - Helm scripts and Docker files for packaging and deployment.
- `public` - static assets
- `src` - components and related code
  - `actions` - Redux actions.
  - `reducers` - Redux reducers.
  - `store` - Redux store configuration.
  - `common` - Common libraries and interfaces.
  - `providers` - Context providers.
  - `config` - Runtime configuration (abstracting environment variables).
  - `modules` - Routes (pages/views) of the application.
  - `utils` - Shared utilities.
  
  
  



