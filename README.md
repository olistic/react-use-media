# react-use-media

React hook for testing and monitoring media queries.

[![Travis][build-badge]][build] [![Codecov][codecov-badge]][codecov]

## Installation

```sh
$ npm install --save react-use-media
```

Additionally, you'll need to install version `16.7.0-alpha.0` of `react` and
`react-dom` since this package relies on
[React Hooks](https://reactjs.org/hooks):

```sh
$ npm install --save react@16.7.0-alpha.0 react-dom@16.7.0-alpha.0
```

> **DISCLAIMER:** React Hooks are an experimental proposal. The Hooks API, as
> well as this library's, are unstable and subject to change.

## Usage

```js
import React from 'react';
import useMedia from 'react-use-media';

function MyComponent() {
  const matches = useMedia('(max-width: 599px)');
  return matches ? (
    <p>The document is less than 600px wide.</p>
  ) : (
    <p>The document is at least 600px wide.</p>
  );
}
```

## API Reference

### `useMedia`

```js
const matches = useMedia(mediaQueryString, options);
```

Accepts a media query string as the first argument (`mediaQueryString`) and
returns whether it matches or not.

Optionally, you can pass a second argument to `useMedia` that is an object with
the following properties:

- `initialMatches` (_boolean_): The value of `matches` on first mount. Defaults
  to `true`.

[build-badge]: https://img.shields.io/travis/olistic/react-use-media/master.svg
[build]: https://travis-ci.org/olistic/react-use-media
[codecov-badge]:
  https://img.shields.io/codecov/c/github/olistic/react-use-media/master.svg
[codecov]: https://codecov.io/gh/olistic/react-use-media
