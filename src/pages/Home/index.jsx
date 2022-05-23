import React from 'react';
import {Header} from '../../components/Header';
import {UserCard} from '../../components/UserCard';

export class Home extends React.Component {
  render() {
    return (
      <>
        <Header />
        <h1>Login</h1>
        <UserCard />
      </>
    );
  }
}


