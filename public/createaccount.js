function CreateAccount(props) {
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState("");
  const { user } = React.useContext(UserContext);

  return (
    <Card
      bgcolor="primary"
      header="Create Account"
      status={status}
      body={
        show ? (
          <CreateForm handleSetLogin={props.handleSetLogin} setShow={setShow} />
        ) : (
          <CreateMsg setShow={setShow} />
        )
      }
    />
  );
}

function CreateMsg(props) {
  return (
    <>
      <h5>Success</h5>
      <button
        type="submit"
        className="btn btn-light"
        onClick={() => props.setShow(true)}
      >
        Add another account
      </button>
    </>
  );
}

function CreateForm(props) {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const { setUser } = React.useContext(UserContext);

  async function handle() {
    console.log(name, email, password);
    const url = `/account/create/${name}/${email}/${password}`;

    var res = await fetch(url);
    var data = await res.json();
    console.log(data);

    if (data.err) {
      props.setShow(true);
      alert('Entered email already exists in our system!');
      return false;
    } else {
      props.setShow(false);
      setUser(data);
      localStorage.setItem(
        "user_details",
        JSON.stringify({ name: data.name, email: data.email })
      );
      props.handleSetLogin();
    }
  }

  return (
    <>
      Name
      <br />
      <input
        type="input"
        className="form-control"
        placeholder="Enter name"
        value={name}
        onChange={(e) => setName(e.currentTarget.value)}
      />
      <br />
      Email address
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
      <button type="submit" className="btn btn-light" onClick={handle}>
        Create Account
      </button>
    </>
  );
}
