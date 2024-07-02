import { Container, Row } from "react-bootstrap";
import Stripe from "react-stripe-checkout";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PaymentPage = () => {
  const navigate = useNavigate();

  const changeStepShopOrder = () => {
    axios
      .post(`/api/change_step_shop_order`, { step: "completed" })
      .then(data => {
        console.log(data);
        navigate("/completed");
      })
      .catch(err => {
        console.log(err);
      });
  };

  async function handleToken(token) {
    console.log(token);
    await axios
      .post("api/charge", {
        token: token.id,
        amount: 1000,
      })
      .then(() => {
        alert("Payment Success");
        changeStepShopOrder();
      })
      .catch(error => {
        alert(error);
      });
  }

  // 4242 4242 4242 4242
  // 11/31 424

  return (
    <Container>
      <h1 className="text-center my-5">Per Effettuare il pagamento premi il pulsante</h1>
      <Row>
        <Stripe
          stripeKey="pk_test_51PVaZ9E0iY8YjYNDq3nPpJajJKYgn8mM02Ikb6H4rrQ9xDah6zstgG89Sn2D9DGUXb9fc6oyqkmBBgLrQ2b86Hpw002wPgq8rR"
          token={handleToken}
          amount={1000} // Importo in centesimi
          name="Test Payment"
          description="Test Payment Description"
          currency="USD"
        />
      </Row>
    </Container>
  );
};

export default PaymentPage;
