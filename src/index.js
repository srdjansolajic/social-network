import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import data from './data.json';
import { Info } from './components/Info';

const App = () => {
  const [friends, setFriends] = useState([]);
  const [friendsOfFriends, setFriendsOfFriends] = useState('');

  let tmp = data.map(el => {
    return {
      ...el,
      showFriends: false,
    };
  });

  return (
    <>
      {tmp.map(el => (
        <Info
          key={el.id}
          item={el}
          tmp={tmp}
          setFriends={setFriends}
          friendsOfFriends={friendsOfFriends}
          setFriendsOfFriends={setFriendsOfFriends}
        />
      ))}
    </>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
