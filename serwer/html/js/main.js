var statusInterval;
var reserved;
var updateInterval;

var timer = 300;
var minutes_seconds = [5, 0];
var timerInterval = 0;


function makeid(length) {
    var result = '';
    var characters =
	'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
	result +=
	    characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

function get_timer() {
    timer--;

    if (timer == 0) $('#myLargeModalLabel').modal('toggle')

	const minutes = parseInt(timer / 60);
    const seconds = timer % 60;
    minutes_seconds = [minutes, seconds];

    return `${minutes_seconds[0]}:${
	minutes_seconds[1] < 10 ? '0' + minutes_seconds[1] :
					minutes_seconds[1]}`;
}



$(document).ready(function() {
    updateInterval = window.setInterval(sync, 2000);

    if (!Cookies.get('id')) {
	Cookies.set('id', makeid(5));
    }
    console.log(Cookies.get('id'));

    fetch(`/status`).then(res => res.text()).then(data => {
	if (data != 0) {
	    $('#myLargeModalLabel').modal({backdrop: 'static', keyboard: false})
	    $('#myLargeModalLabel').modal('toggle')
	    reserved = data[0];
	}
    });
});

$('#searchLocationBar').on('keyup', function() {
    var value = $(this).val().toLowerCase();
    $('.card').filter(function() {
	$(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
    });
});

$('.reserve-slot').click(function() {
    const id = $(this).attr('point_to');
    const name = $(`#${id} .card-title`).text();
    reserved = id;
    var request = $.ajax({
	url: 'reserve',
	method: 'POST',
	data: {location_id: id, cookie: Cookies.get('id')},
    })


    // Kiedy zapytanie jest poprawne
    request.done(function(data) {
	console.log(data);
	$('#alert-div')
	    .html(
		'<div class="alert alert-success" role="alert">Zostałeś dodany do kolejki!</div>');
	// Constantly ask the databse for new messages
	statusInterval = window.setInterval(getStatus, 1000);
	timer = 300;
    });

    // Blad w zapytaniu
    request.fail(function(jqXHR, textStatus) {
	$('#alert-div')
	    .html(
		'<div class="alert alert-danger" role="alert">Błąd podczas zapytania!</div>');
    });
    $('#myLargeModalLabel').modal({backdrop: 'static', keyboard: false})
    $('#myLargeModalLabel').modal('toggle')

    $('#qr-code')
	.html(`<img src="/generate?customerID=${Cookies.get('id')}&locationID=${
	    id}" alt="kod qr" width="400px">`)
});


function getStatus() {
    fetch(`/status`).then(res => res.text()).then(data => {
	data = JSON.parse(data);
	if (data[1] == 1) {
	    $('#que-status')
		.html(
		    `Jesteś ${ data[1]} w kolejce<br/>` +
			'<h3>Możesz wejść do środka!<br/>' +
		    `Masz <span id="time">${get_timer()}</span> ` +
			'na zeskanowanie kodu przy wejściu</h3>');
	} else if (data[1] > 1) {
	    $('#que-status').text(`Jesteś ${data[1]} w kolejce`);
	} else {
		console.log('taki szyme właśnie tu od niego wkleić')
	}
	return data
    });
}



$('.cancel_slot').click(function() {
    fetch(`/cancel`).then(res => res.text()).then(data => {
	clearInterval(statusInterval);
	$('#myLargeModalLabel').modal('toggle')
    });
});

$('.toggle_enter').click(function() {
    var request = $.ajax({
	url: 'action',
	method: 'GET',
	data: {customerID: Cookies.get('id'), locationID: reserved},
    })


    // Kiedy zapytanie jest poprawne
    request.done(function(data) {
	console.log(data);
	// TODO uzytkownik wszedl
    });

    // Blad w zapytaniu
    request.fail(function(jqXHR, textStatus) {
	console.log('error');
    });
});


function sync() {
    fetch(`/update`).then(res => res.text()).then(data => {
	data = JSON.parse(data);

	for (var i = 0; i < data.length; i++) {
	    const id = data[i]['id'];
	    const inside = data[i]['inside'];
	    const max_size = data[i]['max_size'];
	    const queue_size = data[i]['queue_size'];
	    const time = data[i]['time'];

	    $(`#${id} #people-inside`)
		.html(`<i class="fas fa-users text-success"></i>  ${inside}/${
		    max_size}`);
	    $(`#${id} #eta-wait`).html(`<i class="fas fa-clock"></i>  ${time}`);
	}
    });
}