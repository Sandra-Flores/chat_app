$(function(){
    var socket = io.connect();
    
    var $mainBox = $("#mainBox");
    var $messageForm = $("#messageForm"); 
    var $message = $("#message"); 
    var $chat = $("#chat-area"); 
    var $connect = $("#ppl-connected");
    var $nicknameForm = $("#nicknameForm");
    var $nickname =  $("#nickname");
    var $nicknames = $("#nicknames");
    
    $mainBox.hide();
    
    $nicknameForm.submit(function(e){
        e.preventDefault();
        $mainBox.show();
        $nicknameForm.hide();
        socket.emit('send-nickname', $nickname.val());
    })
            
    $messageForm.submit(function(e) {
        e.preventDefault(); 
        socket.emit('send message', $message.val()); 
        $message.val(''); 
    });
    
    socket.on('new message', function(data) {
        console.log("here!!!!"); 
        $chat.append("<div>" + data.msg + "</div>");
    });
    
    socket.on('nicknames', function(data){
        $nicknames.html("");
        $nicknames.append("<div>Users Online: " + data.nicknames.length + "</div>");
        for(var i = 0; i < data.nicknames.length; i++){
            $nicknames.append("<div>" + data.nicknames[i] +"</div>")
        }
    })
    
    socket.on('connected', function(data) {
        console.log("number connected: " + data.num_connected); 
    });
});


// Html, CSS, Chat, nicknames