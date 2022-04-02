import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import RecommendBox from 'presentation/components/organisms/RecommendBox';
import { GEN_RED_GREEN } from 'domain/value/Generation';
import clickCheckFunction from 'lib/functions/clickCheckFunction';

export default {
  title: 'custom/organisms/RecommendBox',
  component: RecommendBox,
} as ComponentMeta<typeof RecommendBox>;

const Template: ComponentStory<typeof RecommendBox> = (args, args2) => (
  <RecommendBox {...args} />
);

export const Possible = Template.bind({});
Possible.args = {
  evResult: {
    pokemon: {
      no: 1,
      name: 'サーナイト',
      generation: GEN_RED_GREEN,
    },
    ev: 12.345,
    possible: true,
  },
  onClick: () => {
    clickCheckFunction(`Possible`);
  },
};

export const ImPossible = Template.bind({});
ImPossible.args = {
  evResult: {
    pokemon: {
      no: 1,
      name: 'サーナイト',
      generation: GEN_RED_GREEN,
    },
    ev: 12.345,
    possible: false,
  },
  onClick: () => {
    clickCheckFunction(`Possible`);
  },
};

export const UnClickable = Template.bind({});
UnClickable.args = {
  evResult: {
    pokemon: {
      no: 1,
      name: 'サーナイト',
      generation: GEN_RED_GREEN,
    },
    ev: 12.345,
    possible: true,
  },
};
