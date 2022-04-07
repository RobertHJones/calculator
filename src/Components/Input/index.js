import React from "react";
import { useState } from "react";

export default function Input({ onSearch }) {
  const [price, setPrice] = useState("");

  function getValue(e) {
    setPrice(e.target.value);
    console.log(price);
  }

  function calculateLBTT(e) {
    e.preventDefault();

    onSearch(price);
  }

  return (
    <form>
      <input onChange={getValue} placeholder="£Enter Purchase Price"></input>
      <button onClick={calculateLBTT}>Calculate</button>
      <label>
        <input type="checkbox"></input>
        First time buyer
      </label>
      <label>
        <input type="checkbox"></input>
        Purchasing as a second/additional home or buy-to-let property
      </label>
    </form>
  );
}
