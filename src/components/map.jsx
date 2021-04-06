const Map = ({ directions }) => {
  const googleApiKey = 'AIzaSyBOtbXsV-al8_G6RlkThNU4w_Xy0YrIkYs'

  if (!directions.show) {
    return null
  } else {
    return (
      <iframe
        id="map"
        title="test"
        width="380px"
        height="360px"
        frameBorder="0"
        src={`https://www.google.com/maps/embed/v1/directions?key=${googleApiKey}&zoom=14&mode=walking&origin=${directions.start.lat},${directions.start.lng}&destination=${directions.end.address}`}
      ></iframe>
    )
  }
}

export default Map
