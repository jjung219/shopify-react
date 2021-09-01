import { useState, useEffect } from 'react';
import axios from 'axios';
import { ListGroup, Form } from 'react-bootstrap';
import CSVexport from './components/CSVexport';

import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';

function App() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:5000/api/orders')
      .then(res => {
        console.log("response: ", res.data)
        setOrders(res.data.orders)
      })
  }, []);

  const onCheck = (e, orderId, locationId) => {
    setLoading(true);
    axios.post('http://localhost:5000/api/fulfillOrder', { orderId, locationId })
      .then(res => {
        console.log(res.data)
        setOrders(res.data.orders);
        setLoading(false);
      })
      .catch(e => console.log(e))
  }

  const ordersList = orders.map(order => {
    return (
      <Form key={order.id}>
        <ListGroup horizontal  className="order-item">
          <ListGroup.Item className="order-item-column">{order.name}</ListGroup.Item>
          <ListGroup.Item className="order-item-column">{order.processed_at.slice(0,10)}</ListGroup.Item>
          <ListGroup.Item className="order-item-column">{order.fulfillment_status ? "True" : "False"}</ListGroup.Item>
          <ListGroup.Item className="order-item-column">
            {order.fulfillment_status ? (
              <span>Already Fulfilled</span>
            ): (
                <Form.Check 
                  type='checkbox' 
                  id={order.id} 
                  label='Check as fulfilled'
                  onClick={(e) => onCheck(e, order.id, order.location_id)}
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
      <CSVexport data={orders}/>
      <div className="orders">
        <ListGroup horizontal  className="order-item-titles">
          <ListGroup.Item className="order-item-column">Order Number</ListGroup.Item>
          <ListGroup.Item className="order-item-column">Processed Date</ListGroup.Item>
          <ListGroup.Item className="order-item-column">Fullfilled Status</ListGroup.Item>
          <ListGroup.Item className="order-item-column">Check As Fulfilled</ListGroup.Item>
        </ListGroup>
        {ordersList}
      </div>
      {loading && (
        <div className="loading">
          Fulfilling order...
        </div>
      )}
    </div>
  );
}

export default App;
