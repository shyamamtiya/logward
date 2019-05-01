import React,{useState,useEffect} from 'react';
import './App.css';
import Data from './Data/Data';
import Table from './Components/Table/Table';

function App() {

  const headers=['Version','Status','Progress','Start Date','Release Date','Description','Action']
  const [ data,setData ] = useState(Data);
  const [fields, setFields] = useState([{version_name:'',progress:0,status:'In Progress',start_date:new Date(),release_date:new Date(),description:''}]);
  const [filterValue,setFilterValue]=useState('');

  const addNewRow =(values)=>{
    let fnlData =[...data,...values]
     setData(fnlData);
  }

  const handleDelete =(index)=>{
    let fnlData = data.filter((item,i)=>i!=index);
    setData(fnlData);
  }

  const setFieldData =(data)=>{
    
    setFields(data)
  }
  const filterData = (value) =>{
    console.log(value);
    setData(data);
    setFilterValue(value);
  }

  const setUpdateData =(data) =>{
    let values =[...data]
    setData(values)
  }

  return (
    <div className="App">
        <div className="container"><Table headers={headers} data ={data}  addNewRow={addNewRow} fields={fields} setFieldData={setFieldData} handleDelete ={handleDelete} filterData={filterData} filterValue={filterValue} setUpdateData={setUpdateData}/></div>
    </div>
  );
}

export default App;
