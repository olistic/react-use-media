import React from 'react';
import { render } from 'react-testing-library';

import useMedia from '.';

const createMockMediaMatcher = (
  matches,
  addEventListener = () => {},
  removeEventListener = () => {},
) =>
  jest.fn().mockReturnValue({
    matches,
    addEventListener,
    removeEventListener,
  });

const Foo = ({ mediaQueryString, initialMatches }) => {
  const matches = useMedia(mediaQueryString, { initialMatches });
  return <div>{matches ? 'matches' : 'does not match'}</div>;
};

describe('useMedia', () => {
  describe('with a query that matches', () => {
    beforeEach(() => {
      window.matchMedia = createMockMediaMatcher(true);
    });

    test('updates matches after component is rendered', () => {
      const { container, rerender } = render(
        <Foo mediaQueryString="foo" initialMatches={false} />,
      );
      const el = container.firstChild;
      expect(el).toHaveTextContent('does not match');
      // Force useEffect to run.
      rerender(<Foo />);
      expect(el).toHaveTextContent('matches');
      expect(window.matchMedia).toHaveBeenCalledWith('foo');
    });
  });

  describe('with a query that does not match', () => {
    beforeEach(() => {
      window.matchMedia = createMockMediaMatcher(false);
    });

    test('updates matches after component is rendered', () => {
      const { container, rerender } = render(<Foo mediaQueryString="foo" />);
      const el = container.firstChild;
      expect(el).toHaveTextContent('matches');
      // Force useEffect to run.
      rerender(<Foo />);
      expect(el).toHaveTextContent('does not match');
      expect(window.matchMedia).toHaveBeenCalledWith('foo');
    });
  });

  test('attaches change event listener to media query list object', () => {
    const addEventListenerMock = jest.fn();
    window.matchMedia = createMockMediaMatcher(true, addEventListenerMock);
    const { rerender } = render(<Foo />);
    // Force useEffect to run.
    rerender(<Foo />);
    expect(addEventListenerMock).toHaveBeenCalledWith(
      'change',
      expect.any(Function),
    );
  });

  test('respects initialMatches option', () => {
    window.matchMedia = createMockMediaMatcher(true);
    const { container } = render(<Foo initialMatches={false} />);
    const el = container.firstChild;
    expect(el).toHaveTextContent('does not match');
    expect(window.matchMedia).not.toHaveBeenCalled();
  });
});
