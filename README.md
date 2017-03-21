# Sentry
[![Build Status](https://travis-ci.org/sbuggay/sentry.svg?branch=master)](https://travis-ci.org/sbuggay/sentry)

Sentry comprises of three elements, the client, the data server, and the host server.

| package | version |
| ------- | ------- |
| sentry-client-dist | [![npm version](https://badge.fury.io/js/sentry-client-dist.svg)](https://badge.fury.io/js/sentry-client-dist) |
| sentry-server-data | [![npm version](https://badge.fury.io/js/sentry-server-data.svg)](https://badge.fury.io/js/sentry-server-data) |
| sentry-server-host } [![npm version](https://badge.fury.io/js/sentry-server-host.svg)](https://badge.fury.io/js/sentry-server-host) |

## Getting up and running

### Installing sentry-server-host
sentry-server-host is used to serve up the sentry client and to persist monitor data.

```bash
npm i -g sentry-server-host
```

### Installing sentry-server-data

```bash
npm i -g sentry-server-data
```

It can be run with these options.
```bash
$ sentry-server-data -h

  Usage: sentry-server-data [options]

  Options:

    -h, --help             output usage information
    -c, --config <config>  Specified config
    -p, --port <port>      Specified port
```

For example:
```bash
$ sentry-server-data -p 8080
sentry-server-data is running on port 8080
```

## Roadmap
- [ ] Basic authentication