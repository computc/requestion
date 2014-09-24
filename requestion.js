if(Meteor.isClient)
{
	Template.tutee.events({
	
		"submit form": function(event)
		{
			event.preventDefault();
			
			//Meteor.call("send the email");
		}
		
	});
}

var SUBJECT_PREFIX = "[requestion]";

if(Meteor.isServer)
{
	Meteor.methods({
		
		"send the email": function()
		{
			this.unblock();
			
			var subject = SUBJECT_PREFIX;
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