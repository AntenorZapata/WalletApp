import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { tableItems } from '../services/currencyData';
import {
  deletePayment,
  updatePayment,
  archiveExpenseItem,
  authorizeFilter,
} from '../actions/index';
import { IoTrashBin } from 'react-icons/io5';
import { AiFillEdit } from 'react-icons/ai';
import ExpenseItem from '../components/ExpenseItem';
import { IoMdArchive } from 'react-icons/io';

class ExpensesTable extends Component {
  constructor(props) {
    super(props);

    this.handleBtns = this.handleBtns.bind(this);
  }

  handleUpdate = (id) => {
    const { updatePay, handleModal } = this.props;
    updatePay(id, true);
    handleModal();
  };

  handleArchiveItem(id) {
    const { archiveExpenseItem, authorizeFilter, showArchived } = this.props;
    if (showArchived) {
      authorizeFilter(id);
    } else {
      archiveExpenseItem(id);
    }
  }

  handleBtns(id) {
    const { deletePay, showArchived } = this.props;

    return (
      <div className="btns-expense">
        <AiFillEdit
          className="edit-icon"
          onClick={() => {
            !showArchived && this.handleUpdate(id);
          }}
          type="button"
        >
          Edit
        </AiFillEdit>

        <IoTrashBin
          className="delete-icon"
          onClick={() => deletePay(id)}
          type="button"
        >
          delete
        </IoTrashBin>
        <IoMdArchive
          className="archive-icon"
          onClick={() => this.handleArchiveItem(id)}
          type="button"
        >
          delete
        </IoMdArchive>
      </div>
    );
  }

  render() {
    const { expenses, showArchived, archived } = this.props;
    let data = [];
    if (!showArchived) {
      data = expenses;
    } else {
      data = archived;
    }

    return (
      <div>
        {data.length ? (
          <main className="expenses-main">
            <section className="header-table">
              <div>
                {tableItems.map((item, index) => (
                  <p key={index}>{item}</p>
                ))}
              </div>
            </section>
            <section className="section-expenses">
              {data.map((exp) => (
                <div key={exp.id}>
                  <ExpenseItem exp={exp} handleBtns={this.handleBtns} />
                </div>
              ))}
            </section>
          </main>
        ) : (
          ''
        )}
      </div>
    );
  }
}

ExpensesTable.propTypes = {
  deletePay: PropTypes.func.isRequired,
  updatePay: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
  bool: state.wallet.bool,
  archived: state.wallet.archived,
  showArchived: state.wallet.showArchived,
  authFilter: state.wallet.authFilter,
});

const mapDispatchToProps = (dispatch) => ({
  deletePay: (id) => dispatch(deletePayment(id)),
  updatePay: (id, bool) => dispatch(updatePayment(id, bool)),
  archiveExpenseItem: (id) => dispatch(archiveExpenseItem(id)),
  authorizeFilter: (id) => dispatch(authorizeFilter(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesTable);
