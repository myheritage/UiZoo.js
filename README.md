# React Bibliotheca - Dynamic React components library
WIP

## Tests

The tests package is isolated and located inside the /tests folder.
The target of the tests is to run locally before committing changes and to be a sanity indicator that everything is ok.
Tests are written in Protractor with Karma and cover the Bibliotheca from end to end.

First, we make sure we have the app up and running:
```
gulp
```
The first time we run the tests, we have to install the npm dependencies:
```
cd tests
npm i
```
Now we can begin the tests.
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
