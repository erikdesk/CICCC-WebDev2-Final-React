const Find = ({ status, place, onFindRestaurant }) => {
  const formatButton = () => {
    switch (status) {
      case 0:
        return (
          <button
            onClick={onFindRestaurant}
            className="btn btn-dark btn-lg m-2"
          >
            Find me a place to eat..
          </button>
        )
      case 1:
        return (
          <button
            onClick={onFindRestaurant}
            className="btn btn-warning btn-lg m-2"
          >
            Finding your location..
          </button>
        )
      case 2:
        return (
          <button className="btn btn-success btn-lg m-2">
            Finding a suitable restaurant for you..
          </button>
        )
      case 3:
        return (
          <div>
            <button className="btn btn-dark btn-lg m-2">
              <strong className="text-warning">GO EAT!</strong>
            </button>
            <span
              id="place"
              className="badge badge-pill badge-warning badge-lg m-2"
            >
              <p className="d-inline text-muted">@ </p>
              <p className="d-inline text-black">{place}</p>
            </span>
          </div>
        )
      default:
    }
  }
  return formatButton()
}

export default Find
