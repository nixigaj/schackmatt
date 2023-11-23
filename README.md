<img align="left" alt="Project icon" src="icon.svg" height="128" style="margin-right: 1rem"/>

# Schackmatt

A web based chess game. Play with your friends on any device with a web browser supporting modern web standards. The entire game is currently client-side only, but multiplayer support is planned for the future. A live production demo is available at [schackmatt.erix.dev](https://schackmatt.erix.dev).

## Building and running
Only tested on Linux and macOS. [WSL](https://learn.microsoft.com/en-us/windows/wsl/install) is recommended for building and running on Windows.

### Dependencies
* Git
* NodeJS
* npm

### Build

Clone the repository using:
```
git clone https://github.com/nixigaj/schackmatt.git
cd schackmatt
```

Install the dependencies with `npm install`.

Build with `npm run build`. The resulting build is located inside the `./dist` directory.

### Run

Run the React server on port `5173` with `npm start`. Your instance should now be accessible at [`http://localhost:5173`](http://localhost:5173) in any modern web browser.

For production deployments it is recommended that you use a web server like [Nginx](https://nginx.org/) with a reverse proxy to provide TLS encryption.

### Testing
Run the test suite with `npm run test`.

## License
Copyright © 2022 Erik Junsved, Frithiof Georgii Hellberg and Martin Ek

Licensed under the MIT license ([LICENSE](LICENSE))
