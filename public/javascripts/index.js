(function () {
    var app = {
        init:function(){
            var socket = io.connect('http://localhost:3000');
            console.log(socket);
        }
    }
    app.init();
})();