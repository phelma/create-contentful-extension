import React, { Component } from 'react';
import { AppExtensionSDK } from 'contentful-ui-extensions-sdk';
import { Heading, Form, Workbench, Paragraph } from '@contentful/forma-36-react-components';
import { css } from 'emotion';

export interface AppInstallationParameters {}

interface ConfigProps {
  sdk: AppExtensionSDK;
}

interface ConfigState {
  parameters: AppInstallationParameters;
}

export default class Config extends Component<ConfigProps, ConfigState> {
  constructor(props: ConfigProps) {
    super(props);
    this.state = { parameters: {} };

    // `onConfigure` allows to configure a callback to be
    // invoked when a user attempts to install the app or update
    // its configuration.
    props.sdk.app.onConfigure(() => this.onConfigure());
  }

  async componentDidMount() {
    // Get current parameters of the app.
    // If the app is not installed yet, `parameters` will be `null`.
    const parameters: AppInstallationParameters | null = await this.props.sdk.app.getParameters();

    this.setState(parameters ? { parameters } : this.state, () => {
      // Once preparation has finished, call `setReady` to hide
      // the loading screen and present the app to a user.
      this.props.sdk.app.setReady();
    });
  }

  render() {
    return (
      <Workbench className={css({ margin: '80px' })}>
        <Form>
          <Heading>App Config</Heading>
          <Paragraph>Welcome to your contentful app. This is your config page.</Paragraph>
        </Form>
      </Workbench>
    );
  }

  async onConfigure() {
    // This method will be called when a user clicks on "Install"
    // or "Save" in the configuration screen.
    // for more details see https://www.contentful.com/developers/docs/extensibility/ui-extensions/sdk-reference/#register-an-app-configuration-hook

    return {
      // Parameters to be persisted as the app configuration.
      parameters: this.state.parameters
    };
  }
}
