import { fireEvent, render, screen } from '@testing-library/react';

import Catalog from './catalog';
import { makeTestFilms } from '../../util/mocks';
import { adaptFilmsDataToApp } from '../../util/util-adapt-data';

const mockNavigate = jest.fn();
const mockSetActiveFilm = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual<typeof import('react-router-dom')>('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

jest.mock('../../hooks/use-set-active-film', () => ({
  __esModule: true,
  default: () => mockSetActiveFilm,
}));

jest.mock('../../hocs/with-video-preview/with-video-preview', () => ({
  __esModule: true,
  default: () => (props: { id: number; title: string; onFilmClick: (id: number) => void }) => (
    <button type="button" onClick={() => props.onFilmClick(props.id)}>
      {props.title}
    </button>
  ),
}));

describe('Component: Catalog', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
    mockSetActiveFilm.mockClear();
  });

  it('should render nothing for empty films', () => {
    render(<Catalog filmsList={[]} />);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('should navigate and set active film on card click', () => {
    const films = adaptFilmsDataToApp(makeTestFilms())?.slice(0, 2) ?? [];
    render(<Catalog filmsList={films} />);

    fireEvent.click(screen.getByRole('button', { name: films[0].title }));

    expect(mockNavigate).toHaveBeenCalledWith(`/films/${films[0].id}`);
    expect(mockSetActiveFilm).toHaveBeenCalledWith(films[0].id);
  });
});

