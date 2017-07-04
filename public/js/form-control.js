function validate(firstName, lastName) {
	var fullName = firstName.val() + ' ' + lastName.val();
	var database = firebase.database().ref('/guests/' + fullName).once('value').then(function(snapshot){
		console.log(snapshot.val().isComing);
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
	});

	// if(isValid){


	// } else {
	// 	//show alert?
	// 	e.preventDefault();
	// }

});