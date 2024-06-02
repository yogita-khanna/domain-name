// import express from 'express';
// import { getSave } from '../controller/Dns.js';
const express = require('express');
const Dns = require('../controller/Dns');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); 
const router = express.Router();

router.post('/api/save', Dns.postSave);
router.get('/api/dns', Dns.getDnsRecords);
router.put('/api/dns/:id', Dns.putEditDnsRecord);
router.delete('/api/dns/:id', Dns.deleteDnsRecord);
router.post('/api/uploadCsv', upload.single('file'), Dns.postUploadCsv);
router.get('/api/search', Dns.getSearchDns);

module.exports = router;