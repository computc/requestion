Requests = new Meteor.Collection("requests");

if(Meteor.isClient)
{
	Template.requestion.events(
	{
		"submit form": function(event)
		{
			event.preventDefault();
			
			var data =
			{
				name: $("form").find("#name").val() || "Andrew McPherson",
				email: $("form").find("#email").val() || "andrewmcp333@gmail.com",
				course: $("form").find("#course").val() || "CPSC1110"
			}
			
			Meteor.call("submit a request", data);
		}
	});
}

if(Meteor.isServer)
{
	Meteor.startup(function()
	{
		//Requests.remove({/*!*/});
	});
	
	Meteor.methods(
	{
		"submit a request": function(data)
		{
			var request = Requests.insert(data);
			
			console.log(request);
			
			this.unblock();
			
			var SUBJECT_PREFIX = "[requestion]";
			var subject = SUBJECT_PREFIX + " " + data.course;
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