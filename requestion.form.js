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
			schedule: {}
		}
		
		var req_id = Requests.insert(request);
		Session.set("req_id", req_id);
	});
	
	Template.form.days =
	[
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday"
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
			var time = Template.form.times[$(event.target).parent().index()];
			var day = Template.form.days[$(event.target).index()];
			
			var data = {};
			data["schedule."+day] = time;
			
			console.log(data);
			
			var req_id = Session.get("req_id");
			Requests.update(req_id, {$push: data});
		},
		"submit form": function(event)
		{
			event.preventDefault();
			
			var req_id = Session.get("req_id");
			var request = Requests.findOne(req_id);
			
			console.log(request);
			//Meteor.call("send an email", Blaze.toHTML(Blaze.With(data, function() {return Template.message;})));
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