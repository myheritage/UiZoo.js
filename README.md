# UiZoo.js - Dynamic React components library
Try our live example [here](https://uizoo.herokuapp.com/).

## About
How many times did you create a new component just to find later someone already did the exact same?
How many times did you find out that a "generic" component you wanted to use is actually tightly-coupled to the environment it was developed upon?
Well, no more! introducing - **UiZoo.js**

It will showcase **your components**, letting you develop in a sterile environment and browse what you already have and can use, to better re-use your components.
And all this with almost no effort!

![React Bibliotheca 1](https://media.giphy.com/media/pF8cbzzIGJWO4/giphy.gif "React Bibliotheca 1")

We use JSDoc parsing from your current components to showcase them, with all of their possible properties, examples, and descriptions.
This tool can be used for developing, for Product Managers to know what is possible, for UX to see what we have so far, and it can be a playground for co-operation between all of the above.

![React Bibliotheca 3](https://media.giphy.com/media/MqhUcIhANah9e/giphy.gif)

## How To UiZoo?
Git clone by:
```
git clone git@github.com:myheritage/uizoo.js.git
```
then
```
cd uizoo.js && npm i
gulp
```
This will start a server on http://localhost:5000 with the UiZoo
you can change the [components file](https://github.com/myheritage/uizoo.js/blob/master/client/components.js) and the [documentation file](https://github.com/myheritage/uizoo.js/blob/master/client/documentation.js) to start rapidly.
We recommend updating those files by a script automatically when files are changing (we plan to create plugins to help with this in the next future).

*NPM module will be added soon*

### init
```
UiZoo.init(documentation, components, rootElement):
```

**documentation** - Object, mapping of component name to its documentation. See [example](https://github.com/myheritage/uizoo.js/blob/master/client/documentation.js).

**components** - Object, mapping of components name to components. See [example](https://github.com/myheritage/uizoo.js/blob/master/client/components.js). 

**rootElement** - HTMLElement, will bootstrap UiZoo on that Element. Default is an element with the id 'library-_-root'

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
A JSX example, this tag can be used multiple times for more examples. 1st example will be loaded automaticly when browsing to a component page.
You can add comments and they will stay in the examples section of the component on the example.
#### @param (synonyms: @property, @arg, @argument, @prop, @member)
A possible prop for the component, use [JSDoc optional syntax](http://usejsdoc.org/tags-param.html#optional-parameters-and-default-values) for marking a prop as optional.
For some prop types, like function, we have a special input

![React Bibliotheca 2](https://media.giphy.com/media/URXY0x84ULSSc/giphy.gif)

You can also indicate literal string/number for the type and the input will be a menu of items with those values

![React Bibliotheca 4](https://media.giphy.com/media/R4w7AiCQpYxjO/giphy.gif)

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

### Run the tests once
To perform the tests once, run:
```
npm test
```

### Develop tests
To add tests, use the following steps - 

First, make sure the app is up and running:
```
gulp
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
