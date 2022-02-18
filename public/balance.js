function Balance() {
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState("");
  const [balanceRes, setBalanceRes] = React.useState({});

  const getBalanceData = (bal) => {
    if (bal.balance) {
      setBalanceRes(bal);
    } else {
      setBalanceRes({ ...balanceRes, balance: "error" });
      console.log("error");
    }
  };

  return (
    <Card
      bgcolor="info"
      header="Balance"
      status={status}
      body={
        show ? (
          <BalanceForm
            getBalanceData={getBalanceData}
            setShow={setShow}
            setStatus={setStatus}
          />
        ) : (
          <BalanceMsg
            balanceRes={balanceRes.balance}
            setShow={setShow}
            setStatus={setStatus}
          />
        )
      }
    />
  );
}

function BalanceMsg(props) {
  return (
    <>
      <h5>Success</h5>
      <p>$ {props.balanceRes}</p>
      <button
        type="submit"
        className="btn btn-light"
        onClick={() => {
          props.setShow(true);
          props.setStatus("");
        }}
      >
        Check balance again
      </button>
    </>
  );
}

function BalanceForm(props) {
  const [email, setEmail] = React.useState("");

  const handle = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/account/balance`, {
        method: "post",
        body: JSON.stringify({ email }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log("JSON:", data);
      props.getBalanceData(data);
      if (data.balance) {
        props.setShow(false);
      } else {
        alert('Invalid Email! Please enter the correct email address to check balance!');
        return false;
      }
    } catch (err) {
      props.setStatus(err);
      console.log("err:", err);
    }
  };

  return (
    <form onSubmit={handle}>
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
      <button type="submit" className="btn btn-light">
        Check Balance
      </button>
    </form>
  );
}
