const Header = () => {
  return (
    <header>
      <span id="title" className="badge badge-dark m-1">
        <p id="title-name" className="text-warning">
          <strong>Desk Food Adventures!</strong>
        </p>
        <p id="title-desc" className="text-white">
          Pick your preferences and we will decide where you will eat today!
        </p>
        <p id="title-info" className="text-primary">
          You have eaten at{' '}
          <span className="badge badge-pill badge-primary">
            {localStorage.length}
          </span>{' '}
          places we picked for you!
        </p>
      </span>
    </header>
  )
}

export default Header
