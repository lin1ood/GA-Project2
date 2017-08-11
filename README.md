# GA Project 2 - Volunteer Event Scheduler &amp; Tracker.
A solution for Volunteers to commit themselves to Events.  Volunteer (member) management and Event management are stored in mongo and managed via CRUD controllers and EJS pages. SMS is also incorporated upon Event assignment to a Volunteer.

## Heroku hosted link to this Project
https://hogvol.herokuapp.com/

## Epics
1. Create a Full-Stack Application adhering to MVC file structure.

### User Stories
1. CRUD operations for Volunteers.
2. CRUD operations for Events.
3. CRUD operations for Users.
4. SMS alert Volunteers when they are assigned an Event.
5. Styling with CSS, Skeleton, Bootstrap
6. Compile a list of additional enhancements for expansion of this application.

##### Work Items for Volunteers
* Create Volunteer Schama.
* Include Events schema for associating Volunteers with Events.
* Add CRUD Routing in Volunteer Controller
* Add CRUD EJS pages for Volunteers.

##### Work Items for Events
* Create Events Schema.
* Add CRUD Routing in Events Controller.
* Add CRUD EJS pages for Events.

##### Work Items for Users
* Create User Schema.
* Add CRUD Routing for User Sessions.
* Add CRUD EJS pages for Users/Sessions.

##### Work Items for Alerting
* Add SMS alerts via https://www.nexmo.com/products/sms

##### Work Items for Styling
* Apply CSS styling to all pages for consistency.
* Use Skeleton for common page items and formatting.

# Work Items for expansion of existing functions.
* Improve CSS overall.
* Pagination for Volunteer and Event pages anticipating future larger volumes.
* Events with n Volunteers required -- Monitor and Handle Event Scheduling conflicts (Time and Volunteer).
* Send email reminder to committed Volunteers for their assigned Event 24Hrs prior to their assigned Event(s).
* Add img to Volunteer Schema and all CRUD pages.
* Populate Event Time for the Edit Page.
* Add Delete user/session operation
* Username rules & recovery.
* Password rules & recovery & reset (unique usernames enforced today).
* Add Magnetic Stripe Reader (MSR) functionality for Volunteer Create MemberID capture.
* Restrict some functions to Admin User only
