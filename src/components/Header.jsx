import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { RiLogoutCircleLine } from 'react-icons/ri';

class Header extends Component {
  handleExpensesSum() {
    const { expenses } = this.props;
    return expenses
      .reduce((total, element) => {
        const { value, currency, exchangeRates } = element;
        const exchange = +exchangeRates[currency].ask;
        const valueSum = +value * exchange;
        return (total += +valueSum);
      }, 0)
      .toFixed(2);
  }

  render() {
    const { email, expenses, showModal, handleSideBar } = this.props;
    return (
      <div>
        <header className="header">
          <nav className="nav-header">
            <div className="email">
              <div className="sidebar-toggle">
                <RiLogoutCircleLine onClick={handleSideBar} />
              </div>
              <p className="email-field">{email}</p>
            </div>

            <div
              className={
                !showModal ? 'total-field' : 'total-field total-field-no-border'
              }
            >
              <p className={expenses.length ? 'value' : 'desatived'}>
                {expenses.length ? this.handleExpensesSum() : '0.0'}
              </p>
              {!showModal && <p className="header-currency-field">BRL</p>}
            </div>
          </nav>
        </header>
      </div>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default connect(mapStateToProps, null)(Header);
