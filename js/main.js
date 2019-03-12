var headerSliderBlock = document.getElementById('headerSliderBlock');
var headerBlock = document.getElementById('headerBlock');
var headerMenuBlock = document.getElementById('header__menuBlock');


var headerOpenMenuBtn = document.querySelector('.header__openMenuBtn');
console.log(headerOpenMenuBtn);
headerOpenMenuBtn.addEventListener('click', function () {
    headerOpenMenuBtn.classList.toggle("active");
    document.querySelector('.header__verticalMenuNavOpen').classList.toggle("active");
});

var headerVerticalMenuDropDownLinkArr = document.getElementsByClassName('header__verticalMenuDropDownLink');

var parentArr = [];
for (var i = 0; i < headerVerticalMenuDropDownLinkArr.length; i++) {
    headerVerticalMenuDropDownLinkArr[i].addEventListener('click', function () {
        var menuNavArrSiblings = getSiblings(this);

        if (!this.classList.contains("active")) {
            for (var c = 0; c < menuNavArrSiblings.length; c++) {
                menuNavArrSiblings[c].style.display='inline-block';
            }
            var el;
            if(parentArr.length-1 > -1){
                el = parentArr[parentArr.length-1];
            }

            if (el !== null&&el!==undefined) {
                el.style.display='none';
            }

            parentArr.push(this);
        }
        else {
            for (var c = 0; c < menuNavArrSiblings.length; c++) {
                menuNavArrSiblings[c].style.display='none';
            }
            parentArr.pop();

            var el;
            if(parentArr.length-1 > -1){
                el = parentArr[parentArr.length-1];
            }

            if (el !== null&&el!==undefined) {
                el.style.display='inline-block';
            }
        }

        console.log(parentArr);

        this.classList.toggle("active");
        var listItemArrSiblings = getSiblings(this.parentNode);


        for (var c = 0; c < listItemArrSiblings.length; c++) {
            listItemArrSiblings[c].classList.toggle("inactive");

        }


    });
}


headerBlock.addEventListener("mousemove", changeWidthSlider);


function getMouseCoordinates(e) {
    var mousePosX = 0;
    var mousePosY = 0;
    var elementPosX = 0;
    var elementPosY = 0;

    obj = this;

    if (!e) {
        e = window.event;
    }
    if (e.pageX || e.pageY) {
        mousePosX = e.pageX;
        mousePosY = e.pageY;
    }
    else if (e.clientX || e.clientY) {
        mousePosX = e.clientX + document.body.scrollLeft
            + document.documentElement.scrollLeft;
        mousePosY = e.clientY + document.body.scrollTop
            + document.documentElement.scrollTop;
    }

    if (obj.offsetParent) {
        do {
            elementPosX += obj.offsetLeft;
            elementPosY += obj.offsetTop;
        } while (obj = obj.offsetParent);
    }

    var positionX = mousePosX - elementPosX;
    var positionY = mousePosY - elementPosY;



    var mouseCoordinates = {};
    mouseCoordinates.X = positionX;
    mouseCoordinates.Y = positionY;

    return mouseCoordinates;
}




function changeWidthSlider(e) {
    var mouseCoordinates = getMouseCoordinates();

    var x = mouseCoordinates.X;
    var y = mouseCoordinates.Y;

    var browserWindowWidth = window.innerWidth / 2;

    var boundRightPart = browserWindowWidth + 100;
    var boundLeftPart = browserWindowWidth - 100;



    if (x > boundRightPart && y > 80) {
        headerSliderBlock.classList.add("header_changeSliderWidthLess");
        headerSliderBlock.classList.remove("header_changeSliderWidthLarger");
    }
    else if (x < boundLeftPart && y > 80) {
        headerSliderBlock.classList.add("header_changeSliderWidthLarger");
        headerSliderBlock.classList.remove("header_changeSliderWidthLess");
    }
    else {
        headerSliderBlock.classList.remove("header_changeSliderWidthLess");
        headerSliderBlock.classList.remove("header_changeSliderWidthLarger");

    }
}
if(window.pageYOffset>0){
    headerMenuBlock.classList.add("header_changeBgHeaderMenuBlock");
}
window.onscroll = function () {
    var scrolled = window.pageYOffset;
    if (scrolled > 0) {
        headerMenuBlock.classList.add("header_changeBgHeaderMenuBlock");

    }
    else {
        headerMenuBlock.classList.remove("header_changeBgHeaderMenuBlock");
        headerMenuBlock.classList.remove("header_changeBgHeaderMenuBlock", "header_fixedPosition");
    }
}



window.onresize = function (event) {
    initBgPosition();
};
initBgPosition();

function initBgPosition() {
    var heightHeader = headerBlock.offsetHeight;

    var widthBg = heightHeader * 2.11;
    var bgPositionX = (headerBlock.clientWidth - widthBg) / 2;
    headerSliderBlock.style.backgroundPosition = bgPositionX + "px";
    headerBlock.style.backgroundPosition = bgPositionX + "px";

}
var header__menuDropDownLink=document.getElementsByClassName('header__menuDropDownLink');

for (var i=0;i<header__menuDropDownLink.length;i++){
    header__menuDropDownLink[i].addEventListener('click',function () {
        for (var i=0;i<header__menuDropDownLink.length;i++){
            header__menuDropDownLink[i].classList.remove('header__menuDropDownLinkOpen');
        }
        this.classList.toggle('header__menuDropDownLinkOpen');
        var subMenu = this.parentNode.getElementsByClassName("header__menuDropDownBlock")[0];
        subMenu.classList.toggle('header__menuDropDownBlockOpen');
    })
}


window.onresize = function () {
    if (window.innerWidth<992 && window.innerWidth>768) {
        setValueCircleNav();
    }
};
setValueCircleNav();
function setValueCircleNav() {
    var circle = document.getElementById('circle');

    var advantageItemArr = document.getElementsByClassName('advantagesNavBlock__circleNavItem');

    var jointAngle = 360/advantageItemArr.length;

    var betweenValue=0;
    var spinAroundValue=0;

    for (var i=0; i< advantageItemArr.length;i++){
        (function(){

            setTransformValue(advantageItemArr[i], betweenValue, spinAroundValue);

            var betweenValueThisEl=betweenValue;

            var circleTransformValue = 'rotate('+spinAroundValue+'deg)';

            advantageItemArr[i].addEventListener('click', function () {
                setAttributeWithBrowserPrefixes(circle, 'transform', circleTransformValue);
                var betweenValue1=0;
                var spinAroundValue1=0;

                for (var c=0; c< advantageItemArr.length;c++){
                    advantageItemArr[c].style.cssText+=' transition: all 0.5s ease;';
                    console.log(spinAroundValue1+betweenValueThisEl);
                    var secondSpinAroundValue= spinAroundValue1+betweenValueThisEl;
                    setTransformValue(advantageItemArr[c], betweenValue1, secondSpinAroundValue);
                    betweenValue1+=jointAngle;
                    spinAroundValue1=-betweenValue1;
                }
            });


            betweenValue+=jointAngle;
            spinAroundValue=-betweenValue;
        })();
    }
    console.log(circle.clientWidth/2);
    function setTransformValue(element, betweenValue, spinAroundValue) {
        var circleWidth= circle.offsetWidth/2;
        var itemTransformValue = 'rotate('+betweenValue+'deg) '+'translate('+circleWidth+'px) '+ 'rotate('+spinAroundValue+'deg)';
        setAttributeWithBrowserPrefixes(element, 'transform', itemTransformValue);

    }
}



function setAttributeWithBrowserPrefixes(element, attribute, value) {
    var elementStyle= element.style.cssText;
    elementStyle += "-webkit-"+attribute+":"+value+"; "+
        "-moz-"+attribute+":"+value+"; "+
        "-ms-"+attribute+":"+value+"; "+
        "-ms-"+attribute+":"+value+"; "+
        attribute+":"+value+"; "
    ;
    element.style.cssText=elementStyle;
}
$(document).ready(function () {
    $('.advantagesBlockSlider__content').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: true,
        asNavFor: '.advantagesBlockSlider__tabsList'
    });
    $('.advantagesBlockSlider__tabsList').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        centerMode: true,
        asNavFor: '.advantagesBlockSlider__content',
        arrows: false,
        focusOnSelect: true
    });
});


var prev=document.getElementById('advantagesBlockSlider__tabsSwitchPrev');
var next=document.getElementById('advantagesBlockSlider__tabsSwitchNext');
next.addEventListener('click', switchNext);
prev.addEventListener('click', switchPrev);

function switchPrev(){
    var item=document.querySelector('.advantagesBlockSlider__tabItem.slick-current');
    var itemNearestPrevSibling=getPrevSiblings(item)[0];
    if (itemNearestPrevSibling!==undefined){
        eventFire(itemNearestPrevSibling, 'click');
    }
}
function switchNext(){
    var item=document.querySelector('.advantagesBlockSlider__tabItem.slick-current');
    var itemNearestNextSibling=getNextSiblings(item)[0];
    if (itemNearestNextSibling!==undefined){
        eventFire(itemNearestNextSibling, 'click');
    }
}

function eventFire(el, etype){
    if (el.fireEvent) {
        el.fireEvent('on' + etype);
    } else {
        var evObj = document.createEvent('Events');
        evObj.initEvent(etype, true, false);
        el.dispatchEvent(evObj);
    }
}
function getNextSiblings(elem) {
    var siblings = [];
    var sibling = elem;
    while (sibling.nextSibling) {
        sibling = sibling.nextSibling;
        sibling.nodeType == 1 && siblings.push(sibling);
    }

    return siblings;

}
function getPrevSiblings(elem) {
    var siblings = [];
    var sibling = elem;
    while (sibling.previousSibling) {
        sibling = sibling.previousSibling;
        sibling.nodeType == 1 && siblings.push(sibling);
    }
    return siblings;
}
function getSiblings(elem) {
    var siblings = [];
    var sibling = elem;
    while (sibling.previousSibling) {
        sibling = sibling.previousSibling;
        sibling.nodeType == 1 && siblings.push(sibling);
    }

    sibling = elem;
    while (sibling.nextSibling) {
        sibling = sibling.nextSibling;
        sibling.nodeType == 1 && siblings.push(sibling);
    }

    return siblings;
}


var advantages_decorSlider = document.getElementById('advantagesBlockDecorationSlider');
var advantages_slider_slideBlock = document.getElementById('advantagesBlockDecorSliderSlideBlock');
var advantages_sliderResize = document.getElementById('advantages_decorSliderResizePart');
var advantages_advantageDescription = document.getElementsByClassName('advantagesBlock__advantageDescription');

console.log(advantages_advantageDescription[0].clientHeight);
var maxAdvantageDescriptionHeight=0;
for (var i=0; i<advantages_advantageDescription.length;i++){
    var advantageDescriptionHeight=advantages_advantageDescription[i].clientHeight;
    console.log(advantageDescriptionHeight+' advantageDescriptionHeight');

    if(maxAdvantageDescriptionHeight<advantageDescriptionHeight){
        maxAdvantageDescriptionHeight=advantageDescriptionHeight;
    }
}
console.log('maxAdvantageDescriptionHeight: '+maxAdvantageDescriptionHeight);

advantages_slider_slideBlock.addEventListener("mousedown", function (e) {
    var slideBlockCoords = getCoords(advantages_slider_slideBlock);
    var shiftX = e.pageX - slideBlockCoords.left;


    var sliderCoords = getCoords(advantages_decorSlider);

    document.onmousemove = function (e) {

        var newLeft = e.pageX - shiftX - sliderCoords.left;


        if (newLeft < 0) {
            newLeft = 0;
        }
        var rightEdge = advantages_decorSlider.offsetWidth - advantages_slider_slideBlock.offsetWidth;
        if (newLeft > rightEdge) {
            newLeft = rightEdge;
        }

        advantages_slider_slideBlock.style.left = newLeft + 'px';
        var advantages_sliderResizeWidth = newLeft + advantages_slider_slideBlock.offsetWidth / 2;
        advantages_sliderResize.style.width = advantages_sliderResizeWidth + 'px';

        console.log(newLeft);
    };


    document.onmouseup = function () {
        document.onmousemove = document.onmouseup = null;
    };

    return false;
});

advantages_slider_slideBlock.ondragstart = function () {
    return false;
};

function getCoords(elem) {
    var box = elem.getBoundingClientRect();
    console.log('top '+box.top + 'left ' + box.left);
    return {
        top: box.top + pageYOffset,
        left: box.left + pageXOffset
    };

}

var partnershipPartnerBlockArr=document.getElementsByClassName('partnershipBlock__partnerBlock');
var partnershipPartnersList=document.getElementById('partnershipBlockPartnersList');
var partnershipPartnerBlockArrLength=partnershipPartnerBlockArr.length;
setPaddingPartnershipPartnersList();
function setPaddingPartnershipPartnersList(){
    if (window.innerWidth >= 992 && partnershipPartnerBlockArrLength <= 4) {
        console.log("<=4item");
        partnershipPartnersList.style.padding = '0';
    } else if (window.innerWidth >= 992 && partnershipPartnerBlockArrLength > 4) {
        partnershipPartnersList.style.padding = '0 40px';
    }
    if (window.innerWidth < 992 && partnershipPartnerBlockArrLength <= 3) {
        console.log("<=3item");
        partnershipPartnersList.style.padding = '0';
    } else if (window.innerWidth < 992 && partnershipPartnerBlockArrLength > 3) {
        console.log(">3item");
        partnershipPartnersList.style.padding = '0 40px';
    }
}

window.addEventListener('resize',setPaddingPartnershipPartnersList);
$(document).ready(function () {

    $('.partnershipBlock__partnersList').slick({
        dots: false,
        infinite: false,
        speed: 300,
        slidesToShow: 4,
        slidesToScroll: 4,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: false,
                    dots: false
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });
});
var partnerHeadingArr = document.getElementsByClassName('partnershipBlock__partnerHeading');
setPartnerHeadingHeight();

function setPartnerHeadingHeight() {
    var partnerHeadingMaxHeight = 0;
    for (var i = 0; i < partnerHeadingArr.length; i++) {
        var partnerHeadingElHeight = partnerHeadingArr[i].clientHeight;
        if (partnerHeadingElHeight > partnerHeadingMaxHeight) {
            partnerHeadingMaxHeight = partnerHeadingElHeight;
        }
    }
    console.log(partnerHeadingMaxHeight);
    for (var i = 0; i < partnerHeadingArr.length; i++) {
        partnerHeadingArr[i].style.height = partnerHeadingMaxHeight + "px";
    }
}

var partnershipBlockPartnerTextArr = document.getElementsByClassName('partnershipBlock__partnerText');
setPartnerText();

function setPartnerText() {
    for (var i = 0; i < partnershipBlockPartnerTextArr.length; i++) {
        partnershipBlockPartnerTextArr[i].innerHTML = limitQuantityWords(i) + '\&#8230';
    }
}

function limitQuantityWords(i) {
    var maxLengthString = 55;

    var partnerTextValue = partnershipBlockPartnerTextArr[i].innerHTML;

    var partnerTextResult = '';

    if (partnerTextValue.length <= maxLengthString) {
        partnerTextResult = partnerTextValue;
    }
    else {
        var partnerTextElWordArr = partnerTextValue.split(' ');

        var lengthString = 0;

        for (var c = 0; c < partnerTextElWordArr.length; c++) {
            var lengthWord = partnerTextElWordArr[c].length;
            lengthString += lengthWord;

            if (lengthString > maxLengthString) {
                continue;
            }
            partnerTextResult += partnerTextElWordArr[c] + " ";
        }
    }
    return partnerTextResult;
}


var tabDefaultOpen = document.getElementById("recipesBlock__tabDefaultOpen");
document.querySelector(tabDefaultOpen.getAttribute('href')).style.display = "inline-block";
tabDefaultOpen.className += " recipesBlock__tabLinkActive";

var recipesBlockTabsList= document.getElementById('recipesBlockTabsList');


var recipesBlockTabLinkArr = document.getElementsByClassName('recipesBlock__tabLink');


if(recipesBlockTabLinkArr.length>2){
    recipesBlockTabsList.style.width='100%';

    $(document).ready(function () {
        $('#recipesBlockTabsList').slick({
            slidesToShow: 4,
            slidesToScroll: 4,

            dots: true,
            arrows: false,

            infinite: false,


            responsive: [
                {
                    breakpoint: 992,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3,
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2
                    }
                }
            ]
        });
    });
}


for (var i = 0; i < recipesBlockTabLinkArr.length; i++) {
    recipesBlockTabLinkArr[i].addEventListener("click", recipesTabOpen);
}

function recipesTabOpen() {
    var recipesBlockTabContentArr = document.getElementsByClassName("recipesBlock__tabContent");
    for (var i = 0; i < recipesBlockTabContentArr.length; i++) {
        recipesBlockTabContentArr[i].style.display = "none";
    }
    var recipesBlockTabLinkArr = document.getElementsByClassName("recipesBlock__tabLink");
    for (i = 0; i < recipesBlockTabLinkArr.length; i++) {
        recipesBlockTabLinkArr[i].className = recipesBlockTabLinkArr[i].className.replace(" recipesBlock__tabLinkActive", "");
    }
    document.querySelector(this.getAttribute('href')).style.display = "inline-block";
    event.currentTarget.className += " recipesBlock__tabLinkActive";
}





