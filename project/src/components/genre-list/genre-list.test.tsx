import { render, screen } from '@testing-library/react';

import { Genre, genreMapping } from '../../const/const';
import { makeTestGenresList } from '../../util/mocks';
import GenreList from './genre-list';

const onUpdate = jest.fn();

const mockGenresList = makeTestGenresList();

const testComponent = (
  <GenreList
    genresList={mockGenresList}
    activeGenre={Genre.All}
    onUpdate={onUpdate}
  />
);

describe('Component: GenreList', () => {
  it('should render correctly', () => {
    render(testComponent);

    expect(screen.getByRole('button', { name: new RegExp(genreMapping[mockGenresList[0]], 'i') })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: new RegExp(genreMapping[mockGenresList[1]], 'i') })).toBeInTheDocument();
  });
});
