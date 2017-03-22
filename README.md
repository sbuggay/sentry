# 👁 Sentry
[![Build Status](https://travis-ci.org/sbuggay/sentry.svg?branch=master)](https://travis-ci.org/sbuggay/sentry)
[![codecov](https://codecov.io/gh/sbuggay/sentry/branch/master/graph/badge.svg)](https://codecov.io/gh/sbuggay/sentry)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

Sentry comprises of three elements, the client, the data server, and the host server.

| package | version |
| ------- | ------- |
| sentry-client-dist | [![npm version](https://badge.fury.io/js/sentry-client-dist.svg)](https://badge.fury.io/js/sentry-client-dist) |
| sentry-server-data | [![npm version](https://badge.fury.io/js/sentry-server-data.svg)](https://badge.fury.io/js/sentry-server-data) |
| sentry-server-host | [![npm version](https://badge.fury.io/js/sentry-server-host.svg)](https://badge.fury.io/js/sentry-server-host) |

## Getting up and running

### Installing sentry-server-host
sentry-server-host is used to serve up the sentry client and to persist monitor data.

```bash
npm i -g sentry-server-host
```

### Installing sentry-server-data
sentry-server-data provides system and service data for the sentry client.

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

### Contributing
Clone the repository.

Install lerna.
```bash
npm i -g lerna
```

Install dependencies.
```bash
lerna bootstrap
```

## Roadmap
- [ ] Basic authentication