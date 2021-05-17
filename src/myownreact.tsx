const TEXT_ELEMENT_TYPE = 'TEXT_ELEMENT';

type elementType = {
  type: string;
  props: propsType;
};

type propsType = {
  id?: string;
  children?: elementType[];
  nodeValue?: string;
};
function createElement(
  type: string,
  props?: object,
  ...children: any[]
): elementType {
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

function createTextElement(text: string): elementType {
  return {
    type: TEXT_ELEMENT_TYPE,
    props: {
      nodeValue: text,
      children: [],
    },
  };
}

function render(
  element: elementType,
  container: HTMLElement | Text | null
): void {
  const dom =
    element.type == TEXT_ELEMENT_TYPE
      ? document.createTextNode('')
      : document.createElement(element.type);

  const isProperty = (key: string) => key != 'children';

  Object.keys(element.props)
    .filter(isProperty)
    .forEach((prop) => {
      // @ts-ignore
      dom[prop] = element.props[prop];
    });

  element.props?.children?.forEach((child) => render(child, dom));

  if (container) {
    container.appendChild(dom);
  }
}

export const MyOwnReact = {
  createElement,
  render,
};

const element = MyOwnReact.createElement(
  'div',
  { id: 'foo' },
  MyOwnReact.createElement('a', undefined, 'React App without CRA!'),
  MyOwnReact.createElement('b')
);

export default element;
