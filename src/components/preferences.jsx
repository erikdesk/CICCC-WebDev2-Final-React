import Price from './price'
import Proximity from './proximity'

const Preferences = ({
  preferences,
  onPriceIncrement,
  onPriceDecrement,
  onProximityIncrement,
  onProximityDecrement,
}) => {
  return (
    <div>
      <Price
        onPriceIncrement={onPriceIncrement}
        onPriceDecrement={onPriceDecrement}
        price={preferences.price}
      />
      <Proximity
        onProximityIncrement={onProximityIncrement}
        onProximityDecrement={onProximityDecrement}
        proximity={preferences.proximity}
      />
    </div>
  )
}

export default Preferences
