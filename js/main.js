$( "<div id='loadingtimetable'><br/><center><img src='images/loading.gif'/><br/>Loading...</center></div>" ).insertBefore( "#main" );
$("#main").hide();
$(".loading-reset").hide();
var currentTimetable = "massey";
var currentPost = {location : currentTimetable};
$('.selected-date').html(new Date().toJSON().slice(0,10));

function goToAnchor(name,offsetval){$("html, body").animate({ scrollTop: $(name).offset().top -offsetval }, 1000);}

$(window).resize(function() {
        if (myTable != null){
            getTimetable('Get me timetable', callback, currentPost);
            $( "#12" ).prop('checked', true);
            $( "#12A" ).prop('checked', true);
            $( "#12B" ).prop('checked', true);
            $( "#12C" ).prop('checked', true);
            $( "#14" ).prop('checked', true);
            $( "#15" ).prop('checked', true);
            $( "#custom-check" ).prop('checked', true);
            $( "#to-check" ).prop('checked', true);
            $( "#fom-check" ).prop('checked', false);   
			$( "#holiday" ).prop('checked', false);
        }
});

function openTimetable(timetable){
        currentTimetable = timetable;
        $("#main").hide();
        $("#loadingtimetable").show();
        currentPost = {location : currentTimetable};
        getTimetable('Get me timetable', callback, {location : currentTimetable});
        if (timetable === "massey"){
            $("#massey-key").show();
            $("#other-key").hide();
            $("#keycontent").hide();
            $("#massey-checkboxes").show();
            
        }
        else{
            $("#massey-key").hide();
            $("#other-key").show();
            $("#keycontent").hide();
            $("#massey-checkboxes").hide();
            heightnumber = '300px';
        }
        goToAnchor('#main-wrapper',-100);
           
}


function reset(){
		$('.selected-date').html(moment().format());
        currentPost = {location : currentTimetable};
        getTimetable('Get me timetable', callback, {location : currentTimetable});
        $( "#12" ).prop('checked', true);
        $( "#12A" ).prop('checked', true);
        $( "#12B" ).prop('checked', true);
        $( "#12C" ).prop('checked', true);
        $( "#14" ).prop('checked', true);
        $( "#15" ).prop('checked', true);
        $( "#custom-check" ).prop('checked', true);
        $( "#to-check" ).prop('checked', true);
        $( "#fom-check" ).prop('checked', false);    
		$( "#holiday" ).prop('checked', false);
}

var heightnumber = '400px';

var mobile = false;
enquire.register("screen and (max-width: 497px)", function() {
	$("#logo-container").css('background-image', 'url(images/bussmall.png)');
	$("#logo-container").css('height', '100px');
	$("#datetime-input").css('width', '100%');
	$( "#12" ).css('height', '30px');$( "#12" ).css('width', '30px');
	$( "#12A" ).css('height', '30px');$( "#12A" ).css('width', '30px');
	$( "#12B" ).css('height', '30px');$( "#12B" ).css('width', '30px');
	$( "#12C" ).css('height', '30px');$( "#12C" ).css('width', '30px');
	$( "#14" ).css('height', '30px');$( "#14" ).css('width', '30px');
	$( "#15" ).css('height', '30px');$( "#15" ).css('width', '30px');
	$( "#custom-check" ).css('height', '30px');$( "#custom-check" ).css('width', '30px');
	$( "#to-check" ).css('height', '30px');$( "#to-check" ).css('width', '30px');
	$( "#from-check" ).css('height', '30px');$( "#from-check" ).css('width', '30px');
	$( "#all" ).css('height', '30px');$( "#all" ).css('width', '30px');
	$( "#holiday" ).css('height', '30px');$( "#holiday" ).css('width', '30px');
	mobile = true;
	$(".formatting").hide();
        if (currentTimetable === "massey"){
            heightnumber = '400px';
        }
        else{
            heightnumber = '300px';
        }
},true);

enquire.register("screen and (min-width: 497px)", function() {

    
	$("#logo-container").css('background-image','url(images/bus.png)');
	$("#logo-container").css('height', '200px');
	$("#datetime-input").removeAttr('style');
	$( "#12" ).removeAttr('style');
	$( "#12A" ).removeAttr('style');
	$( "#12B" ).removeAttr('style');
	$( "#12C" ).removeAttr('style');
	$( "#14" ).removeAttr('style');
	$( "#15" ).removeAttr('style');
	$( "#custom-check" ).removeAttr('style');
	$( "#to-check" ).removeAttr('style');
	$( "#from-check" ).removeAttr('style');
	$( "#all" ).removeAttr('style');
	$( "#holiday" ).removeAttr('style');
	mobile = false;	
	$(".formatting").show();
	heightnumber = '400px';

},false);



$("#keycontent").hide();

$( "#key" ).click(function() {
		if ($( "#key" ).text() == "Bus timetable key ▲"){
			$("#keycontent").animate({ height: '0px' }, 1000, function() {
			$(this).hide();
		 });
			$( "#key" ).html("Bus timetable key &#x25BC;");
			}
		else{
			$("#keycontent").show();
			$("#keycontent").css('height','0px');
			$("#keycontent").animate({ height: heightnumber }, 1000, function() {
			
		 });
			$( "#key" ).html("Bus timetable key &#x25B2;");
		}

});


$( "#update" ).click(function() {
    if (mobile == true){
        $("#centered-load").show();
    }
    else{
        $("#uncentered-load").show();
    }
    reset();
});


$( "#futurebutton" ).click(function() {
    if (mobile == true){
        $("#centered-load").show();
    }
    else{
        $("#uncentered-load").show();
    }
    var date = $("#future-date-input").val();
    currentPost = { future : date, location : currentTimetable };
    getTimetable('Get me timetable', callback, { future : date, location : currentTimetable });
	$('.selected-date').html(moment(date).format());
    $( "#12" ).prop('checked', true);
    $( "#12A" ).prop('checked', true);
    $( "#12B" ).prop('checked', true);
    $( "#12C" ).prop('checked', true);
    $( "#14" ).prop('checked', true);
    $( "#15" ).prop('checked', true);
    $( "#custom-check" ).prop('checked', true);
    $( "#to-check" ).prop('checked', true);
    $( "#fom-check" ).prop('checked', false);
	$( "#holiday" ).prop('checked', false);
});	

var myTable;

function updateBusTime(){
	if (myTable.is(":visible")){
		setTimeout(
			function() 
			{
			
		if (myTable.find('tr:visible:eq(1) td:first').text() == ""){	
					$('#busnumber').html("none");
					$('#bustime').html("never");
		
		}
                
		else if(currentTimetable === "massey"){
		$('#busnumber').html(myTable.find('tr:visible:eq(1) td:first').text());
		$('#bustime').html(myTable.find('tr:visible:eq(1) td:eq(1)').text());	
		}
                else{
		$('#busnumber').html(myTable.find('tr:visible:eq(1) td:eq(1)').text());
		$('#bustime').html(myTable.find('tr:visible:eq(1) td:first').text());	                    
                }
			}, 1000);
			
			
	}
	else {
		setTimeout(
			function() 
			{
			
		if (myTable2.find('tr:visible:eq(1) td:first').text() == ""){	
					$('#busnumber').html("none");
					$('#bustime').html("never");
		
		}	

		else{
			
			
		$('#busnumber').html(myTable2.find('tr:visible:eq(1) td:first').text());
		$('#bustime').html(myTable2.find('tr:visible:eq(1) td:eq(1)').text());

		}	
			}, 1000);		
	
	}	

}


var encodeHtmlEntity = function(str) {
  var buf = [];
  for (var i=str.length-1;i>=0;i--) {
    buf.unshift(['&#', str[i].charCodeAt(), ';'].join(''));
  }
  return buf.join('');
};

var callback = function(data, textStatus, xhr)
{
    var tableHTML = data + "</body></html>";
    var printHTML = "";
    if ($(tableHTML).filter("#to").html() == null){
        printHTML = "<table id='to' border = '0' style='width:100%;'>" + $(tableHTML).filter("table:first").html() + "</table>";
    }
    else{
        printHTML = "<table id='to' border = '0' style='width:100%;'>" + $(tableHTML).filter("#to").html() + "</table>" + "<table id='from' border = '0' style='width:100%;'>" + $(tableHTML).filter("#from").html() + "</table>";

    }
    
    $("#bustimetable").html(printHTML);
    myTable = $("#bustimetable").find("table:first");
    myTable2 = $("#bustimetable").find("#from");
    $("#loadingtimetable").hide();
    $(".loading-reset").hide();
    $("#main").show("fast");
    myTable2.hide();
    updateBusTime();
}

var getTimetable = function(str, cb, parameters) {
    var data = parameters;
    $.ajax({
        type: 'post',
        url: 'http://www.taylorhamling.com/lateforthebus/bus2.php',
        data: data,
        success: cb
    });
}
				
							
	
	
$( "#12" ).change(function(){
	if (this.checked == false){
		myTable.find(".12").hide("slow");
		myTable2.find(".12").hide("slow");
		
	}
	else{
		myTable.find(".12").show("slow");
		myTable2.find(".12").show("slow");
		
	}

	updateBusTime();	

	}); 

$( "#12A" ).change(function(){
	if (this.checked == false){
		myTable.find(".12A").hide("slow");
		myTable2.find(".12A").hide("slow");
	}
	else{
		myTable.find(".12A").show("slow");
		myTable2.find(".12A").show("slow");
	}
	
	updateBusTime();	
	
	
	
	
	}); 
	
$( "#12B" ).change(function(){
	if (this.checked == false){
		myTable.find(".12B").hide("slow");
		myTable2.find(".12B").hide("slow");
	}
	else{
		myTable.find(".12B").show("slow");
		myTable2.find(".12B").show("slow");
	}
	
	updateBusTime();	
	
	
	
	}); 		
	
$( "#12C" ).change(function(){
	
	
	


	if (this.checked == false){
		myTable.find(".12C").hide("slow");
		myTable2.find(".12C").hide("slow");

		
		
	}
	else{
		myTable.find(".12C").show("slow");
		myTable2.find(".12C").show("slow");
	}

	updateBusTime();		

		}); 		
	
$( "#14" ).change(function(){
	if (this.checked == false){
		myTable.find(".14").hide("slow");
		myTable2.find(".14").hide("slow");
	}
	else{
		myTable.find(".14").show("slow");
		myTable2.find(".14").show("slow");
	}
	
	updateBusTime();
	
	}); 		
	
$( "#15" ).change(function(){
	if (this.checked == false){
		myTable.find(".15").hide("slow");
		myTable2.find(".15").hide("slow");
	}
	else{
		myTable.find(".15").show("slow");
		myTable2.find(".15").show("slow");
	}
	
	updateBusTime();		
	
	
	}); 
	
$( "#custom-check" ).change(function(){
	var customCodeClass = "." + document.getElementById('custom-code').value.replace(/[!"#$%&'()*+,.\/:;<=>?@[\\\]^`{|}~]/g, "\\\$&");
	if (customCodeClass === "."){
		return;
	}
	if (this.checked == false){
		myTable.find( customCodeClass ).hide("slow");
		myTable2.find(customCodeClass).hide("slow");
	}
	else{
		myTable.find(customCodeClass).show("slow");
		myTable2.find(customCodeClass).show("slow");
	}
	
	updateBusTime();		
	
	
	}); 	

$( "#all" ).change(function(){
	if (this.checked == false){
		$( "#12" ).prop('checked', false);
		$( "#12A" ).prop('checked', false);
		$( "#12B" ).prop('checked', false);
		$( "#12C" ).prop('checked', false);
		$( "#14" ).prop('checked', false);
		$( "#15" ).prop('checked', false);
		$( "#custom-check" ).prop('checked', false);
		myTable.find("tbody tr").hide("slow");
		myTable2.find("tbody tr").hide("slow");
	}
	else{
		$( "#12" ).prop('checked', true);
		$( "#12A" ).prop('checked', true);
		$( "#12B" ).prop('checked', true);
		$( "#12C" ).prop('checked', true);
		$( "#14" ).prop('checked', true);
		$( "#15" ).prop('checked', true);
		$( "#custom-check" ).prop('checked', true);		
		myTable.find("tbody tr").show("slow");
		myTable2.find("tbody tr").show("slow");
	}
	
	updateBusTime();	
	
	
	
	
	}); 



$( "#to-check" ).change(function(){
	
	if (this.checked == true){

		myTable.show("slow");
		myTable2.hide();
	}
	updateBusTime();

	}); 
$( "#from-check" ).change(function(){
	
	if (this.checked == true){

		myTable.hide();
		myTable2.show("slow");
	}
	
	updateBusTime();
	}); 
	
$( "#holiday" ).change(function(){
	if (this.checked == true){
	
		var selectedDate = moment( $('.selected-date').html() );
		if (selectedDate === "" || !selectedDate.isValid()){
			selectedDate = moment();
		}
		
		var currentYear = selectedDate.format('YYYY');
		var lastYear = selectedDate.subtract(1, 'years').format('YYYY');
		var nextYear = selectedDate.add(2, 'years').format('YYYY');
		selectedDate.subtract(1, 'years');
		
		
		myTable.find("tbody tr").each(function(index){
			var element = $(this);
			console.log(element.css('background-color') == 'rgb(251, 202, 183)');
			if (element.css('background-color') == 'rgb(251, 202, 183)'){
				//console.log("semester 1, semester 2, eater break, mid year break");
				if (!(selectedDate.isBetween(currentYear + '-02-25', currentYear + '-08-20') || selectedDate.isBetween(currentYear + '-09-10', currentYear + '-10-10'))){
					element.hide("slow");
				}
				//semester 1 + easter break + mid year break + semester 2 (first half): , 25th feb - 20th aug, 10th sep - 10th nov				

			}
			else if(element.css('background-color') == 'rgb(226, 244, 253)'){
				//console.log("semester 1, semester 2, summer semester");
				if (!(selectedDate.isBetween(lastYear + '-10-10', lastYear + '-12-24') || selectedDate.isBetween(currentYear + '-01-05', currentYear + '-02-10') || 
				selectedDate.isBetween(currentYear + '-02-25', currentYear + '-04-01') || selectedDate.isBetween(currentYear + '-04-20', currentYear + '-06-20') ||
				selectedDate.isBetween(currentYear + '-07-15', currentYear + '-08-20') || selectedDate.isBetween(currentYear + '-09-10', currentYear + '-10-10'))){
					element.hide("slow");
				}
				//summer school: november 20th - 24th dec, 5th jan - 10th feb
				//semester 1: , 25th feb-1st april, 20th april - 20th june,
				//semester 2: 15th July - 20th aug, 10th sep - 10th nov

			}
			else if(element.css('background-color') == 'rgb(231, 231, 232)'){
				//console.log("semester 1 and 2 only");
				if (!(selectedDate.isBetween(currentYear + '-02-25', currentYear + '-04-01') || selectedDate.isBetween(currentYear + '-04-20', currentYear + '-06-20') || 
				selectedDate.isBetween(currentYear + '-07-15', currentYear + '-08-20') || selectedDate.isBetween(currentYear + '-09-10', currentYear + '-10-10'))){
					element.hide("slow");
				}				
				//semester 1: , 25th feb-1st april, 20th april - 20th june,
				//semester 2: 15th July - 20th aug, 10th sep - 10th nov				
			}

	});
	
	
		myTable2.find("tbody tr").each(function(index){
			var element = $(myTable2.find("tbody tr")[index]);
			if (element.css('background-color') == 'rgb(251, 202, 183)'){
				//console.log("semester 1, semester 2, eater break, mid year break");
				if (!(selectedDate.isBetween(currentYear + '-02-25', currentYear + '-08-20') || selectedDate.isBetween(currentYear + '-09-10', currentYear + '-10-10'))){
					element.hide("slow");
				}
				//semester 1 + easter break + mid year break + semester 2 (first half): , 25th feb - 20th aug, 10th sep - 10th nov				

			}
			else if(element.css('background-color') == 'rgb(226, 244, 253)'){
				//console.log("semester 1, semester 2, summer semester");
				if (!(selectedDate.isBetween(lastYear + '-10-10', lastYear + '-12-24') || selectedDate.isBetween(currentYear + '-01-05', currentYear + '-02-10') || 
				selectedDate.isBetween(currentYear + '-02-25', currentYear + '-04-01') || selectedDate.isBetween(currentYear + '-04-20', currentYear + '-06-20') ||
				selectedDate.isBetween(currentYear + '-07-15', currentYear + '-08-20') || selectedDate.isBetween(currentYear + '-09-10', currentYear + '-10-10'))){
					element.hide("slow");
				}
				//summer school: november 20th - 24th dec, 5th jan - 10th feb
				//semester 1: , 25th feb-1st april, 20th april - 20th june,
				//semester 2: 15th July - 20th aug, 10th sep - 10th nov

			}
			else if(element.css('background-color') == 'rgb(231, 231, 232)'){
				//console.log("semester 1 and 2 only");
				if (!(selectedDate.isBetween(currentYear + '-02-25', currentYear + '-04-01') || selectedDate.isBetween(currentYear + '-04-20', currentYear + '-06-20') || 
				selectedDate.isBetween(currentYear + '-07-15', currentYear + '-08-20') || selectedDate.isBetween(currentYear + '-09-10', currentYear + '-10-10'))){
					element.hide("slow");
				}				
				//semester 1: , 25th feb-1st april, 20th april - 20th june,
				//semester 2: 15th July - 20th aug, 10th sep - 10th nov				
			}

	});
	
	
	
	
	updateBusTime();
	}
	
	else{
		$( "#12" ).prop('checked', true);
		$( "#12A" ).prop('checked', true);
		$( "#12B" ).prop('checked', true);
		$( "#12C" ).prop('checked', true);
		$( "#14" ).prop('checked', true);
		$( "#15" ).prop('checked', true);
		$( "#custom-check" ).prop('checked', true);	
		$( "#all" ).prop('checked', true);			
		myTable.find("tbody tr").show("slow");
		myTable2.find("tbody tr").show("slow");	
	
			
	}


});	

$("#contactform").submit(function(e)
{
    var postData = $(this).serializeArray();
    var formURL = $(this).attr("action");
    $.ajax(
    {
        url : formURL,
        type: "POST",
        data : postData,
        success:function(data, textStatus, jqXHR) 
        {
			document.getElementById("contactform").reset();
			$('#success-message').show('slow');
			
            console.log(data);
        },
        error: function(jqXHR, textStatus, errorThrown) 
        {
            console.log("error");   
        }
    });
    e.preventDefault(); //STOP default action

});


getTimetable('Get me timetable', callback, {location : currentTimetable});
$("#massey-key").show();
$("#other-key").hide();