import React from "react";

import OrderBook from "./Components/OrderBook";
import OrderForm from "./Components/OrderForm";
import Graph from "./Components/Graph";
import TickerFeed from "./Components/TickerFeed";
import SessionHistory from "./Components/SessionHistory";

import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const SERVICE_URL = "http://localhost:8080/api";

class App extends React.Component {
  state = {
    buyOrders: [],
    sellOrders: [],
    stocks: [],
    users: [],
    newOrderData: {
      side: [],
      symbol: [],
      owner: [],
      quantity: 0,
      price: 0,
    },
    graphData: {
      interval: 5,
      count: 10,
    },
    trades: [],
  };

  componentDidMount() {
    console.log("App is now mounted. ");
    this.loadOrderData();
    this.loadFormData();
  }

  handleGraphDataChange = (event) => {
    let inputName = event.target.name;
    let inputValue = event.target.value;
    let newGraphData = this.state.graphData;

    if (newGraphData.hasOwnProperty(inputName)) {
      newGraphData[inputName] = inputValue;
      this.setState({ graphData: newGraphData });
    }
  };

  handleGraphDataSubmit = (event) => {
    console.log("Loading trade data");

    fetch(SERVICE_URL + "/interval/10/5")
      .then((data) => data.json())
      //.then((data) => console.log(data.json()))
      .then((data) => this.setState({ trades: data }))
      .catch((error) => {
        console.log("error:", error);
      });
  };

  handleAddFormChange = (name, event) => {
    console.log(event);
    let inputName = name;
    let inputValue = event.value;
    let label = event.label;
    let orderData = this.state.newOrderData;
    console.log(orderData);

    console.log(`Updating new Order data: ${inputName} : ${inputValue}`);
    console.log(`name: ${inputName}`);

    if (orderData.hasOwnProperty(inputName)) {
      console.log("this condition is met");
      orderData[inputName] = { label, inputValue };
      console.log(orderData[inputName]);
      this.setState({ newOrderData: orderData });
      console.log(this.state.newOrderData);
    }
  };

  // handleCancelOrder = (event) => {
  //   if (event) event.preventDefault();
  //   let orderId = event.target.value;

  //   console.log(`Submitting cancel for order id ${orderId} `)

  //   fetch(SERVICE_URL + '/order'),{
  //     method : 'DELETE',
  //   }
  // }

  handleChangeNumber = (event) => {
    let inputName = event.target.name;
    let inputValue = event.target.value;

    let orderData = this.state.newOrderData;

    if (orderData.hasOwnProperty(inputName)) {
      orderData[inputName] = inputValue;
      this.setState({ newOrderData: orderData });
    }
  };

  handleOrderFormSubmit = (event) => {
    let newOrder = {
      price: this.state.newOrderData.price,
      order_size: this.state.newOrderData.quantity,
      number_matched: 0,
      side: this.state.newOrderData.side.inputValue,
      status: "ACTIVE",
      usr_id: this.state.newOrderData.owner.inputValue,
      stock_id: this.state.newOrderData.symbol.inputValue,
    };

    console.log(newOrder);
    console.log("Adding order");
    if (event) event.preventDefault();

    fetch(SERVICE_URL + "/order/", {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify(newOrder),
    })
      .then((respose) => respose.json)
      .then((data) => {
        console.log("add Order -Success", data);
        this.setState({
          newOrderData: {
            side: [],
            symbol: [],
            owner: [],
            quantity: 0,
            price: 0,
          },
        });
        this.loadOrderData();
      })
      .catch((error) => {
        console.log("Add Order - Error:");
        console.log(error);
      });
  };

  loadOrderData() {
    console.log("Loading order Data data");
    fetch(SERVICE_URL + "/buyOrders")
      .then((data) => data.json())
      .then((data) => this.setState({ buyOrders: data }))
      .catch((error) => {
        console.log("error:", error);
      });
    fetch(SERVICE_URL + "/sellOrders")
      .then((data) => data.json())
      .then((data) => this.setState({ sellOrders: data}))
      .catch((error) => {
        console.log("error:", error);
      });
    this.handleGraphDataSubmit();
  }

  loadFormData(){
    console.log("Loading Stock data");
    fetch(SERVICE_URL + "/stocks")
      .then((data) => data.json())
      .then((data) => this.setState({ stocks: data }))
      .catch((error) => {
        console.log("error:", error);
      });
      console.log("Loading user data");
    fetch(SERVICE_URL + "/users")
      .then((data) => data.json())
      .then((data) => this.setState({ users: data }))
      .catch((error) => {
        console.log("error:", error);
      });
  }

  // handleCancelOrder = (event) => {
  //   if (event) event.preventDefault();
  //   let orderId = event.target.value;

  //   console.log(`sumbitting delete for order id ${orderId}`)

  //   fetch(SERVICE_URL+)
  // }

  render() {
    return (
      <Container fluid>
        <Row>
          <TickerFeed />
        </Row>
        <Row>
          <Col>
            <h1 className="text-center">Order Book</h1>
          </Col>
        </Row>
        <Row>
          <OrderBook
            sellOrders={this.state.sellOrders}
            buyOrders={this.state.buyOrders}
          />
        </Row>
        <Row>
          <Col>
            <Graph
              graphData={this.state.graphData}
              trades={this.state.trades}
              handleGraphDataChange={this.handleGraphDataChange}
              handleGraphDataSubmit={this.handleGraphDataSubmit}
            />
          </Col>
          <Col>
            <OrderForm
              handleChangeNumber={this.handleChangeNumber}
              handleChange={this.handleAddFormChange}
              handleOrderFormSubmit={this.handleOrderFormSubmit}
              orderData={this.state.newOrderData}
              stocks={this.state.stocks}
              users={this.state.users}
            />
          </Col>
          <Col>
          </Col>
        </Row>
      </Container>
    );
  }
}
export default App;
