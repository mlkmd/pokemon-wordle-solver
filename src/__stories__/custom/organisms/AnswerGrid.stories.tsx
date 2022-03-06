import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import AnswerGrid from 'presentation/components/organisms/AnswerGrid';
import { BLOW, HIT, UNUSED } from 'application/query/value/CharacterStatus';

export default {
  title: 'custom/atoms/AnswerGrid',
  component: AnswerGrid,
} as ComponentMeta<typeof AnswerGrid>;

const Template: ComponentStory<typeof AnswerGrid> = (args, args2) => (
  <AnswerGrid {...args} />
);

export const Default = Template.bind({});
Default.args = {
  results: [
    {
      input: 'サーナイト',
      statuses: [UNUSED, HIT, UNUSED, UNUSED, BLOW],
    },
    {
      input: 'ジーランス',
      statuses: [UNUSED, HIT, UNUSED, UNUSED, UNUSED],
    },
  ],
  rowProps: {
    cellProps: {
      size: 40,
    },
  },
};
