import React from "react";
import styled from "react-emotion";

import ConsoleContainer from "./console-container";
import ConsoleGutter from "./console-gutter";
import levels from "./log-levels";

const MessageContainer = styled(ConsoleContainer)`
  overflow: auto;
  margin-bottom: 0px;
  margin-top: 0px;
`;

const MessageBody = styled("div")`
  margin: auto;
  margin-left: 0;
  padding-top: 5px;
  padding-bottom: 5px;
`;

export default class ConsoleMessage extends React.Component {
  render() {
    const levelData = levels[this.props.level];
    return (
      <MessageContainer
        backgroundColor={levelData.backgroundColor}
        textColor={levelData.textColor || "black"}
      >
        <ConsoleGutter side="left">
          {this.props.symbol || levelData.symbol}
        </ConsoleGutter>
        <MessageBody>{this.props.children}</MessageBody>
        <ConsoleGutter side="Right">&nbsp;</ConsoleGutter>
      </MessageContainer>
    );
  }
}
