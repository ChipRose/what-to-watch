import React, { useState } from 'react';
import { useAppDispatch } from '../../hooks/use-app-dispatch';

import type { FilmIdType } from '../../types/film';
import type { ChangeTextareaEvent, ChangeInputEvent, FormEvent } from '../../types/form';

import { fetchNewReviewAction } from '../../store/api-actions';

export type NewReviewType = {
  rating: number;
  comment: string;
}

type RatingScaleProps = {
  rating: number;
  onUpdate: ({ rating }: { rating: number }) => void;
}

type AddReviewFormProps={
  filmId: FilmIdType | null;
}

const STARS_COUNT = 10;

function RatingScale({ rating, onUpdate }: RatingScaleProps): JSX.Element {
  const starsProps = Array.from({ length: STARS_COUNT }, (_, idx) => ({
    value: STARS_COUNT - idx, name: `Rating${idx}`, id: `star-${STARS_COUNT - idx}`
  }));

  const ceilRating = Math.round(rating);

  const handleInputChange = (evt: ChangeInputEvent) => {
    const { value }: { value: string } = evt.target as HTMLInputElement;

    onUpdate({ rating: Number(value) });
  };

  return (
    <div id='rating' className="rating__stars">
      {
        starsProps?.map(({ value, name, id }) => (
          <React.Fragment key={id}>
            <input
              className="rating__input"
              id={id}
              type="radio"
              name="rating"
              value={value}
              checked={ceilRating === value}
              onChange={handleInputChange}
            />
            <label className="rating__label" htmlFor={id}>{name}</label>
          </React.Fragment>
        ))
      }
    </div>
  );
}

function AddReviewForm({ filmId }: AddReviewFormProps): JSX.Element {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState<NewReviewType>({ rating: 0, comment: '' });

  const onInputChange = ({ rating }: { rating: number }) => {
    setFormData((prevState) => ({ ...prevState, rating }));
  };

  const handleTextAreaChange = (evt: ChangeTextareaEvent) => {
    const { id, value }: { id: string; value: string } = evt.target as HTMLTextAreaElement;

    setFormData((prevState) => ({ ...prevState, [id]: value }));
  };

  const handleSubmit = (evt: FormEvent): void => {
    evt.preventDefault();
    filmId && dispatch(fetchNewReviewAction({ id: filmId, ...formData }));
  };

  return (
    <div className="add-review">
      <form action="#" className="add-review__form" onSubmit={handleSubmit}>
        <div className="rating">
          <RatingScale rating={formData.rating} onUpdate={onInputChange} />
        </div>

        <div className="add-review__text">
          <textarea
            className="add-review__textarea"
            name="review-text"
            id="comment"
            placeholder="Review text"
            onChange={handleTextAreaChange}
            value={formData.comment}
          />
          <div className="add-review__submit">
            <button className="add-review__btn" type="submit">Post</button>
          </div>

        </div>
      </form>
    </div>
  );
}

export default AddReviewForm;
