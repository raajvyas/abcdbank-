function NavBar(props) {
  const { user, setUser } = React.useContext(UserContext);
  const userData = JSON.parse(localStorage.getItem("user_details"));
  const history = ReactRouterDOM.useHistory();

  const handleLogout = (event) => {
    props.handleSetLogOut();
    localStorage.removeItem("user_details");
    setUser("");
    history.push("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="#">
        ABCD Bank
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          {props.isLoggedIn === "logged_out" || !userData ? (
            <>
              <li className="nav-item">
                <a className="nav-link" href="#/login">
                  Login
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#/createaccount">
                  Create Account
                </a>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <a className="nav-link" href="#/deposit">
                  Deposit
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#/withdraw">
                  Withdraw
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#/balance">
                  Balance
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#/alldata">
                  AllData
                </a>
              </li>
              <li className="nav-item">
                <Link className="nav-link" onClick={handleLogout} to="#">
                  LogOut
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
      {userData ? (
        <div class="sticky-md-top">
          <label class="form-label"> Logged in as: {userData.name} </label>
        </div>
      ) : (
        <div></div>
      )}
    </nav>
  );
}
