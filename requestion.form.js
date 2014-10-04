Requests = new Meteor.Collection("requests");

if(Meteor.isClient)
{
	Meteor.startup(function()
	{
		var request =
		{
			name: "",
			email: "",
			course: "",
			schedule:
			{
				"monday": [],
				"tuesday": [],
				"wednesday": [],
				"thursday": [],
				"friday": []
			}
		}
		
		var req_id = Requests.insert(request);
		Session.set("req_id", req_id);
	});
	
	Template.form.days =
	[
		"monday",
		"tuesday",
		"wednesday",
		"thursday",
		"friday"
	];
	
	Template.form.times =
	[
		"8am",
		"9am",
		"10am",
		"11am",
		"12pm",
		"1pm",
		"2pm",
		"3pm",
		"4pm",
		"5pm"
	];
	
	Template.form.events(
	{
		"keyup [type=text]": function(event)
		{
			var id = $(event.target).attr("id");
			var value = $(event.target).val();
			
			var data = {};
			data[id] = value;
			
			console.log(data);
			
			var req_id = Session.get("req_id");
			Requests.update(req_id, {$set: data});
		},
		"change [type=radio]": function(event)
		{
			var name = $(event.target).attr("name");
			var id = $(event.target).attr("id");
			
			var data = {};
			data[name] = id;
			
			console.log(data);
			
			var req_id = Session.get("req_id");
			Requests.update(req_id, {$set: data});
		},
		"click td": function(event)
		{
			$(event.target).toggleClass("selected");
			
			var time = Template.form.times[$(event.target).parent().index()-1];
			var day = Template.form.days[$(event.target).index()];
			
			var data = {};
			data["schedule."+day] = time;
			
			console.log(data);
			
			var req_id = Session.get("req_id");
			var request = Requests.findOne(req_id);
			
			if(request.schedule[day].indexOf(time) == -1)
			{
				Requests.update(req_id, {$push: data});
			}
			else
			{
				Requests.update(req_id, {$pull: data});
			}
		},
		"submit form": function(event)
		{
			event.preventDefault();
			
			var req_id = Session.get("req_id");
			var request = Requests.findOne(req_id);
			
			console.log(request);
			
			/*Meteor.call("send an email", {
				to: COMPUTC_EMAIL + ", " + request.email,
				message: Blaze.toHTML(Blaze.With(request, function() {return Template.tutor_message;})),
				subject: REQUESTION_PREFIX + " " + request.name + " has requested tutoring for " + request.course
			});*/
		}
	});
}

if(Meteor.isServer)
{
	Meteor.methods(
	{
		"send an email": function(data)
		{
			this.unblock();
			
			Email.send({
				to: data.to,
				from: COMPUTC_EMAIL,
				subject: data.subject,
				html: data.message
			});
		}
	});
}

var COMPUTC_EMAIL = "CompUTC <computcofficial@gmail.com>";
var REQUESTION_PREFIX = "[requestion]"