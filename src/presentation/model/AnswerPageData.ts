import { ExpectValueResult } from 'application/query/model/ExpectValueResult';
import { Generation } from 'domain/value/Generation';
import { ComponentProps } from 'react';
import AnswerGrid from 'presentation/components/organisms/AnswerGrid';

export type AnswerPageData = {
  generation: Generation;
  answerGridProps: ComponentProps<typeof AnswerGrid>;
  usedNames?: string[];
  recommends: ExpectValueResult[];
  selectedRecommend: null | ExpectValueResult;
  onChangeGeneration: (generation: Generation) => void;
  onClickRecommend: (recommend: ExpectValueResult) => void;
  onSubmit: () => void;
  onClickNextButton?: () => void;
  onClear: () => void;
  onClearAll?: () => void;
};
