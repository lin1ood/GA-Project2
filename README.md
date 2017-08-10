# GA Project 2 - Volunteer Event Scheduler &amp; Tracker.
A solution for Volunteers to commit themselves to Events.  Volunteer (member) management and Event management are stored in mongo and managed via CRUD controllers and EJS pages. SMS is also incorporated upon Event assignment to a Volunteer.
## Epics
1. Allow CRUD operations for Volunteers.
##### User Stories
* Create Volunteer Schama.
* Include Events schema for associating Volunteers with their Events.
* Add CRUD Routing in Volunteer Controller
* Add CRUD EJS pages for Volunteers.
2. Allow CRUD operations for Events.
##### User Stories
* Create Events Schema.
* Add CRUD Routing in Events Controller.
* Add CRUD EJS pages for Events.
3.Allow CRUD operations for Users.
##### User Stories
* Create User Schema.
* Add CRUD Routing for User Sessions.
* Add CRUD EJS pages for Users/Sessions.
4. Alert Volunteers when they are assigned an Event.
##### User Stories
* Add SMS alerts via https://www.nexmo.com/products/sms

# Future plans
* Improve CSS overall.
* Pagenation for Volunter and Event pages anticipating future larger volumes.
* For n Volunteers required -- Monitor and Handle Event Scheduling conflicts (Time and Volunteer).
* Send email reminder to committed Volunteers for their assigned Event.
* Add img to Volunteer Schema and all CRUD pages.
* Populate Event Time for the Edit Page (have date(+1 for some reason) but not Time)
* Username rules.
* Username recovery.
* Password rules.
* Password recovery/reset.
* Add MSR functionality for Volunteer Create MemberID capture.
* Add Delete user/session operation
