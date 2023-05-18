const Notification = ({ message, errorMessage }) => {
  if (message !== null) {
    return <div className="message">{message}</div>;
  } else if (errorMessage !== null) {
    return <div className="error">{errorMessage}</div>;
  }
  return null;
};

export default Notification;
