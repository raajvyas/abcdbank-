function Withdraw(){
    const [show, setShow]     = React.useState(true);
    const [status, setStatus] = React.useState("");  
    const [withdrawRes, setWithdrawRes] = React.useState("");
  
    return (
      <Card
        bgcolor="success"
        header="Withdraw"
        status={status}
        body={show ? 
          <WithdrawForm setWithdrawRes={setWithdrawRes} setShow={setShow} setStatus={setStatus}/> :
          <WithdrawMsg withdrawRes={withdrawRes} setShow={setShow} setStatus={setStatus}/>}
      />
    )
  }
  
  function WithdrawMsg(props){
    return(<>
      <h5>{props.withdrawRes}</h5>
      <button type="submit" 
        className="btn btn-light" 
        onClick={() => {
          props.setShow(true);
          props.setStatus('');
        }}>
          Withdraw again
      </button>
    </>);
  }
  
  function WithdrawForm(props){
    const [email, setEmail]   = React.useState('');
    const [amount, setAmount] = React.useState(0);
  
    const handle = async (e)=> {
      e.preventDefault();
      try {
        if(Number(amount) <= 0) {
          alert('Withdrawal amount must be greater than 0!');
          return false;
        }
        const response = await fetch(`/account/withdraw`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email.toLowerCase(), amount: Number(amount) }),
      });
        const data = await response.json();
        props.setShow(false);
        if(data.success){
          props.setWithdrawRes('Withdrawal successful!');
        }else {
          props.setWithdrawRes('Withdrawal failed! Please try again!');
        }
      } catch(err) {
      props.setStatus(err);
      console.log("err:", err);
      }
    };
    
    return(
      <form onSubmit={handle}>
      Email
      <br/>
      <input type="input" 
        className="form-control" 
        placeholder="Enter email" 
        value={email} 
        onChange={e => setEmail(e.currentTarget.value)}/><br/>
  
      Amount<br/>
      <input type="number" 
        className="form-control" 
        placeholder="Enter amount" 
        value={amount} 
        onChange={e => setAmount(e.currentTarget.value)}/><br/>
  
      <button type="submit" 
        className="btn btn-light">
          Withdraw
      </button>
  
    </form>);
  }