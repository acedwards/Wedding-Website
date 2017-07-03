function validate(firstName, lastName) {
	var fullName = firstName + ' ' + lastName;
	
}

$(#rsvpForm).on('submit', function(e) {
	var firstName = $(#firstName);
	var lastName = $(#lastName);

	var isValid = validate(firstName, lastName);

	if(isValid){


	} else {
		//show alert?
		e.preventDefault();
	}

})