function Home(){
    return (
      <Card
        txtcolor="black"
        header="ABCD Bank Home Page"
        title="Welcome to ABCD bank"
        text="You can move around using the navigation bar."
        body={(<img src="bank.png" className="img-fluid" alt="Responsive image"/>)}
      />
    );  
  }