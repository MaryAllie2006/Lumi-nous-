import "./footer.css";

function Footer() {
  return (
    <footer className="footer">
      <p>2026 Luminous</p>
      <p>
        Weather data by{" "}
        <a
          className="footer__link"
          href="https://open-meteo.com/"
          target="_blank"
          rel="noreferrer"
        >
          Open-Meteo.com
        </a>
        {" · "}Places ©{" "}
        <a
          className="footer__link"
          href="https://www.openstreetmap.org/copyright"
          target="_blank"
          rel="noreferrer"
        >
          OpenStreetMap
        </a>
      </p>
      <p>Mary Ruelas</p>
    </footer>
  );
}

export default Footer;
