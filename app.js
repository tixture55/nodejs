let app = require('express')();  // 後ろの()超絶大事


var server = require("http").createServer(function(req, res) {
		res.writeHead(200, {"Content-Type":"text/html"});
		var output = fs.readFileSync("./index.html", "utf-8");
		res.end(output);
		}).listen(8081);

var io = require("socket.io").listen(server);

//mysql接続
var mysql      = require('mysql');
var connection = mysql.createConnection({
host     : 'localhost',
user     : 'root',
password : 'xg23y91a',
database : 'data1'
});


//SQL文を書く
var sql = 'SELECT * FROM books';
//プレースホルダに差し込むデータ
var userId = '090-4912-5541';

//接続します
connection.connect();
var callbackData = {};

//プレースホルダー使ってSQL発行
var query = connection.query(sql);
query
//エラー用
.on('error', function(err) {
		console.log('err is: ', err );
		})

//結果用
.on('result', function(rows) {
		callbackData["value"] = rows;
		io.sockets.emit("output_select",callbackData);
		console.log('The res is: ', rows );
		})

//終わったよう～
.on('end', function() {
		console.log('end');
		connection.destroy(); //終了
		});

app.get('/', function(req, res) {
  res.send('testやで。');
});

app.listen(3000);
