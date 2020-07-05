import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import moment from 'moment'
import { List, Input, Skeleton} from 'antd';
import ListItem from './components/listItem'
import 'antd/dist/antd.css';
import './App.css';

function App() {
  const [list, setList] = useState('');
  const [loading, setLoading] = useState(true);
  const { Search } = Input

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
        setLoading(false)
      })
      .catch(err => {
        console.log(err);
      })
  });

  return (
    <div className="App">
      <main>
        <h1>Today, {moment(new Date()).format('D MMMM')}</h1>
        {!loading ?
          <div>
            <List
              size="small"
              dataSource={list}
              renderItem={item =>
                <ListItem todo={item[0]} isDone={item[1] === "TRUE"} />}
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
