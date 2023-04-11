<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://user-images.githubusercontent.com/21238816/230986937-0399aac7-fffe-47be-b4a3-32ac0865b5ab.png">
  <source media="(prefers-color-scheme: light)" srcset="https://user-images.githubusercontent.com/21238816/230986917-64cd4007-7d50-4a01-a5d5-d6f144035119.png">
  <img alt="HyperRTLS Dashboard preview" src="https://user-images.githubusercontent.com/21238816/230986917-64cd4007-7d50-4a01-a5d5-d6f144035119.png">
</picture>

# HyperRTLS Dashboard

Dashboard application is an example of a third-party web application using the API exposed by the **HyperRTLS** system. It enables visualization of a positioning network located in a residential space. The application displays the positions of tags on a three-dimensional model of a room.

## Features

- Server-Side Rendering (assets details, emotion cache)
- Live updates using Server-Sent Events
- Loading GLB 3D Models
- Light/dark mode toggle based on system preference
- Fullscreen mode
- Performance monitoring

## Installation and running

### Cloning repository

```
git clone https://github.com/HyperRTLS/hyperrtls-dashboard.git
```

Make sure to tell the editor of your choice to use the workspace TypeScript version. When in doubt, check the following guide on [Editor setup for Yarn](https://yarnpkg.com/getting-started/editor-sdks#editor-setup).

### Environment variables

To run this project, you will need to set the following environment variables:

`SERVER_API_URL` - server side **HyperRTLS** backend URL

`CLIENT_API_URL` - client side **HyperRTLS** backend URL

### Building dependencies

Despite using Yarn's Zero-Installs, you might need to build some of the dependencies prior to running the project. Simply type `yarn` and everything should be automatically set up.

### Running the project

```
yarn dev
```

By default, the dashboard development server listens on port `3000`. You can change that behavior in `package.json` file or call the script directly:

```
yarn next dev -p <port_number>
```

### Creating an optimized production build

```
yarn build
```

### Running production build

```
yarn start
```

By default, the dashboard production server listens on port `3000`. You can change that behavior in `package.json` file or call the script directly:

```
yarn next start -p <port_number>
```

### Docker support

Docker image is available at [ghcr.io repository](ghcr.io/hyperrtls/hyperrtls-dashboard).

You can also build your own image based on provided `Dockerfile`.

## Authors

- Sebastian Szczepański [@sszczep](https://www.github.com/sszczep)
- Aleksander Wójtowicz [@anuar2k](https://www.github.com/anuar2k)

## License

Distributed under the GPL-3.0 License. See [LICENSE](https://github.com/HyperRTLS/hyperrtls-dashboard/blob/main/LICENSE) for more information.
