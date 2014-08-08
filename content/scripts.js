$(function() {
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
	.filter(function(){ return $(this).text().toLowerCase().indexOf('warning') === 0;}).parent().parent();
	var notes = main.find('blockquote > p > strong')
	.filter(function(){ return $(this).text().toLowerCase().indexOf('note') === 0;}).parent().parent();
	
	warnings.replaceWith(function () {
    		return $("<div class='alert alert-warning' />").append($(this).contents());
	});
	
	notes.replaceWith(function () {
    		return $("<div class='alert alert-success' />").append($(this).contents());
	});

	$.get( "/wiki/pages.html", function( data ) {
		var files = JSON.parse( data ).pages;
		console.info(files);
		var codes = main.find("code").filter(function() { 
			return $.inArray($(this).text(), files) != -1;
		});
		codes.replaceWith(function() {
		    var file = $.trim($(this).text());
		    return '<code><a href="/wiki/' + file + '" >^' + file + '</a></code>';
		});
	});
});
