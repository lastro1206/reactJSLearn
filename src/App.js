import { useEffect, useState } from "react";

function App() {
  const [cash, setCash] = useState(0);
  const [loading, setLoding] = useState(true);
  const [coins, setCoins] = useState([]);
  const [selectedCoin, setSelectedCoin] = useState(null);

  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setLoding(false);
        setSelectedCoin(json[0].quotes.USD.price);
      });
  }, []);

  const onChangeCash = (event) => {
    setCash(Number(event.target.value));
  };

  const onChangeSelect = (event) => {
    setSelectedCoin(Number(event.target.value));
  };

  return (
    <div>
      <h1>The Coins! {loading ? "" : `(${coins.length})`}</h1>
      <input
        value={cash}
        onChange={onChangeCash}
        type='number'
        placeholder='가지고 있는 돈?'
      />
      <br />
      {loading ? (
        <strong>Loading...</strong>
      ) : (
        <select onChange={onChangeSelect}>
          {coins.map((coin) => (
            <option
              key={coin.id}
              value={coin.quotes.USD.price}>
              {coin.name} ({coin.symbol}) : {coin.quotes.USD.price} USD
            </option>
          ))}
        </select>
      )}
      <p>{cash / selectedCoin}</p>
    </div>
  );
}

export default App;
