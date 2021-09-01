import { useState, useEffect } from 'react';

import './App.css';

function App() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {

  });

  const ordersList = this.state.orders.map(order => {
    return (
      <span key={order.id}>{order.name}</span>
    )
  })

  return (
    <div className="App">
      <h1>
        Shopify Reports Page
      </h1>

      <h3>Recent Orders</h3>
      <div className="orders">

      </div>

    </div>
  );
}

export default App;
