function checkUpdate() {
  var theSite = SitesApp.getActiveSite();
  var theBlog = theSite.getChildByName(PropertiesService.getScriptProperties().getProperty("pageName"));
  var theAnnouncements = theBlog.getAnnouncements();
  
  var lastUpdate = new Date(Number(PropertiesService.getScriptProperties().getProperty("lastUpdated")));
  
  for (var i=0; i<theAnnouncements.length; i++) {
    var theBlogPost = theAnnouncements[i];
    if (theBlogPost.getLastEdited() > lastUpdate) {     
      var theEmailTemplate = HtmlService.createTemplateFromFile('emailTemplate');
      
      theEmailTemplate.siteURL = theSite.getUrl();
      theEmailTemplate.blogURL = theBlogPost.getUrl();
      theEmailTemplate.blogTitle = theBlogPost.getTitle();
      theEmailTemplate.blogContent = theBlogPost.getHtmlContent();
      theEmailTemplate.blogDate = theBlogPost.getLastEdited().toUTCString();
      var authors = theBlogPost.getAuthors();
      var blogAuthors = "";
      for (var j=0; j<authors.length; j++) {
        blogAuthors+=authors[j];
        if (authors.length!=(j-1)) {
          blogAuthors+=", ";
        }
      }
      theEmailTemplate.blogAuthor = blogAuthors;
      
      MailApp.sendEmail(PropertiesService.getScriptProperties().getProperty("emailAddress"),
                        "["+theSite.getName()+"] "+theBlogPost.getTitle(), "",
        {htmlBody:theEmailTemplate.evaluate().getContent(), noReply:true});
    }
  }
  PropertiesService.getScriptProperties().setProperty("lastUpdated", new Date().getTime());
}
