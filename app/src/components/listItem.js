import React, { useState } from 'react';
import { List, Checkbox, Popconfirm, message, Spin } from 'antd';
import 'antd/dist/antd.css';
import { DeleteTwoTone } from '@ant-design/icons';
import '../App.css';
import Axios from 'axios';


function ListItem({ todo, isDone, removeListItem }) {
    const [isChecked, setChecked] = useState(isDone)
    const [isDeleting, setIsDeleting] = useState(false)
    
    const confirm = (e) => {
        onDelete()
    }

    const onChange = () => {
        setChecked(!isChecked)
        let body = {}
        body[todo] = !isChecked
        if (!isChecked) {
            message.success('Nice job!', 1);
        }
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

    const onDelete = () => {
        setIsDeleting(true)
        Axios.delete(`${process.env.REACT_APP_BASE_URL}/data/${todo}`)
            .then(res => {
                return res.data
            })
            .then(data => {
                console.log(data)
                removeListItem(todo);
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <List.Item actions={[<Popconfirm title="Delete this task?" onConfirm={confirm} okText="Yes" cancelText="No"> <a href="/#"> {isDeleting ? <Spin size = {"small"}/> : <DeleteTwoTone />}</a></Popconfirm>]} >
            <Checkbox onChange={onChange} checked={isChecked}>
                {todo}
            </Checkbox>
        </List.Item>
    )
}

export default ListItem