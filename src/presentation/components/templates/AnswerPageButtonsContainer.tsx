import { VFC } from 'react';
import { Button, Grid } from '@mui/material';
import GenerationSelector from 'presentation/components/atoms/GenerationSelector';
import { AnswerPageData } from 'presentation/model/AnswerPageData';

type Props = AnswerPageData;
const AnswerPageButtonsContainer: VFC<Props> = ({
  generation,
  onChangeGeneration,
  onClear,
}) => {
  return (
    <Grid
      container
      justifyContent={'space-between'}
      gap={4}
      marginTop={'2rem'}
      paddingX={'2rem'}
    >
      <Grid item>
        <GenerationSelector
          generation={generation}
          onChange={onChangeGeneration}
        />
      </Grid>
      <Grid item>
        <Button onClick={onClear} variant={'contained'} size={'large'}>
          クリア
        </Button>
      </Grid>
    </Grid>
  );
};
export default AnswerPageButtonsContainer;
