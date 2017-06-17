$(document).ready(function(){
	initialise();
});

var score=0;
var clicks=0;
var randBox=new Array(16);
var usedAlpha=new Array(9);
var newAlpha=new Array(16);
var card_values = [];
var card_ids = [];
var cards_flipped = 0;
var started = false;
var count=0;

$(document).on('click', '#reset', function () {
		score=0;
		clicks=0;
		for(var i=0;i<usedAlpha.length;i++)
			usedAlpha[i]=false;
		for(var i=0;i<randBox.length;i++)
			randBox[i]=false;
		initialise();
		$("button").click(function(){
    	$("button").removeClass("active");
    	$("button").removeClass("overlay-content");
});
});

$('#btnSubmit').click(function(){
	$(this).val("Restart");
	if(count!=0){
	location.reload();
	}
	count++;
});

function timer()
{
	countdownTime = countdownTime-1;
	if (countdownTime <= 0)
	{
		$(".overlay-content .content-wrapper h1").html("TIME'S UP!");
		$(".overlay-content").addClass("active");
		clearInterval(counter);
	}
	$(".countdown").html(countdownTime);
}

function newTILE()
{ 
	for(var i=0; i<8; i++)
	{
		newAlpha[i+8]=newAlpha[i]=randALPHA();
	}
	for(var i=0;i<16;i++)
	{
		document.getElementById(randID()).innerHTML=newAlpha[i];
	}
}

function randALPHA()
{
	var alphabet=['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
	var newNum;
	do
	{
		newNum=Math.floor(Math.random()*26);
	}while(usedAlpha[newNum]);

	usedAlpha[newNum]=true;
	return alphabet[newNum];
}
function randID()
{
	var randId;
	do
	{
		randId=Math.floor(Math.random()*16);
	}while(randBox[randId]);

	randBox[randId]=true;
	return randId;
}

function Disable(id1,id2)
{
	$("#"+id1).parent().css({"background":"rgba(0,0,0,0.1","color":"white"}).parent().removeClass("box");
	$("#"+id1).contents().unwrap();
	
	$("#"+id2).parent().css({"background":"rgba(0,0,0,0.1","color":"white"}).parent().removeClass("box");
	$("#"+id2).contents().unwrap();
}

function flipTILE()	
{
	if (started== true) {
	val=$(this).children().children().text();
	id=$(this).children().children().attr("id");

	if(val && card_values.length < 2)
	{
		flip(this);
		
		if(card_values.length == 0)
		{
			card_values.push(val);
			card_ids.push(id);
		} 
		else if(card_values.length == 1 &&card_ids[0]!=id)
		{
			card_values.push(val);
			card_ids.push(id);
			clicks++;
			$("#turns").text("Turns = "+clicks);
			if(card_values[0] == card_values[1])
			{
				cards_flipped += 2;
				Disable(card_ids[0] , card_ids[1]);
				score+=10;
				$("#score").text("SCORE = "+(score-clicks));
				card_values = [];
            	card_ids = [];
				if(cards_flipped == 16)
				{
					if(level == "beginner") {
				$(".overlay-content .content-wrapper p").html("TRY MEDIUM LEVEL.");
				} else if(level == "medium"){
				$(".overlay-content .content-wrapper p").html("TRY EXPERT LEVEL.");
				} else if(level == "expert"){
				$(".overlay-content .content-wrapper p").html("YOU ARE AN EXPERT!");
				}
				$(".overlay-content .content-wrapper h1").html("CONGRATULATIONS!");
				$(".overlay-content").addClass("active");
				clearInterval(counter);
				}
			} 
			else 
			{
				setTimeout(defaultstate, 500);
			}
		}
		else if(card_values.length == 1 &&card_ids[0]==id)
		{
			defaultstate();
		}
	}
	$(".blank").text(score+"   "+clicks);
}
}
function defaultstate()	
{
    $("#"+card_ids[0]).parent().parent().removeClass("flipped");
    $("#"+card_ids[1]).parent().parent().removeClass("flipped");
    card_values = [];
    card_ids = [];
}
function flip(which) 
{
    $(which).addClass('flipped');
}
function addTILES()
{
	var card="";
	for(var i=0;i<16;i++)
	{
		if(i % 4 == 0)
		{	
			card += "<div class='row'>";
		}
		card += '<div class="flip3D tiles box"><div class="front colorbox"></div><div class="back colorbox"><span id="'+i+'"></span></div></div>';
		if(i % 4 == 3)
		{
			card += "</div>";
		}
	}
	$('.container').html(card);
}

function initialise()
{
	addTILES();
	newTILE();
	$("#turns").text("TURNS = "+clicks);
	$("#score").text("SCORE = "+(score-clicks));
	for(var i=0;i<16;i++)
	{
		document.getElementsByClassName("box")[i].onclick=flipTILE;
	}
}

$(".start-game").on("click", function() {
	if($("input[type=radio]").is(":checked")) {
		started = true;
		level = $("input[type=radio]:checked").val();
		if(level == "beginner") {
			countdownTime = 61;
		} else if(level == "medium") {
			countdownTime = 41;
		} else if(level == "expert") {
			countdownTime = 21;
		}
		counter = setInterval(timer, 1000);
		//$(".level-container").hide();

	}
});

$('.reload').click(function() {
    location.reload();
});