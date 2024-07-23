import React from "react";
import { SwiftUI } from "./SwiftUI";

const ListComponent = ({
  items,
  action,
  editAction,
  deleteAction,
  children,
}) => {
  const itemStyle = {
    borderBottom: "1px solid #efefef",
    padding: 5,
    cursor: "pointer",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  };

  const buttonStyle = {
    marginLeft: 5,
    cursor: "pointer",
  };

  return (
    <div>
      {items.map((item, index) => (
        <div key={index} style={itemStyle}>
          <div onClick={() => action(item.id)}>{children(item)}</div>
          <div>
            <button style={buttonStyle} onClick={() => editAction(item.id)}>
              Edit
            </button>
            <button style={buttonStyle} onClick={() => deleteAction(item.id)}>
              X
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export const List = SwiftUI(ListComponent);

const InputComponent = ({ name, value, onChange, placeholder }) => (
  <input
    type="text"
    name={name}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    style={{
      display: "block",
      margin: "10px 0",
      padding: "10px",
      width: "100%",
    }}
  />
);

export const Input = SwiftUI(InputComponent);

const ButtonComponent = ({ onClick, children }) => (
  <button
    onClick={onClick}
    style={{
      padding: "10px 20px",
      backgroundColor: "#007bff",
      color: "white",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
    }}
  >
    {children}
  </button>
);

export const Button = SwiftUI(ButtonComponent);

const ImageComponent = ({ image }) => {
  const style = {
    margin: "0 5px",
    verticalAlign: "top",
  };
  return <img style={style} src={image} alt="" />;
};

export const Image = SwiftUI(ImageComponent);

const VStackComponent = ({ alignment, children }) => {
  const style = {
    display: "inline-flex",
    flexDirection: "column",
    alignItems: alignment,
  };
  return <div style={style}>{children}</div>;
};

export const VStack = SwiftUI(VStackComponent);

const TextComponent = ({ children, color = "black" }) => {
  return <span style={{ color }}>{children}</span>;
};

export const Text = SwiftUI(TextComponent);
