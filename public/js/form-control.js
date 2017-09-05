function getGuest(firstName, lastName, Callback) {
	var fullName = firstName + ' ' + lastName;
	var database = firebase.database().ref('/guests/' + fullName).once('value').then(function(snapshot){
		guest = snapshot.val();
		Callback(guest);
	});
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
		getGuest(firstName, lastName, function(guest){
			if(guest === null){
				$('.rsvp-form').addClass('has-error');
				var feedbackDiv = $('#rsvp-error-message-1');
				feedbackDiv.html("Oops! That name is not on the guest list :(")
				feedbackDiv.show();		
			} else {
				//if have rsvped -> show warning -> would they like to make changes
				if (guest.isComing !== -1){
					$('.rsvp-form').addClass('has-warning');
					var feedbackDiv = $('#rsvp-error-message-1');
					feedbackDiv.html("You have already submitted your response!</br>If you'd like to make changes please contact Andrea at andrea.stobo@gmail.com")
					feedbackDiv.show();	
				}
				//if has not rsvped-> continue to next Modal
				else {
					if (guest.plusOne === 1) {
						$('#addGuest').show();
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

}

$('#rsvpModal').on('hidden.bs.modal', function(e){
	$('.form-group').removeClass('has-error');
	$('.form-group').removeClass('has-warning');
	$('#rsvp-error-message-1').hide();
	$('#rsvpModal').trigger('next.m.1');
	$('input').val('');
})