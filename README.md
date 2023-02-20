# XSound WebSocket Server

WebSocket Server for [XSound](https://github.com/Korilakkuma/XSound)

## Setup

### Start Server

```bash
$ git clone git@github.com:Korilakkuma/XSound-WebSocket-Server.git
$ cd XSound-WebSocket-Server.git
```

If use Node.js,

```bash
$ npm install
$ npm start
```

If use Go,

```bash
$ go env -w GO111MODULE=on
$ go mod init src
$ go mod tidy
```

Default port number is 8000, if you change any number,

```bash
$ PORT=8888 npm start
```

### Development

### Use Node.js

Build and Start

```bash
$ num run dev
```

```bash
$ npm run lint
```

or,

```bash
$ npm run fix
```

and, type check

```bash
$ npm run type
```

### Use Go

```bash
$ go run ./src/main.go 8080  # port number
```

## License
  
Released under the [MIT](https://github.com/Korilakkuma/XSound-WebSocket-Server/blob/main/LICENSE) license
  
