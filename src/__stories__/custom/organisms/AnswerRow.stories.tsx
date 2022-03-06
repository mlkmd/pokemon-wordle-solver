import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { BLOW, HIT, UNUSED } from 'application/query/value/CharacterStatus';
import AnswerRow from 'presentation/components/organisms/AnswerRow';
import clickCheckFunction from 'lib/functions/clickCheckFunction';

export default {
  title: 'custom/atoms/AnswerRow',
  component: AnswerRow,
} as ComponentMeta<typeof AnswerRow>;

const Template: ComponentStory<typeof AnswerRow> = (args, args2) => (
  <AnswerRow {...args} />
);

export const Empty = Template.bind({});
Empty.args = {
  result: null,
  cellProps: {
    size: 40,
  },
};

export const Answer = Template.bind({});
Answer.args = {
  result: {
    input: 'サーナイト',
    statuses: [UNUSED, HIT, UNUSED, UNUSED, BLOW],
  },
  cellProps: {
    size: 40,
  },
};

export const Clickable = Template.bind({});
Clickable.args = {
  result: {
    input: 'サーナイト',
    statuses: [UNUSED, HIT, UNUSED, UNUSED, BLOW],
  },
  cellProps: {
    size: 40,
  },
  onClickCell: (index) => clickCheckFunction(`AnswerRow[${index}]`),
};
