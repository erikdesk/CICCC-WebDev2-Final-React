const Proximity = ({
  proximity,
  onProximityDecrement,
  onProximityIncrement,
}) => {
  const formatButtonPlus = () => {
    if (proximity.value === proximity.valueMax) {
      return <button className="btn btn-dark btn-sm m-1 disabled">+</button>
    } else {
      return (
        <button
          onClick={() => onProximityIncrement(proximity)}
          className="btn btn-dark btn-sm m-1"
        >
          +
        </button>
      )
    }
  }

  const formatButtonMinus = () => {
    if (proximity.value === proximity.valueMin) {
      return <button className="btn btn-dark btn-sm m-1 disabled">-</button>
    } else {
      return (
        <button
          onClick={() => onProximityDecrement(proximity)}
          className="btn btn-dark btn-sm m-1"
        >
          -
        </button>
      )
    }
  }

  const formatText = () => {
    switch (proximity.value) {
      case 0:
        return (
          <span className="message badge badge-success m-1">
            <p>Around 5 minutes walk. 🚶‍♀️</p>
          </span>
        )
      case 1:
        return (
          <span className="message badge badge-primary m-1">
            <p>Around 10 minutes walk. 🚶‍♀️</p>
          </span>
        )
      case 2:
        return (
          <span className="message badge badge-secondary m-1">
            <p>Around 15 minutes walk. 🚶‍♀️</p>
          </span>
        )
      case 3:
        return (
          <span className="message badge badge-warning m-1">
            <p>Around 20 minutes walk. 🚶‍♀️</p>
          </span>
        )
      case 4:
        return (
          <span className="message badge badge-danger m-1">
            Around 25 minutes walk. 🚶‍♀️
          </span>
        )
      default:
    }
  }
  return (
    <div>
      {formatButtonMinus()}
      {formatButtonPlus()}
      {formatText()}
    </div>
  )
}

export default Proximity
