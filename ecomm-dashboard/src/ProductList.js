import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import Header from "./Header";
import { Link } from 'react-router-dom'

function ProductList() {

  async function getData()
  {
    let result = await fetch("http://localhost:8000/api/list");
    result = await result.json();
    setData(result);
  }
  const [data, setData] = useState([]);
  useEffect( () => {
    getData();
  }, []);
  async function deleteOperation(id)
  {
    fetch("http://localhost:8000/api/delete/"+id,{
      method:'DELETE'
    });
    result=await result.json();
    console.warn(result)
    getData();
  }
  return (
    <div>
      <Header />
      <div className="col-sm-8 offset-sm-2">
        <h1>Product List</h1>
        <Table>
          <tr>
            <td>ID</td>
            <td>Name</td>
            <td>Price</td>
            <td>Description</td>
            <td>Image</td>
            <td>Operations</td>
          </tr>
          {data.map((item) => (
            <tr>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.price}</td>
              <td>{item.description}</td>
              <td>
                <img
                  width="50px"
                  src={"http://localhost:8000/" + item.file_path}
                />
              </td>
              <td><span onClick={()=>deleteOperation(item.id)} className="delete">Delete</span></td>
              <td>
                <Link to={"update/"+item.id}><span className="update">Update</span></Link>
                </td>
            </tr>
          ))}
        </Table>
      </div>
    </div>
  );
}
export default ProductList;
