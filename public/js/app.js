var socket;

function connect(role) {
    heading.innerHTML = "<center><span class='glyphicon glyphicon-repeat' aria-hidden='true'></span></center>";

    navigator.geolocation.getCurrentPosition(function(position) {
        socket = io('', {query: 'role='+role + 
                                '&lat='+position.coords.latitude +
                                '&long='+position.coords.longitude});

        socket.on('users', function(data) {
            guides.innerHTML = `Connected Guides: ${ JSON.stringify(data.guides) }`
            tourists.innerHTML = `Connected Tourists: ${ JSON.stringify(data.tourists) }`
        })

        document.getElementById('heading').remove();
    });
}

$('#tbutton').on('click touchstart', function () {
    connect('tourist')
})

$('#gbutton').on('click touchstart', function () {
    connect('guide')
})