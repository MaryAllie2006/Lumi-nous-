import FactCard from '../FactCard/FactCard.jsx'
import loadingStar from '../../images/loadingStar.svg'
import './Preloader.css'

function Preloader({
  title = 'Loading the night sky...',
  subtitle,
}) {
  return (
    <section className="preloader" role="status" aria-live="polite">
      <div className="preloader__orb">
        <img className="preloader__star" src={loadingStar} alt="" aria-hidden="true" />
      </div>
      <h2 className="preloader__title">{title}</h2>
      {subtitle && <p className="preloader__subtitle">{subtitle}</p>}
      <FactCard />
    </section>
  )
}

export default Preloader
