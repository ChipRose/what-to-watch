import React, { useEffect, useRef, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/use-app-dispatch';

import { type FilmIdType } from '../../types/film';
import { type ChangeTextareaEvent, type ChangeInputEvent, type FormEvent, type TextArea, type Input } from '../../types/form';

import { fetchNewReviewAction } from '../../store/api-actions';
import { AppRoute } from '../../const/const';

export type NewReviewType = {
  rating: number;
  comment: string;
}

type RatingScaleProps = {
  rating: number;
  onUpdate: ({ rating }: { rating: number }) => void;
}

type AddReviewFormProps = {
  filmId: FilmIdType | null;
}

const STARS_COUNT = 10;

export enum Validity {
  MinCommentLength = 50,
  MaxCommentLength = 400,
}

function RatingScale({ rating, onUpdate }: RatingScaleProps): JSX.Element {
  const ratingRef = useRef<Input>(null);

  const starsProps = Array.from({ length: STARS_COUNT }, (_, idx) => ({
    value: STARS_COUNT - idx, name: `Rating${idx}`, id: `star-${STARS_COUNT - idx}`
  }));

  const ceilRating = Math.round(rating);

  const handleInputChange = (evt: ChangeInputEvent) => {
    const { value }: { value: string } = evt.target as HTMLInputElement;

    if (ratingRef && value) {
      ratingRef?.current?.setCustomValidity('It\'s need to set rating');
      ratingRef?.current?.reportValidity();
    } else {
      ratingRef?.current?.setCustomValidity('');
    }

    onUpdate({ rating: Number(value) });
  };

  return (
    <div id='rating' className="rating__stars">
      {
        starsProps?.map(({ value, name, id }) => (
          <React.Fragment key={id}>
            <input
              className="rating__input"
              ref={ratingRef}
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
  const navigate = useNavigate();

  const textareaRef = useRef<TextArea>(null);

  const initFormState: NewReviewType = { rating: 0, comment: '' };
  const [isValid, setIsValid] = useState<boolean>(false);
  const [formData, setFormData] = useState<NewReviewType>(initFormState);
  const [buttonState, setButtonState] = useState<{ disabled: boolean }>({ disabled: true });

  const onInputChange = ({ rating }: { rating: number }) => {
    setFormData((prevState) => ({ ...prevState, rating }));
  };

  const handleTextAreaChange = (evt: ChangeTextareaEvent) => {
    const { id, value }: { id: string; value: string } = evt.target as HTMLTextAreaElement;
    if (textareaRef && (value.length < Validity.MinCommentLength || value.length > Validity.MaxCommentLength)) {
      textareaRef?.current?.setCustomValidity(`It's need ${Validity.MinCommentLength} - ${Validity.MaxCommentLength} symbols.`);
      textareaRef?.current?.reportValidity();
    } else {
      textareaRef?.current?.setCustomValidity('');
    }
    setFormData((prevState) => ({ ...prevState, [id]: value }));
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
    const isCommentValid = formData.comment?.length >= Validity.MinCommentLength && formData.comment?.length <= Validity.MaxCommentLength;
    const isRatingValid = Boolean(formData.rating);
    if (isCommentValid && isRatingValid) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [formData]);

  useEffect(() => {
    setButtonState({ disabled: !isValid });
  }, [isValid]);


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
          />
          <div className="add-review__submit">
            <button className="add-review__btn" type="submit" {...buttonState}>Post</button>
          </div>

        </div>
      </form>
    </div>
  );
}

export default AddReviewForm;
