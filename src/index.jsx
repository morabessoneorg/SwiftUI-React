import React from "react";
import ReactDOM from "react-dom";
import { SwiftUI } from "./SwiftUI";
import { Themes } from "./Themes";
import { List, Image, VStack, Text } from "./components";

// const Content = SwiftUI(() => {
//   const model = Themes.listModel;

//   List(model.items, { action: model.selectItem }, item => {
//     Image(item.image);
//     VStack({ alignment: "leading" }, () => {
//       Text(item.title);
//       Text(item.subtitle).color("gray");
//     });
//   });
// });

const Content = SwiftUI(() => {
  const model = Themes.listModel;

  List(model.items, { action: model.selectItem }, item => {
    Image(item.image);
    VStack({ alignment: "leading" }, () => {
      Text(item.title);
      Text(item.subtitle).color("gray");
    });
  });
});

const CenteredContent = () => (
  <div className="centered-container">
    <Content />
  </div>
);


ReactDOM.render(
  <CenteredContent />,
  document.body.appendChild(document.createElement("div"))
);
