# sentry-data [![npm version](https://badge.fury.io/js/sentry-server-data.svg)](https://badge.fury.io/js/sentry-server-data)
sentry-data is a small express server that will report back information about the system.

### Installation and Use
The server can be acquired on npm.
```bash
npm i -g sentry-server-data
```

It can be run with these options.
```bash
$ sentry-data -h

  Usage: sentry-data [options]

  Options:

    -h, --help             output usage information
    -c, --config <config>  Specified config
    -p, --port <port>      Specified port
```

For example:
```bash
$ sentry-data -p 3333
sentry-server-data is running on port 3333
```

### Machine information
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

### Authentication
Some of the data surfaced by sentry-server-data could be a security risk. sentry-server-data will generate a 32 byte `apikey` on first run (or if the `apikey` setting in the config is missing.) Any request to sentry-server-data needs to include this key in the header as `apikey` or it will be met with a `401`. sentry-server-host will automatically use any `apikey` given to it in it's config.

### Services
sentry-server-data can be configured to run scripts and test against stdout.

For example, checking if `httpd` is running with `service`
```JSON
services: [
  {
    "name": "httpd",
    "script": "service httpd status",
    "test": "running"
  }
]
```
sentry-server-data will run the script `service httpd status` and if `running` is detected as a substring of the stdout the service is considered to be up.
