import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import moment from 'moment'
import { List, Input, Checkbox, Popconfirm, message, Skeleton, Switch, Avatar } from 'antd';
import 'antd/dist/antd.css';
import { DeleteTwoTone } from '@ant-design/icons';
import './App.css';

function App() {
  const [list, setList] = useState('');
  const [loading, setLoading] = useState(true);
  const { Search } = Input
  // var d = ;
  // console.log()
  useEffect(() => {
    fetchAll()
  }, []);

  const fetchAll = (() => {
    Axios.get("https://radiant-tundra-36373.herokuapp.com/all")
      .then(res => {
        return res.data
      })
      .then(data => {
        let list = Object.entries(data.data)
        setList(list)
        console.log(list)
        setLoading(false)
      })
      .catch(err => {
        console.log(err);
      })
  });

  const confirm = (e) => {
    console.log(e);
    // message.success('Succesfully Deleted');
  }

  const onChange = (e) => {
    if (e.target.checked) {
      message.success('Nice job!', 1);
    }

  }

  return (
    <div className="App">
      {/* <header className="App-header">
    <h1>Welcome! Here is your list</h1>
      </header> */}
      <main>
        <h1>Today, {moment(new Date()).format('D MMMM')}</h1>
        {!loading ?
          <div>
            <List
              size="small"
              dataSource={list}
              renderItem={item =>
                <List.Item actions={[<Popconfirm
                  title="Are you sure delete this task?"
                  onConfirm={confirm}
                  okText="Yes"
                  cancelText="No"
                >
                  <a href="#"><DeleteTwoTone /></a>
                </Popconfirm>]} ><Checkbox onChange={onChange} checked = {item[1] == "TRUE"}>{item[0]}</Checkbox></List.Item>}
            />
          </div>
          : <Skeleton active >
          </Skeleton>}
        <Search
          placeholder="e.g. Finish the star wars saga"
          enterButton="Add Task"
          size="large"
          onSearch={value => console.log(value)}
        />
      </main>
    </div>
  );
}

export default App;
