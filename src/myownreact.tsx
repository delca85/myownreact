const TEXT_ELEMENT_TYPE = "TEXT_ELEMENT";

type Element = {
  type: string;
  props: Props;
};

type Props = {
  id?: string;
  children?: Element[];
  nodeValue?: string;
};

function createTextElement(text: string): Element {
  return {
    type: TEXT_ELEMENT_TYPE,
    props: {
      nodeValue: text,
      children: [],
    },
  };
}

function createElement(
  type: string,
  props?: Props,
  ...children: any[]
): Element {
  return {
    type,
    props: {
      ...props,
      children: children.map((child) =>
        typeof child === "object" ? child : createTextElement(child)
      ),
    },
  };
}

type SubProps = Omit<Props, "children">;

function render(element: Element, container: HTMLElement | Text | null): void {
  const dom =
    element.type === TEXT_ELEMENT_TYPE
      ? document.createTextNode("")
      : document.createElement(element.type);

  const propsCopy: Props = {};
  const isProperty = (key: keyof Props) => key !== "children";

  const subKeys = (Object.keys(element.props) as Array<keyof Props>).filter(
    isProperty
  ) as unknown as Array<keyof SubProps>;

  subKeys.forEach((prop: keyof SubProps) => {
    propsCopy[prop] = element.props[prop as keyof Props] as string;
  });

  Object.assign(dom, propsCopy);

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
  "div",
  { id: "foo" },
  MyOwnReact.createElement("a", undefined, "React App without CRA!"),
  MyOwnReact.createElement("b")
);

export default element;
