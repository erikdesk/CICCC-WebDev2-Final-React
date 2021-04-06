const Price = ({ price, onPriceDecrement, onPriceIncrement }) => {
  const formatButtonPlus = () => {
    if (price.value === price.valueMax) {
      return <button className="btn btn-dark btn-sm m-1 disabled">+</button>
    } else {
      return (
        <button
          onClick={() => onPriceIncrement(price)}
          className="btn btn-dark btn-sm m-1"
        >
          +
        </button>
      )
    }
  }

  const formatButtonMinus = () => {
    if (price.value === price.valueMin) {
      return <button className="btn btn-dark btn-sm m-1 disabled">-</button>
    } else {
      return (
        <button
          onClick={() => onPriceDecrement(price)}
          className="btn btn-dark btn-sm m-1"
        >
          -
        </button>
      )
    }
  }

  const formatText = () => {
    switch (price.value) {
      case 0:
        return (
          <span className="message badge badge-success m-1">
            <p>Cheap! Stop your Amazon shopping!! 🛍</p>
          </span>
        )
      case 1:
        return (
          <span className="message badge badge-secondary m-1">
            <p>Pricy. You deserve a good meal. 🍱</p>
          </span>
        )
      case 2:
        return (
          <span className="message badge badge-warning m-1">
            <p>Quite expensive. Wallet will hurt! 💸</p>
          </span>
        )
      case 3:
        return (
          <span className="message badge badge-danger m-1">
            <p>Really expensive! You're living the life!! 💃🕺</p>
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

export default Price
