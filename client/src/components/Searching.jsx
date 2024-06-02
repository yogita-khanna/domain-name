import React, { useState } from "react";
import Papa from "papaparse";
import axios from "axios";
import LeftSidebar from "./LeftSidebar";

const Searching = () => {
  const [parsedData, setParsedData] = useState([]);
  const [tableRows, setTableRows] = useState([]);
  const [values, setValues] = useState([]);
  const [data, setFormData] = useState([]);

  const divStyle = {
    display: 'flex',
    justifyContent:'center'
  };

  const hello = async () => {
    const response = await axios.post(
      "http://localhost:4545/api/uploadCsv",
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log(response.data);
    setParsedData(response.data.data);
    setTableRows(response.data.tableRows);
    setValues(response.data.values);
  };

  const changeHandler = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    setFormData(formData);

    // try {

    //   // console.log(response.data);

    // } catch (error) {
    //   console.error("Error uploading file:", error);
    // }
  };

  return (
    <div className="flex">
      <div className="w-[25%]">
      <LeftSidebar/>
      </div>

      <div className="w-[75%] ml-[25%] fixed left-0 top-0 h-full">
      <input
        type="file"
        name="file"
        onChange={changeHandler}
        accept=".csv"
        style={{ display: "block", margin: "10px auto" }}
      />
      <div style={divStyle} className="">
      <button
        onClick={hello}
        className="justify-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        Push Data
      </button>
      </div>
      <br />
      <br />
      <table className="table-fixed w-full border-collapse">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-4 py-2 border">Type</th>
            <th className="px-4 py-2 border">Domain Name</th>
            <th className="px-4 py-2 border">Time</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {values.map((value, index) => (
            <tr key={index} className={index % 2 === 0 ? "bg-gray-100" : ""}>
              {value.map((val, i) => (
                <td key={i} className="px-4 py-2 border">
                  {val}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      </div>
    </div>
  );
};

export default Searching;
