import React, { Component } from "react";
import "./App.css";
import data from "./currencies.json";
export default class App extends Component {
  constructor() {
    super();
    this.state = {
      ratesNames: Object.keys(data.rates),
      ratesValues: Object.values(data.rates),
      base: data.base,
      classN: "",
    };
  }

  componentDidMount() {
    this.timer();
    this.cleaner();
    setTimeout(() => {
      clearInterval(this.add);
      clearInterval(this.clear);
      clearInterval(this.interval);
      clearTimeout(this.timeout);
      clearTimeout(this.timeout1);
    }, 300000);
  }

  timer = () => {
    this.add = setInterval(() => {
      this.increment();
    }, 5000);
    this.timeout = setTimeout(() => {
      clearInterval(this.add);
    }, 60000);
    this.timeout1 = setTimeout(() => {
      this.interval = setInterval(this.decrement, 5000);
    }, 60000);
  };

  cleaner = () => {
    this.clear = setInterval(() => {
      clearInterval(this.interval);
      this.timer();
    }, 120000);
  };

  increment = () => {
    this.setState((prevState) => {
      return {
        ratesValues: prevState.ratesValues.map((e) => e + 0.0001),
        classN: "green",
      };
    });
  };

  decrement = () => {
    this.setState((prevState) => {
      return {
        ratesValues: prevState.ratesValues.map((e) => e - 0.0001),
        classN: "red",
      };
    });
  };
  render() {
    return (
      <div className="rates">
        <ul>
          {" "}
          {this.state.ratesNames.map((e, index) => (
            <li key={index} className="names">
              {this.state.base}
              {e}
            </li>
          ))}
        </ul>
        <ul>
          {" "}
          {this.state.ratesValues.map((e, index) => (
            <li key={index} className="values">
              <div className={this.state.classN}>
                {e.toFixed(4) < 1.0001 ? 1.0001 : e.toFixed(4)}
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
