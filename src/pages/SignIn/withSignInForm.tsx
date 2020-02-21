import React, { PureComponent, FC } from "react";

export const withSignInForm = (WrappedComponent: FC) => {
    return class SignInForm extends PureComponent {
        render() {
            return <WrappedComponent />
        }
    }
}