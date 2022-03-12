import { ExpectValueResult } from 'application/query/model/ExpectValueResult';
import { Generation } from 'domain/value/Generation';
import { ComponentProps } from 'react';
import AnswerGrid from 'presentation/components/organisms/AnswerGrid';

export type AnswerPageData = {
  generation: Generation;
  onChangeGeneration: (generation: Generation) => void;
  onClear: () => void;
  recommends: ExpectValueResult[];
  selectedRecommend: null | ExpectValueResult;
  onClickRecommend: (recommend: ExpectValueResult) => void;
  onSubmit: () => void;
  answerGridProps: ComponentProps<typeof AnswerGrid>;
};
