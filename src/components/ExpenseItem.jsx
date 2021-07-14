import React, { Component } from 'react';

export default class ExpenseItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showBottom: false,
    };
  }

  handleColapse(e) {
    // expand effect based on https://www.w3schools.com/howto/howto_js_collapsible.asp
    const divBottom = e.target.parentElement.nextElementSibling;
    console.log(divBottom);
    if (divBottom.style.maxHeight) {
      divBottom.style.maxHeight = null;
    } else {
      divBottom.style.maxHeight = divBottom.scrollHeight + 'px';
    }
  }

  render() {
    const { exp, handleBtns } = this.props;
    const { id, description, tag, method, value, currency, exchangeRates } =
      exp;

    const exchange = +exchangeRates[currency].ask;
    return (
      <div>
        <div role="row" key={id} className="expense-content">
          <div className="expense-title">
            <p className="description">{description}</p>
            <p className="tag">{tag}</p>
          </div>
          <div className="expense-value">
            <p>{`R$ ${value},00`}</p>
          </div>
          <div className="method-currency">
            <p>Pago com: {method}</p>
            <button className="expand-icon" onClick={this.handleColapse}>
              +
            </button>
          </div>
          <div className="bottom-content-on">
            <p>Moeda: {exchangeRates[currency].name.split('/', 1)}</p>
            <div className="currency-total-value">
              <p>Câmbio {exchange.toFixed(2)}</p>
              <p>Total {(+value * exchange).toFixed(2)}</p>
            </div>
            <div>{handleBtns(id)}</div>
          </div>
        </div>
      </div>
    );
  }
}
