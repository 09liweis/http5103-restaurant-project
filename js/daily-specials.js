function SpecialDeal(){
	this.img='images/careers/careers.jpg';
	this.endDate='';
	this.info='Some text';
};

window.onload=startScript;

var app='';
function startScript(){
	app=new DailySpealsApp();
	app.start();
};

function DailySpealsApp(){
	
	this.state=0;
	this.applicationContainerId='main';//block ID where view will be inputed
	this.slideIndex=1;
	this.curSpecials=[];
	this.autoAnimationOn=true;

	var animationInv='';

	this.start= function(){
		this.initBlocks();
		this.getSpecialDeals();
		this.showSlides(this.slideIndex);
		this.setOnclicks();
	};


	//slides

	this.plusSlides=function(n) {
 		this.slideIndex+=n;
 		console.log('ssss '+this.slideIndex);
  		this.showSlides(this.slideIndex);
	};

	this.currentSlide=function(n) {
		this.slideIndex=n;
  		this.showSlides(this.slideIndex);
	};

	this.showSlides=function(n) {
	  	if (n >this.curSpecials.length) {this.slideIndex = 1} 
	  	if (n <=0) {this.slideIndex = this.curSpecials.length}
	  	var curSlideEl=document.getElementById('curSlide');

	  	document.getElementById('curSlideInfo').innerHTML=this.curSpecials[this.slideIndex-1].info;
	  	document.getElementById('curSlidePosition').innerHTML=this.slideIndex+'/'+this.curSpecials.length;
	  	document.getElementById('curSlideImg').src=this.curSpecials[this.slideIndex-1].img;

	};
	this.setOnclicks=function(){
		var self=this;
	  	$('#prev').click(function(){self.plusSlides(-1);self.autoAnimationOn=false;clearInterval(animationInv);});
	  	$('#next').click(function(){self.plusSlides(1 );self.autoAnimationOn=false;clearInterval(animationInv);});
	  	$('#curSlide').find('img').click(function(){
	  		if(self.autoAnimationOn){self.autoAnimationOn=false;clearInterval(animationInv);}
	  		else{self.autoAnimationOn=true;animationInv=setInterval(function(){self.plusSlides(1);},2000);};
	  	});
	  	if(this.autoAnimationOn){
	  		animationInv=setInterval(function(){self.plusSlides(1);},2000);
	  	};
	}

//EVERYTHING

	this.getSpecialDeals= function(){
		this.curSpecials.push(new SpecialDeal());
		this.curSpecials.push(new SpecialDeal());
		this.curSpecials.push(new SpecialDeal());
		this.curSpecials.push(new SpecialDeal());
		this.curSpecials.push(new SpecialDeal());
		this.curSpecials.push(new SpecialDeal());
	};

	this.initBlocks= function(){
		var el='';
		el = document.createElement('div');
		el.id="specialsContainer";
	    document.getElementById(this.applicationContainerId).appendChild(el);

	    el = document.createElement('div');
	    el.id="slideArea";
	    document.getElementById('specialsContainer').appendChild(el);

	    el = document.createElement('div');
	    el.id="curSlide";
		el.className="mySlides fade";
	    document.getElementById('slideArea').appendChild(el);

	    el = document.createElement('div');
	    el.id="curSlidePosition";
		el.className="numbertext";
	    document.getElementById('curSlide').appendChild(el);

	    el = document.createElement('img');
	    el.id="curSlideImg";
		el.src="";
	    document.getElementById('curSlide').appendChild(el);

	    el = document.createElement('div');
	    el.id="curSlideInfo";
		el.className="text";
	    document.getElementById('curSlide').appendChild(el);

		el = document.createElement('a');
		el.id="prev";
		el.innerHTML="&#10094;";
	    document.getElementById('slideArea').appendChild(el);

	    el = document.createElement('a');
		el.id="next";
		el.innerHTML="&#10095;";
	    document.getElementById('slideArea').appendChild(el);


	    el = document.createElement('div');
	    el.id="prevWeeek";
		el.style="float:left;";
		el.innerHTML="Previus week specials";
	    document.getElementById('specialsContainer').appendChild(el);

	    el = document.createElement('div');
	    el.id="nextWeek";
		el.style="float:right;";
		el.innerHTML="Next week specials";
	    document.getElementById('specialsContainer').appendChild(el);
	};
};






