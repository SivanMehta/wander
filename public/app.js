var socket;

function connect(role) {
    document.getElementById('heading').remove();

    socket = io('', {query: 'role=' + role});
    socket.on('users', (users) => {
        guides.innerHTML = "Connected Guides: " + users.guide
        tourists.innerHTML = "Connected Tourists: " + users.tourist
    })
}

window.onbeforeunload = function confirmExit() {
    alert("confirm exit is being called");
    socket.disconnect();
    return false;
}

$('#tbutton').click(() => {
    connect('tourist');
    console.log('connected as tourist')
})

$('#gbutton').click(() => {
    connect('guide');
    console.log('connected as guide')
})