import FactCard from '../FactCard/FactCard.jsx'
import loadingStar from '../../images/loadingStar.svg'
import './Preloader.css'

function Preloader({
  title = 'Loading the night sky...',
}) {
  return (
    <section className="preloader" role="status" aria-live="polite">
      <div className="preloader__orb">
        <img className="preloader__star" src={loadingStar} alt="" aria-hidden="true" />
      </div>
      <h2 className="preloader__title">{title}</h2>
      <FactCard />
    </section>
  )
}

export default Preloader
