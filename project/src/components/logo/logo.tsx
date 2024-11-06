import { Link } from 'react-router-dom';

type LogoProps = {
  variant?: 'light';
};

function Logo({ variant }: LogoProps): JSX.Element {
  const linkClass = `logo__link${variant === 'light' ? ' logo__link--light' : ''}`;
  return (
    <div className='logo'>
      <Link className={linkClass} to='/'>
        <span className='logo__letter logo__letter--1'>W</span>
        <span className='logo__letter logo__letter--2'>T</span>
        <span className='logo__letter logo__letter--3'>W</span>
      </Link>
    </div>
  );
}

export default Logo;
