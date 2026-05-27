import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import AddReviewForm, { Validity } from './add-review-form';
import { fetchNewReviewAction } from '../../store/api-actions';

const mockNavigate = jest.fn();
const mockDispatch = jest.fn();
const mockUnwrap = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual<typeof import('react-router-dom')>('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

jest.mock('../../hooks/use-app-dispatch', () => ({
  useAppDispatch: () => mockDispatch,
}));

jest.mock('../../store/api-actions', () => ({
  ...jest.requireActual<typeof import('../../store/api-actions')>('../../store/api-actions'),
  fetchNewReviewAction: jest.fn(() => ({ type: 'review/post' })),
}));

describe('Component: AddReviewForm', () => {
  const filmId = 77;
  const validComment = 'A'.repeat(Validity.MinCommentLength);

  beforeEach(() => {
    mockNavigate.mockClear();
    mockDispatch.mockClear();
    mockUnwrap.mockClear();
    mockDispatch.mockReturnValue({ unwrap: mockUnwrap.mockResolvedValue(undefined) });
    (fetchNewReviewAction as jest.MockedFunction<typeof fetchNewReviewAction>).mockClear();
  });

  it('should enable submit only when rating and comment are valid', () => {
    render(<AddReviewForm filmId={filmId} />);

    const submitButton = screen.getByRole('button', { name: 'Post' });
    const textarea = screen.getByPlaceholderText('Review text');
    const rating = screen.getByLabelText('Rating 8');

    expect(submitButton).toBeDisabled();

    fireEvent.change(textarea, { target: { value: validComment } });
    expect(submitButton).toBeDisabled();

    fireEvent.click(rating);
    expect(submitButton).toBeEnabled();
  });

  it('should dispatch review action and navigate after successful submit', async () => {
    render(<AddReviewForm filmId={filmId} />);

    fireEvent.change(screen.getByPlaceholderText('Review text'), { target: { value: validComment } });
    fireEvent.click(screen.getByLabelText('Rating 8'));
    fireEvent.click(screen.getByRole('button', { name: 'Post' }));

    await waitFor(() => expect(fetchNewReviewAction).toHaveBeenCalledWith({
      id: filmId,
      rating: 8,
      comment: validComment,
    }));
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith(`/films/${filmId}`);
    });
  });
});

