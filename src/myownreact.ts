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

const element = React.createElement(
  'div',
  { id: 'foo' },
  React.createElement('a', null, 'React APP without CRA!'),
  React.createElement('b')
);

export default element;
