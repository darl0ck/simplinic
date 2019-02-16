import React, { Component } from 'react';
import './App.css';
import TableComponent from './Components/Table';

import { connect } from 'react-redux';

import { fetchArticleDetails } from './libs/redux/redux';

class AppContainer extends Component {


  componentWillMount() {
    this.props.fetchArticleDetails();
  }


  render() {
    let info = JSON.parse(localStorage.getItem('data'));

    return (
      <div className="App">
        {info && <TableComponent data={info} /> }
      </div>
    );
  }
}

const mapStateToProps = ({ data = [] }) => ({
  data,
});

const mapDispatchToProps = {
  fetchArticleDetails,
};

const App = connect(
  mapStateToProps,
  mapDispatchToProps
)(AppContainer);

export default App;
