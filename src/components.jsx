import React from "react";
import { SwiftUI } from "./SwiftUI";

export const List = SwiftUI((items, { action, childrenAll }) => {
  const itemStyle = {
    borderBottom: "1px solid #efefef",
    padding: 5,
    cursor: "pointer",
  };
  return (
    <div>
      {childrenAll.map((children, index) => (
        <div
          key={index}
          style={itemStyle}
          onClick={event => action(items[index].title)}
        >
          {children}
        </div>
      ))}
    </div>
  );
});

export const Image = SwiftUI((image, props) => {
  const style = {
    margin: "0 5px",
    verticalAlign: "top"
  };
  return <img style={style} src={image} alt="" />;
});

export const VStack = SwiftUI(({ alignment, children }) => {
  const style = {
    display: "inline-flex",
    flexDirection: "column"
  };
  return (
    <v-stack style={style} data-alignment={alignment}>
      {children}
    </v-stack>
  );
});

export const Text = SwiftUI((text, { color = "black" }) => {
  return <span style={{ color }}>{text}</span>;
});
