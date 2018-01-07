import Enzyme from  "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-16";
import jsdom from "jsdom";
import  "mock-local-storage";

Enzyme.configure({ adapter: new EnzymeAdapter() });

// Simulating browser environment.
const { JSDOM } = jsdom;
const { document } = (new JSDOM('')).window;

let exposedProperties = ['window', 'navigator', 'document'];

global.document = document;
global.window = document.defaultView;
document.localStorage = global.localStorage;
Object.keys(document.defaultView).forEach((property) => {
    if (typeof global[property] === 'undefined') {
        exposedProperties.push(property);
        global[property] = document.defaultView[property];
    }
});

global.navigator = {
    userAgent: 'node.js'
};

const documentRef = document;  //eslint-disable-line no-undef
