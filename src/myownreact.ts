import React from 'react';
import ReactDOM from 'react-dom';

const TEXT_ELEMENT_TYPE = 'TEXT_ELEMENT';

type element = {
  type: string;
  props: object;
};

function createElement(
  type: string,
  props: object,
  ...children: any[]
): element {
  return {
    type,
    props: {
      ...props,
      children: children.map((child) =>
        typeof child === 'object' ? child : createTextElement(child)
      ),
    },
  };
}

function createTextElement(text: string): element {
  return {
    type: TEXT_ELEMENT_TYPE,
    props: {
      nodeValue: text,
      children: [],
    },
  };
}

const MyOwnReact = {
  createElement,
};

//@ts-ignore
const element = ReactDOM.createElement(
  'div',
  { id: 'foo' },
  React.createElement('a', null, 'Hello World!'),
  React.createElement('b')
);

const container = document.getElementById('root');
ReactDOM.render(element, container);
