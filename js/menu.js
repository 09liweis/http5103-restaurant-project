//Author: Ivan Moruhyi
//Technologies Used: Vanilla JavaScript
window.onload = function() {
    //Menu object holds:
    //1. currentItem: which is selected category at the moment.
    //2. menuCategoriesTitles: array of names of 5 menu categories
    //3. menuCategories: array of list items inside menu list, each list item itselft is an unordered list of meals for specific menu category.
    //4. indicators: tiny triangles which idicate selected category.
    var menu = {
        currentItem: 0,
        menuCategoriesTitles: [],
        menuCategories: [],
        indicators: []
    };
    
    //Getting all the necessary arrays from HTML
    menu.menuCategoriesTitles = document.querySelectorAll('#banner li');
    menu.menuCategories = document.querySelectorAll('#menu > li');
    menu.indicators = document.querySelectorAll('.indicator');
    
    //productionObject: contains 3 main methods.
    //1. requestCategory: later this method is going to be used when creating onclick event for each element from menuCategoriesTitles. For instance, by clicking on breakfast, i want to get menu list for this category.
    //2. requestShowIndicator: to be used when mouseover a menu title to display indicator.
    //3. requestHideIndicator: to be used when mouseout a menu title to hide indicator.
    var productionObject = {
        requestCategory: function(categoryNum) {
            function getCategory(categoryNum) {
                for(var i = 0; i < menu.menuCategories.length; ++i) {
                    //menu.menuCategories[i].classList.remove('hidden');
                    //menu.menuCategories[i].classList.add('hidden');
                    
                    menu.menuCategories[i].style.display = 'none';
                    
                    menu.menuCategoriesTitles[i].style.color = '#fff';
                    
                    menu.indicators[i].classList.remove('hidden');
                    menu.indicators[i].classList.add('hidden');
                }
              
              menu.menuCategories[categoryNum].style.display='block';  //menu.menuCategories[categoryNum].classList.toggle('hidden');
                menu.menuCategoriesTitles[categoryNum].style.color = '#ffb606';
                
                menu.indicators[categoryNum].classList.toggle('hidden');
                menu.currentItem = categoryNum;
            }
            return function() {
                getCategory(categoryNum);
            }
        },
        requestShowIndicator: function(indicatorNum) {
            function getIndicator(indicatorNum) {
                menu.indicators[indicatorNum].classList.remove('hidden');
                menu.menuCategoriesTitles[indicatorNum].style.color = '#ffb606';
            }
            return function() {
                getIndicator(indicatorNum);
            }
        },
        requestHideIndicator: function(indicatorNum) {
            function hideIndicator(indicatorNum) {
                if (menu.currentItem !== indicatorNum) {
                    menu.indicators[indicatorNum].classList.toggle('hidden');
                    menu.menuCategoriesTitles[indicatorNum].style.color = '#fff';
                }
            }
            return function() {
                hideIndicator(indicatorNum);
            }
        }
    }
    
    //initial settings when page loads. Always 1 category is going to be displayed (breakfast).
    for (var i = 0; i < menu.menuCategories.length; ++i) {
        if (i !== 0) {
            menu.menuCategories[i].style.display = 'none';
            //menu.menuCategories[i].classList.toggle('hidden');
            menu.indicators[i].classList.toggle('hidden');
        } else {
            menu.menuCategoriesTitles[i].style.color = '#ffb606';
        }
    }
    
    //assigning events to all menu categories
    for (var i = 0; i < menu.menuCategories.length; ++i) {
        menu.menuCategoriesTitles[i].onclick = productionObject.requestCategory(i);
        menu.menuCategoriesTitles[i].onmouseover = productionObject.requestShowIndicator(i);
        menu.menuCategoriesTitles[i].onmouseout = productionObject.requestHideIndicator(i);
    }
    
    //function to handle search string requests. Later based on search string: ?breakfast(0) ?lunch (1) ?alcohol (2) ?soft drinks(3) ?desert(4). This is function will display menu certain menu category based on search string value.
    function searchStringRequest(number) {
        menu.currentItem = number;
        for (var i = 0; i < menu.menuCategories.length; ++i) {
            if (i !== number) {
                menu.menuCategories[i].style.display = 'none';
                //menu.menuCategories[i].classList.remove('hidden');
                //menu.menuCategories[i].classList.add('hidden');
                menu.indicators[i].classList.remove('hidden');
                menu.indicators[i].classList.add('hidden');
                menu.menuCategoriesTitles[i].style.color = '#fff';
            } else {
                menu.menuCategories[i].style.display = 'block';
                //menu.menuCategories[i].classList.remove('hidden');
                menu.menuCategoriesTitles[i].style.color = '#ffb606';
                menu.indicators[i].classList.remove('hidden');
                menu.menuCategoriesTitles[i].style.color = '#ffb606';
            }
        }
    }
    
    //displaying appropriate menu category based on search string. Here i'm using function that have been defined above.
    switch(location.search) {
        case '?option=breakfast': 
            searchStringRequest(0);
            break;
        case '?option=lunch':
            searchStringRequest(1);
            break;
        case '?option=alcohol': 
            searchStringRequest(2);
            break;
        case '?option=softdrinks': 
            searchStringRequest(3);
            break;
        case '?option=desert': 
            searchStringRequest(4);
            break;
        default: 
            searchStringRequest(0);
            break;
    }
    
}