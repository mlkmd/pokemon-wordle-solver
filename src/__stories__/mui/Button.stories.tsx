import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Button } from '@mui/material';

export default {
  title: 'mui/Button',
  component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Default = Template.bind({});
Default.args = {
  variant: 'contained',
  children: 'Hello World',
};
