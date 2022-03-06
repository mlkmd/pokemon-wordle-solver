import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import AnswerGrid from 'presentation/components/organisms/AnswerGrid';
import { BLOW, HIT, UNUSED } from 'application/query/value/CharacterStatus';
import clickCheckFunction from 'lib/functions/clickCheckFunction';
import { SolveResult } from 'application/query/model/SolveResult';

export default {
  title: 'custom/atoms/AnswerGrid',
  component: AnswerGrid,
} as ComponentMeta<typeof AnswerGrid>;

const Template: ComponentStory<typeof AnswerGrid> = (args, args2) => (
  <AnswerGrid {...args} />
);

const results: SolveResult[] = [
  {
    input: 'サーナイト',
    statuses: [UNUSED, HIT, UNUSED, UNUSED, BLOW],
  },
  {
    input: 'ジーランス',
    statuses: [UNUSED, HIT, UNUSED, UNUSED, UNUSED],
  },
];

export const Default = Template.bind({});
Default.args = {
  results,
  rowProps: {
    cellProps: {
      size: 40,
    },
  },
};

export const Clickable = Template.bind({});
Clickable.args = {
  results,
  rowProps: {
    cellProps: {
      size: 40,
    },
  },
  cellOnClick: (resultIndex, cellIndex) =>
    clickCheckFunction(`AnswerGrid[${resultIndex}][${cellIndex}]`),
};
