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
				monday: [],
				tuesday: [],
				wednesday: [],
				thursday: [],
				friday: []
			}
		}
		
		var req_id = Requests.insert(request);
		Session.set("req_id", req_id);
	});
	
	Template.form.events(
	{
		"keyup [type=text]": function(event)
		{
			var id = $(event.target).attr("id");
			var value = $(event.target).val();
			
			var data = {};
			data[id] = value;
			
			var req_id = Session.get("req_id");
			Requests.update(req_id, {$set: data});
		},
		"change [type=radio]": function(event)
		{
			var name = $(event.target).attr("name");
			var id = $(event.target).attr("id");
			
			var data = {};
			data[name] = id;
			
			var req_id = Session.get("req_id");
			Requests.update(req_id, {$set: data});
		},
		"click td": function(event)
		{
			var index = $(event.target).index();
			var text = $(event.target).text();
			
			var data = {};
			if(index == 0)
				data["schedule.monday"] = text;
			else if(index == 1)
				data["schedule.tuesday"] = text;
			else if(index == 2)
				data["schedule.wednesday"] = text;
			else if(index == 3)
				data["schedule.thursday"] = text;
			else if(index == 4)
				data["schedule.friday"] = text;
			
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
			
			//Requests.insert(data);
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