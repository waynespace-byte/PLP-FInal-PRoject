import { render, screen } from '@testing-library/react';
import Home from '../src/pages/Home';

test('renders news feed', () => {
  render(<Home />);
  expect(screen.getByPlaceholderText('Category')).toBeInTheDocument();
});