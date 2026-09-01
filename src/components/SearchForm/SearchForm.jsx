import { useState } from 'react'
import './SearchForm.css'

function SearchForm({ onSearch, onUseLocation }) {
  const [query, setQuery] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    onSearch?.(query)
  }

  return (
    <div className="search-form">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="search-form__input"
          placeholder="Enter a city or address"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </form>

      <div className="search-form__divider">
        <span />
        <p>OR</p>
        <span />
      </div>

      <button
        type="button"
        className="search-form__location-button"
        onClick={onUseLocation}
      >
        Use My Current Location
      </button>
    </div>
  )
}

export default SearchForm
