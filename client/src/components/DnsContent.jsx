import React, { useState, useEffect } from "react";
import axios from "axios";
import DnsEdit from "./DnsContent/DnsEdit"; // Import the DnsEdit component

const DnsContent = () => {
  const [dnsRecord, setDnsRecord] = useState({
    type: "",
    domainname: "",
    time: "",
  });

  const [dnsRecords, setDnsRecords] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // State variable for search query
  const [isEditing, setIsEditing] = useState(false); // State variable to track if edit form is open
  const [recordToEdit, setRecordToEdit] = useState(null); // State variable to store the record being edited

  const handleClick = async () => {
    try {
      // Send a POST request to the backend API with the DNS record data
      await axios.post("http://localhost:4545/api/save", dnsRecord);
      // Reset the DNS record state
      setDnsRecord({
        type: "",
        domainname: "",
        time: "",
      });
      // Fetch updated DNS records after adding a new record
      fetchDnsRecords();
      // Display a success message or perform any other actions
      alert("DNS record saved successfully");
    } catch (error) {
      // Display an error message if the request fails
      console.error("Error saving DNS record:", error);
      alert("Error saving DNS record");
    }
  };

  useEffect(() => {
    // Fetch DNS records from the backend API when the component mounts
    fetchDnsRecords();
  }, []);

  const fetchDnsRecords = async () => {
    try {
      // Fetch DNS records from the backend API
      const response = await axios.get("http://localhost:4545/api/dns");
      console.log(response);
      // Update the dnsRecords state with the fetched records
      setDnsRecords(response.data);
    } catch (error) {
      console.error("Error fetching DNS records:", error);
    }
  };

  const handleChange = (e) => {
    // Update the DNS record state as the user types in the input fields
    setDnsRecord({ ...dnsRecord, [e.target.name]: e.target.value });
  };

  const handleEdit = (record) => {
    // Set the record to be edited and open the edit form
    setRecordToEdit(record);
    setIsEditing(true);
  };

  const handleCloseEdit = () => {
    // Close the edit form
    setIsEditing(false);
    // Clear the record being edited
    setRecordToEdit(null);
  };

  const handleDelete = async (recordId) => {
    try {
      await axios.delete(`http://localhost:4545/api/dns/${recordId}`);
      // If deletion is successful, fetch updated DNS records
      fetchDnsRecords();
      // Provide feedback to the user about the success of the delete operation
      alert('DNS record deleted successfully');
    } catch (error) {
      console.error('Error deleting DNS record:', error);
      alert('Error deleting DNS record');
    }
  };

  const handleSearch = () => {
    // Filter DNS records based on the search query
    const filtered = dnsRecords.filter((record) => {
      // Customize this logic based on your search criteria
      return (
        record.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
        record.domainname.toLowerCase().includes(searchQuery.toLowerCase()) ||
        record.time.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
    setDnsRecords(filtered);
  };

  return (
    <div className="w-[100%] mx-10 bg-slate-100">
      <div className="w-full font-semibold mt-10 text-[35px] text-gray-700 items-center justify-center">DNS Records List</div>
      <div className="">
        {/* Search input and button */}
        <div className="w-[70%]">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search DNS records via Domain Name or Type"
          className="border m-3 w-[70%] p-3 rounded border border-black"
        />
        <button onClick={handleSearch} className="px-5 py-3 rounded text-slate-200 m-3 bg-gray-500">
          Search
        </button>
        </div>
        {/* Form for adding DNS records */}
        <select
          className="my-10 rounded p-1 border border-black"
          name="type"
          value={dnsRecord.type}
          onChange={handleChange}
          placeholder=" Type "
          id="cars"
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
        <input
          className="m-3 w-[45%] p-1 rounded border border-black"
          name="domainname"
          onChange={handleChange}
          type="text"
          placeholder=" Domain Name "
        />

        <select
          className="m-3 rounded p-1 border border-black"
          name="time"
          value={dnsRecord.time}
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

        <button
          onClick={handleClick}
          className="px-4 text-slate-200 m-3 bg-gray-500 p-2 rounded"
        >
          Add a DNS Record
        </button>

        {/* List of DNS records */}
        <ul>
          {dnsRecords.map((record) => (
            <li key={record._id} className="flex rounded bg-slate-300 m-4 border">
              <div className="m-3 text-lg font-semibold">Type: <span className="font-normal text-base p-1">{record.type}</span></div> 
              <div className="m-3 text-lg font-semibold">Domain Name: <span className="font-normal text-base p-1">{record.domainname}</span></div> 
              <div className="m-3 text-lg font-semibold">TTL:{" "} <span className="font-normal text-base p-1">{record.time} hour</span></div>
              <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 m-3" onClick={() => handleEdit(record)}>Edit</button>
              <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 m-3" onClick={() => handleDelete(record._id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
      {/* Conditionally render the DnsEdit component if isEditing state is true */}
      {isEditing && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
          <DnsEdit fetchDnsRecords={fetchDnsRecords}  record={recordToEdit} onClose={handleCloseEdit} />
        </div>
      )}
    </div>
  );
};

export default DnsContent;
