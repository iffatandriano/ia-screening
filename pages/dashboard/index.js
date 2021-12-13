import {Component} from 'react';
import Router from 'next/router';

export default class dashboard extends Component {
  componentDidMount() {
    Router.push('/dashboard/order');
  }

  render() {
    return <div />;
  }
}