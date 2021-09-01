import { useState, useEffect } from 'react';
import axios from 'axios';

import './App.css';

function App() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/orders')
      .then(res => {
        console.log("response: ", res.data)
        setOrders(res.data.orders)
      })
  }, []);

  const ordersList = orders.map(order => {
    return (
      <div key={order.id}>
        <span>Order: {order.name}</span>
        <span>Ordered at: {order.processed_at}</span>
        <span>Fullfilled: {order.fulfillment_status ? "True" : "False"}</span>
      </div>
    )
  })

  return (
    <div className="App">
      <h1>
        Shopify Reports Page
      </h1>

      <h3>Recent Orders</h3>
      <div className="orders">
        {ordersList}
      </div>

    </div>
  );
}

export default App;
