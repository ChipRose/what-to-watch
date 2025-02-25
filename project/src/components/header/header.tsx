import { Link } from 'react-router-dom';

import { useAppSelector } from '../../hooks/use-app-selector';

import { AuthorizationStatus, AppRoute } from '../../const/const';

import Logo from '../logo/logo';

type HeaderProps = {
  titleRender?: () => JSX.Element;
  variant?: 'user-page' | 'film-card';
  isUserBlock?: boolean;
}

type UserBlockProps = {
  authorizationStatus: AuthorizationStatus;
}

function UserBlock({ authorizationStatus }: UserBlockProps): JSX.Element {
  return (
    <ul className="user-block">
      {
        authorizationStatus === AuthorizationStatus.Auth
          ? (
            <>
              <li className="user-block__item">
                <div className="user-block__avatar">
                  <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
                </div>
              </li>
              <li className="user-block__item">
                <Link className="user-block__link" to="#">Sign out</Link>
              </li>
            </>
          )
          : (<li><Link to={AppRoute.LogIn} className="user-block__link">Sign in</Link></li>)
      }
    </ul>
  );
}

function Header({ titleRender, variant = 'film-card', isUserBlock = true }: HeaderProps): JSX.Element {
  const { authorizationStatus } = useAppSelector((state) => state);

  return (
    <header className={`page-header ${variant}__head`}>
      <Logo />
      {
        titleRender && titleRender()
      }
      {
        isUserBlock ? <UserBlock authorizationStatus={authorizationStatus} /> : null
      }
    </header >
  );
}

export default Header;
