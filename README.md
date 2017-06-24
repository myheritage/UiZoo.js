# React Bibliotheca - Dynamic React components library
Try our live example [here](http://react-bibliotheca.herokuapp.com).
> "Donde, está, la biblioteca. Me llamo T-Bone La araña discoteca. Discoteca, muñeca, La biblioteca..."
\- Troy and Abed.
## About
How many times did you create a new component just to find later someone already did the exact same?
How many times did you found out that a "generic" component you wanted to use is actually tightly-coupled to the environment it was developed upon?
Well, no more! introducing - **La Bibliotheca**

It will showcase **your components**, letting you develop in a sterile environment and browse what you already have and can use, to better re-use your components.
And all this by almost no effort!

![React Bibliotheca 1](https://media.giphy.com/media/pF8cbzzIGJWO4/giphy.gif "React Bibliotheca 1")

We use JSDoc parsing from your current components to showcase them, with all of their possible properties, examples, and descriptions.
This tool can be used for developing, for Product Manager to know what possible, for UX to know what we have so far, and it can be a playground for co-operation between all of the above.

![React Bibliotheca 3](https://media.giphy.com/media/MqhUcIhANah9e/giphy.gif)

## How To Bibliotheca?
Either git clone by:
```
git clone git@github.com:myheritage/react-bibliotheca.git
```
then
```
cd react-bibliotheca && npm i
gulp
```
This will start a server on http://localhost:5000 with the Bibliotheca
you can change the [components file](https://github.com/myheritage/react-bibliotheca/blob/master/client/components.js) and the [documentation file](https://github.com/myheritage/react-bibliotheca/blob/master/client/documentation.js) to start rapidly.
We recommend updating those files by a script automatically when files are changing (we plan to create plugins to help with this in the next future).

**or** npm install by:
```
npm i -S bibliotheca
```
then in your code do:
```
import 'bibliotheca/dist/index.css';
import Bibliotheca from 'bibliotheca';
Bibliotheca.init(bibliothecaDocumentation, bibliothecaComponents, rootElement);
```

### init
```
Bibliotheca.init(bibliothecaDocumentation, bibliothecaComponents, rootElement):
```

**bibliothecaDocumentation** - Object, mapping of component name to its documentation. See [example](https://github.com/myheritage/react-bibliotheca/blob/master/client/documentation.js).

**bibliothecaComponents** - Object, mapping of components name to components. See [example](https://github.com/myheritage/react-bibliotheca/blob/master/client/components.js). 

**rootElement** - HTMLElement, will bootstrap the Bibliotheca on that Element. Default is an element with the id 'bibliotheca_root'

**baseRoute** Route to be the base before the Bibliotheca routes. Default to '/'. for example if the Bibliotheca is on your site like so: 'www.mysite.com/my/bib/', the base route should be '/my/bib/'.

## JSDoc support
We support many [JSDoc](http://usejsdoc.org/) conventions.
Check out our [example UI library](https://github.com/myheritage/react-bibliotheca/tree/master/client/Components/BibliothecaUI) and see its component documentation. Cool, right?

### Supported JSDoc Block Tags
#### @name (synonyms: @class, @type)
The component name
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
See our [guidelines](https://github.com/myheritage/react-bibliotheca/blob/master/CONTRIBUTING.md).

---

## Tests

The tests package is isolated and located inside the /tests folder.
The target of the tests is to run locally before committing changes and to be a sanity indicator that everything is ok.
Tests are written in Protractor with Karma and cover the Bibliotheca from end to end.

### Run the tests once
To just perform the tests once, we simply run:
```
npm test
```

### Develop tests
If we want to add tests, we use the following steps - 

First, we make sure we have the app up and running:
```
gulp
```
The first time we run the tests, we have to install the npm dependencies:
```
cd tests
npm i
```
We run the following to get the testing server up and to begin the typescript watch:
```
cd tests
npm start
```
Now to begin tests, we open another tab and run:
```
cd tests
npm test
```

## License

MIT
