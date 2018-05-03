# AdLinkr
A URL Shortener for Digital Marketers

## Motive

While looking for URL shortening tools for my own day job as a Technical Digital Strategist, I found
that the large majority of URL shortening tools with an emphasis on digital marketing and analytics
were proprietary SaaS products and others seemed to fall a little short of my persona wishlist. AdLinkr
hopes to be an answer for digital marketers looking to be able to own and manage their own completely
open solution. 

## Features

[Coming Soon]

## Installing

### Prerequisites
* Node 8.X or 10.X
* NPM or Yarn

### Setup

First, install all dependencies for both frontend and backend using your package manager of choice. Package contains two package.json files, one for the backend located in the project root and for frontend located in the frontend folder.

```txt
$ npm install
or
$ yarn

$ cd frontend

$ npm install
or
$ yarn
```

From this point forward, yarn will used in examples, but in all cases can be replaced by `npm`.

<sub>Full install and setup guide to follow 0.1 release.</sub>

### Testing

#### Backend Tests
From the root directory, NPM scripts are setup for running the backend tests. 
```txt
Execute test suite once 
$ yarn test 

Execute test suite on each file save
$ yarn run test-watch 
```

#### Frontend Tests
Frontend tests are driven by the default Angular lineup and can be accessed with the following, which will launch a browser window to execute the test suite with hot reloading by default. 

```txt
$ ng test
```

### Running
At the time of writing this, prior to 0.1 Alpha release, the frontend and backend are not yet connected and there may be
hard-coding of URLs in some frontend elements; as such, the separate ends of the project must be started separately. This is a high priority item to correct and these instructions will be updated at that time.

```txt
From the root directory; this will start the express server running on port 3000
$ yarn start 

$ cd frontend

This will start serving the Angular app on port 4200.
$ ng serve
```

### Contributing
Contributors are the driving force behind the success and innovation of open source software and contributions are always welcome and are greatly appreciated. For more information, please see full [contributing.md](https://github.com/jodylecompte/AdLinkr/blob/master/CONTRIBUTING.md).

## Versioning
We use [Semver](#) for versioning. For the versions available, please see the [tags on this repository](#).

**Note About Releases**: Ad time of writing, AdLinkr is in active development of first viable version. This
will be released at 0.1.0.

## Authors

* **Jody LeCompte** - Primary Developer

See also the list of [Contributors](https://github.com/jodylecompte/AdLinkr/graphs/contributors) who have dedicated time and effort to this project.

## License
This product is licensed under the MIT license - see the [LICENSE.md](https://github.com/jodylecompte/AdLinkr/blob/master/LICENSE) file for details.

## Acknowledgements
