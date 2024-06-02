const dnsModel = require('../models/Dns');
const csvParser = require('csv-parser');
const fs = require('fs');
const CsvData = require('../models/Dns');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

module.exports.postSave = async(req, res)=>{
    try {
        const newDnsRecord = new dnsModel(req.body)
        console.log(newDnsRecord)
        await newDnsRecord.save();
        res.status(200).json({message: 'Data saved Successfully'});

    } catch (error) {
        
        res.status(500).json({ error: 'Internal server error' });
      
    }   
}

module.exports.getDnsRecords = async (req, res) => {
    try {
        // Fetch all DNS records from the database
        const dnsRecords = await dnsModel.find();
        // Send the DNS records as a JSON response
        res.status(200).json(dnsRecords);
    } catch (error) {
        console.error("Error fetching DNS records:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports.putEditDnsRecord = async (req, res) => {
    const { id } = req.params;
    const newData = req.body;
  
    try {
      // Find the DNS record by ID and update it with new data
      const updatedRecord = await dnsModel.findByIdAndUpdate(id, newData, { new: true });
      // Send the updated DNS record as a response
      res.status(200).json(updatedRecord);
    } catch (error) {
      console.error("Error editing DNS record:", error);
      res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports.deleteDnsRecord = async (req, res) => {
    const { id } = req.params;

    try {
      // Find the DNS record by ID and delete it
      await dnsModel.findByIdAndDelete(id);
      res.status(200).json({ message: "DNS record deleted successfully" });
    } catch (error) {
      console.error("Error deleting DNS record:", error);
      res.status(500).json({ error: "Internal server error" });
    }
}

module.exports.postUploadCsv = async (req, res) => {
  try {
    const file = req.file;

    const parsedData = [];
    const tableRows = [];
    const values = [];

    fs.createReadStream(file.path)
      .pipe(csvParser())
      .on("data", (row) => {
        parsedData.push(row);
        tableRows.push(Object.keys(row));
        values.push(Object.values(row));

        const newData = new CsvData({
          type: row.type,
          domainname: row.domainname,
          time: row.time,
          // Map other fields from the CSV as needed
        });
        newData.save();
      })
      .on("end", () => {
        res.json({ data: parsedData, tableRows, values });
      });
  } catch (error) {
    console.error("Error uploading CSV file:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports.getSearchDns = async (req, res) => {
  try {
    const query = req.query.q; // Get the search query from the request URL query parameters
    const dnsRecords = await dnsModel.find({ $text: { $search: query } }); // Perform a text search on the DNS records collection
    res.json(dnsRecords);
  } catch (error) {
    console.error('Error searching DNS records:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}