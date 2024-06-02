import React, { useState } from "react";
import axios from "axios";

const DnsEdit = ({ record, onClose, fetchDnsRecords }) => {
  const [editedRecord, setEditedRecord] = useState({ ...record });

  const handleChange = (e) => {
    // Update the edited record state as the user types in the input fields
    setEditedRecord({ ...editedRecord, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      // Send edit request to the backend API
      console.log(editedRecord);
      const response = await axios.put(
        `http://localhost:4545/api/dns/${editedRecord._id}`,
        editedRecord
      );
    

      // Provide feedback to the user about the success of the edit operation
      alert("DNS record edited successfully");
      // Close the edit form
      onClose();

      fetchDnsRecords();
    } catch (error) {
      console.error("Error editing DNS record:", error);
      alert("Error editing DNS record");
    }
  };

  const handleCancel = () => {
    // Close the edit form without updating the record
    onClose();
    
  };

  return (
    <div className="rounded bg-blue-800 p-5 m-2 ">
      <h2 className="text-xl font-bold my-4 text-white">Edit DNS Record</h2>
      <label className="p-1 font-semibold text-lg text-white justify-evenly">Type:</label>
      <select
          className="border p-1 rounded m-3 bg-slate-200"
          name="type"
          value={editedRecord.type}
          onChange={handleChange}
          placeholder=" Type "
          id=""
        >
          <option value="A">A</option>
          <option value="AAAA">AAAA</option>
          <option value="CNAME">CNAME</option>
          <option value="MX">MX</option>
          <option value="NS">NS</option>
          <option value="PTR">PTR</option>
          <option value="SOA">SOA</option>
          <option value="SRV">SRV</option>
          <option value="TXT">TXT</option>
          <option value="DNSSEC">DNSSEC</option>
        </select>


      <label className="p-1 font-semibold text-white text-lg">Domain Name:</label>
      <input
        className="p-1 rounded m-3 bg-slate-200"
        type="text"
        name="domainname"
        placeholder=" Domain Name "
        value={editedRecord.domainname}
        onChange={handleChange}
      />


      <label className="p-1 font-semibold text-white text-lg">Time:</label>
      <select
          className="border p-1 rounded m-3 bg-slate-200"
          name="time"
          value={editedRecord.time}
          onChange={handleChange}
          placeholder=" TTL (Time)"
          id="cars"
        >
          <option value="1">1 hr</option>
          <option value="2">2 hr</option>
          <option value="3">3 hr</option>
          <option value="4">4 hr</option>
          <option value="5">5 hr</option>
          <option value="6">6 hr</option>
        </select>


      <div>
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 m-3" onClick={handleUpdate}>Update</button>
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 m-3" onClick={handleCancel}>Cancel</button>
      </div>
    </div>
  );
};

export default DnsEdit;
