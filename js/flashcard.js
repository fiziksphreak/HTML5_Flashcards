/**
 * @author fiziksphreak
 */

var y, ny=0, inner_text, rotYINT, front=true, front_text="FRONT", back_text="BACK", card_text, cur=0, max;

function rotateYDIV()
{
	y=document.getElementById("flashcard");
	inner_text = document.getElementById("inner_text");
	clearInterval(rotYINT);
	rotYINT=setInterval("startYRotate()",1);
}

function startYRotate()
{
	ny=ny+1;
	y.style.transform="rotateY(" + ny + "deg)";
	y.style.webkitTransform="rotateY(" + ny + "deg)";
	y.style.OTransform="rotateY(" + ny + "deg)";
	y.style.MozTransform="rotateY(" + ny + "deg)";
	
	if (ny==90)
	{
		clearInterval(rotYINT);
		if(front)
		{
			front=false;
			var tmp = "";
			try
			{
				tmp = card_text[cur].back_text;
			}
			catch(err)
			{
				tmp = "BACK DEFAULT";
			}
			
			inner_text.innerHTML = tmp;
			//y.front.style.visibility='hidden'
		}
		else
		{
			front=true
			var tmp = "";
			try
			{
				tmp = card_text[cur].front_text;
			}
			catch(err)
			{
				tmp = "FRONT DEFAULT";
			}
			
			// y.innerHTML = tmp + "<br /><img src=\"img/glyphicons-halflings.png\">";
			inner_text.innerHTML = tmp;
			//y.front.style.visibility='visible'
		}
		rotYINT=setInterval("endYRotate()",1);
	}
}

function endYRotate()
{
	ny=ny-1;
	y.style.transform="rotateY(" + ny + "deg)";
	y.style.webkitTransform="rotateY(" + ny + "deg)";
	y.style.OTransform="rotateY(" + ny + "deg)";
	y.style.MozTransform="rotateY(" + ny + "deg)";
	
	if (ny <= 0)
	{
		clearInterval(rotYINT);
	}
}

function showUser(str)
{
	if (str=="")
	  {
	  document.getElementById("txtHint").innerHTML="";
	  return;
	  } 
	if (window.XMLHttpRequest)
	  {// code for IE7+, Firefox, Chrome, Opera, Safari
	  xmlhttp=new XMLHttpRequest();
	  }
	else
	  {// code for IE6, IE5
	  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	  }
	xmlhttp.onreadystatechange=function()
	  {
	  if (xmlhttp.readyState==4 && xmlhttp.status==200)
	    {
	    	front_text=xmlhttp.responseText;
	    	document.getElementById("txtHint").innerHTML=front_text;
	    }
	  }
	xmlhttp.open("GET","php/db_conn.php?q="+str,true);
	xmlhttp.send();
}

function loadInit()
{
	//alert("This page is currently under construction.");
	getClassList();
	getDeckList();
	load_canvas();
}

function getClassList()
{
	var class_text;
	
	if (window.XMLHttpRequest)
	  {// code for IE7+, Firefox, Chrome, Opera, Safari
	  xmlhttp=new XMLHttpRequest();
	  }
	else
	  {// code for IE6, IE5
	  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	  }
	xmlhttp.onreadystatechange=function()
	  {
	  if (xmlhttp.readyState==4 && xmlhttp.status==200)
	    {
	    	alert("before class_text assigned");
	    	class_text = JSON.parse(xmlhttp.responseText);
	    	alert("after class_text assigned");
	    	var tmp = '<option value="">Select a class:</option>';
	    	
	    	for (var i = 0; i < class_text.length; i++)
	    	{
				tmp += "<option value=\"";
    			// tmp += i + 1;
    			tmp += class_text[i].name;
    			tmp += "\">";
    			tmp += class_text[i].name;
    			tmp += "</option>";
	    	}
	    	
	    	//alert(tmp);
	    	document.getElementById("class_select").innerHTML=tmp;
	    }
	  }
	xmlhttp.open("GET","php/class_list.php",true);
	xmlhttp.send();
}

function getDeckList()
{
	var deck_text;
	
	if (window.XMLHttpRequest)
	  {// code for IE7+, Firefox, Chrome, Opera, Safari
	  xmlhttp=new XMLHttpRequest();
	  }
	else
	  {// code for IE6, IE5
	  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	  }
	xmlhttp.onreadystatechange=function()
	  {
	  if (xmlhttp.readyState==4 && xmlhttp.status==200)
	    {
	    	deck_text = JSON.parse(xmlhttp.responseText);
	    	var tmp = '<option value="">Select a deck:</option>';
	    	
	    	for (var i = 0; i < deck_text.length; i++)
	    	{
				tmp += "<option value=\"";
    			// tmp += i + 1;
    			tmp += deck_text[i].name;
    			tmp += "\">";
    			tmp += deck_text[i].name;
    			tmp += "</option>";
	    	}
	    	
	    	//alert(tmp);
	    	document.getElementById("deck_select").innerHTML=tmp;
	    }
	  }
	xmlhttp.open("GET","php/deck_list.php",true);
	xmlhttp.send();
}

function getClass(str)
{
	// do something here
}

function getCards(str)
{
	if (window.XMLHttpRequest)
	  {// code for IE7+, Firefox, Chrome, Opera, Safari
	  xmlhttp=new XMLHttpRequest();
	  }
	else
	  {// code for IE6, IE5
	  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	  }
	xmlhttp.onreadystatechange=function()
	  {
	  if (xmlhttp.readyState==4 && xmlhttp.status==200)
	    {
	    	card_text = JSON.parse(xmlhttp.responseText);
	    	var tmp = "";
	    	cur = 0;
	    	max = card_text.length;
	    	
	    	for (var i = 0; i < max; i++)
	    	{
    			tmp += card_text[i].front_text;
    			tmp += " : ";
    			tmp += card_text[i].back_text;
    			tmp += "<br />";
	    	}

	    	document.getElementById("txtHint").innerHTML=tmp;
	    	
	    	try
	    	{
	    		inner_text.innerHTML = card_text[cur].front_text;
	    	}
	    	catch (err)
	    	{
	    		document.getElementById("inner_text").innerHTML = card_text[cur].front_text;
	    	}
	    	front = true;
	    	document.getElementById("card_count").innerHTML = (cur + 1) + " of " + max;
	    	document.getElementById("flashcards_header").innerHTML = str;
	    }
	  }
	xmlhttp.open("POST","php/get_cards.php",true);
	xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	xmlhttp.send("name=" + str);
}

function nextCard()
{
	if(cur >= (max - 1))
	{
		cur = 0;
	}
	else
	{
		cur++;
	}
	
	try
	{
		inner_text.innerHTML = card_text[cur].front_text;
	}
	catch (err)
	{
		document.getElementById("inner_text").innerHTML = card_text[cur].front_text;
	}
	front = true;
	
	document.getElementById("card_count").innerHTML = (cur + 1) + " of " + max;
}
