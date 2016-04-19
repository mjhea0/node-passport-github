# Node Passport Github

Just a sample app for Node/Express Auth via Github

## Getting Started

1. Install Node Modules
1. Rename *.env-sample* to *.env* and update
1. Run!

## Endpoints

### Unauthenticated

- GET `/ping`
- GET `/auth/github`

### Authenticated


- GET `/`
- GET `/user`
- GET `/auth/logout`

## Test

```sh
$ npm test
```