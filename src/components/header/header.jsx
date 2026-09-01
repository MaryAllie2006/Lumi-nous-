import './header.css'

function Header() {
  return (
    <header className="header">
      <div className="header__logo">
        <svg className="header__logo-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
        </svg>
        <span className="header__logo-text">Luminous</span>
      </div>
      <nav className="header__nav">
        <a href="#astro-events" className="header__nav-link">Astro Events</a>
      </nav>
    </header>
  )
}

export default Header
