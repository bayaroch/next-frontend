<br />
<div align="center">
 
<img src="https://cdn.dribbble.com/users/539032/screenshots/2582942/media/86d68c91b2c2b65a00e59aa0dae5c22b.jpg" alt="Logo" width="200" height="auto" />


<a href="https://github.com/unimediainc/HIM-frontend"><h3 align="center">React Boilerplate</h3></a>

  <p align="center">
    Please read following instructions before using boilerplate
    <br />
    <br />
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
        <li><a href="#development-envoriment">Development Envoriment</a></li>
        <li><a href="#coding-rules">Coding Rules</a></li>
      </ul>
    </li>
    <li><a href="#folder-structure">Folder Structure</a></li>
    <li><a href="#styling">Styling</a></li>
     <li><a href="#testing">Testing</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

React boilerplate with Material UI and redux

<p align="right">(<a href="#top">back to top</a>)</p>

### Built With

This section should list any major frameworks/libraries used to bootstrap your project. Leave any add-ons/plugins for the acknowledgements section. Here are a few examples.

- [React.js](https://reactjs.org/)
- [ReactRouterv6](https://reactrouter.com/)
- [MaterialUiv5](https://mui.com/)
- [Redux](https://redux.js.org/)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

There is two way to use this project.

- Using docker
- Local environment with NodeJs installed.

For active development environment please follow <a href="#development-envoriment">Development Installation</a> section.

### Installation


### Prerequisites

NodeJS 14 or NodeJs 16 recommended

```sh
  npm install -g yarn
```

```sh
  npm install -g typescript
```

<p align="center">
  <img alt="VS Code in action" src="https://j.gifs.com/EqWjEm.gif">
</p>
VSCode Plugins
- Eslint
- Prettier
- Javascript and Typescript

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true
}
```

---

1. Clone the repo

```sh
   git clone {REPO}
```

2. Install packages

   ```sh
   yarn install
   ```

3. Start project

   ```sh
   yarn start
   ```

4. Linters & Husky

Project provides a couple of linters to help you keep an eye on code consistency and type safety. There are three linters: one for Coding Eslint, one for TypeScript and one for formatting. You can use each of them separately using the following commands:

```sh
$ yarn type-check
$ yarn lint
$ yarn format
```

- [x] ([Husky](https://typicode.github.io/husky/#/) enabled on pre-commit and pre-push)
- [x] ([Storybook](https://storybook.js.org/) enabled. Its open source tool for building UI components and pages in isolation. It streamlines UI development, testing, and documentation.)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- ROADMAP -->

## Coding Rules

1. Components

   1. Keep components small and function-specific
   2. Reusability is important, so keep creation of new components to the minimum required
   3. Use capitals for component names
   4. Keep components simple only works with props and include UI states only no redux no services
   5. Only create functional components with type supported
   6. Arrow functions allowed

2. State management

   1. Use metadata reducers for request and error events.
   2. Give specific types for reducers states
   3. use selectors when selecting states & make data manipulation inside selectors for clean code

3. Custom hooks

   1. Avoid writing multiple useEffect hooks on pages use custom Hooks instead

4. Handling null and undefined in JavaScript

   Example info:https://medium.com/javascript-scene/handling-null-and-undefined-in-javascript-1500c65d51ae

   Use lodash:



## Styling

[Sx Props](https://mui.com/system/the-sx-prop/)

```javascript
<Box sx={{ color: 'text.secondary', display: 'inline', fontSize: 14 }}>
  vs. last week
</Box>
```

[styled](https://mui.com/system/styled/)
Utility for creating styled components.

```javascript
import * as React from 'react'
import { styled } from '@mui/system'

const MyComponent = styled('div')({
  color: 'darkslategray',
  backgroundColor: 'aliceblue',
  padding: 8,
  borderRadius: 4,
})

export default function BasicUsage() {
  return <MyComponent>Styled div</MyComponent>
}
```

## Testing

Read Instructions: [cypress/README.md](cypress/README.md)

<p align="right">(<a href="#top">back to top</a>)</p>

## Contact

Project Link: [https://github.com/unimediainc/HIM-frontend](https://github.com/unimediainc/HIM-frontend)

<p align="right">(<a href="#top">back to top</a>)</p>

## Acknowledgments

List resources you find helpful and would like to give credit to.

- [Component Best Practices](https://medium.com/@thejasonfile/dumb-components-and-smart-components-e7b33a698d43)
- [Handling metadata in redux](https://www.bekk.christmas/post/2018/2/handling-metadata-in-redux)
- [React for Beginners](https://www.youtube.com/watch?v=w7ejDZ8SWv8&t=5392s)
- [Testing in React Project](https://www.youtube.com/watch?v=OVNjsIto9xM&t=2905s)

<p align="right">(<a href="#top">back to top</a>)</p>

