function validate(firstName, lastName) {
	var fullName = firstName.val() + ' ' + lastName.val();
	var database = firebase.database().ref('/guests/' + fullName).once('value').then(function(snapshot){
		//if null return false else return true console.log(snapshot.val().isComing);
		if(snapshot.val() === null){
			console.log('snapshot is null');
			return false;
			
		}else {
			console.log('snapshot has stuff');
			return snapshot.val();
		}
	});
}

$('#next').on('click', function(e) {
	firebase.auth().signInAnonymously().catch(function(error) {
	// Handle Errors here.
	var errorCode = error.code;
	var errorMessage = error.message;
	// ...
	}).then(function() {
		var firstName = $('#firstName');
		var lastName = $('#lastName');
		var isValid = validate(firstName, lastName);

		if(isValid === false){
			$('.form-group').addClass('has-error');
			var feedbackDiv = $('#rsvp-error-message-1');
			feedbackDiv.html("Oops! That name is not on the guest list :(")
			feedbackDiv.show();		
		} else {
			//if have rsvped -> show error
			//if have rsvped but still have plus one -> allow to add plus one
			//if has not rsvped-> continue to next Modal
		}
	});
});

$('#rsvpModal').on('hidden.bs.modal', function(e){
	$('.form-group').removeClass('has-error');
	$('#rsvp-error-message-1').hide();
	$('input').val('');
})