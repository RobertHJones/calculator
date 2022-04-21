import "./App.css";
import Input from "../Input";
import { useState } from "react";

function App() {
  const [lbtt, setLbtt] = useState("");
  function calculateLBTT(price) {
    const firstRate = (250000 - 145000) / 50;
    const secondRate = (325000 - 250000) / 20 + firstRate;
    const thirdRate = (750000 - 325000) / 10 + secondRate;

    const newPrice = price * 1;

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
    try {
      if (Number.isFinite(newPrice) !== true || newPrice < 0) {
        throw new Error("Invalid price entered");
      }
    } catch (err) {
      throw err;
    }
    // if the price is above £750k return the highest tax band
    if (newPrice > 750000) {
      setLbtt(topBand);
    }
    // if the price is between £325k and £750k return the appropriate tax band
    else if (newPrice > 325000) {
      setLbtt(bandThree);
    }
    // if the price is between £250k and £325k return the appropriate tax band
    else if (newPrice > 250000) {
      setLbtt(bandTwo);
    }
    // if the price is between £145k and £250k return the lowest tax band
    else if (newPrice > 145000) {
      setLbtt(lowestBand);
    } else {
      // if the house price is £145k or lower, no LBTT needs to be paid so return 0
      setLbtt(0);
    }
  }

  return (
    <div className="App">
      <Input onSearch={calculateLBTT} />
      <div>
        {lbtt === "" && <p></p>}
        {lbtt !== "" && <p>You will pay £{lbtt} LBTT on this</p>}
      </div>
    </div>
  );
}

export default App;
