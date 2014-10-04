if(Meteor.isClient)
{
	Template.requestion.submitted = function()
	{
		return Session.get("submitted");
	}
}