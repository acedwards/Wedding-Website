var guestInfo = undefined
var guestName = undefined

function getGuest(firstName, lastName, Callback) {
	var fullName = firstName + ' ' + lastName;
	var database = firebase.database().ref('/guests/' + fullName).once('value').then(function(snapshot){
		guestInfo = snapshot.val();
		guestName = snapshot.key;
		Callback();
	});
}

function setResponse(response, dietInfo, plusOne) {
	var updates = {}
	updates['/guests/' + guestName + '/isComing'] = parseInt(response);
	if (dietInfo.length > 0) {
		updates['/guests/' + guestName + '/dietary'] = dietInfo;
	}
	if (plusOne !== undefined) {
		updates['/guests/' + guestName + '/plusOne'] = parseInt(plusOne);
	}
	return firebase.database().ref().update(updates);
}

checkNames = function(e) {
	firebase.auth().signInAnonymously().catch(function(error) {
	// Handle Errors here.
	var errorCode = error.code;
	var errorMessage = error.message;
	// ...
	}).then(function() {
		var firstName = $('#firstName').val();
		var lastName = $('#lastName').val();
		getGuest(firstName, lastName, function(){
			if(guestInfo === null){
				$('.rsvp-form').addClass('has-error');
				var feedbackDiv = $('#rsvp-error-message-1');
				feedbackDiv.html("Oops! That name is not on the guest list :(")
				feedbackDiv.show();		
			} else {
				//if have rsvped -> show warning -> would they like to make changes
				if (guestInfo.isComing !== -1){
					$('.rsvp-form').addClass('has-warning');
					var feedbackDiv = $('#rsvp-error-message-1');
					feedbackDiv.html("You have already submitted your response!</br>If you'd like to make changes please contact Andrea at andrea.stobo@gmail.com")
					feedbackDiv.show();	
				}
				//if has not rsvped-> continue to next Modal
				else {
					if (guestInfo.plusOne === 1) {
						$('#plusOneCheck').show();
					}
					$('#firstNameHeader').html(firstName);
					$('#lastNameHeader').html(lastName);
					$('#rsvpModal').trigger('next.m.2');
				}	
			}
		});
	});
};

updateDatabase = function(){
	var response = $('.response-options input:radio:checked').val();
	var dietInfo = $('#dietaryRestrictions').val();
	var plusOne = $('#plusOne:checked').val();
	setResponse(response, dietInfo, plusOne).then(function(){
		$('#rsvpModal').trigger('next.m.3');
	});
}

startOver = function(){
	$('#rsvpModal').trigger('next.m.1');
	$('#firstName').val('');
	$('#lastName').val('');
	$('#dietaryRestrictions').val('');
	$('.form-group').removeClass('has-error');
	$('.form-group').removeClass('has-warning');
	$('#rsvp-error-message-1').hide();
}

$('#rsvpModal').on('hidden.bs.modal', function(e){	
	startOver();
})

$("input:radio").change(function () {$("#submit").prop("disabled", false);});