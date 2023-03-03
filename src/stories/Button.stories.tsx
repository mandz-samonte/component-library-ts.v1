import React from "react";
import Button, { PrimaryButton, Props } from "../components/Button";

export default {
  title: "Button",
  component: Button,
};

export const Default = () => <Button>Default Button</Button>;

export const Primary = () => <PrimaryButton>Primary Button</PrimaryButton>;
