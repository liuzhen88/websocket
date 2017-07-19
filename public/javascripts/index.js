(function () {
    var app = {
        init:function(){
            var socket = io.connect('http://localhost:3000');
            this.initEvent(socket);
        },
        initEvent:function (socket) {
            var btn = document.getElementById('btn');
            btn.onclick = function () {
                //向服务器端推送消息
                socket.emit('msg',{test:'hello world'});
            }
            socket.on('sendMsgToClient',function (data) {
               var serverMsg = document.getElementById('server');
                serverMsg.innerHTML = data.msg;
            });
        }
    }
    app.init();
})();