# Sentry Server
sentryserver is a small express server that will report back information about the system.

### Installation and Use
The server can be acquired on npm.
```bash
npm i -g sentryserver
```

It can be run with these options.
```bash
$ sentryserver -h

  Usage: sentryserver [options]

  Options:

    -h, --help             output usage information
    -c, --config <config>  Specified config
    -p, --port <port>      Specified port
```

For example:
```bash
$ sentryserver -p 8080
sentryserver@0.1.0 is running on port 8080
```

### Config
By default sentryserver will respond to any request at / with this information from the OS.
- platform
- release
- type
- endianness
- hostname
- uptime
- freemem
- totalmem
- cpus

#### Custom Services
