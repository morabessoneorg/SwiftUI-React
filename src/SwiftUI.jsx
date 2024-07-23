// https://developer.apple.com/xcode/swiftUI/

import React, { Component, Fragment } from "react";

const componentStack = [];

function last(arr) {
  return arr[arr.length - 1];
}

function renderComponents(components) {
  return components.map(({ executor, value, hasValue, props }, index) => {
    const rendered = hasValue ? executor(value, props) : executor(props);
    return <Fragment key={index}>{rendered}</Fragment>;
  });
}

function renderChildren(
  { value, hasValue, isCollectionValue, isInstance, props },
  childrenExecutor
) {
  const values = isCollectionValue ? value : [value];
  const childrenAll = values.map((value, index, values) => {
    let renderedChildren;
    let components = [];

    componentStack.push(components);
    try {
      renderedChildren = isInstance
        ? childrenExecutor(props)
        : hasValue
        ? isCollectionValue
          ? childrenExecutor(value, index, values)
          : childrenExecutor(value)
        : childrenExecutor();
    } finally {
      components = componentStack.pop();
    }

    return (
      <Fragment key={index}>
        {renderComponents(components)}
        {renderedChildren}
      </Fragment>
    );
  });

  const children = childrenAll[0];
  return { children, childrenAll };
}

function instanceRender() {
  const component = {
    isInstance: true,
    props: this.props
  };
  const { children } = renderChildren(component, this.executor);
  return children;
}

export function SwiftUI(executor) {
  const hasValue = executor.length > 1;
  const propsIndex = hasValue ? 1 : 0;

  function SwiftUIComponent(...args) {
    if (new.target) {
      const instance = Reflect.construct(Component, args, new.target);
      instance.executor = executor;
      return instance;
    }

    const value = hasValue && args[0];
    const isCollectionValue = hasValue && Array.isArray(value);
    const props = { ...args[propsIndex] };

    const component = {
      isInstance: false,
      executor,
      value,
      hasValue,
      isCollectionValue,
      props
    };

    const childrenExecutor = last(args);
    const childrenProps =
      typeof childrenExecutor === "function"
        ? renderChildren(component, childrenExecutor)
        : { children: null, childrenAll: null };

    Object.assign(component.props, childrenProps);

    const siblings = last(componentStack);
    siblings.push(component);

    return new Proxy(component.props, {
      get(target, prop) {
        return value => {
          target[prop] = value;
          return this;
        };
      }
    });
  }

  Object.setPrototypeOf(SwiftUIComponent.prototype, Component.prototype);
  SwiftUIComponent.prototype.render = instanceRender;

  return SwiftUIComponent;
}
