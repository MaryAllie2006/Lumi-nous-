import SearchForm from '../SearchForm/SearchForm.jsx'
import ResultsPanel from '../ResultsPanel/ResultsPanel.jsx'
import './main.css'


import star from '../../images/star.svg'

function Main() {
  return (
    <main className="main">
      <img className="main__star" src={star} alt="" aria-hidden="true" />
      <h1 className="main__title">Luminous</h1>
      <p className="main__subtitle">Find the best night to stargaze, anywhere.</p>
      <SearchForm />
      <ResultsPanel />
    </main>
  )
}

export default Main
