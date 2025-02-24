import React from 'react'
import { useState } from 'react';
import './tictactoe.css'
import taco from '../assets/taco.png'
import sriracha from '../assets/sriracha.png'

// create an array that will store values
let data = ["", "", "", "", "", "", "", "", ""]; 

const Tictactoe = () => {
  // variables:
  let [count, setCount] = useState(0);
  let [lock, setLock] = useState(false);
  let [mode, setMode] = useState(null); // this is to tell if its single player, or multiplayer
  let [title, setTitle] = useState("TIC - TAC - TACO!"); // this is so i can reset the title 
  //reference for our YOU WON! message:

    // function: whenever we click on a box, toggle funciton will be executed 
    const toggle = (e, num) => {
      if (lock || data[num] !== "") {
        return 0; // This line should return early if the box is already clicked or the game is locked
      }
    
      if (mode === "single") {
        // Player moves first
        e.target.innerHTML = `<img src='${taco}'>`;
        data[num] = "x";
        setCount(count + 1);
        
        if (!lock) {
          // Display "my turn!" and delay comp move
          setTitle("my turn!");
          setTimeout(() => {
            comp(); // AI move after a delay
          }, 1000);
        }
        checkWin();
      }
    
      if (mode === "multi") {
        if (count % 2 === 0) { // Player 1 chooses the taco
          e.target.innerHTML = `<img src='${taco}'>`;
          data[num] = "x";
          setCount(++count);
        } else { // Player 2 chooses the sriracha
          e.target.innerHTML = `<img src='${sriracha}'>`;
          data[num] = "o";
          setCount(++count);
        }
        checkWin();
      }
    }
    
    const comp = () => {
      if (lock) return;
      let emptySpots = data.map((val, i) => (val === "" ? i : null)).filter(i => i !== null);
      if (emptySpots.length === 0) return;
      
      let randomIndex = Math.floor(Math.random() * emptySpots.length);
      let compMove = emptySpots[randomIndex];
      
      setTitle("Your turn!");
      data[compMove] = "o";
      
      document.querySelectorAll(".boxes")[compMove].innerHTML = `<img src='${sriracha}'>`;
      
      setCount(count + 1);
      checkWin();
    };
    

  const checkWin = () => {
    const winningPatterns = 
      [[0,1,2], [3,4,5], [6,7,8], // rows
       [0,3,6], [1,4,7], [2,5,8], // cols
       [0,4,8], [2,4,6]];         // diags

    for (const [a,b,c] of winningPatterns){
      if (data[a] === data[b] && data[b] === data[c] && data[c]!==""){
        won(data[c]);
        return
      }
    }
    if (!data.includes("") && !lock) {
      setTitle("It's a tie!");
      setLock(true);  // Lock the game after a tie
    }
  };

  const won = (winner) => {
    setLock(true);
    if (winner === "x") {
      setTitle(<span><img src={taco} alt="Taco" /> wins!</span>);
    } else if (winner === "o") {
      setTitle(<span><img src={sriracha} alt="Sriracha" /> wins!</span>);
    }
  };
  
  
  
  const reset = () => {
    setLock(false);
    data = ["", "", "", "", "", "", "", "", ""]; 

    // actually resetting the boxes 
    document.querySelectorAll(".boxes").forEach(box => {
      box.innerHTML = "";
    });
    setTitle("TIC - TAC - TACO!"); // acctually resets the title
  };


  // even spacing between tic, tac, and toco
  return (
<div className='container'>
  <h1 className="title">
    {title} 
  </h1>
  
  <div className="game-container">
    <div className="button-container">
      <button className="one" onClick={() => {setMode("single")}}>single pringle</button>
      <button className="multi" onClick={() => {setMode("multi")}}>multiplayer</button>
    </div>

    <div className="board">
      <div className="row1">
        <div className="boxes" onClick={(e) => {toggle(e, 0)}}></div>
        <div className="boxes" onClick={(e) => {toggle(e, 1)}}></div>
        <div className="boxes" onClick={(e) => {toggle(e, 2)}}></div>
      </div>
      <div className="row2">
        <div className="boxes" onClick={(e) => {toggle(e, 3)}}></div>
        <div className="boxes" onClick={(e) => {toggle(e, 4)}}></div>
        <div className="boxes" onClick={(e) => {toggle(e, 5)}}></div>
      </div>
      <div className="row3">
        <div className="boxes" onClick={(e) => {toggle(e, 6)}}></div>
        <div className="boxes" onClick={(e) => {toggle(e, 7)}}></div>
        <div className="boxes" onClick={(e) => {toggle(e, 8)}}></div>
      </div>
    </div>
  </div>

  <button className="reset" onClick={() => {reset()}}>reset</button>
</div>

  );
}

export default Tictactoe
