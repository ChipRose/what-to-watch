import React, { useState } from 'react';
import { ChangeTextareaEvent, ChangeInputEvent } from '../../types/form';

type FormData = {
  rating: number;
  reviewText: string;
}

type RatingScaleProps = {
  rating: number;
  onUpdate: ({ rating }: { rating: number }) => void;
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

function AddReviewForm(): JSX.Element {
  const [formData, setFormData] = useState<FormData>({ rating: 0, reviewText: '' });

  const onInputChange = ({ rating }: { rating: number }) => {
    setFormData((prevState) => ({ ...prevState, rating }));
  };

  const handleTextAreaChange = (evt: ChangeTextareaEvent) => {
    const { id, value }: { id: string; value: string } = evt.target as HTMLTextAreaElement;

    setFormData((prevState) => ({ ...prevState, [id]: value }));
  };

  return (
    <div className="add-review">
      <form action="#" className="add-review__form">
        <div className="rating">
          <RatingScale rating={formData.rating} onUpdate={onInputChange} />
        </div>

        <div className="add-review__text">
          <textarea
            className="add-review__textarea"
            name="review-text"
            id="reviewText"
            placeholder="Review text"
            onChange={handleTextAreaChange}
          >
            {formData.reviewText}
          </textarea>
          <div className="add-review__submit">
            <button className="add-review__btn" type="submit">Post</button>
          </div>

        </div>
      </form>
    </div>
  );
}

export default AddReviewForm;
