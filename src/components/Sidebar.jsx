import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Sidebar extends Component {
  render() {
    return (
      <div className="sidebar">
        <div className="btn-logout-container">
          <Link to="/">
            <button className="btn-logout">Sair</button>
          </Link>
        </div>
      </div>
    );
  }
}
