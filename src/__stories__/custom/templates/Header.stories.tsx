import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import Header from 'presentation/components/templates/Header';
import clickCheckFunction from 'lib/functions/clickCheckFunction';

export default {
  title: 'custom/templates/Header',
  component: Header,
} as ComponentMeta<typeof Header>;

const Template: ComponentStory<typeof Header> = (args, args2) => (
  <Header {...args} />
);

export const Default = Template.bind({});
Default.args = {
  subTitle: 'サブタイトル',
  homeIconOnClick: () => clickCheckFunction('ホームアイコン'),
};
