import React from 'react';
import { CSVLink, CSVDownload } from "react-csv";
import { Button } from 'react-bootstrap'

function CSVexport(props) {
  const ordersInfo = props.data;
  const ordersList = [];
  
  for (let order of props.data) {
    for (let item of order.line_items) {
      ordersList.push([
        order.name,
        order.email,
        `${order.shipping_address.address1}, ${order.shipping_address.city}, ${order.shipping_address.province}, ${order.shipping_address.country_code} ${order.shipping_address.zip}`,
        item.sku,
        item.name,
        item.quantity
      ])
    }
  }

  const data = [
    ["Order #", 'Email Address', 'Shipping Address', 'SKU', 'Product', 'Quantity'],
    ...ordersList,
  ]

  return (
    <div>
      <Button className="export-btn">
        <CSVLink data={data} className="export-link">
          Export order details in CSV
        </CSVLink>
      </Button>
    </div>
  )
}

export default CSVexport;

//a) The Email Address of the Customer
// b) The Shipping Address of the Customer
// c) SKU and Title of the product ordered
