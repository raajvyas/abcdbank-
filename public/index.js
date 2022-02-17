function Spa(props) {
  const userData = JSON.parse(localStorage.getItem("user_details"));
  const [isLoggedIn, setIsLoggedIn] = React.useState("");

  const Redirect = ReactRouterDOM.Redirect;

  const handleSetLogin = () => {
    setIsLoggedIn("logged_in");
    console.log("User Logged In!");
  };

  const handleSetLogOut = () => {
    setIsLoggedIn("logged_out");
    console.log("Used Logged Out!");
  };
  return (
    <HashRouter>
      <div>
        <UserContextProvider
          value={{
            users: [
              {
                name: "",
                email: "",
                password: "",
                balance: 0,
              },
            ],
          }}
        >
          <NavBar handleSetLogOut={handleSetLogOut} isLoggedIn={isLoggedIn} />
          <div className="container" style={{ padding: "20px" }}>
            <Route path="/" exact component={Home} />
            <Route
              path="/createaccount"
              render={(props) => {
                if (isLoggedIn === "logged_out" || !userData) {
                  return <CreateAccount handleSetLogin={handleSetLogin} {...props} />
                }else{
                  return <Redirect to="/" />;
                }
                
              }}
            />
            <Route
              path="/login"
              handleSetLogin={handleSetLogin}
              render={(props) => {
                if (isLoggedIn === "logged_out" || !userData) {
                  return <Login handleSetLogin={handleSetLogin} {...props} />;
                }else{
                  return <Redirect to="/" />;
                }
                
              }}
            />
            <Route path="/deposit"
            render={(props) => {
              if (isLoggedIn === "logged_in" || userData) {
                return <Deposit {...props} />;
              } else {
                //return history.push("/login");
                return alert("Please log in to make a deposit!");
              }
            }} />
            <Route path="/withdraw"
            render={(props) => {
              if (isLoggedIn === "logged_in" || userData) {
                return <Withdraw {...props} />;
              } else {
                //return history.push("/login");
                return alert("Please log in to withdraw!");
              }
            }} />
            {/* <Route path="/transactions/" component={Transactions} /> */}
            <Route
              path="/balance"
              render={(props) => {
                if (isLoggedIn === "logged_in" || userData) {
                  return <Balance {...props} />;
                } else {
                  //return history.push("/login");
                  return alert("Please log in to check the balance!");
                }
              }}
            />
            <Route
              path="/alldata"
              render={(props) => {
                if (isLoggedIn === "logged_in" || userData) {
                  return <AllData {...props} />;
                } else {
                  //return history.push("/login");
                  return alert("Please log in to view all data!");
                }
              }}
            />
          </div>
        </UserContextProvider>
      </div>
    </HashRouter>
  );
}

ReactDOM.render(<Spa />, document.getElementById("root"));
