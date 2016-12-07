function SpecialDeal(dayIn,dateIn,titleIn='New deal',imgIn,descIn){
	this.img=imgIn;
	this.desc=descIn;
	this.title=titleIn;
	this.day=dayIn;
	this.date=new Date(dateIn);
};

window.onload=startScript;

var app='';
function startScript(){
	app=new DailySpealsApp();
	app.start();

	if(/^\?target=(\d)+$/.test(location.search))   // TEST FOR SEARCH STRING
		{
			switch (location.search.replace( /^\D+/g, ''))
			{
				case '0': $('#prevWeek').click();break;
				case '2': $('#nextWeek').click();break;
				default: break;
			};
		}
};

function DailySpealsApp(){
	this.state=0;
	this.applicationContainerId='main';//block ID where view will be inputed

	var nowDate=new Date();
	this.slideIndex=nowDate.getDay()+1;

	this.specials={
		0:[],//prevSpecials
		1:[],//curSpecials
		2: []//nextSpecials
	};
	this.curWeek=1;
	this.autoAnimationOn=true;

	var animationInv='';
	var timerCountDownInv='';

	this.start= function(){
		this.initBlocks();
		this.getSpecialDeals();
		this.updateInfo();
		this.showSlides(this.slideIndex);
		this.setOnclicks();
	};


	//slides

	this.plusSlides=function(n) {
 		this.slideIndex+=n;
  		this.showSlides(this.slideIndex);
	};

	this.currentSlide=function(n) {
		this.slideIndex=n;
  		this.showSlides(this.slideIndex);
	};

	this.showSlides=function(n) {
	  	if (n >this.specials[this.curWeek].length) {this.slideIndex = 1};
	  	if (n <=0) {this.slideIndex = this.specials[this.curWeek].length};
	  	if (this.curWeek===0) {	
	  		document.getElementById('timerCountDownBox').style.display='none';
	  	} 
	  	else {
	  		document.getElementById('timerCountDownBox').style.display='block';
	  	}
	  	if (this.curWeek===1) {document.getElementById('timerCountDownText').innerHTML="Time to end:";}
	  	else if(this.curWeek===2){document.getElementById('timerCountDownText').innerHTML="Time to start:";}
	  	var curSlideEl=document.getElementById('curSlide');

	  	document.getElementById('curSlideImg').src=this.specials[this.curWeek][this.slideIndex-1].img;
	  	document.getElementById('dealTitle').innerHTML='<h2>'+this.specials[this.curWeek][this.slideIndex-1].title+'</h2>';
	  	document.getElementById('dealDesc').innerHTML='<p>'+this.specials[this.curWeek][this.slideIndex-1].desc+'</p>';
	  	document.getElementById('curSlideDay').innerHTML=this.specials[this.curWeek][this.slideIndex-1].day;
	  	document.getElementById('curSlidePosition').innerHTML=this.slideIndex+'/'+this.specials[this.curWeek].length;
	  	clearInterval(timerCountDownInv);
	  	var self=this;
	  	timerCountDownInv=setInterval(function(){
	  		var now=new Date();
	  		var dateDiff= self.specials[self.curWeek][self.slideIndex-1].date.getTime()-now.getTime();
	  		if (dateDiff<0) 
	  		{
	  			document.getElementById('timerCountDownText').innerHTML="Special deal expired!"; 
	  			document.getElementById('timerCountDown').innerHTML='';
	  			return;
	  		}
	  		if(Math.floor(dateDiff/(60*60*24*1000))===0)
	  			document.getElementById('timerCountDown').innerHTML='';
	  		else if(Math.floor(dateDiff/(60*60*24*1000))===1)
	  			document.getElementById('timerCountDown').innerHTML='1 day ';
	  		else 
				document.getElementById('timerCountDown').innerHTML=Math.floor(dateDiff/(60*60*24*1000))+" days ";
	  		
	  		document.getElementById('timerCountDown').innerHTML+=Math.floor((dateDiff%(60*60*24*1000))/(60*60*1000))+": ";
	  		document.getElementById('timerCountDown').innerHTML+=Math.floor((dateDiff%(60*60*1000))/(60*1000))+": ";
	  		document.getElementById('timerCountDown').innerHTML+=Math.floor(dateDiff%(60*1000)/(1000))+"";
	  		
	  	},500); 

	};

	this.setOnclicks=function(){
		var self=this;
	  	$('#prev').click(function(){self.plusSlides(-1);self.autoAnimationOn=false;clearInterval(animationInv);});
	  	$('#next').click(function(){self.plusSlides(1 );self.autoAnimationOn=false;clearInterval(animationInv);});
	  	$('#curSlideImg').click(function(){
	  		if(self.autoAnimationOn){self.autoAnimationOn=false;clearInterval(animationInv);}
	  		else{self.autoAnimationOn=true;animationInv=setInterval(function(){self.plusSlides(1);},5000);};
	  	});
	  	$('#prevWeek').click(function(){
	  		self.curWeek-=1;
	  		history.pushState(null,"", 'daily-specials.html?target='+self.curWeek);
	  		self.updateInfo();		
	  		if(self.curWeek!==1) {
	  			this.style.display='none';
	  			document.getElementById('slideArea').style="width:85%;";
	  			document.getElementById('nextWeekText').innerHTML="This week";
	  			document.getElementById('weekTitle').innerHTML="Previous week special";
	  		}
	  		else {
	  			this.style.display='block';
	  			document.getElementById('slideArea').style="width:70%;";
	  			document.getElementById('prevWeekText').innerHTML="Previous week";
	  			document.getElementById('weekTitle').innerHTML="This week special";
	  		}
	  		document.getElementById('timerCountDown').innerHTML='';
	  		document.getElementById('nextWeek').style.display='block';
	  		self.slideIndex=1;
	  		self.showSlides();
	  	});
	  	$('#nextWeek').click(function(){
	  		self.curWeek+=1;
	  		history.pushState(null,"", 'daily-specials.html?target='+self.curWeek);
	  		self.updateInfo();
	  		if(self.curWeek!==1) {
	  			this.style.display='none';
	  			document.getElementById('slideArea').style="width:85%;";
	  			document.getElementById('prevWeekText').innerHTML="This week";
	  			document.getElementById('weekTitle').innerHTML="Next week special";
	  		}
	  		else {
	  			this.style.display='block';
	  			document.getElementById('slideArea').style="width:70%;";
	  			document.getElementById('nextWeekText').innerHTML="Next week";
	  			document.getElementById('weekTitle').innerHTML="This week special";
	  		}
	  		document.getElementById('timerCountDown').innerHTML='';
	  		document.getElementById('prevWeek').style.display='block';
	  		self.slideIndex=1;
	  		self.showSlides();
	  	});

	  	if(this.autoAnimationOn){
	  		animationInv=setInterval(function(){self.plusSlides(1);},5000);
	  	};
	}

//EVERYTHING (Hardcoded staff)
	this.updateInfo=function(){
		var el='';	
		var imgEl='';
		var imgHead='';
		var listEl = document.createElement('ul');
	
		document.getElementById('prevWeek').innerHTML='';
		document.getElementById('nextWeek').innerHTML='';

	    if(this.curWeek!==0)
		{
		    el = document.createElement('div');
		    el.id="prevWeekText";
			el.className="text";
			el.innerHTML="Previous week";
		    document.getElementById('prevWeek').appendChild(el);

			for (var i = 0; i < this.specials[this.curWeek-1].length; i++) {
				el = document.createElement('li');
				el.style="position:relative;";
				imgEl =document.createElement('img');
				imgHead=document.createElement('div');
				imgHead.style="position: absolute; top: 3px; font-size: 0.5em;color: white;";
				imgHead.innerHTML='<h3>'+this.specials[this.curWeek-1][i].title+'</h3>';
				imgEl.src=this.specials[this.curWeek-1][i].img;
				el.appendChild(imgEl);
				el.appendChild(imgHead); 
				listEl.appendChild(el);
			}
		    document.getElementById('prevWeek').appendChild(listEl);
		}
		if(this.curWeek!==2)
		{
		    el = document.createElement('div');
		    el.id="nextWeekText";
			el.className="text";
			el.innerHTML="Next week";
		    document.getElementById('nextWeek').appendChild(el);

		    listEl = document.createElement('ul');
			for (var i = 0; i < this.specials[this.curWeek+1].length; i++) {
				el = document.createElement('li');
				el.style="position:relative;";
				imgEl =document.createElement('img');
				imgHead=document.createElement('div');
				imgHead.style="position: absolute; top: 3px; font-size: 0.5em;color: white;";
				imgHead.innerHTML='<h3>'+this.specials[this.curWeek+1][i].title+'</h3>';
				imgEl.src=this.specials[this.curWeek+1][i].img;
				el.appendChild(imgEl);
				el.appendChild(imgHead); 
				listEl.appendChild(el);
			}
		    document.getElementById('nextWeek').appendChild(listEl);
		}
	};
	this.getSpecialDeals= function(){

		var date=new Date();
		date.setHours(23,59,59,999);
		date.setTime(date.getTime()-(7+date.getDay())*24*60*60*1000);

		this.specials[0].push(new SpecialDeal('All week',date.getTime(),'Free Coffee','images/dailyspecials/deal2.jpg','Everyday untill 12PM for orders above 20$ - free cup of coffee.'));
		this.specials[0].push(new SpecialDeal('Sunday/Saturday',date.getTime(),'Weekend surprise','images/dailyspecials/deal1.jpg','For each cup of coffee - cruasan for free.'));

		date.setTime(date.getTime()+14*24*60*60*1000);
	
		this.specials[1].push(new SpecialDeal('Sunday/Saturday',date.getTime(),'Steak discount','images/dailyspecials/deal4.jpg','Get great discounts on whole variety of meat!'));
		this.specials[1].push(new SpecialDeal('Monday/Wednesday/Friday',date.getTime(),'Coffee hours','images/dailyspecials/deal2.jpg','Everyday untill 12PM for orders above 20$ - free cup of coffee.'));
		this.specials[1].push(new SpecialDeal('Monday/Tuesday/Thursday',date.getTime(),'Lunch hours','images/dailyspecials/deal6.jpg','Get up to 50% off on Apple pie.'));

		this.specials[2].push(new SpecialDeal('Sunday/Saturday',date.getTime(),'Steak discount','images/dailyspecials/deal4.jpg','Get great discounts on whole variety of meat!'));
		this.specials[2].push(new SpecialDeal('Monday/Wednesday/Friday',date.getTime(),'Salad time','images/dailyspecials/deal3.jpg','Get up to 50% off on each salad till 12PM.'));
		this.specials[2].push(new SpecialDeal('Monday/Tuesday/Thursday',date.getTime(),'Lunch hours','images/dailyspecials/deal6.jpg','Get up to 50% off on Apple pie.'));

	};

	this.initBlocks= function(){
		var el='';
		el = document.createElement('div');
		el.id="specialsContainer";
	    document.getElementById(this.applicationContainerId).appendChild(el);

	   	el = document.createElement('div');
	    el.id="prevWeek";
		el.className="col-3";
		el.style="float:left;width:15%;";
	    document.getElementById('specialsContainer').appendChild(el);

	    el = document.createElement('div');
	    el.id="slideArea";
		el.className="col-3";
		el.style="width:70%";
	    document.getElementById('specialsContainer').appendChild(el);

	    el = document.createElement('div');
	    el.id="curSlide";
		el.className="fade";
	    document.getElementById('slideArea').appendChild(el);

	    el = document.createElement('div');
	    el.id="curSlidePosition";
		el.className="numbertext";
	    document.getElementById('curSlide').appendChild(el);

	    el = document.createElement('img');
	    el.id="curSlideImg";
		el.style="";
	    document.getElementById('curSlide').appendChild(el);

	    el = document.createElement('div');
	    el.id="curSlideDay";
		el.className="text";
	    document.getElementById('curSlide').appendChild(el);

	    el = document.createElement('div');
	    el.id="weekTitle";
	    el.innerHTML="This week special";
		el.style="position: absolute; top: 0px; width: 100%; font-size: 28px;  text-align: center; padding: 8px 12px; color: #f2f2f2; ";
	    document.getElementById('curSlide').appendChild(el);

	    el = document.createElement('div');
	    el.id="dealTitle";
		el.style="position: absolute; top: 35px; left: 45px; color: #f2f2f2; ";
	    document.getElementById('curSlide').appendChild(el);

	    el = document.createElement('div');
	    el.id="dealDesc";
		el.style="position: absolute; top: 100px; left: 45px; color: #f2f2f2; ";
	    document.getElementById('curSlide').appendChild(el);

	    el = document.createElement('div');
	    el.id="timerCountDownBox";
	    document.getElementById('curSlide').appendChild(el);

	    el = document.createElement('div');
	    el.id="timerCountDownText";
	    el.innerHTML="Time to end :"
	    document.getElementById('timerCountDownBox').appendChild(el);

	    el = document.createElement('div');
	    el.id="timerCountDown";
	    el.innerHTML=""
	    document.getElementById('timerCountDownBox').appendChild(el);

	   	el = document.createElement('button');
	    el.id="bookTableNow";
	    el.className='book';
		el.innerHTML="Book a table now!";
	    document.getElementById('timerCountDownBox').appendChild(el);

		el = document.createElement('a');
		el.id="prev";
		el.innerHTML="&#10094;";
	    document.getElementById('slideArea').appendChild(el);

	    el = document.createElement('a');
		el.id="next";
		el.innerHTML="&#10095;";
	    document.getElementById('slideArea').appendChild(el);

	    el = document.createElement('div');
	    el.id="nextWeek";
		el.className="col-3";
		el.style="float:right;width:15%;";
	    document.getElementById('specialsContainer').appendChild(el);		
	};
};






