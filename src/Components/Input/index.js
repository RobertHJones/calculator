import React from "react";
import { useState } from "react";

export default function Input({ onSearch }) {
  const [price, setPrice] = useState("");
  const [firstChecked, setFirstChecked] = useState(false);
  const [secondChecked, setSecondChecked] = useState(false);

  function getValue(e) {
    setPrice(e.target.value);
    console.log(price);
  }

  function handleChange() {
    setFirstChecked(!firstChecked);
  }

  function secondTimeChange() {
    setSecondChecked(!secondChecked);
  }

  function calculateLBTT(e) {
    e.preventDefault();

    onSearch(price, firstChecked, secondChecked);
  }

  return (
    <form>
      <input onChange={getValue} placeholder="£ Enter Purchase Price"></input>
      <button onClick={calculateLBTT}>Calculate</button>
      <label>
        <input type="checkbox" onChange={handleChange}></input>
        First time buyer
      </label>
      <label>
        <input type="checkbox" onChange={secondTimeChange}></input>
        Purchasing as a second/additional home or buy-to-let property
      </label>
    </form>
  );
}
