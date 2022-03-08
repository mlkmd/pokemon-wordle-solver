import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import GenerationSelector from 'presentation/components/atoms/GenerationSelector';
import { GEN_RED_GREEN, generations } from 'domain/value/Generation';
import emptyFunction from 'lib/functions/emptyFunction';

export default {
  title: 'custom/atoms/GenerationSelector',
  component: GenerationSelector,
} as ComponentMeta<typeof GenerationSelector>;

const Template: ComponentStory<typeof GenerationSelector> = (args, args2) => (
  <GenerationSelector {...args} />
);

export const Default = Template.bind({});
Default.args = {
  generation: GEN_RED_GREEN,
  onChange: emptyFunction,
};
Default.argTypes = {
  generation: { control: { type: 'select', options: generations } },
};
