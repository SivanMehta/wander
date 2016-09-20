var socket;

function connect(role) {
    welcome.innerHTML = "<center><span class='glyphicon glyphicon-repeat' aria-hidden='true'></span></center>";

    navigator.geolocation.getCurrentPosition(function(position) {
        socket = io('', {query: 'role='+role +
                                '&lat='+position.coords.latitude +
                                '&long='+position.coords.longitude});

        socket.on('users', function(data) {
          // To display Map + markers for tour guide/ tourists
          initMap(data)
          // To get address from lat, long

        });
  })
}

$('#tbutton').on('click touchstart', function () {
    connect('tourist')
})

$('#gbutton').on('click touchstart', function () {
    connect('guide')
})
