import { VFC } from 'react';
import { Generation, generations } from 'domain/value/Generation';
import { GenerationEnum } from 'presentation/model/GenerationEnum';
import { FormControl, NativeSelect } from '@mui/material';

type Props = {
  generation: Generation;
  onChange: (generation: Generation) => void;
};
const GenerationSelector: VFC<Props> = ({ generation, onChange }) => {
  return (
    <FormControl>
      <NativeSelect
        value={generation}
        onChange={(e) => onChange(e.target.value as Generation)}
      >
        {generations.map((item) => (
          <option key={item} value={item}>
            {GenerationEnum[item].name}まで
          </option>
        ))}
      </NativeSelect>
    </FormControl>
  );
};
export default GenerationSelector;
