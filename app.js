// 1.モジュールオブジェクトの初期化
var s = require("fs");
var server = require("http").createServer(function(req, res) {
		res.writeHead(200, {"Content-Type":"text/html"});
		var output = fs.readFileSync("./index.html", "utf-8");
		res.end(output);
		}).listen(8081);
var io = require("socket.io").listen(server);
//mysql接続
var mysql      = require('mysql');
var connection = mysql.createConnection({
host     : 'ocalhost',
user     : 'root',
password : 'xg23y91a',
database : 'data1'
});

//SQL文を書く
var sql = 'SELECT * FROM books;';
//プレースホルダに差し込むデータ
var userId = '090-9899-3423';


// ユーザ管理ハッシュ
var userHash = {};

// 2.イベントの定義
io.sockets.on("connection", function (socket) {

		// 接続開始カスタムイベント(接続元ユーザを保存し、他ユーザへ通知)
		socket.on("connected", function (name) {
				var msg = name + "が入室しました";
				userHash[socket.id] = name;
				io.sockets.emit("publish", {value: msg});
				});

		// メッセージ送信カスタムイベント
		socket.on("publish", function (data) {
				io.sockets.emit("publish", {value:data.value});
				});

		// mysqlのselect結果出力

		socket.on("output_select", function () {

				//接続します
				connection.connect();

				//プレースホルダー使ってSQL発行
				var query = connection.query(sql);
				query
				//エラー用
				.on('error', function(err) {
						console.log('err is: ', err );
						})  

				//結果用
				.on('result', function(rows) {
						console.log('The res is: ', rows );
						})

				//終わったよう～
				.on('end', function() {
						console.log('end');
						connection.destroy(); //終了
						});

				var myrows = rows;
				console.log('qqqqq');
				console.log(myrows);
				io.sockets.emit("output_select", {value:myrows});
		});


		// 接続終了組み込みイベント(接続元ユーザを削除し、他ユーザへ通知)
		socket.on("disconnect", function () {
				if (userHash[socket.id]) {
				var msg = userHash[socket.id] + "が退出しました";
				delete userHash[socket.id];
				io.sockets.emit("publish", {value: msg});
				}
				});
});
