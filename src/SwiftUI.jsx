import React from 'react';

export function SwiftUI(Component) {
  return (props) => {
    const { value, children, ...restProps } = props;

    if (Array.isArray(value)) {
      return (
        <>
          {value.map((item, index) => (
            <Component key={index} value={item} {...restProps}>
              {children}
            </Component>
          ))}
        </>
      );
    }

    return <Component value={value} {...restProps}>{children}</Component>;
  };
}
