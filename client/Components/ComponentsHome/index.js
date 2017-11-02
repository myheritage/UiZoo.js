import React from 'react';
import './index.scss';

/**
 * Content to be shown when first arriving to UiZoo, like when the url is '/'
 */
export default function ComponentsHome() {
    return (
        <div className="library-_-view-section library-_-components_home">
            <h1>
                Welcome to UiZoo.js! 🦉🐼 🦍
            </h1>
            <p>
                How many times did you create a new component just to find later someone already did the exact same? How many times did you find out that a "generic"
                component you wanted to use is actually tightly-coupled to the environment it was developed upon? Well, no more! introducing - UiZoo.js
            </p>
            <p>
                It will showcase your components, letting you develop in a sterile environment and browse
                what you already have and can use, to better re-use your components. And all this with almost no effort!
            </p>
            <p>
                Read more:
            </p>
            <a href="https://github.com/myheritage/UiZoo.js" target="_blank">
                https://github.com/myheritage/UiZoo.js
            </a>
            <img src="https://i.imgur.com/1VIerCJ.gif" />
            <h2>
                How To UiZoo?
            </h2>
            <p>
                Just use our zero-configuration CLI! it's easy as pie! 🍽
            </p>
            <p>
                <pre>npm i -g uizoo</pre>
            </p>
            <p>
                In a directory, do:
            </p>
            <p>
                <pre>uizoo</pre>
            </p>
        </div>
    )
}