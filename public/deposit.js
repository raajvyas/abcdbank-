function Deposit() {
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState("");
  const [despositRes, setDepositRes] = React.useState("");

  return (
    <Card
      bgcolor="warning"
      header="Deposit"
      status={status}
      body={
        show ? (
          <DepositForm setDepositRes={setDepositRes} setShow={setShow} setStatus={setStatus} />
        ) : (
          <DepositMsg despositRes={despositRes} setShow={setShow} setStatus={setStatus} />
        )
      }
    />
  );
}

function DepositMsg(props) {
  return (
    <>
      <h5>{props.despositRes}</h5>
      <button
        type="submit"
        className="btn btn-light"
        onClick={() => {
          props.setShow(true);
          props.setStatus("");
        }}
      >
        Deposit again
      </button>
    </>
  );
}

function DepositForm(props) {
  const [email, setEmail] = React.useState("");
  const [amount, setAmount] = React.useState(0);

  const handle = async (e) => {
    e.preventDefault();
    try {
      if(Number(amount) <= 0){
        alert('Deposit amount must be greater than 0!')
        return false;
      }
      const response = await fetch(`/account/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email.toLowerCase(), amount: Number(amount) }),
      });
      const data = await response.json();
      props.setShow(false);
      if(data.success){
        props.setDepositRes('Deposit successful!')
      }else{
        props.setDepositRes('Deposit failed! Please try again!')
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
      Amount
      <br />
      <input
        type="number"
        className="form-control"
        placeholder="Enter amount"
        value={amount}
        onChange={(e) => setAmount(e.currentTarget.value)}
      />
      <br />
      <button type="submit" className="btn btn-light">
        Deposit
      </button>
    </form>
  );
}
