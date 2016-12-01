//GLOBAL VARIABLES
bigImg="images/careers/careers.jpg";
function Career(nameIn,descIn,typeIn,imgIn){
	this.type=typeIn;
	this.name=nameIn;
	this.desc=descIn;
	this.img=imgIn;
};
var appCareers;
//ON PAGE LOAD
window.onload=startScript;

function startScript(){
	appCareers = new CareersApp();
	appCareers.display();
	console.log(appCareers);
}

//CAREERS DISPLAY OBJECT
function CareersApp(){
	//Visible only in object(PRIVATE)
	var careers =[];

	//Properties(public)
	this.state=0;//state of object
	this.applicationForm='';//application form element
	this.applicationContainerId='main';//block ID where view will be inputed
	this.display= function(){
		this.clearAll();
		this.initBlocks();
		this.getData();
		this.setInitials();
		this.startTabs();
	};

	this.update= function(){
		if(this.state===0){
			this.display();
		}
		else if (this.state===1) {
			this.getData();
			this.setInitials();
			this.startTabs();
		}
		else if (this.state===2) {
			this.setInitials();
			this.startTabs();
		}
		else if (this.state===3) {
			this.startTabs();
		};
	};
	//Getting DATA
	this.getData=function(){
		if(this.state!==1) return;
		careers.push(new Career("Servers","Description",1,bigImg));
		careers.push(new Career("Bartenders","Description",2,bigImg));
		careers.push(new Career("Host/Hostess","Description",3,bigImg));
		careers.push(new Career("Food Runners","Description",4,bigImg));
		careers.push(new Career("Line and Prep Cooks","Description",5,bigImg));
		careers.push(new Career("Dishwashers","Description",6,bigImg));
		careers.push(new Career("Buspersons","Description",7,bigImg));
		this.state=2;
	};
	//ONLY DISPLAY CURRENT DATA
	this.getCareers=function (){
		return careers;
	};
	//SETING INITIAL VALUES USING GLOBAL DATA
	this.setInitials=function (){
			//initial setup

	    if(this.state!==2) return;

		$("#careers-list").css("width","25%");
		$(".col-3::last").hide();
		$(".col-3::last").css("float","right");
		$("#careers-desc").css({"width":"75%","background-image":"url("+bigImg+")","background-repeat":"no-repeat","background-size":"cover"});

		var careersList = '';
		for (var i = 0; i < careers.length; i++) {
		careersList += '<li class="career-item" value="'+careers[i].type+'"><h3>' + careers[i].name +  '</h3></li>';
		}

		var careersBlock= document.getElementById('careers-list');
		careersBlock.innerHTML +='<ul>' + careersList+'</ul>';

		this.applicationForm=document.getElementById('sendmsg');
		this.applicationForm.getElementsByTagName('select')[0].innerHTML='';

		for (var i = 0; i < careers.length; i++) {
			var opt = document.createElement('option');
			opt.text = careers[i].name;
			opt.value= careers[i].type;
			this.applicationForm.getElementsByTagName('select')[0].options.add(opt);
		}
		this.state=3;
	};
	//ENABLING INTERECTION BETWEEN ELEMENTS
	this.startTabs=function(){

	    if(this.state!==3) return;

		var tempColor='';
		$('.career-item').hover(
			function(){
				tempColor=$(this).css("color");
				$(this).css("color",$(this).css("background-color"));
				$(this).css("background-color",tempColor);
				console.log("IN");
			},
			function(){
				tempColor=$(this).css("color");
				$(this).css("color",$(this).css("background-color"));
				$(this).css("background-color",tempColor);
				console.log("OUT");
			}
			);
		function  changeColors(elemant)
		{

		}
		$('.career-item').bind("click", function()
			{
				$("#careers-desc").hide();
				$("#apply-form").hide();
				$("#careers-desc").css({"width":"45%","background":"#fff"});
				$("#apply-form").css({"width":"30%","background":"#fff"});

				console.log("IN0000");
				$('.career-item').css({"background-color":"#fff"});
				$('.career-item').css({"color":"#666"});
				console.log("Out0000");
				

				$("#apply-form").show(1000);
				$("#careers-desc").show(1000);

				var typeIn=this.value;
				var curChoise=$.grep(careers, function(e){ return e.type === typeIn; }).pop();
				$("#careers-desc").html('<h2>'+curChoise.name+'</h2>');
				$("#careers-desc").append('<p>'+curChoise.desc+'</p>');
				$("#careers-desc").append('<img src="'+curChoise.img+'" alt="Image of '+curChoise.name+'"/>');
				$("#careers-desc").find('img').css("width","100%");
				document.getElementById('apply-form').getElementsByTagName('select')[0].value=typeIn;
				
			});

		this.applicationForm.getElementsByTagName('select')[0].onchange=function(){
			$('.career-item[value="'+this.value+'"]').click();
		};
		this.applicationForm.onsubmit=valApplication;

		function valApplication() {
			 	
			var errorMsg='';
			var nameValue=this.user_name.value;

			if(nameValue === "" || nameValue === null){
		    
		    	errorMsg = this.user_name;
		    	errorMsg.style.background = "red";
		    	errorMsg.focus();
		    	return false;
			}

			var emailRE = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			if (!emailRE.test(this.user_email.value)){
		    	errorMsg = this.user_email;
		    	errorMsg.style.background = "red";
		    	errorMsg.focus();
		    	return false;
				}

			var phoneRE = /^\d{10}$/;
			if (!phoneRE.test(this.user_phone.value)){
		    	errorMsg = this.user_email;
		    	errorMsg.style.background = "red";
		    	errorMsg.focus();
		    	return false;
				}
				$("#apply-form").html('<p> Thanks,'+this.user_name.value+ ', for your application!</p>');
			return false;  
		};
		this.state=4;
	}
	//HIDE everything
	this.clearAll=function(){
		document.getElementById(this.applicationContainerId).innerHTML='';
	};
	//CREATING HTML ELEMENTS
	this.initBlocks=function (){ 
	    if(this.state!==0) return;
		var el='';
		var divEl='';
		
		el = document.createElement('h1');  
	    el.innerHTML = "Careers";
	    document.getElementById(this.applicationContainerId).appendChild(el);

		el = document.createElement('div');
		el.id="columns-main";
	    document.getElementById(this.applicationContainerId).appendChild(el);

		el = document.createElement('nav');
		el.id="careers-list";
		el.innerHTML="<h2 class='hidden'>Careers navigation</h2>"
		el.className="col-3";
	    document.getElementById('columns-main').appendChild(el);

		el = document.createElement("article");
		el.id="careers-desc";
		el.className="col-3";
	    document.getElementById('columns-main').appendChild(el);

		el = document.createElement('aside');
		el.id="apply-form";
		el.className="col-3";
	    document.getElementById('columns-main').appendChild(el);

		el = document.createElement("h2");  
	    el.innerHTML = "Apply";
	    document.getElementById('apply-form').appendChild(el);

		el = document.createElement('form');  
		el.id="sendmsg";
		el.action="index.html";
		el.method="post";
	    document.getElementById('apply-form').appendChild(el);
		
		var newForm=document.getElementById('sendmsg');

		divEl = document.createElement('div');
		el = document.createElement('label');
		el.for='user_name';
		el.innerHTML="Enter your name:";
	    divEl.appendChild(el);
	    newForm.appendChild(divEl);

	    divEl = document.createElement('div');
	    el = document.createElement('input');
	    el.type="text";
	    el.id="name";
	    el.name="user_name";
	    el.placeholder="Enter your name here...";
		divEl.appendChild(el);
	    newForm.appendChild(divEl);

	    divEl = document.createElement('div');
		el = document.createElement('label');
		el.for='user_email';
		el.innerHTML="Enter your email:";
	    divEl.appendChild(el);
	    newForm.appendChild(divEl);

	    divEl = document.createElement('div');
	    el = document.createElement('input');
	    el.type="text";
	    el.id="email";
	    el.name="user_email";
	    el.placeholder="Enter your email here...";
		divEl.appendChild(el);
	    newForm.appendChild(divEl);

	  	divEl = document.createElement('div');
		el = document.createElement('label');
		el.for='user_phone';
		el.innerHTML="Enter your phone:";
		divEl.appendChild(el);
	    newForm.appendChild(divEl);

	    divEl = document.createElement('div');
	    el = document.createElement('input');
	    el.type="text";
	    el.id="phone";
	    el.name="user_phone";
	    el.placeholder="Enter your phone here...";
		divEl.appendChild(el);
	    newForm.appendChild(divEl);


	    divEl = document.createElement('div');
		el = document.createElement('label');
		el.for='user_job_title';
		el.innerHTML="Apply as:";
		divEl.appendChild(el);
	    newForm.appendChild(divEl);


	    divEl = document.createElement('div');
	    el = document.createElement('select');
	    el.name="user_job_title";
		divEl.appendChild(el);
	    newForm.appendChild(divEl);

	    divEl = document.createElement('div');
		el = document.createElement('label');
		el.for='user_msg';
		el.innerHTML="Additional information:";
		divEl.appendChild(el);
	    newForm.appendChild(divEl);

	    divEl = document.createElement('div');
	    el = document.createElement('textarea');
	    el.id="message	";
	    el.name="user_msg";
		divEl.appendChild(el);
	    newForm.appendChild(divEl);

	    divEl = document.createElement('div');
		el = document.createElement('button');
		el.type='submit';
		el.name='submit';
		el.innerHTML="Apply now!";	
		divEl.appendChild(el);
	    newForm.appendChild(divEl);

	    this.state=1;
		};

}