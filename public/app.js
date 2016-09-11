var socket;

function connect(role) {
    heading.innerHTML = "<center><span class='glyphicon glyphicon-repeat' aria-hidden='true'></span></center>";

    navigator.geolocation.getCurrentPosition(function(position) {
        socket = io('', {query: 'role='+role + 
                                '&lat='+position.coords.latitude +
                                '&long='+position.coords.longitude});

        socket.on('users', (data) => {
            guides.innerHTML = `Connected Guides: ${ JSON.stringify(data.guides) }`
            tourists.innerHTML = `Connected Tourists: ${ JSON.stringify(data.tourists) }`
        })

        document.getElementById('heading').remove();
    });
}

$('#tbutton').click(() => { connect('tourist') })

$('#gbutton').click(() => { connect('guide') })