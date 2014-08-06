$(function() {
	$('#toc').toc({
		'listType': '<ul class="side-nav list-group" />',
		'selectors': 'h1,h2,h3', //elements to use as headings
		'container': '#main_content', //element to find all selectors in
		'headerText': function(i, heading, $heading) { //custom function building the header-item text
		return $heading.text();
	    },
		'itemClass': function(i, heading, $heading, prefix) { // custom function for item class
		  return "list-group-item toc-" + $heading[0].tagName.toLowerCase();
		},
		activeClass: "active"
	});

	$.getJSON("http://cdn.syndication.twimg.com/widgets/timelines/495982116597796864?dnt=true&domain=unquietcode.com&lang=en&callback=?", function(data) {
	    var tweets = $(data.body).find('li.tweet');
	    Tweets = [];
	    
	    for (var i=0; i < tweets.length; ++i) {
	      var cur = $(tweets[i]);         
	      var tweet = {};
	      tweet.authorImg = cur.find("img").attr("src");
	      tweet.authorFullName = cur.find("span.full-name span.p-name").html();
	      tweet.authorUserName = cur.find("span.p-nickname b").html();
	      tweet.date = cur.find("a.u-url").attr("data-datetime");
	      tweet.id = cur.attr("data-tweet-id");
	      tweet.text = $.trim(cur.find("p.e-entry-title").html());
	    
	      Tweets.push(tweet);
	      if (i>=3)
	      	break;
	    }
	    console.info(Tweets);
	
	    var tweetsContainer = $('#recent_tweets')
	    $.each(Tweets, function(i)
	    {
	        var li = $('<li/>')
	            .appendTo(tweetsContainer);
	    
	    	$('<i class="fa fa-twitter"/>')
	            .appendTo(li);
	    
	        $('<a/>')
	        	.attr('href', 'https://twitter.com/' + Tweets[i].authorUserName)
	        	.html('<strong> @' + Tweets[i].authorUserName + ": </strong>")
	            .appendTo(li);
	    
	        $('<span/>')
	            .html(Tweets[i].text)
	            .appendTo(li);
	    });
	});
	
	var main = $("#main_content");
	main.find("img").addClass("img-responsive appear-animation fadeInUp");
	main.find("table").addClass("table table-bordered");
	var warnings = main.find('blockquote > p > strong')
	.filter(function(){ return $(this).text().toLowerCase() === 'warning';}).parent().parent();
	var notes = main.find('blockquote > p > strong')
	.filter(function(){ return $(this).text().toLowerCase() === 'note';}).parent().parent();
	
	warnings.replaceWith(function () {
    		return $("<div />", attrs).append($(this).contents());
	}).addClass("alert alert-warning");
	
	notes.replaceWith(function () {
    		return $("<div />", attrs).append($(this).contents());
	}).addClass("alert alert-success");
});
