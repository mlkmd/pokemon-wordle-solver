import { render } from '@testing-library/react';
import TopPage from 'presentation/components/pages/TopPage';

describe('Top Page Title', () => {
  test('should have following text', () => {
    const { getByText } = render(<TopPage />);
    expect(getByText('モード選択画面')).toBeTruthy();
  });
});
