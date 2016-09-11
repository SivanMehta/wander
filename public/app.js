var socket;

function connect(role) {
    heading.innerHTML = "<center><span class='glyphicon glyphicon-repeat' aria-hidden='true'></span></center>";

    navigator.geolocation.getCurrentPosition(function(position) {
        socket = io('', {query: 'role='+role + 
                                '&lat='+position.coords.latitude +
                                '&long='+position.coords.longitude});

        socket.on('users', (users) => {
            guides.innerHTML = "Connected Guides: " + JSON.stringify(users.guide)
            tourists.innerHTML = "Connected Tourists: " + JSON.stringify(users.tourist)
        })

        document.getElementById('heading').remove();
    });
}

window.onbeforeunload = function confirmExit() {
    alert("confirm exit is being called");
    socket.disconnect();
    return false;
}

$('#tbutton').click(() => { connect('tourist') })

$('#gbutton').click(() => { connect('guide') })