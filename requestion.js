if(Meteor.isClient)
{
	Template.tutee.events(
	{
		"submit form": function(event)
		{
			event.preventDefault();
			
			var name = $("form").find("#name").val();
			var course = $("form").find("#course").val();
			
			if(!name || !course)
			{
				console.log("provide details!");
				return;
			}
			
			Meteor.call("notify tutors", name, course);
		}
	});
}

var SUBJECT_PREFIX = "[requestion]";

if(Meteor.isServer)
{
	Meteor.methods(
	{
		"notify tutors": function(name, course)
		{
			this.unblock();
			
			var subject = SUBJECT_PREFIX + " " + course;
			var message = "Hello World!";
			
			Email.send({
				from: "CompUTC <computcofficial@gmail.com>",
				to: "Andrew McPherson <andrewmcp333@gmail.com>",
				subject: subject,
				text: message
			});
		}
	});
}