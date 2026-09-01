import SearchForm from '../SearchForm/SearchForm.jsx'
import homeButton from '../../images/Home Button.svg'
import './main.css'

function Main() {
  return (
    <main className="main">
      <img className="main__star" src={homeButton} alt="" aria-hidden="true" />
      <h1 className="main__title">Luminous</h1>
      <p className="main__subtitle">Find the best night to stargaze, anywhere.</p>
      <SearchForm />
    </main>
  )
}

export default Main
