# Dropdeck

This document describes the modules and services that live in the `dropdeck` mono-repository, and the processes we use for development and deployment.

## Overview

At a high-level, we use:

- React for front-end services.
- Node.js for back-end services.
- Docker for containerisation.
- GitHub Actions for CI/CD.
- Kubernetes for service orchestration and deployment.
- Google Container Registry for storing Docker images. 
- Helm for deploying to Kubernetes.

### System architecture
The application consists of the following services and components:

- **Networking**: We use [Ingress](https://kubernetes.io/docs/concepts/services-networking/ingress/) for routing and managing external access to the services in a cluster.
- **Frontend**: 
  - Deck composer and player (`services/app`).
  - Stand-alone rendering of Explort Player (`services/export-app`) - not currently used.
- **Backend**: 
  - Authentication and deck API services (`services/api`).
  - Export API service (`services/export-api`).
  - Chrome service (`services/chrome`) - not currently used.

- **Persistence**: Structured data is stored in MongoDB Atlas (MongoDB Docker service for local development). Digital assets (images, videos) are stored in Google Cloud Storage.

### Managed services and integrations

We integrate with the following third-party managed services:

- **Authentication**: We integrate with both the Google and Office 365 OAuth 2.0 authentication providers.
- **Browserless.io**: The `export-api` connects to headless Chrome instances at Browserless.io.
- **Unsplash**: Image search and rendering.
- **Brandfetch**: Branding and logo search.
- **Google Cloud Storage**: Image and video asset storage. Both assets uploaded by the user as well as generated assets (deck thumbnails, etc.).
- **MongoDB Atlas**: Managed MongoDB service. Separate instances for production and development clusters.
   


## Project structure

The `dropdeck` project consists of a number of services (deployed as stand-alone microservices), shared modules and deployment scripts for assembling and deploying services in Kubernetes. At the root of the project we have the following structure:

- `.github`: Templates for GitHub Actions. Every pull request triggers the `build-pull-request.yml` action (install and run linting checks and tests) and every merge to `master` triggers the `deploy-docker.yml` action (builds Docker images and deploys to the Google Container Registry).
- `deployment`: Helm charts assembling microservices into a Kubernetes deployment.
- `packages`: Common (JavaScript) modules which can be shared between different projects (both front-end and backend). 
- `services`: Each Dropdeck microservice has a corresponding folder under `services`. See further details below.


### Structure of microservices
Each microservice under `services` follows the pattern of:

```
<service-name>
  deployment
    docker
    helm
  src
    ...
```

Here `deployment/docker` contains the Docker files for that service (possibly separate files for production and development) and `deployment/helm` contains Helm scripts for that service deployment.


## Development

For local development, we use Docker Compose for running backend services whereas the frontend is directly run via `yarn`.

To begin with, start by running `yarn install` in the root of the project.

- *Starting backend services*: Run first time or when you update node modules with `yarn start:build`. Other times run with: `yarn start`. Stop with `yarn stop`.
- *Starting frontend service*: In a separate terminal window, run `cd services/app`. Run `yarn install` for the first time to install dependencies. Run `yarn start` to start the dev server. This will start the UI process on port 3000 at http://localhost:3000

### Linting

Run `yarn lint` to check your code for invalid syntax or suggested improvements.

### Testing production build

Testing the deployment of the stack with the `app` pre-compiled into a static production build.

**Steps to test**

Ensure you have the `serve` module for `yarn` installed:

```
yarn global add serve
```

Then run the following commands:

```
cd services/app
yarn build
serve -s build -p 3000
```

In a separate terminal window, run the backend services usual from the root of the repo:

```
yarn start
```

This should now start the `api` and `MongoDB` services, with the frontend `app` being run via `serve` as above.

### Submitting a pull request

All changes made to the code should relate to one (sometimes more) issues in Linear. Assuming you are working on an issue `DD-{number}`, start by creating a new Git branch off the `master` branch and name it according to the following convention:

```
`dd-{number}-brief-summary-of-work
```

For example, your branch might be called `dd-456-navigation-bug` or `dd-789-new-login-button`. 

**Tip**: Linear has a nice feature which allows you to copy a Git branch name, in this format, directly from an issue card. If you right-click on an issue, you'll find a `Copy git branch name` option which constructs the correct branch name and adds to your clipboard.

When you are ready to submit your work for review, you should submit a new pull request. Each pull request should have a short title (for example, `Navigation bug fixes` or `New login button`) and a description of changes made and how they can be tested. If your Git branch followed the recommended Linear naming convention, above, the pull request will be automatically linked to the corresponding issue. If the issue references more than one issue, you can add other relations through the use of the magic words `Fixes` or `Closes` in the pull request description, e.g. `Fixes DD-123, DD-5 and DD-256`.




## Deploying with Kubernetes

In the root of the project, run

```
./deploy-k8s.sh <cluster-name> <region> <image-tag>
```

where `<cluster-name>` is the name of the Kubernetes cluster we're deploying to, in region `<region>`, and the optional `<image-tag>` is tag for the `api` and `app` Docker images we will deploy. When not specified, the deployment targets Docker images with the tag that matches the `<cluster-name>`. 

*Note:* There has to be a corresponding entry in

```
deployment/
    clusters/
        <cluster-name>/
            values.yaml
``` 

with deployment-specific environment settings.
 
*Example:*

```
./deploy-k8s.sh qa-cluster beta-release
```

Full details on deployment are kept in our Notion Engineering wiki.
