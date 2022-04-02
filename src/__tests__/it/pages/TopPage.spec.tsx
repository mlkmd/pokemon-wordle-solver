import { cleanup, fireEvent, render } from '@testing-library/react';
import TopPage from 'presentation/components/pages/TopPage';
import UnreachableError from 'lib/exceptions/UnreachableError';

// 参考: next/router の mock
// @see https://blog.shinki.net/posts/jest-next-router-mock
// @see https://github.com/vercel/next.js/issues/7479

const pushMock = jest.fn();
jest.mock('next/router', () => ({
  useRouter: () => ({
    push: pushMock,
  }),
}));

beforeEach(() => {
  pushMock.mockClear();
});
afterEach(cleanup);

describe('トップ画面', () => {
  describe('メタ情報', () => {
    test('画面タイトル', () => {
      const { getByText } = render(<TopPage />);
      getByText('モード選択画面');
    });
  });

  describe('ホームボタン', function () {
    test('click イベント', () => {
      const { container } = render(<TopPage />);
      const homeIcon = container.querySelector('[data-testid="HomeIcon"]');
      expect(homeIcon).not.toBeNull();
      if (!homeIcon) throw new UnreachableError();
      fireEvent.click(homeIcon);
      expect(pushMock).toHaveBeenCalledWith('/');
      expect(pushMock).toHaveBeenCalledTimes(1);
    });
  });

  describe('通常ボタン', () => {
    test('button 要素', () => {
      const { getByText } = render(<TopPage />);
      const normalModeButton = getByText('通常モード');
      expect(normalModeButton.tagName).toBe('BUTTON');
    });

    test('click イベント', () => {
      const { getByText } = render(<TopPage />);
      const normalModeButton = getByText('通常モード');
      fireEvent.click(normalModeButton);
      expect(pushMock).toHaveBeenCalledWith('/normal/');
      expect(pushMock).toHaveBeenCalledTimes(1);
    });
  });

  describe('チャレンジモードボタン', () => {
    test('button 要素', () => {
      const { getByText } = render(<TopPage />);
      const challengeModeButton = getByText('チャレンジモード');
      expect(challengeModeButton.tagName).toBe('BUTTON');
    });

    test('click イベント', () => {
      const { getByText } = render(<TopPage />);
      const challengeModeButton = getByText('チャレンジモード');
      fireEvent.click(challengeModeButton);
      expect(pushMock).toHaveBeenCalledWith('/challenge/');
      expect(pushMock).toHaveBeenCalledTimes(1);
    });
  });
});
