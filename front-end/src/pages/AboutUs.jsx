import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const AboutUs = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="text-center my-4">
        <img
          src="https://static-00.iconduck.com/assets.00/shopping-cart-emoji-256x256-uz4p7t7e.png"
          alt="logo"
          className="w-25"
        />
        <h1 className="text-mainColor">Supermercato Online</h1>
      </div>
      <h4>Chi Siamo</h4>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nemo, impedit enim aperiam, sit architecto rem
        veritatis eius veniam eum dolorum possimus dolores! Exercitationem libero fugit nostrum, hic blanditiis
        cupiditate quam! Tenetur dolorem sunt itaque tempora omnis eum officia ullam fugiat. Laboriosam, soluta animi.
        Laudantium aperiam debitis pariatur, sed corporis officiis nisi assumenda eum animi, enim in! Nostrum ab
        sapiente distinctio. Reprehenderit, aspernatur aut voluptatem rerum exercitationem voluptas, consequuntur unde,
        nostrum accusantium tenetur excepturi. Distinctio cumque vel beatae quas sed quos asperiores nesciunt provident
        accusantium nihil rem, minima cum! Repellat, praesentium? Eum possimus quisquam consectetur maxime, obcaecati
        cumque aperiam quasi minus vel aut in, magni error fuga provident non porro aspernatur dolor voluptatum ut
        perferendis!
      </p>
      <h4>Come Funziona</h4>
      <p>
        In pochi clic puoi riempire il tuo carrello: ti basterà visitare le corsie virtuali oppure utilizzare il comodo
        strumento di ricerca (se vuoi raggiungere un prodotto specifico). Una volta che avrai terminato la selezione non
        ti resterà che iscriverti/loggarti e concludere l'acquisto. Puoi decidere di pagare alla consegna oppure
        anticipatamente con bonifico bancario, carta di credito o Paypal (clicca qui per avere maggiori informazioni sui
        metodi di pagamento). Concluso l'acquisto, non dovrai fare altro che attendere l'arrivo del pacco all'indirizzo
        indicato, previsto il giorno successivo all'esecuzione dell'ordine (clicca qui per avere maggiori informazioni
        sui tempi di consegna).
      </p>
      <h6>Punto Vendita</h6>
      <p>
        Se sei spesso fuori casa, puoi sempre utilizzare uno tra i nostri punti vendita che abbiamo messo a tua
        disposizione: così potrai andare a ritirare la tua spesa quando ti farà più comodo. Controlla qual è il punto
        vendita più vicino.
      </p>
      <div className="d-flex justify-content-center mt-5">
        <Button type="button" id="first-button" onClick={() => navigate("/")}>
          Torna alla HomePage
        </Button>
      </div>
    </>
  );
};

export default AboutUs;
