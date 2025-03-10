import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import type { LinkEvent } from '../../types/form';

import { useAppSelector } from '../../hooks/use-app-selector';
import { useAppDispatch } from '../../hooks/use-app-dispatch';

import { AuthorizationStatus, AppRoute } from '../../const/const';
import { logoutAction } from '../../store/api-actions';

import Logo from '../logo/logo';

type HeaderProps = {
  titleRender?: () => JSX.Element;
  navRender?: () => JSX.Element;
  variant?: 'user-page' | 'film-card';
  isUserBlock?: boolean;
}

type UserBlockProps = {
  authorizationStatus: AuthorizationStatus;
  userInfo: {
    avatar: string;
  };
  onLogout: (evt: LinkEvent) => void;
  onUserAction: () => void;
}

function UserBlock({ authorizationStatus, userInfo, onLogout, onUserAction }: UserBlockProps): JSX.Element {

  const handleLogoutClick = (evt: LinkEvent): void => {
    evt.preventDefault();
    onLogout(evt);
  };

  const handleUserClick = () => {
    onUserAction();
  };

  return (
    <ul className="user-block">
      {
        authorizationStatus === AuthorizationStatus.Auth
          ? (
            <>
              <li className="user-block__item">
                <div className="user-block__avatar" onClick={handleUserClick}>
                  <img src={userInfo.avatar} alt="User avatar" width="63" height="63" />
                </div>
              </li>
              <li className="user-block__item">
                <Link className="user-block__link" to="#" onClick={handleLogoutClick}>Sign out</Link>
              </li>
            </>
          )
          : (<li><Link to={AppRoute.LogIn} className="user-block__link">Sign in</Link></li>)
      }
    </ul>
  );
}

function Header({ titleRender, navRender, variant = 'film-card', isUserBlock = true }: HeaderProps): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { authorizationStatus, userInfo } = useAppSelector((state) => state);

  const onLogout = (evt: LinkEvent): void => {
    evt.preventDefault();
    dispatch(logoutAction());
    navigate(AppRoute.Main);
  };

  const onUserAction = () => {
    navigate(AppRoute.MyList);
  };

  return (
    <header className={`page-header ${variant}__head`}>
      <Logo />
      {
        titleRender && titleRender()
      }
      {
        navRender && navRender()
      }
      {
        isUserBlock ? <UserBlock authorizationStatus={authorizationStatus} userInfo={userInfo} onLogout={onLogout} onUserAction={onUserAction} /> : null
      }
    </header >
  );
}

export default Header;
