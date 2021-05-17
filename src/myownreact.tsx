import React from 'react';

const TEXT_ELEMENT_TYPE = 'TEXT_ELEMENT';

type element = {
  type: string;
  props: object;
};

function createElement(
  type: string,
  props?: object,
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

/** @jsx MyOwnReact.createElement */
const element = (
  <div id="foo">
    <a>React App without CRA!</a>
    <b />
  </div>
);

export default element;
