# :spider_web: webapp

RESTful Backend API service for a fullstack web application.

## :package: Prerequisites

To install and run the app locally, you need to have the following installed on your local system:

- `git` (configured with ssh) [[link](https://git-scm.com/downloads)]
- `node v.16.17.0` and above [[link](https://nodejs.org/en/download/)]
- `Postman` to demo hit the APIs [[link](https://www.postman.com/downloads/)]

## :arrow_heading_down: Installation

> **Prerequisite:** You need to have ssh configured on your local system to clone this project using _ssh_.

- Clone the server side API service using the following command:

```shell
git clone git@github.com:cyse7125-fall2023-group05/webapp.git
```

> The above command will clone the organization repository. Incase you want to clone the forked repository, use the following command:

```shell
git clone git@github.com:sydrawat01/webapp.git
```

- You'll need to install the dependencies as well:

```shell
  npm i
```

## :hammer_and_wrench: Development

> Make sure to have a valid .env file before running the following commands. You can view the [.env.example](./.env.example) file for reference.

To run the server in `dev` mode, run the following command:

```shell
  npm run start:dev
```

> This serves the app on `http://localhost:3000` unless you specify a `PORT` number in the .env file.

### :busstop: API Endpoints

This is a simple RESTful API that checks if there is a successful connection to the database.

#### :ambulance: Health

<details>

- **GET** _/healthz_ : Get the health of the API
  - **Response:** 200 _OK_

</details>

#### :closed_lock_with_key: Unsuccessful Connection to Database

<details>

- **GET** _/healthz_ : Get the health of the API
  - **Response:** 503 _Service Unavailable_

</details>

#### ⛔️ Request Method Not Allowed

<details>

- **PUT** _/healthz_ : Get the health of the API
  - **Response:** 405 _Method Not Allowed_
- **POST** _/healthz_ : Get the health of the API
  - **Response:** 405 _Method Not Allowed_
- **PATCH** _/healthz_ : Get the health of the API
  - **Response:** 405 _Method Not Allowed_
- **DELETE** _/healthz_ : Get the health of the API
  - **Response:** 405 _Method Not Allowed_

</details>

#### ❌ Random Endpoints

<details>

- **GET** _/*_ : Random API endpoint
  - **Response:** 404 _Not Found_
- **PUT** _/*_ : Random API endpoint
  - **Response:** 404 _Not Found_
- **POST** _/*_ : Random API endpoint
  - **Response:** 404 _Not Found_
- **PATCH** _/*_ : Random API endpoint
  - **Response:** 404 _Not Found_
- **DELETE** _/*_ : Random API endpoint
  - **Response:** 404 _Not Found_

</details>

## :test_tube: Testing

To run the test suite with unit/integration testing, use the following commands:

- To run the test suite in interactive mode:

```shell
  npm run test:dev
```

- To run the test suite without interactive mode:

```shell
  npm run test
```

## :rocket: Production

To build the app and run the app in production mode, use the following command:

```shell
  npm run build
```

## 🐳 Containerize the application

We will use `Docker` to containerize our application.

### :arrow_heading_down: Install Docker Engine

Head to [`https://docs.docker.com/engine/install/`](https://docs.docker.com/engine/install/) to install the `Docker` service for the required OS.

If you're using a MacOS based workstation, use [this link](https://docs.docker.com/desktop/install/mac-install/) and follow the instructions mentioned to install `Docker Desktop for MacOS` (Intel/Apple Silicon).

> NOTE: Beginning with Docker Desktop 4.3.0, `Docker` has removed the hard requirement to install Rosetta 2. There are a few optional command line tools that still require Rosetta 2 when using Darwin/AMD64. See [known issues](https://docs.docker.com/desktop/troubleshoot/known-issues/). However, to get the best experience, we recommend that you install Rosetta 2. To install Rosetta 2 manually from the command line, run the following command:

  ```bash
  softwareupdate --install-rosetta
  ```

To verify the installation, run:

```bash
docker version
```

Finally, create a [docker hub](https://hub.docker.com) account and login to your account through your terminal:

```bash
docker login -u <username>
```

### 🔨 Working with Docker

To build a docker image, we need to first be in the root folder of the application where our `Dockerfile` and `.dockerignore` files are present.
This provides docker context as to what to build and from where. The `.dockerignore` file is used to ignore files and folder from the build image. This reduces image overhead by not including things that are not required to build and run the image.

A basic `Dockerfile` format looks like this:

```dockerfile
FROM node:lts-alpine

WORKDIR /usr/src/webapp

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "start:dev"]
```

> More details on what each command does, is available in the [official Docker documentation](https://docs.docker.com/engine/reference/builder/).

Once we have all the required docker files, we are now ready to `build` a docker image.

- To build images specific to your system hardware architecture, use the `build` command:

  ```bash
  # -t flag for tag name, -f flag for Dockerfile name
  # --no-cache tells docker to ignore any cached layers during the build process
  # the final `.` is used to represent the build-context
  docker build --no-cache -t <dockerhub_username>/<image_name>:<tag> -f <Dockerfile-name> .
  ```

- To push the images to [`docker hub`](https://hub.docker.com):

  ```bash
  # this pushes the docker images to the default docker hub.
  docker image push --all-tags <dockerhub_username>/<image_name>
  ```

- To tag and push the docker image to another registry host (other than `dockerhub`):

  ```bash
  # tag the image
  docker -t <image_name>:<tag> <registry_host>/<username>/<image_name>:<tag>
  # push to registry host
  docker push <registry_host>/<username>/<image_name>:<tag>
  ```

- To run a container locally based on a docker image, use the following command:

  ```bash
  # -ti flag will attach to the container in interactive mode
  # -p flag is used to expose ports from container to local machine
  # --rm flag is used to delete the container once docker is closed
  docker run -ti --rm --name <container_name> -p <local_port>:<container_port> [registry_name]/<username>/<image_name>:<tag>
  ```

- Clean all docker images, resources, containers and build cache using:

  ```bash
  # `docker system df` shows total space docker objects currently use
  docker system prune -a -f
  ```

- To build images for various architectures (multi-platform build), use the [`buildx` CLI tool](https://docs.docker.com/engine/reference/commandline/buildx_create/) provided by `Docker`:

  ```bash
  docker buildx create --use
  docker buildx ls
  docker buildx build --platform=linux/amd64,linux/arm64 -f <Dockerfile_name> --no-cache -t [registry_host]/<username>/<image_name>:<tag> -t [registry_name]<username>/<image_name>:<tag> .
  ```

Here are some other useful commands for working with `Docker`:

- Docker logs: `docker logs <ID or container_name>`
- Docker interactive shell: `docker exec -ti <ID or container_name> /bin/bash`
- Docker stats: `docker stats <ID or container_name>`
- Docker inspect: `docker inspect <ID or container_name>`
- Docker pull: `docker pull <image_name>:<tag>`
- Docker login _(similar for other registry hosts)_:
  - Dockerhub: `docker login`
  - Quay.io: `docker login quay.io`
- [Limit CPU and Memory](https://docs.docker.com/config/containers/resource_constraints/): `docker run --cpus=".1" -m "8m`
  > `b`, `k`, `m`, `g` indicate bytes, kilobytes, megabytes, or gigabytes.

## ⎈ Kubernetes and power tools

We will need kubernetes on our workstation to create clusters where we can run deployments to our application.

> NOTE: The steps mentioned below are only applicable to MacOS, for other distros, please use the documentation to guide you through the installation process.

- Install `minikube` and `kind`

  ```bash
  brew install minikube # for single cluster setups
  brew install kind # for multi-cluster setups
  # verify installation
  minikube version
  kind version
  ```

- Install `kubectl` and set alias

  ```bash
  # check if you have `kubectl` since it comes pre-installed with `Docker`
  kubectl version
  # if not installed, use:
  brew install kubernetes-cli
  ```

  To set an alias, edit your `.zshrc` file to include an alias for `kubectl`.

  ```ini
  # manage `.zsh_aliases separately`
  alias k="kubectl"
  ```

- Install power tools for k8s: `k9s`, kubectx` and `kubens`

  We will use these tools extensively when working with k8s clusters.

  ```bash
  # install k9s
  brew install k9s
  # validate k9s version
  k9s version
  # `kubectx` installs `kubens` as well
  brew install kubectx
  ```

- Install `tmux`, a powerful terminal window multiplexer tool

  ```bash
  brew install tmux
  ```

> TIP: Checkout [sydrawat01/dotfiles](https://github.com/sydrawat01/dotfiles) for customization options for your terminal.

### ⚙️ Working with k8s

To create a cluster for our RESTful API, we will use the containerized image create and uploaded to a docker image hub, which will be used in our `Deployment` resource. Additionally, we will also need to create a `Service` resource that will expose our app through a `LoadBalancer` via a `targetPort`.

A `ConfigMap` and a `Secret` resource is required to configure the environment variables for the `webapp` application and `flyway` database migration configurations.

- To create a k8s cluster, we will first need to start minikube:

  ```bash
  minikube start
  ```

- Create a namespace for our `webapp` deployment:

  ```bash
  k create namespace <ns-name>
  # to delete a namespace:
  k delete namespaces <ns-name>
  ```

- Switch namespace from `default` to your `<ns-name>` namespace (from the previous step):

  ```bash
  kubens <ns-name>
  ```

- Create the cluster with all the resources:

  ```bash
  k apply -f <path/to/>k8s/
  ```

- Monitor the cluster using `k9s`:

  ```bash
  k9s
  ```

- To delete the cluster and its resources:

  ```bash
  k delete -f <path/to/>k8s/
  ```

- To stop minikube and delete all resources create by it, use:

  ```bash
  minikube stop
  minikube delete --all
  # you will still need to manually delete the minikube docker image!
  ```

## :ninja: Author

[Siddharth Rawat](mailto:rawat.sid@northeastern.edu)
[Karan Wadhwa](mailto:wadhwa.k@northeastern.edu)
[Rishab Agarwal](mailto:agarwal.risha@northeastern.edu)

## :scroll: License

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)
