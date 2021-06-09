import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  fetchCurrency,
  fetchCurrencyList,
  updateAuthorized,
} from '../actions/index';
import { paymentArr, tagsArr } from '../services/currencyData';

const initialState = {
  value: '',
  currency: 'USD',
  method: 'Dinheiro',
  tag: 'Aliementação',
  description: '',
};

class FormExpenses extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleValue = this.handleValue.bind(this);

    this.state = {
      ...initialState,
    };
  }

  componentDidMount() {
    const { fetchCurrencies, bool, upDateItemId, expenses } = this.props;
    fetchCurrencies();

    if (bool) {
      const itemExp = expenses.find((item) => item.id === upDateItemId);
      this.setState({ ...itemExp });
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const { fetchCurrData, bool, updateAuth, handleModal } = this.props;

    if (bool) {
      updateAuth(this.state);
    } else {
      fetchCurrData(this.state);
    }
    this.setState({ ...initialState });
    handleModal();
  }

  handleValue({ target }) {
    const { name } = target;
    this.setState({ [name]: target.value });
  }

  handleValueInput() {
    const { value } = this.state;
    return (
      <div className="input-field">
        <label htmlFor="expenses">Valor </label>
        <input
          required
          onChange={this.handleValue}
          name="value"
          id="expenses"
          type="number"
          data-testid="value-input"
          value={value}
        />
      </div>
    );
  }

  handleCurrInput() {
    const { currencies } = this.props;
    return (
      <div className="currency-container">
        <label htmlFor="currency"> Moeda</label>
        <select
          onChange={this.handleValue}
          name="currency"
          id="currency"
          data-testid="currency-input"
        >
          {currencies.map((curr, index) => (
            <option key={index} data-testid={curr}>
              {curr}
            </option>
          ))}
        </select>
      </div>
    );
  }

  handlePaymentValue() {
    return (
      <div className="payment-container">
        <label htmlFor="method">Método de pagamento </label>
        <select
          onChange={this.handleValue}
          name="method"
          id="method"
          data-testid="method-input"
        >
          {paymentArr.map((meth, index) => (
            <option key={index}>{meth}</option>
          ))}
        </select>
      </div>
    );
  }

  handleTagValue() {
    return (
      <div className="tag-container">
        <label htmlFor="tag">Tag </label>
        <select
          onChange={this.handleValue}
          name="tag"
          id="tag"
          data-testid="tag-input"
        >
          {tagsArr.map((tag, index) => (
            <option key={index}>{tag}</option>
          ))}
        </select>
      </div>
    );
  }

  handleDescription() {
    const { description } = this.state;
    return (
      <div className="description-container">
        <label htmlFor="description">Descrição </label>
        <input
          maxLength='16'
          required
          onChange={this.handleValue}
          name="description"
          id="description"
          type="text"
          value={description}
        />
      </div>
    );
  }

  render() {
    const { bool, handleModal } = this.props;
    return (
      <div className="modal-form">
        <form onSubmit={this.handleSubmit}>
          <span className="x-close" onClick={handleModal}>
            x
          </span>
          {this.handleValueInput()}
          {this.handleCurrInput()}
          {this.handlePaymentValue()}
          {this.handleTagValue()}
          {this.handleDescription()}
          <button type="submit">
            {!bool ? 'Adicionar despesa' : 'Editar despesa'}
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
  currencies: state.wallet.currencies,
  bool: state.wallet.bool,
  upDateItemId: state.wallet.upDateItemId,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCurrData: (desc) => dispatch(fetchCurrency(desc)),
  fetchCurrencies: () => dispatch(fetchCurrencyList()),
  updateAuth: (obj) => dispatch(updateAuthorized(obj)),
});

FormExpenses.propTypes = {
  fetchCurrData: PropTypes.func.isRequired,
  fetchCurrencies: PropTypes.func.isRequired,
  bool: PropTypes.bool,
  updateAuth: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(FormExpenses);
