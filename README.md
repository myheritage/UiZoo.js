# UiZoo.js - Dynamic React components library
Try our live example [here](https://myheritage.github.io/UiZoo.js/).

## About
How many times did you create a new component just to find later someone already did the exact same?
How many times did you find out that a "generic" component you wanted to use is actually tightly-coupled to the environment it was developed upon?
Well, no more! introducing - **UiZoo.js**

It will showcase **your components**, letting you develop in a sterile environment and browse what you already have and can use, to better re-use your components.
And all this with almost no effort!

![React UiZoo 1](https://i.imgur.com/1VIerCJ.gif "React UiZoo 1")

We use JSDoc/PropTypes parsing from your current components to showcase them, with all of their possible properties, examples, and descriptions.
This tool can be used for developing, for Product Managers to know what is possible, for UX to see what we have so far, and it can be a playground for co-operation between all of the above.

![React UiZoo 3](https://imgur.com/f3B2TDj.gif)

## How To UiZoo?

Just use our zero-configuration CLI! it's easy as pie! 🍽

```
npm i -g uizoo
```

In a directory, do:
```
uizoo
```

It will create a [webpack development server](https://webpack.js.org/configuration/dev-server/) fully configured with [Hot Module Replacement](https://webpack.js.org/concepts/hot-module-replacement/) to watch your files while you develop!

For example:

![React UiZoo CLI](https://imgur.com/v3PbP8U.gif)

Start the server with the newly added script:
```
npm start uizoo
```

### Customization
The CLI creates a directory called `uizoo-app`, in it there is a file called `config.js` that determine basic stuff like the server's port, glob to find your components and more. There is also a very simple webpack configuration called `webpack.uizoo.js`.


### Local installation
*If you don't want to install UiZoo globally, you can instead do:*
```
npm i -D uizoo && ./node_modules/.bin/uizoo
```

### API
```
import UiZoo from 'uizoo';

UiZoo.init(documentation: Object, components: Object, rootElement: HTMLElement?, baseRoute: String?)
```

**documentation** - Object, mapping of component name to its documentation. See [example](https://github.com/myheritage/uizoo.js/blob/master/client/documentation.js).

**components** - Object, mapping of components name to components. See [example](https://github.com/myheritage/uizoo.js/blob/master/client/components.js). 

**rootElement** - HTMLElement, will bootstrap UiZoo on that Element. Default is a new element on the body.

**baseRoute** Route to be the base before the UiZoo routes. Default to '/'. for example if the UiZoo is on your site like so: 'www.mysite.com/my/zoo/', the base route should be '/my/zoo/'.

## JSDoc support
We support many [JSDoc](http://usejsdoc.org/) conventions.
Check out our [example UI library](https://github.com/myheritage/uizoo.js/tree/master/client/Components/UI) and see its component documentation. Cool, right?

### Supported JSDoc Block Tags
#### @name (synonyms: @class, @type)
The component name
#### @module (synonyms: @namespace, @memberOf)
The section of the component. Will put the component inside this section on the SideBar.
#### @description (synonyms: @summary, @desc, @classdesc)
The component description
#### @example
A JSX example, this tag can be used multiple times for more examples. 1st example will be loaded as the default when browsing to a component page.
When loading an example - it will change the url accordingly, this enables you to share configurations with anyone!
This is great for code-reviews reference!

You can add comments and they will stay in the examples section of the component on the example.
#### @param (synonyms: @property, @arg, @argument, @prop, @member)
A possible prop for the component, use [JSDoc optional syntax](http://usejsdoc.org/tags-param.html#optional-parameters-and-default-values) for marking a prop as optional.
For some prop types, like function or JSX (indicating 'node' or 'ReactElement'), we have special inputs

You can also indicate literal string/number for the type and the input will be a menu of items with those values

![React UiZoo 3](https://imgur.com/CWc2CL2.gif)

See video example:
[https://youtu.be/KRCM0fHTXms](https://youtu.be/KRCM0fHTXms)

---

## Contributing

Contributions and feedback are very welcome! Feel free to open issues.
See our [guidelines](https://github.com/myheritage/uizoo.js/blob/master/CONTRIBUTING.md).

---

## Tests

The tests package is isolated and located inside the /tests folder.
The target of the tests is to run locally before committing changes and to be a sanity indicator that everything is okay.
Tests are written in Protractor with Karma and they cover the project from end-to-end.

In the uizoo-app package (the local app helper module), the tests sits next to what they are testing. Those are written in Jest.

### Run the tests once
To perform the tests once, run:
```
npm test
```

To run uizoo-app tests, run:
```
cd packages/uizoo-app
npm test
```
or for watching
```
npm run test:w
```

### Develop tests
To add tests, use the following steps - 

First, make sure the app is up and running:
```
npm start
```
The first time tests are run, install the npm dependencies:
```
cd tests
npm i
```
Run the following to get the testing server up and to begin the typescript watch:
```
cd tests
npm start
```
To begin tests, open another tab and run:
```
cd tests
npm test
```

## License

MIT
