import { useState, useEffect } from 'react';
import './App.css';

function User(props) {
  return <li style={{padding: '8px'}}>{props.name}</li>;
}

const getUsers = async () => {
  //APIアクセス
  const response = await fetch('/api/users');
  const body = response.json();
  return body;

}

function Users() {

  const [users, setUsers] = useState([]);

  const [inputText, setInputText] = useState('');

  const [counter, setCounter] = useState(0);

  useEffect(() => {
    getUsers()
    .then((data) => {
      const users = data.users.map((user) => user.name);
      return users;
    })
    .then((users) => setUsers(users))
    .catch((err) => console.error(err))
  }, [counter]);

  const userList = users.map((user) => {
    return <User key={user} name={user}/>
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const newUsers = [...users, inputText];
    setUsers(newUsers);
    console.log('handle submit:', inputText);
  };

  const handleChange = (event) => {
    setInputText(event.target.value);
  }

  return (
    <div className="App">
      <ul>
        {userList}
      </ul>
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={handleChange}/>
        <button type="submit">追加</button>
      </form>
      <div>入力値: {inputText}</div>
      <button onClick={() => setCounter(counter+1)}>更新</button>
    </div>
  );
}

export default Users;