import UiZoo from 'uizoo';
import documentation from './documentationContainer';
import components from './componentsContainer';

let root = document.createElement('div');
document.body.appendChild(root);

UiZoo.init(documentation, components, root, '/uizoo/');