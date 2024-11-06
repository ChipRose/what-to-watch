import Logo from '../logo/logo';

type HeaderProps = {
  titleRender?: () => JSX.Element;
  variant?: 'user-page' | 'film-card';
}

function Header({ titleRender, variant = 'film-card' }: HeaderProps): JSX.Element {
  return (
    <header className={`page-header ${variant}__head`}>
      <Logo />
      {
        titleRender && titleRender()
      }
      <ul className="user-block">
        <li className="user-block__item">
          <div className="user-block__avatar">
            <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
          </div>
        </li>
        <li className="user-block__item">
          <a className="user-block__link" href="/">Sign out</a>
        </li>
      </ul>
    </header>
  );
}

export default Header;
