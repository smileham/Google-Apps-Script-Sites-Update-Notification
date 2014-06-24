Google-Apps-Script-Sites-Update-Notification
============================================

Send automated notifications to an email address when a new "Announcement" is posted.

Create this Google Apps Script as a script on your Google Site, with a trigger to run at scheduled intervals (I use 30 mins)

Need to set the following Project Properties;

- pageName: the name of the "root" page of announcements on the google site (eg. "blog")
- lastUpdated: time in seconds since the script last ran.
- emailAddress: the email address to send notifications to (can be a Google Group)
- emailFooter: line of text to run as the footer

