Requests = new Meteor.Collection("requests");

if(Meteor.isClient)
{
	Template.form.events(
	{
		"submit form": function(event)
		{
			event.preventDefault();
			
			var data =
			{
				name: $("form").find("#name").val(),
				email: $("form").find("#email").val(),
				course: $("form").find("#course").val(),
				monday: "2pm", friday: "1:15pm", wednesday: "3pm"
			}
			
			Requests.insert(data);
			
			Meteor.call("send an email", Blaze.toHTML(Blaze.With(data, function() {return Template.message;})));
		}
	});
}

if(Meteor.isServer)
{
	Meteor.methods(
	{
		"send an email": function(message)
		{
			this.unblock();
			
			Email.send({
				from: "CompUTC <computcofficial@gmail.com>",
				to: "CompUTC <computcofficial@gmail.com>",
				subject: "[requestion]",
				html: message
			});
			
			console.log("sending an email!");
		}
	});
}