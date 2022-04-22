import "./App.css";
import Input from "../Input";
import { useState } from "react";

function App() {
  const [lbtt, setLbtt] = useState("");
  const [error, setError] = useState("");
  const [housePrice, setHousePrice] = useState("");
  function calculateLBTT(price, checked) {
    const firstRate = (250000 - 145000) / 50;
    const secondRate = (325000 - 250000) / 20 + firstRate;
    const thirdRate = (750000 - 325000) / 10 + secondRate;

    console.log(checked);

    const newPrice = price * 1;
    setHousePrice(newPrice);
    // tax bands
    // houses priced £145k-£250k
    const lowestBand = (newPrice - 145000) / 50;
    // houses priced £250k-£325k
    const bandTwo = (newPrice - 250000) / 20 + firstRate;
    // houses priced £325k-£750k
    const bandThree = (newPrice - 325000) / 10 + secondRate;
    // houses priced above £750k
    const topBand = (newPrice - 750000) * 0.12 + thirdRate;

    // Error handling for if the price submitted is invalid (not a number or a negative number)
    // try {
    //   if (Number.isFinite(newPrice) !== true || newPrice < 0) {
    //     throw new Error("Invalid price entered");

    //   }
    // } catch (err) {
    //   throw err;
    // }
    // if the price is above £750k return the highest tax band

    // console.log(error);

    if (Number.isFinite(newPrice) !== true || newPrice < 0) {
      setLbtt("");
      setError("Invalid price entered");
    } else if (newPrice > 750000) {
      setLbtt(topBand);
      setError("");
    }
    // if the price is between £325k and £750k return the appropriate tax band
    else if (newPrice > 325000) {
      setLbtt(bandThree);
      setError("");
    }
    // if the price is between £250k and £325k return the appropriate tax band
    else if (newPrice > 250000) {
      setLbtt(bandTwo);
      setError("");
    }
    // if they are a first time buyer and the price is between £175k and £250k return the lowest tax band
    else if (checked === true && newPrice > 175000) {
      setLbtt(lowestBand);
      setError("");
    }
    // if they are not a first time buyer and the price is between £145k and £250k return the lowest tax band
    else if (newPrice > 145000 && checked === false) {
      setLbtt(lowestBand);
      setError("");
    } else {
      // if the house price is £145k or lower (or £175k or lower for a first time buyer), no LBTT needs to be paid so return 0
      setLbtt(0);
      setError("");
    }
  }

  return (
    <div className="App">
      <h1>LBTT Calculator</h1>
      <Input onSearch={calculateLBTT} />
      <div>
        {lbtt === "" && <p></p>}
        {error !== "" && <p>{error}</p>}
        {lbtt !== "" && (
          <p>
            You will pay £{lbtt} LBTT on a house price of £{housePrice}
          </p>
        )}
      </div>
    </div>
  );
}

export default App;
