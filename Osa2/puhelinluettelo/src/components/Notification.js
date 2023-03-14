const Notification = ({ successMessage, errorMessage }) => {
    if (successMessage === null && errorMessage === null) {
      return null
    } else if (successMessage !== null && errorMessage === null) {
        return (
            <div className="successMessage">
              {successMessage}
            </div>
        )
    } else if (successMessage === null && errorMessage !== null) {
        return (
            <div className="errorMessage">
              {errorMessage}
            </div>
        )
    } else {
        return (
            <>
            <div className="successMessage">
                {successMessage}
            </div>
            <div className="errorMessage">
                {errorMessage}
            </div>
            </>
        )
    }
}

export default Notification