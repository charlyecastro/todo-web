import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import moment from 'moment'
import { List, Input, Skeleton, message } from 'antd';
import ListItem from './components/listItem'
import 'antd/dist/antd.css';
import './App.css';

function App() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [inputValue, setInputValue] = useState(true);
  const { Search } = Input

  useEffect(() => {
    fetchAll()
  }, []);

  const fetchAll = () => {
    Axios.get(`${process.env.REACT_APP_BASE_URL}/all`)
      .then(res => {
        return res.data
      })
      .then(data => {
        let list = Object.entries(data.data)
        setList(list)
        setLoading(false)
      })
      .catch(err => {
        console.log(err);
      })
  };

  const removeListItem = (todo) => {
    // const updatedList = list.filter(item => item[0] !== todo)
    // console.log(updatedList)
    // setList(updatedList)
    window.location.reload(false);
  }

  const postItem = (body) => {
    Axios.post(`${process.env.REACT_APP_BASE_URL}/data`,
      body,
      { 'headers': { 'Content-Type': 'application/json' } })
      .then(res => {
        return res.data
      })
      .then(data => {
        console.log(data)
        
      })
      .catch(err => {
        console.log(err);
      })
  }

  const addListItem = (todo) => {
    if (!isBlank(todo)) {
      let updatedList = [...list]
      let item = [todo, "FALSE"]
      updatedList.push(item)
      console.log(updatedList)
      setList(updatedList)
      let body = {}
      body[todo.trim()] = false
      postItem(body)
    } else {
      message.error("Can not add empty todo")
    }
  }

  const isBlank = (str) => {
    return (!str || /^\s*$/.test(str));
  }

  return (
    <div className="App">
      <main>
        <h1 style={{ width: '100%', textAlign: "left" }}>Today, {moment(new Date()).format('D MMMM')}</h1>
        {!loading ?
          <div>
            <List
              size="small"
              dataSource={list}
              renderItem={item =>
                <ListItem todo={item[0]} isDone={item[1] === "TRUE"} removeListItem={removeListItem} />}
            />
          </div>
          : <Skeleton active >
          </Skeleton>}
        <Search
          placeholder="e.g. Finish the star wars saga"
          enterButton="Add Task"
          size="large"
          onSearch={value => {
            addListItem(value)
          }}
        />
      </main>
    </div>
  );
}

export default App;
