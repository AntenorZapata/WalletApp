import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import PropTypes from 'prop-types';
import { addEmail } from '../actions';
import { FaUser } from 'react-icons/fa';
import { RiLockPasswordFill } from 'react-icons/ri';
import { FaGoogleWallet } from 'react-icons/fa';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleValue = this.handleValue.bind(this);

    this.state = {
      email: '',
      password: '',
      disable: true,
      redirect: false,
    };
  }

  handleEmailVerify() {
    const { email } = this.state;
    const pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (email.match(pattern)) return true;
  }

  handleValue({ target }) {
    const { name } = target;
    this.setState({ [name]: target.value });
    this.handleEmailVerify();
  }

  handleSubmit(e) {
    e.preventDefault();
    const { email } = this.state;
    const { addEmailUser } = this.props;
    addEmailUser(email);
    this.setState({ redirect: true });
  }

  render() {
    const { disable, email, password, redirect } = this.state;
    if (redirect) return <Redirect to="/wallet" />;
    const num = 5;

    return (
      <div className="login-container">
        <FaGoogleWallet className="wallet-icon" />
        <div className="form-container">
          <form onSubmit={this.handleSubmit}>
            <div className="form-email">
              <FaUser className="user-icon" />
              <input
                value={email}
                name="email"
                id="email"
                type="email"
                data-testid="email-input"
                onChange={this.handleValue}
                placeholder="Email"
              />
            </div>
            <div className="form-password">
              <RiLockPasswordFill className="user-icon-password" />
              <input
                value={password}
                name="password"
                id="password"
                type="password"
                data-testid="password-input"
                onChange={this.handleValue}
                placeholder="Senha"
              />
              <p className="forgot-password">Esqueci minha senha</p>
            </div>

            <div className="btn-login">
              <button     disabled={
              password.length <= num || (!this.handleEmailVerify() && disable)
            }type="submit">
                Entrar
              </button>
            </div>
            <p className="sign">Faça seu cadastro</p>
          </form>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  addEmailUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.email,
});

const mapDispatchToProps = (dispatch) => ({
  addEmailUser: (email) => dispatch(addEmail(email)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
