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
    const [updatedValues,setUpdateValues]=[{ version_name: '', progress: 0, status: 'In Progress', start_date: new Date(), release_date: new Date(), description: '' }]
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
        setIndex(index);
    }

    const handleDelete = (index) => {
        props.handleDelete(index);
    }

    const addNewRow = (ev) => {
        console.log('values',values);
        if(values[0].version_name!='' && values[0].description!=''){
            props.addNewRow(values);
            setFieldData([{ version_name: '', progress: 0, status: 'In Progress', start_date: new Date(), release_date: new Date(), description: '' }])
        }
       else{
        
       }
       
    }
    const handleName = (ev,update=false,index=-1) => {
        if(!update){
            values[0].version_name = ev.target.value;
        values[0].progress = 0;
        setFieldData(values)
        }else{
            data[index].version_name = ev.target.value;
            setUpdateData(data);
        }
    }

    const handleStartDate = (ev,update=false,index=-1) => {
        console.log(update)
        if (ev  && !update ) {
            console.log('hanfle start da',update)
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
            setFieldData(values);
            //  setFieldData([{ version_name: '', progress: 0, status: 'In Progress', start_date: new Date(), release_date: new Date(), description: '' }])
        }

    }

    const filterProject =(value) =>{
        props.filterData(value)
    }

    const handleProgress =(ev,update=false,index=-1)=>{
        if(!update){
            values[0].progress = Number(ev.target.value);
            setFieldData(values)
        }else{
            data[index].progress = Number(ev.target.value);
            if(Number(ev.target.value) == 0){
                data[index].status ="In Progress";
            }
            else if(Number(ev.target.value) >=1 && Number(ev.target.value)<99){
                data[index].status ="Unreleased";
            }
            else{
                data[index].status ="Released";
            }
            setUpdateData(data);
        }
    }

    const onSave =(ev)=>{
        console.log('save',data)
        if(data[i].version_name !='' && data[i].description!=''){
            setUpdateData(data);
        }
        
        setIndex(-1)
    } 

    
    return (
        <React.Fragment>
            <div>
                <div>Projects / ENV1.6</div>
                <h1><strong>Releases</strong></h1>
                <div className="float-right"><Search
                    placeholder="input search text"
                    onChange={ev => filterProject(ev.target.value)}
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
                                return itm.description.toLowerCase().includes(filterValue.toLowerCase()) || itm.version_name.toLowerCase().includes(filterValue.toLowerCase()) || itm.status.toLowerCase().includes(filterValue.toLowerCase())}).map((item, index) => {
                                return (
                                    <tr >
                                        <td><input className="version" type="text" value={item.version_name} style={{backgroundColor:i != index?'#fff':'#ebebeb'}} disabled={i != index} onChange={(ev)=>handleName(ev,true,index)} />
                                        {item.version_name == '' ?<p className="text-red">Please enter a version name</p>:<></>}
                                        </td>
                                        <td ><span className="status" style={{ backgroundColor: item.progress >= 1 && item.progress <= 99 ? '#fef6ca' : '#c2ebda' }}>{item.status}</span></td>
                                        <td>{ i!=index ?<div  className="progress"><div className="progress" style={{ width: item.progress + '%', backgroundColor: '#51bc7b' }}></div></div>
                                        :<input type="range" min="0" max="100" onChange={(ev)=>handleProgress(ev,true,index)} />
                                }
                                        </td>
                                        <td><DatePicker value={moment(item.start_date, dateFormat)} format={dateFormat}  onChange={(ev)=>handleStartDate(ev,true,index)} disabled={i != index} /></td>
                                        <td><DatePicker value={moment(item.release_date, dateFormat)} format={dateFormat} onChange={(ev)=>handleEndDate(ev,true,index)} disabled={i != index} /></td>
                                        <td><input className="version" type="text" value={item.description} style={{backgroundColor:i != index?'#fff':'#ebebeb'}} disabled={i != index} onChange={(ev)=>handleDescription(ev,true,index)}/>
                                        {item.description == '' ?<p className="text-red">Please enter a description.</p>:<></>}
                                        </td>
                                        <td> { i!=index ?<Dropdown menu={() => menu(index)}  render={<Icon type="ellipsis"  style={{ fontSize: '30px' }} />} ></Dropdown>
                                        :<Button type="primary" shape="circle" icon="check" size='small' onClick={onSave} />}
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </React.Fragment>
                    <tr>
                        <td colSpan={'3'}  ><input type="text" value={fields[0].version_name} name="version" className="addInput" onChange={handleName} /></td>
                        <td><DatePicker defaultValue={moment('2015/01/01', dateFormat)} format={dateFormat} onChange={(ev)=>handleStartDate(ev,false,-1)} /></td>
                        <td><DatePicker defaultValue={moment('2015/01/01', dateFormat)} format={dateFormat} onChange={(ev)=>handleEndDate(ev,false,-1)} /></td>
                        <td ><input type="text" value={fields[0].description} className="addInput" onChange={(ev) => handleDescription(ev,false,-1)} /></td>
                        <td><Button type="primary" onClick={addNewRow} disabled={fields[0].version_name==''||fields[0].description==''}>Add</Button></td>
                    </tr>
                </tbody>
            </table>
        </React.Fragment>
    );
}
export default Table;