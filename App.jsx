import React, { useState, useEffect } from "react";
import { fetchCharacters } from "./api.js";

export default function App() {
  const [characters, setCharacters] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetchCharacters().then(data => setCharacters(data));
  }, []);

  const addToCart = (char) => {
    setCart(prev => [...prev, char]);
  };

  const removeFromCart = (index) => {
    setCart(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <main style={styles.main}>
      <header style={styles.header}>
        <h1 style={styles.title}>Rick & Morty Chemicals Shop</h1>
        <div aria-label="Shopping cart" style={styles.cart}>
          <span>Cart: {cart.length}</span>
        </div>
      </header>
      <section style={styles.grid}>
        {characters.map((char) => (
          <article key={char.id} style={styles.card}>
            <img src={char.image} alt={char.name} loading="lazy" style={styles.image} />
            <h2 style={styles.name}>{char.name}</h2>
            <p style={styles.description}>Premium {char.species} essence</p>
            <button
              onClick={() => addToCart(char)}
              style={styles.button}
              aria-label={"Add " + char.name + " to cart"}
            >
              Add to Cart
            </button>
          </article>
        ))}
      </section>
      {cart.length > 0 && (
        <footer style={styles.footer}>
          <h2>Cart Items</h2>
          <ul>
            {cart.map((item, idx) => (
              <li key={idx} style={styles.cartItem}>
                {item.name}
                <button
                  onClick={() => removeFromCart(idx)}
                  style={styles.removeButton}
                  aria-label={"Remove " + item.name + " from cart"}
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        </footer>
      )}
    </main>
  );
}

const styles = {
  main: {
    fontFamily: "Arial, sans-serif",
    padding: "1rem",
    backgroundColor: "#f0f0f0",
    minHeight: "100vh",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "1rem",
  },
  title: {
    margin: 0,
    fontSize: "1.5rem",
    color: "#2c3e50",
  },
  cart: {
    fontSize: "1rem",
    color: "#27ae60",
  },
  grid: {
    display: "flex",
    flexWrap: "wrap",
    gap: "1rem",
    justifyContent: "center",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: "8px",
    padding: "0.5rem",
    width: "200px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
  image: {
    width: "100%",
    borderRadius: "4px",
  },
  name: {
    fontSize: "1.1rem",
    margin: "0.5rem 0 0.2rem",
    color: "#34495e",
  },
  description: {
    fontSize: "0.9rem",
    margin: "0.2rem 0 0.5rem",
    color: "#7f8c8d",
  },
  button: {
    backgroundColor: "#e74c3c",
    color: "#fff",
    border: "none",
    padding: "0.4rem 0.8rem",
    borderRadius: "4px",
    cursor: "pointer",
  },
  footer: {
    marginTop: "2rem",
    backgroundColor: "#fff",
    padding: "1rem",
    borderRadius: "8px",
  },
  cartItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "0.5rem",
  },
  removeButton: {
    background: "transparent",
    border: "none",
    color: "#c0392b",
    cursor: "pointer",
    fontSize: "1rem",
  },
};