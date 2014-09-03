
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
//////////////////////// COMMENTS GO HERE ////////////////////////
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////

$(document).ready(function () {
	
	
	
	$('#color-pallet div').click(function() {
		$('#colorSheet').attr('href', '../assets/css/color/' + $(this).attr('id') + '.css');
		
		$.cookie('color', $(this).attr('id'), { expires: 7, path: '/' });
		
		//alert($.cookie('color'));
		
		$('#color-switcher').show();
		$('#color-pallet').hide();
	
	});
	
	$('#color-switcher').click(function() {
		$('#color-switcher').hide();
		$('#color-pallet').show();
	});
	
	//$('#colorSheet').attr('href', '../assets/css/color/blue.css');
	//$('#colorSheet').attr('href', '../assets/css/color/yellow.css');
	//$('#colorSheet').attr('href', '../assets/css/color/magenta.css');
	//$('#colorSheet').attr('href', '../assets/css/color/black.css');
	//$('#colorSheet').attr('href', '../assets/css/color/green.css');
	//$('#colorSheet').attr('href', '../assets/css/color/red.css');
	//$('#colorSheet').attr('href', '../assets/css/color/orange.css');
	//$('#colorSheet').attr('href', '../assets/css/color/pink.css');
	//$('#colorSheet').attr('href', '../assets/css/color/white.css');
	
	//This is what allows for the cool menu hover effect
    $('ul.menu li a')
		.mouseenter(function () { $(this).stop().animate({ "background-color": "#fff" }, 500); })
		.mouseleave(function () { $(this).animate({ "background-color": "transparent" }, 500); });
	
	//This is what allows for the cool portfolio hover effect
    $('a .portfolio-box')
		.mouseenter(function () { $(this).find('.background').stop().fadeTo(500, .5, function () { }); $(this).find('span').fadeIn(500, function () { }); })
		.mouseleave(function () { $(this).find('.background').fadeTo(500, 1, function () { }); $(this).find('span').fadeOut(500, function () { }); });

	//$('#container ul li')
	//	.mouseenter(function () { $(this).find('img').stop().fadeTo(500, .3, function () { }); $(this).find('span').fadeIn(500, function () { }); })
	//	.mouseleave(function () { $(this).find('img').fadeTo(500, 1, function () { }); $(this).find('span').fadeOut(500, function () { }); });

	//Portofolio ----------------------------------------------------------------------------------------
	//Examples of how to assign the ColorBox event to elements
    $('.group1').colorbox({ rel: 'group1' });
	
    //idk wtf the rest do................
    $('.group2').colorbox({ rel: 'group2', transition: "fade" });
    $('.group3').colorbox({ rel: 'group3', transition: "none", width: "75%", height: "75%" });
    $('.group4').colorbox({ rel: 'group4', slideshow: true });
    $('.ajax').colorbox();
    $('.youtube').colorbox({ iframe: true, innerWidth: 425, innerHeight: 344 });
    $('.iframe').colorbox({ iframe: true, width: "80%", height: "80%" });
    $('.inline').colorbox({ inline: true, width: "50%" });
    $('.callbacks').colorbox({
        onOpen: function () { alert('onOpen: colorbox is about to open'); },
        onLoad: function () { alert('onLoad: colorbox has started to load the targeted content'); },
        onComplete: function () { alert('onComplete: colorbox has displayed the loaded content'); },
        onCleanup: function () { alert('onCleanup: colorbox has begun the close process'); },
        onClosed: function () { alert('onClosed: colorbox has completely closed'); }
    });

    //Example of preserving a JavaScript event for inline calls.
    $('#click').click(function () {
        $('#click').css({ "background-color": "#f00", "color": "#fff", "cursor": "inherit" }).text('Open this window again and this message will still be here.');
        return false;
    });
	
	var items = $('#stage li'), itemsByTags = {};
	
	// Looping though all the li items:
	
	items.each(function(i){
		var elem = $(this),
			tags = elem.data('tags').split(',');
		
		// Adding a data-id attribute. Required by the Quicksand plugin:
		elem.attr('data-id',i);
		
		$.each(tags,function(key,value){
			
			// Removing extra whitespace:
			value = $.trim(value);
			
			if(!(value in itemsByTags)){
				// Create an empty array to hold this item:
				itemsByTags[value] = [];
			}
			
			// Each item is added to one array per tag:
			itemsByTags[value].push(elem);
		});
		
	});

	// Creating the "Everything" option in the menu:
	createList('Everything',items);

	// Looping though the arrays in itemsByTags:
	$.each(itemsByTags,function(k,v){
		createList(k,v);
	});
	
	$('#filter a').on('click',function(e){
		var link = $(this);
		
		link.addClass('active').siblings().removeClass('active');
		
		// Using the Quicksand plugin to animate the li items.
		// It uses data('list') defined by our createList function:
		
		$('#stage').quicksand(link.data('list').find('li'));
		e.preventDefault();
	});
	
	$('#filter a:first').click();
	
	function createList(text,items){
		
		// This is a helper function that takes the
		// text of a menu button and array of li items
		
		// Creating an empty unordered list:
		var ul = $('<ul>',{'class':'hidden'});
		
		$.each(items,function(){
			// Creating a copy of each li item
			// and adding it to the list:
			
			$(this).clone().appendTo(ul);
		});

		ul.appendTo('#container');

		// Creating a menu item. The unordered list is added
		// as a data parameter (available via .data('list'):
		
		var a = $('<a>',{
			html: text,
			href:'#',
			data: {list:ul}
		}).appendTo('#filter');
	}
	//End of Portfolio --------------------------------------------------------------------------------------
	
	
	
	
	//Contact -----------------------------------------------------------------------------------------------
	var submitContactClicked = false;
	var invalid = { "background-color": "#ffeeee", "borderTopColor": "#ff0000", "borderBottomColor": "#ff0000", "borderLeftColor": "#ff0000", "borderRightColor": "#ff0000" };
	var valid = { "background-color": "#fff", "borderTopColor": "#ccc", "borderBottomColor": "#ccc", "borderLeftColor": "#ccc", "borderRightColor": "#ccc" };
	var rate = 1000;
	
	//This is what changes the colors of the text boxes and brings up the error messages and also hides them
	$('.required').on('keyup change', function() {
		if (submitContactClicked) {
			var input = $(this).find('input[type=text],textarea,select');
			var text = input.val().replace(/^\s+|\s+$/g, '');
			var errorMessage = $(this).find('span');
			
			if (text == "") {
				input.stop().animate(invalid, rate);
				errorMessage.stop().fadeIn(rate, function() { errorMessage.show() });
			}
			else if (text != "") {
				input.stop().animate(valid, rate);
				errorMessage.stop().fadeOut(rate, function() { errorMessage.hide() });
			}
		}
	});
	
	//Validate: name, email, subject, and message
	//Pass to controller: name, email, url, subject, and message (only if valid)(using AJAX)
	$('#submitContactForm').click(function () {
		submitContactClicked = true;

		var name = $('#name').val().replace(/^\s+|\s+$/g, '');
		var email = $('#email').val().replace(/^\s+|\s+$/g, '');
		var url = $('#url').val().replace(/^\s+|\s+$/g, '');
		var subject = $('#subject').val().replace(/^\s+|\s+$/g, '');
		var message = $('#message').val().replace(/^\s+|\s+$/g, '');
		
		if (name == "")
			$('#name').animate(invalid, rate).parent().find('span').fadeIn(rate);
		
		if (email == "")
			$('#email').animate(invalid, rate).parent().find('span').fadeIn(rate);

		if (subject == "")
			$('#subject').animate(invalid, rate).parent().find('span').fadeIn(rate);

		if (message == "")
			$('#message').animate(invalid, rate).parent().find('span').fadeIn(rate);
		
		//When the form validates you can use an AJAX call like this one, or you can use a regular form post back.
		if (name != "" && email != "" && subject != "" && message != "") {
			$.ajax({
				type: "POST",
				url: "URL GOES HERE",
				data: {
					name: name,
					email: email,
					url: url,
					subject: subject,
					message: message
				},
				success: function () { /*alert('Successfully Sent Message!');*/ },
				error: function () { /*alert('Failed to Send Message!');*/ }
			});
		}
	});
	//End of Contact ----------------------------------------------------------------------------------------
	
	
	
	
});

