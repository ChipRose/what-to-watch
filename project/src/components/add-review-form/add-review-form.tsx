import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { fetchNewReviewAction } from '../../store/api-actions';
import { AppRoute } from '../../const/const';

import type { FilmIdType } from '../../types/film';
import type { ChangeTextareaEvent, ChangeInputEvent, FormEvent } from '../../types/form';

export type NewReviewType = {
  rating: number | null;
  comment: string;
};

type RatingScaleProps = {
  rating: number | null;
  onUpdate: (rating: number) => void;
};

type AddReviewFormProps = {
  filmId: FilmIdType | null;
};

const STARS_COUNT = 10;

export enum Validity {
  MinCommentLength = 50,
  MaxCommentLength = 400,
}

function RatingScale({ rating, onUpdate }: RatingScaleProps): JSX.Element {
  const ratingRef = useRef<HTMLInputElement | null>(null);

  const starsProps = Array.from({ length: STARS_COUNT }, (_, idx) => ({
    value: STARS_COUNT - idx,
    name: `Rating ${STARS_COUNT - idx}`,
    id: `star-${STARS_COUNT - idx}`
  }));

  const handleInputChange = (evt: ChangeInputEvent) => {
    const value = Number(evt.target.value);

    if (ratingRef.current) {
      ratingRef.current.setCustomValidity(value ? '' : 'Please select a rating.');
      ratingRef.current.reportValidity();
    }

    onUpdate(value);
  };

  return (
    <div id="rating" className="rating__stars">
      {starsProps.map(({ value, name, id }) => (
        <React.Fragment key={id}>
          <input
            className="rating__input"
            ref={ratingRef}
            id={id}
            type="radio"
            name="rating"
            value={value}
            checked={rating === value}
            onChange={handleInputChange}
            required
          />
          <label className="rating__label" htmlFor={id}>{name}</label>
        </React.Fragment>
      ))}
    </div>
  );
}

function AddReviewForm({ filmId }: AddReviewFormProps): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const initFormState: NewReviewType = { rating: null, comment: '' };
  const [formData, setFormData] = useState<NewReviewType>(initFormState);
  const [isValid, setIsValid] = useState<boolean>(false);

  const onInputChange = (rating: number) => {
    setFormData((prevState) => ({ ...prevState, rating }));
  };

  const handleTextAreaChange = (evt: ChangeTextareaEvent) => {
    const value = evt.target.value;

    if (textareaRef.current) {
      if (value.length < Validity.MinCommentLength || value.length > Validity.MaxCommentLength) {
        textareaRef.current.setCustomValidity(
          `Comment must be between ${Validity.MinCommentLength} and ${Validity.MaxCommentLength} characters.`
        );
      } else {
        textareaRef.current.setCustomValidity('');
      }
      textareaRef.current.reportValidity();
    }

    setFormData((prevState) => ({ ...prevState, comment: value }));
  };

  const handleSubmit = (evt: FormEvent): void => {
    evt.preventDefault();
    if (filmId) {
      dispatch(fetchNewReviewAction({ id: filmId, ...formData }));
      setFormData(initFormState);
      navigate(`${AppRoute.Films}/${filmId}`);
    }
  };

  useEffect(() => {
    const isCommentValid = formData.comment.length >= Validity.MinCommentLength &&
      formData.comment.length <= Validity.MaxCommentLength;
    const isRatingValid = formData.rating !== null;

    setIsValid(isCommentValid && isRatingValid);
  }, [formData]);

  return (
    <div className="add-review">
      <form action="#" className="add-review__form" onSubmit={handleSubmit}>
        <div className="rating">
          <RatingScale rating={formData.rating} onUpdate={onInputChange} />
        </div>

        <div className="add-review__text">
          <textarea
            ref={textareaRef}
            className="add-review__textarea"
            name="review-text"
            id="comment"
            placeholder="Review text"
            onChange={handleTextAreaChange}
            value={formData.comment}
            required
          />
          <div className="add-review__submit">
            <button className="add-review__btn" type="submit" disabled={!isValid}>
              Post
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddReviewForm;
