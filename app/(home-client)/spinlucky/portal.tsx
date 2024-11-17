import React, { Component } from "react";
import {
  Button,
  Header,
  Segment,
  TransitionablePortal,
} from "semantic-ui-react";

interface TrPortalState {
  open: boolean;
}

export default class TrPortal extends Component<{}, TrPortalState> {
  state: TrPortalState = { open: false };

  handleOpen = () => this.setState({ open: true });

  handleClose = () => this.setState({ open: false });

  render() {
    const { open } = this.state;

    return (
      <TransitionablePortal
        closeOnTriggerClick
        onOpen={this.handleOpen}
        onClose={this.handleClose}
        openOnTriggerClick
        trigger={
          <Button
            content={open ? "Close Portal" : "Open Portal"}
            negative={open}
            positive={!open}
            onClick={this.handleOpen}
          />
        }
      >
        <Segment
          style={{ left: "40%", position: "fixed", top: "60%", zIndex: 1000 }}
        >
          <Header className="text-slate-900 dark:text-slate-200">This is an example portal</Header>
          <p className="text-slate-900 dark:text-slate-200">Portals have tons of great callback functions to hook into.</p>
          <p className="text-slate-900 dark:text-slate-200">To close, simply click the close button or click away</p>
        </Segment>
      </TransitionablePortal>
    );
  }
}
