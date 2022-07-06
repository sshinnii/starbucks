const badgeEl = document.querySelector('header .badges');
const toTopEl = document.querySelector('#to-top');
//scroll을 하게되면 scroll함수의 여러개인 수십개가 와르르 실행된다.
//그것을 0.3초 단위로 부하를 줘서 우르르 실행되는것을 방지하는 기능인 throttle
//일정시간에 한번만 실행되도록 하는 함수
//_.throttle(사용할 함수, 초단위)
window.addEventListener('scroll', _.throttle(function(){
    // console.log(window.scrollY)
    if(window.scrollY > 500){
        // badgeEl.style.display= 'none';
        // gsap.to(요소,지속시간,옵션)
        gsap.to(badgeEl, .6, {
            opacity:0
          , display:'none' //투명도만 조절해서 안보이게 하면 실제로 사라진건 아니기 때문에 클릭 시 문제가 됨
        });
        gsap.to(toTopEl, .2, {
            x: 0
        });
    }else{
        // badgeEl.style.display= 'block';
        gsap.to(badgeEl, .6, {
            opacity:1
          , display : 'block'
        });
        gsap.to(toTopEl, .2, {
            x: 100
        });
    }

}, 300));

toTopEl.addEventListener('click', function(){
    gsap.to(window, .7, {
        scrollTo: 0
    });
});

//visual 이미지 fade-in 
const fadeEls = document.querySelectorAll('.visual .fade-in');
fadeEls.forEach(function(fadeEl, i){
    gsap.to(fadeEl, 1, {
        delay: (i + 1) * .7
      , opacity: 1
    });
});

//swiper(선택자, 옵션)
new Swiper('.notice-line .swiper-container', {
      direction: 'vertical'
    , autoplay: true
    , loop: true
});

new Swiper('.promotion .swiper-container', {
    //horizantal : 기본값
      slidesPerView: 3 //한번에 보여줄 슬라이드 개수
    , spaceBetween: 10 // 슬라이드 사이 여백
    , centeredSlides: true // 1번 슬라이드가 가운데 보이기
    , loop: true
    , autoplay:{ //3000 기본값
        delay : 5000
    }
    , pagination : {
        el : '.promotion .swiper-pagination' //페이지 번호 선택 요소
        , clickable : true //사용자의 페이지 번호 요소 재어
    }
    , navigation :{
        prevEl:'.promotion .swiper-prev'
      , nextEl:'.promotion .swiper-next'
    }
});

new Swiper('.awards .swiper-container',{
      autoplay: true
    , loop: true
    , spaceBetween: 30
    , slidesPerView: 5
    , navigation :{
        prevEl:'.awards .swiper-prev'
        ,nextEl:'.awards .swiper-next'
    }
});

//스타벅스 프로모션 toggle
const promotionEl = document.querySelector('.promotion');
const promotionToggleBtn = document.querySelector('.toggle-promotion');
let isHidePromotion = false;
promotionToggleBtn.addEventListener('click', function(){
    isHidePromotion = !isHidePromotion;
    if(!isHidePromotion){
        promotionEl.classList.add('hide');
    }else{
        promotionEl.classList.remove('hide');
    }
});

// 범위 랜덤 함수(소수점 2자리까지)
function random(min, max) {
    // `.toFixed()`를 통해 반환된 문자 데이터를,
    // `parseFloat()`을 통해 소수점을 가지는 숫자 데이터로 변환
    return parseFloat((Math.random() * (max - min) + min).toFixed(2))
}

function floatingObject(selector, delay, size){
    // gsap.to(요소,시간,옵션);
    gsap.to(selector, random(1.5, 2.5), {
        y: size,
        repeat: -1, //무한반복
        yoyo: true, //한번 작동한 애니메이션을 반대로 다시 실행하는것.
        ease : Power1.easeInOut,
        delay : random(0, delay) //몇초뒤에 애니메이션을 실행하겠다.
    })
}
//실행
floatingObject('.floating1', 1, 15);
floatingObject('.floating2', .5, 15);
floatingObject('.floating3', 1.5, 20);

//scroll-magic
const spyEls = document.querySelectorAll('section.scroll-spy');
spyEls.forEach(function(spyEl){
    //Scene 화면 감지 => 사용자에게 보이는 부분인지 // addTo : 동작 컨트롤러
    new ScrollMagic
        .Scene({
            triggerElement: spyEl //보여짐 여부를 감시할 요소 지정
          , triggerHook:.8 //뷰포트 지점 0 => 시작점, 1=> 마지막점, 0.5=>중앙 //내가 감시하는 부분이 0.8 뷰포트 부분에 걸리면 실행해라 
        })
        .setClassToggle(spyEl, 'show') //toggle할 객체, class이름
        .addTo(new ScrollMagic.Controller());
});