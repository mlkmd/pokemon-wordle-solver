import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import AnswerCell from 'presentation/components/atoms/AnswerCell';
import { BLOW, HIT, UNUSED } from 'application/query/value/CharacterStatus';

export default {
  title: 'custom/atoms/AnswerCell',
  component: AnswerCell,
} as ComponentMeta<typeof AnswerCell>;

const Template: ComponentStory<typeof AnswerCell> = (args, args2) => (
  <AnswerCell {...args} />
);

export const Empty = Template.bind({});
Empty.args = {
  character: '',
  status: null,
  size: 40,
};
export const Unused = Template.bind({});
Unused.args = {
  character: 'ア',
  status: UNUSED,
  size: 40,
};
export const Hit = Template.bind({});
Hit.args = {
  character: 'ア',
  status: HIT,
  size: 40,
};
export const Blow = Template.bind({});
Blow.args = {
  character: 'ア',
  status: BLOW,
  size: 40,
};
