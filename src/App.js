import React from 'react';
import './style.css';
import { useEarthoOne } from '@eartho/one-client-react';
import AddIdea from './component/Ideas/AddIdea';
export default function App() {
  const { isLoading, isConnected, error, user, connectWithPopup, logout } =
    useEarthoOne();

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }
  // if (error) {
  //   return <div>Oops... {error.message}</div>;
  // }

  if (isConnected) {
    return (
      <div>
        <div className="header">
          <div className="header-text">Hello, {user.user.displayName}</div>
          <img src={user.user.photoURL} width={50} height={50} />
          <button onClick={() => logout({ returnTo: window.location.origin })}>
            Log out
          </button>
        </div>
        <div className="container-fluid body">
          <AddIdea user={user} />
        </div>
      </div>
    );
  } else {
    return (
      <div className="login">
        <h4>Please login to start adding your content</h4>
        <img
          src="https://media-exp1.licdn.com/dms/image/C560BAQFluX6wXyNFaw/company-logo_100_100/0/1604981764085?e=1671062400&v=beta&t=_cuback8gbjdoq9FCuDsee7Zty47V-Aq3a8X7GqUkO0"
          width="100"
          height="100"
        />
        <div>
          <button
            className="btn btn-outline-success"
            id="login"
            onClick={() =>
              connectWithPopup({ access_id: 'cR4Su0XbBLChL3UnHGHc' })
            }
          >
            Log in
          </button>
        </div>
      </div>
    );
  }
}
