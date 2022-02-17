function AllData() {
  const [data, setData] = React.useState("");

  React.useEffect(() => {
    // fetch all accounts from API
    fetch("/account/all")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setData(data);
      });
  }, []);
  if (data && data.length > 0) {
    return (
      <>
        <h5>All Data in Store:</h5>
        <table class="table table-striped">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Balance</th>
            </tr>
          </thead>
          <tbody>
            {data.map((user) => (
              <tr>
                <th scope="row">{user._id}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.balance}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    );
  } else {
    return <p>loading data....</p>;
  }
}
