import React, { useState } from 'react';
import './info.css';

export const Info = ({
  item,
  friendsOfFriends,
  tmp,
  setFriends,
  setFriendsOfFriends,
}) => {
  const [suggestedFriend, setSuggestedFriend] = useState('');

  const friendsShow = id => {
    tmp.forEach(el => {
      if (el.id === +id) {
        setFriends(el);
        el.showFriends = !el.showFriends;
        if (el.showFriends) {
          document.getElementById(el.id).classList.toggle('visible');
          document.getElementById(el.firstName).classList.toggle('visible');
        } else {
          document.getElementById(el.id).classList.toggle('hidden');
          document.getElementById(el.firstName).classList.toggle('hidden');
        }
      }
    });
  };

  const takeFriends = id => {
    console.log(id);
    let name = [];
    id.filter(element => {
      return tmp.map(el => {
        if (element === el.id) {
          name.push(el.firstName);
        }
      });
    });
    console.log(name);
    name = name.join(', ');
    return name;
  };

  const takeFriendsOfFriends = id => {
    let friends = [];
    let name = [];
    id.filter(element => {
      return tmp.map(el => {
        if (element === el.id) {
          friends.push(...el.friends);
        }
      });
    });
    friends.filter(element => {
      return tmp.map(el => {
        if (element === el.id) {
          name.push(el.firstName);
        }
      });
    });

    let allFriends = [...new Set(name)];
    setFriendsOfFriends(allFriends.join(', '));

    let people = [];
    const suggestedFriends = [
      ...new Set(friends.filter((e, i, a) => a.indexOf(e) !== i)),
    ];
    suggestedFriends.filter(element => {
      return tmp.map(el => {
        if (element === el.id) {
          people.push(el.firstName);
        }
      });
    });
    setSuggestedFriend(people.join(', '));

    console.log(allFriends);
    console.log(people);
    console.log(tmp[6].friends);
    console.log(name);
  };

  return (
    <div className="div" key={item.id}>
      <p>
        Name:
        <span>
          {item.firstName} {item.surname}
        </span>
      </p>
      <p>
        Age: <span>{item.age}</span>
      </p>
      <p>
        Gender: <span>{item.gender}</span>
      </p>

      <button
        value={item.id}
        onClick={e => {
          takeFriendsOfFriends(item.friends);
          return +e.currentTarget.value === item.id
            ? friendsShow(e.currentTarget.value)
            : null;
        }}
      >
        Show friends
      </button>
      <p id={item.id} className="hidden">
        {takeFriends(item.friends)}
        <br />
        <span>Friends of friends: </span>
      </p>
      <p id={item.firstName} className="hidden">
        {friendsOfFriends}
      </p>
      <p>
        <span>Suggested Friends:</span>
        <br />
        {suggestedFriend}
      </p>
    </div>
  );
};
