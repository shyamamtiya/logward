import React, { useState } from 'react';
import DatePicker from 'antd/lib/date-picker';  // for js
import { Button, Icon, Menu, Input } from 'antd';
import 'antd/lib/date-picker/style/css';
import moment from 'moment';

import './Table.css';
import Dropdown from '../Dropdown/Dropdown';

const dateFormat = 'DD/MM/YYYY';
const Search = Input.Search;


function Table(props) {
    const [i, setIndex] = useState(-1);
    const { headers, data, fields, setFieldData,filterValue ,setUpdateData} = props;
    const values = [...fields];

    const menu = (index) =>
        <Menu>
            <Menu.Item key="0">
                <span onClick={() => handleEdit(index)} >Edit</span>
            </Menu.Item>
            <Menu.Item key="1">
                <span onClick={() => handleDelete(index)} >Delete</span>
            </Menu.Item>
        </Menu>


    const handleEdit = (index) => {
        setIndex(index)
    }

    const handleDelete = (index) => {
        props.handleDelete(index);
    }

    const addNewRow = (ev) => {
        props.addNewRow(values);
        setFieldData([{ version_name: '', progress: 0, status: 'In Progress', start_date: null, release_date: null, description: '' }])
    }
    const handleName = (ev,update=false,index=-1) => {
        if(!update){
            values[0].version_name = ev.target.value;
        values[0].progress = 0;
        setFieldData(values)
        }else{
            console.log('in upt',ev.target.value)
            data[index].version_name = ev.target.value;
            setUpdateData(data);
        }
    }

    const handleStartDate = (ev,update=false,index=-1) => {
        if (ev  && !update ) {
            values[0].start_date = (ev._d).toLocaleString().substring(0, 10);
            setFieldData(values)
        }
        else if(ev){
            data[index].start_date = (ev._d).toLocaleString().substring(0, 10);
            setUpdateData(data);
        }
       
    }
    const handleEndDate = (ev,update=false,index=-1) => {
        if (ev && !update) {
            values[0].release_date = (ev._d).toLocaleString().substring(0, 10)
            setFieldData(values)
        }else if(ev){
            data[index].release_date = (ev._d).toLocaleString().substring(0, 10)
            setUpdateData(data)
        }
    }

    const handleDescription = (ev,update=false,index=-1) => {
        if(update){
            data[index].description = ev.target.value;
            setUpdateData(data)
        }else{
            values[0].description = ev.target.value;
            setFieldData(values)
        }

    }

    const filterProject =(value) =>{
        props.filterData(value)
    }
    
    return (
        <React.Fragment>
            <div>
                <div>Projects / ENV1.6</div>
                <h1><strong>Releases</strong></h1>
                <div className="float-right"><Search
                    placeholder="input search text"
                    onSearch={value => filterProject(value)}
                    style={{ width: 200 }} /></div>
            </div>
            <table>
                <tbody>
                    <tr>
                        {
                            headers.map((header) => <th className="header">{header}</th>)
                        }
                    </tr>
                    <React.Fragment>
                        {
                            
                            data.filter(itm=>{
                                console.log('filter',itm.description.toLowerCase())
                                return itm.description.toLowerCase().includes(filterValue.toLowerCase())}).map((item, index) => {
                                    debugger;
                                    console.log('item in map',item.description)
                                return (
                                    <tr >
                                        <td><input className="version" type="text" value={item.version_name} disabled={i != index} onChange={(ev)=>handleName(ev,true,index)} /></td>
                                        <td ><span className="status" style={{ backgroundColor: item.progress >= 1 && item.progress <= 99 ? '#fef6ca' : '#c2ebda' }}>{item.status}</span></td>
                                        <td><div style={{ width: '100%' }} className="progress"><div className="progress" style={{ width: item.progress + '%', backgroundColor: '#51bc7b' }}></div></div></td>
                                        <td><DatePicker value={moment(item.start_date, dateFormat)} format={dateFormat}  onChange={(ev)=>handleStartDate(ev,true,index)} /></td>
                                        <td><DatePicker value={moment(item.release_date, dateFormat)} format={dateFormat} onChange={(ev)=>handleEndDate(ev,true,index)}/></td>
                                        <td><input className="version" type="text" value={item.description} disabled={i != index} onChange={(ev)=>handleDescription(ev,true,index)}/></td>
                                        <td><Dropdown menu={() => menu(index)} render={<Icon type="ellipsis" style={{ fontSize: '30px' }} />} ></Dropdown></td>
                                    </tr>
                                )
                            })
                        }
                    </React.Fragment>
                    <tr>
                        <td colSpan={'3'}  ><input type="text" value={fields[0].version_name} name="version" className="addInput" onChange={handleName} /></td>
                        <td><DatePicker defaultValue={moment('2015/01/01', dateFormat)} format={dateFormat} onChange={handleStartDate} /></td>
                        <td><DatePicker defaultValue={moment('2015/01/01', dateFormat)} format={dateFormat} onChange={handleEndDate} /></td>
                        <td ><input type="text" defaultValue={fields[0].description} className="addInput" onChange={(ev) => handleDescription(ev)} /></td>
                        <td><Button type="primary" onClick={addNewRow}>Add</Button></td>
                    </tr>
                </tbody>
            </table>
        </React.Fragment>
    );
}
export default Table;