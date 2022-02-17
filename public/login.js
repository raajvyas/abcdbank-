function Login(props) {
  console.log(props, "from login");
  const { user } = React.useContext(UserContext);
  return (
    <Card
      bgcolor="secondary"
      header="Login"
      body={
        user ? (
          <LoginMsg handleSetLogin={props.handleSetLogin} />
        ) : (
          <LoginForm handleSetLogin={props.handleSetLogin} />
        )
      }
    />
  );
}

function LoginMsg(props) {
  return (
    <>
      <h5>Success</h5>
    </>
  );
}

function LoginForm(props) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const { setUser } = React.useContext(UserContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/account/login`, {
        method: "post",
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log("JSON:", data);
      if (data.name) {
        setUser(data);
        localStorage.setItem(
          "user_details",
          JSON.stringify({ name: data.name, email: data.email })
        );
      }else if(data.error){
        alert(data.error);
        return false;
      }else{
        alert("User doesn't exist!");
        return false;
      }

      props.handleSetLogin();
    } catch (err) {
      props.setStatus(err);
      console.log("err:", err);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      Email
      <br />
      <input
        type="input"
        className="form-control"
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.currentTarget.value)}
      />
      <br />
      Password
      <br />
      <input
        type="password"
        className="form-control"
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.currentTarget.value)}
      />
      <br />
      <button type="submit" className="btn btn-light">
        Login
      </button>
      <br />
      <br />
      <form action="/#/createaccount">
        <button className="btn btn-light">Create Another Account</button>
      </form>
    </form>
  );
}
