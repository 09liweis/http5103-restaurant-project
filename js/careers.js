//GLOBAL VARIABLES
var bigImg="images/careers/careers.jpg";
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
	// TEST FOR SEARCH STRING
	if(/^\?target=(\d)+$/.test(location.search))   
		$('.career-item[value="'+location.search.replace( /^\D+/g, '')+'"]').click();
}

//CONSTRUCTOR FOR CAREERS_DISPLAY OBJECT
function CareersApp(){
	//Visible only in object(PRIVATE)
	var careers =[];

	//Properties(public)
	this.state=0;//state of object(to control stages of creation)
	this.applicationForm='';//application form element
	this.applicationContainerId='main';//block ID where view will be inputed

	//function to display ALL
	this.display= function(){
		this.clearAll();
		this.initBlocks();
		this.getData();
		this.setInitials();
		this.startTabs();
	};

	//function to update object
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

	//Getting DATA ---- could be changed on ajax get
	this.getData=function(){
		if(this.state!==1) return;
		careers.push(new Career("Servers","Perform duties which combine preparing and serving food and nonalcoholic beverages.	",1,'images/careers/servers.jpg'));
		careers.push(new Career("Bartenders","Mix and serve drinks to patrons, directly or through waitstaff.",2,'images/careers/bartender.jpg'));
		careers.push(new Career("Host/Hostess","Welcome patrons, seat them at tables or in lounge, and help ensure quality of facilities and service.",3,'images/careers/host.jpg'));
		careers.push(new Career("Food Runners","Assist waiters and waitresses in running food from the kitchen to customer tables.",4,'images/careers/foodrunners.jpg'));
		careers.push(new Career("Line and Prep Cooks","	Prepare, season, and cook dishes such as soups, meats, vegetables, or desserts in restaurants. May order supplies, keep records and accounts, price items on menu, or plan menu.",5,'images/careers/linecooks.jpg'));
		careers.push(new Career("Dishwashers","Clean dishes, kitchen, food preparation equipment, or utensils.",6,'images/careers/dishwasher.jpg'));
		careers.push(new Career("Buspersons","This person is responsible to set and clears restaurant tables, stocks all service stations and assist food servers with table service to ensure total guest satisfaction.",7,'images/careers/foodrunners.jpg'));
		this.state=2;
	};

	//Return current data
	this.getCareers=function (){
		return careers;
	};

	//SET INITIAL VALUES AND DATA
	this.setInitials=function (){
		
		//initial setup
	    if(this.state!==2) return;

		$("#careers-list").css("width","25%");
		$(".col-3::last").css("float","right");
		$("#careers-desc").hide();
		$("#apply-form").hide();
		$("#careers-desc-cont").css({"width":"75%","background-image":"url("+bigImg+")","background-repeat":"no-repeat","background-size":"cover"});

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

		//display appropriate info onClick
		$('.career-item').bind("click", function()
			{
				$("#careers-desc-cont").hide();
				$("#careers-desc").hide();
				$("#apply-form").hide();
				$("#careers-desc-cont").css({"width":"75%","background":"#fff"});
				$("#careers-desc").css({"overflow": "hidden"});
				$("#apply-form").css({"width":"100%","background":"#fff"});

				//$('.career-item').css({"background-color":"#fff"});
				//$('.career-item').css({"color":"#666"});

				$("#careers-desc-cont").show(1000);
				$("#careers-desc").show();
				$("#apply-form").show();


				var typeIn=this.value;
				var curChoise=$.grep(careers, function(e){ return e.type === typeIn; }).pop();
				history.pushState(null,"", 'careers.html?target='+typeIn);
				$("#careers-desc").html('<h2>'+curChoise.name+'</h2>');
				$("#careers-desc").append('<img src="'+curChoise.img+'" alt="Image of '+curChoise.name+'"/>');
				$("#careers-desc").append('<h3> Job description : </h3>');
				$("#careers-desc").append('<p>'+curChoise.desc+'</p>');
				$("#careers-desc").append('<p>If you enjoy working in an upbeat environment and have the personality to match,you may be just who we’re looking for.</p>')
				$("#careers-desc").find('img').css({"width":"300px","float": "left","padding":"10px"});
				document.getElementById('apply-form').getElementsByTagName('select')[0].value=typeIn;
				
			});
		//change info when changed career in application form
		this.applicationForm.getElementsByTagName('select')[0].onchange=function(){
			$('.career-item[value="'+this.value+'"]').click();
		};
		//validate application form
		this.applicationForm.onsubmit=valApplication;

		//function to validate application form
		function valApplication() {
			var errorMsg='';
			var nameValue=this.user_name.value;
			$(".form-input").css({"background": "#fff"});
			//name has to be entered!
			if(nameValue === "" || nameValue === null){
		    	errorMsg = this.user_name;
		    	errorMsg.style.background = "rgba(0,0,0,0.46)";
		    	errorMsg.focus();
		    	return false;
			}
			else
			//Email has to mach regEx
			var emailRE = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
			if (!emailRE.test(this.user_email.value)){
		    	errorMsg = this.user_email;
		    	errorMsg.style.background = "rgba(0,0,0,0.46)";
		    	errorMsg.focus();
		    	console.log("sss"+this.user_email.value+"sss"+emailRE.test(this.user_email.value));
		    	return false;
				}
			//Phone has to be entered 
			var phoneRE = /^\d{3}(\s|-)?\d{3}(\s|-)?\d{4}$/;
			if (!phoneRE.test(this.user_phone.value)){
		    	errorMsg = this.user_phone;
		    	errorMsg.style.background = "rgba(0,0,0,0.46)";
		    	errorMsg.focus();
		    	return false;
				}
			//Confirmation of application form validation
			$("#apply-form").html('<p> Thanks,'+this.user_name.value+ ', for your application!</p>');
			return false;  
		};
		this.state=4;
	}
	//HIDE everything
	this.clearAll=function(){
		document.getElementById(this.applicationContainerId).innerHTML='';
		careers=[];
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

	    el = document.createElement("div");
		el.id="careers-desc-cont";
		el.className="col-3";
	    document.getElementById('columns-main').appendChild(el);

		el = document.createElement("article");
		el.id="careers-desc";	
		el.style="margin-bottom: 10px;"
	    document.getElementById('careers-desc-cont').appendChild(el);

		el = document.createElement('aside');
		el.id="apply-form";
	    document.getElementById('careers-desc-cont').appendChild(el);

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
		divEl.className="form-group";
		el = document.createElement('label');
		el.for='user_name';
		el.className="form-label";
		el.innerHTML="Enter your name:";
	    divEl.appendChild(el);
	    el = document.createElement('input');
	    el.type="text";
	    el.id="name";
	    el.name="user_name";
		el.className="form-input";
	    el.placeholder="Enter your name here...";
		divEl.appendChild(el);
	    newForm.appendChild(divEl);

	    divEl = document.createElement('div');
		divEl.className="form-group";
		el = document.createElement('label');
		el.for='user_email';
		el.className="form-label";
		el.innerHTML="Enter your email:";
	    divEl.appendChild(el);
	    el = document.createElement('input');
	    el.type="text";
	    el.id="email";
	    el.name="user_email";
		el.className="form-input";
	    el.placeholder="Enter your email here...";
		divEl.appendChild(el);
	    newForm.appendChild(divEl);

	  	divEl = document.createElement('div');
		divEl.className="form-group";
		el = document.createElement('label');
		el.for='user_phone';
		el.className="form-label";
		el.innerHTML="Enter your phone:";
		divEl.appendChild(el);
	    el = document.createElement('input');
	    el.type="text";
	    el.id="phone";
	    el.name="user_phone";
		el.className="form-input";
	    el.placeholder="Enter your phone here...";
		divEl.appendChild(el);
	    newForm.appendChild(divEl);


	    divEl = document.createElement('div');
		divEl.className="form-group";
		el = document.createElement('label');
		el.for='user_job_title';
		el.className="form-label";
		el.innerHTML="Apply as:";
		divEl.appendChild(el);
	    el = document.createElement('select');
	    el.name="user_job_title";
		el.className="form-input";
		divEl.appendChild(el);
	    newForm.appendChild(divEl);

	    divEl = document.createElement('div');
		divEl.className="form-group";
		el = document.createElement('label');
		el.for='user_msg';
		el.className="form-label";
		el.innerHTML="Additional information:";
		divEl.appendChild(el);
	    el = document.createElement('textarea');
	    el.id="message";
	    el.name="user_msg";
		el.className="form-input";
		divEl.appendChild(el);
	    newForm.appendChild(divEl);

	    divEl = document.createElement('div');
		divEl.className="form-group";
		el = document.createElement('button');
		el.type='submit';
		el.name='submit';
		el.className="button";
		el.innerHTML="Apply now!";	
		divEl.appendChild(el);
	    newForm.appendChild(divEl);

	    this.state=1;
		};
}