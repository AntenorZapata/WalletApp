import React from 'react';
import { connect } from 'react-redux';
import FormExpenses from '../components/FormExpenses';
import Header from '../components/Header';
import ExpensesTable from '../components/ExpensesTable';
import { MdAttachMoney } from 'react-icons/md';
import Sidebar from '../components/Sidebar';
import { showArchived } from '../actions/index';
import { GiReceiveMoney } from 'react-icons/gi';

class Wallet extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.mySideBarRef = React.createRef();

    this.handleModal = this.handleModal.bind(this);
    this.handleSideBar = this.handleSideBar.bind(this);

    this.state = {
      showModal: false,
      showSideBar: false,
    };
  }

  modalFunc = (e) => {
    if (!this.myRef.current.contains(e.target)) {
      this.setState({ showModal: false });
    }
  };

  sideBarFunc = (e) => {
    if (!this.mySideBarRef.current.contains(e.target)) {
      this.setState({ showSideBar: false });
    }
  };

  onScroll = () => {
    this.setState({ showSideBar: false });
  };

  componentDidUpdate() {
    const { showModal, showSideBar } = this.state;
    window.onscroll = () => {
      this.setState({ showSideBar: false });
    };
    if (showModal) {
      document.addEventListener('mousedown', this.modalFunc);
    }
    if (showSideBar) {
      document.addEventListener('mousedown', this.sideBarFunc);
    }
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.modalFunc);
    document.removeEventListener('mousedown', this.sideBarFunc);
  }

  handleModal() {
    const { showModal } = this.state;
    this.setState({ showModal: !showModal });
  }

  handleSideBar() {
    const { showSideBar } = this.state;
    this.setState({ showSideBar: !showSideBar });
  }

  render() {
    const { showModal, showSideBar } = this.state;
    const { showArch, expenses, archived, showArchived } = this.props;
    return (
      <div className="wallet-content">
        <div className="sidebarref" ref={this.mySideBarRef}>
          {showSideBar && (
            <div>
              <Sidebar />
            </div>
          )}
        </div>
        <Header handleSideBar={this.handleSideBar} showModal={showModal} />
        <div className="showmodal" ref={this.myRef}>
          {showModal && (
            <div>
              <FormExpenses handleModal={this.handleModal} />
            </div>
          )}
        </div>
        <div className="header-expense">
          <span
            className={showModal ? 'show-expense' : !showArchived && 'active'}
            onClick={() => showArch(false)}
          >
            Ativas
          </span>
          <span
            className={showModal ? 'show-expense' : showArchived && 'active'}
            onClick={() => showArch(true)}
          >
            Arquivo
          </span>
        </div>

        <div className={showModal ? 'show-expense' : ''}>
          {expenses.length || archived.length ? (
            <ExpensesTable handleModal={this.handleModal} />
          ) : (
            <div className="empty-wallet">
              <p>Adicione suas despesas</p>
              <GiReceiveMoney className="hand-icon" />
            </div>
          )}
        </div>

        <div className="new-expense">
          {!showModal && (
            <MdAttachMoney
              className={'money-icon'}
              onClick={this.handleModal}
            />
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
  archived: state.wallet.archived,
  showArchived: state.wallet.showArchived,
});

const mapDispatchToProps = (dispatch) => ({
  showArch: (bool) => dispatch(showArchived(bool)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
