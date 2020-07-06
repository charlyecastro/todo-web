import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import moment from 'moment'
import { List, Input, Skeleton, message, Form, Button } from 'antd';
import ListItem from './components/listItem'
import 'antd/dist/antd.css';
import './App.css';

function App() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [inputValue, setInputValue] = useState(true);
  let formRef = React.createRef();

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

  const addListItem = (values) => {
    let todo = values.todo
    formRef.current.resetFields();
    if (!isBlank(todo)) {
      let updatedList = [...list]
      let item = [todo, "FALSE"]
      updatedList.push(item)
      console.log(updatedList)
      setList(updatedList)
      let body = {}
      body[todo] = false
      postItem(body)
    } else {
      message.error("Can't add an empty task")
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
        <Form
          ref={formRef}
          onFinish={addListItem}
          size={"large"}>
          <div style={{ display: "flex", marginTop: '1rem' }}>
            <Form.Item style={{ flex: 1 }} name="todo">
              <Input placeholder="e.g. Finish the star wars saga" name="todo" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">Add Task</Button>
            </Form.Item>
          </div >
        </Form>
      </main>
    </div>
  );
}

export default App;
