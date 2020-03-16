const express=require('express');
const mysql=require('mysql');
const crypto = require('crypto');
//const mariadb = require('mariadb');
// const pool = mariadb.createPool({
//     host: 'localhost',
//     user:'root',
//     password: '',
//    database: "LIGHTNING_TEAM",
//     connectionLimit: 5
// });

const app=express();

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  port : "3306",
  database: "LIGHTNING_TEAM"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected to MariaDB!");
});

app.set('port',25612);
app.listen(app.get('port'), function(){
	console.log('Listening on : ', app.get('port'));
				      });

//  Format => "name;[{data}]" http://165.227.204.184:25612/nagios/movistar;123456

//receive post request from nagios api (PHP)
app.post('/nagios/:nagios', function(req,res){
  console.log(req.params.nagios);
  res.send(req.params);
  let pst= req.params;
  i=pst.nagios.split(';');
  let name=i[0];
  let data=JSON.stringify(i[1]);
  //var key = crypto.createCipher('aes-128-cbc', 'mypassword');
  //var str = key.update(data, 'utf8', 'hex')
  //str += key.final('hex');
  //console.log(str);
  //data=str;
  console.log("Name => ", name);
  console.log("Data => ", data);
  let sql="INSERT INTO TASKS(SEQ, MONITOR, CLIENT_NAME, DATA_STREAM, TIME_EVENT) VALUES(0, 'nagios', '" + name + "', '" + data + "', NOW());";
  console.log("SQL => ", sql);
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });
  //con.query("INSERT INTO TASKS(SEQ, MONITOR, CLIENT_NAME, DATA_STREAM, TIME_EVENT) VALUES(0, 'nagios', ",name,", ", data, ", NOW());");
});

//receive post request from zabbix api (PYTHON)
app.post('/zabbix/:zabbix', async function(req,res){
  console.log(req.params.zabbix);
  res.send(req.params.zabbix);
  let pst= req.params;
  i=pst.zabbix.split(';');
  let name=i[0];
  let data=JSON.stringify(i[1]);
  console.log("Name => ", name);
  console.log("Data => ", data);
  let sql="INSERT INTO TASKS(SEQ, MONITOR, CLIENT_NAME, DATA_STREAM, TIME_EVENT) VALUES(0, 'nagios', '" + name + "', '" + data + "', NOW());";
  console.log("SQL => ", sql);
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });
  //await con.query("INSERT INTO TASKS(SEQ, MONITOR, CLIENT_NAME, DATA_STREAM, TIME_EVENT) VALUES(0, 'zabbix', ",name,", ", data, ", NOW());");
});

//receive post request from splunk api (PYTHON)
app.post('/splunk/:splunk', async function(req,res){
  console.log(req.params.splunk);
  res.send(req.params);
  let pst= req.params;
  i=pst.splunk.split(';');
  let name=i[0];
  let data=JSON.stringify(i[1]);
  console.log("Name => ", name);
  console.log("Data => ", data);
  let sql="INSERT INTO TASKS(SEQ, MONITOR, CLIENT_NAME, DATA_STREAM, TIME_EVENT) VALUES(0, 'nagios', '" + name + "', '" + data + "', NOW());";
  console.log("SQL => ", sql);
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });
  //await con.query("INSERT INTO TASKS(SEQ, MONITOR, CLIENT_NAME, DATA_STREAM, TIME_EVENT) VALUES(0, 'splunk', ",name,", ", data, ", NOW());");
});

//receive post request from zendesk api (PYTHON)
app.post('/zendesk/:zendesk', async function(req,res){
  console.log(req.params.zendesk);
  res.send(req.params);
  let pst= req.params;
  i=pst.zendesk.split(';');
  let name=i[0];
  let data=JSON.stringify(i[1]);
  console.log("Name => ", name);
  console.log("Data => ", data);
  let sql="INSERT INTO TASKS(SEQ, MONITOR, CLIENT_NAME, DATA_STREAM, TIME_EVENT) VALUES(0, 'nagios', '" + name + "', '" + data + "', NOW());";
  console.log("SQL => ", sql);
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });
  //await con.query("INSERT INTO TASKS(SEQ, MONITOR, CLIENT_NAME, DATA_STREAM, TIME_EVENT) VALUES(0, 'zendesk', ",name,", ", data, ", NOW());");
});

