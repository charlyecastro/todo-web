import React, { useState } from 'react';
import { List, Checkbox, Popconfirm, message } from 'antd';
import 'antd/dist/antd.css';
import { DeleteTwoTone } from '@ant-design/icons';
import '../App.css';

function ListItem({ todo, isDone }) {
    const [isChecked, setChecked] = useState(isDone)

    const confirm = (e) => {
        console.log(e);
    }

    const onChange = () => {
        setChecked(!isChecked)
        if (!isChecked) {
            message.success('Nice job!', 1);
        }
    }

    return (
        <List.Item actions={[<Popconfirm title="Delete this task?" onConfirm={confirm}okText="Yes" cancelText="No"> <a href="/#"> <DeleteTwoTone /></a></Popconfirm>]} >
            <Checkbox onChange={onChange} checked={isChecked}>{todo}</Checkbox>
        </List.Item>
    )
}

export default ListItem