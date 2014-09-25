if(Meteor.isClient)
{
	Template.request.events(
	{
		"submit #request > form": function(event)
		{
			event.preventDefault();
			
			var name = $("#request > form").find("#name").val();
			var course = $("#request > form").find("#course").val();
			
			if(!name || !course)
			{
				throw "not enough information";
			}
			
			//Meteor.call("notify tutors", name, course);
		}
	});
	
	Template.login.events(
	{
		"submit #login > form": function(event, template)
		{
			event.preventDefault();
			
			var email = template.find("#email").value;
			var password = template.find("#password").value;
			
			if(!email || !password)
			{
				throw "not enough information";
			}
			
			Meteor.loginWithPassword(email, password, function(error)
			{
				if(error)
				{
					console.log("login did not work.");
				}
				else
				{
					console.log("login work.");
				}
			});
		}
	});
	
	Template.signup.events(
	{
		"submit #signup > form": function(event, template)
		{
			event.preventDefault();
			
			var email = template.find("#email").value;
			var password = template.find("#password").value;
			
			if(!email || !password)
			{
				throw "not enough information";
			}
			
			Accounts.createUser(
			{
				email: email,
				password : password
			},
			function(error)
			{
				if(error)
				{
					console.log("account failed");
				}
				else
				{
					console.log("account made!");
				}
			});
		}
	});
}

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

var SUBJECT_PREFIX = "[requestion]";