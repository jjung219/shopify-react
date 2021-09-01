import { useState, useEffect } from 'react';
import axios from 'axios';
import { ListGroup, Button, Form } from 'react-bootstrap';
import CSVexport from './components/CSVexport';

import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';

function App() {
  const [orders, setOrders] = useState([]);
  const [fulfilledOrders , setFulfilledOrders] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/orders')
      .then(res => {
        console.log("response: ", res.data)
        setOrders(res.data.orders)
      })
  }, []);

  const onCheck = (e) => {
    console.log(e.target.checked)
  }

  const ordersList = orders.map(order => {
    return (
      <Form key={order.id}>
        <ListGroup horizontal  className="order-item">
          <ListGroup.Item>Order: {order.name}</ListGroup.Item>
          <ListGroup.Item>Ordered on: {order.processed_at.slice(0,10)}</ListGroup.Item>
          <ListGroup.Item>Fullfilled: {order.fulfillment_status ? "True" : "False"}</ListGroup.Item>
          <ListGroup.Item>
            {order.fulfillment_status ? (
              <span>Fulfilled</span>
            ): (
              <Form.Check 
                type='checkbox' 
                id={order.id} 
                label='Check as fulfilled'
                onClick={onCheck}
              />
            )}
          </ListGroup.Item>
        </ListGroup>
      </Form>
    )
  })

  return (
    <div className="App">
      <h1 className="header">
        Shopify Reports Page
      </h1>

      <h3>Recent Orders</h3>
      <CSVexport data={orders} />
      <div className="orders">
        {ordersList}
      </div>
      <Button variant="secondary" className="export-btn">Mark all orders as fulfilled</Button>

    </div>
  );
}

export default App;
