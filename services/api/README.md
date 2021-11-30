# Dropdeck `api` service

The `api` service is a macro-service (to be broken up!) consisting of REST APIs and authentication services. It is a Node.js service, intended to be run in a Docker container.  

## Dependencies

- MongoDB - either a local service or on Atlas.

## Project structure

- `deployment`: Helm scripts and Docker files for packaging and deployment.
- `src`: Project source code (see below).

## Code structure

The service entry point can be found in `src/app.js`. On startup, the service boots up an Express server and runs through all of the loading scripts. The code base is otherwise organised as follows:

- `config.js`: Runtime configuration.
- `loaders`: Configuration and loading of services.
- `routes`: Express routes, loaded dynamically based on configuration.
- `services`: Services and business logic.
- `util`: Common utilities.


