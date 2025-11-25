var tl = gsap.timeline({
    scrollTrigger:{
        trigger: ".two",
        start: "0% 95%",
        end: "70% 50%",
        scrub: true,
    }
})

tl.to("#fanta",{
    top: "120%",
    left: "0%"
}, 'orange')

tl.to("#orange-cut",{
    top:"160%",
    left: "23%"
}, 'orange')

tl.to("#orange",{
    width: "15%",
    top:"160%",
    right: "10%"
}, 'orange')

tl.to("#leaf",{
    top:"110%",
    rotate: "130deg",
    left: "70%"
}, 'orange')

tl.to("#leaf2",{
    top:"110%",
    rotate: "130deg",
    left: "0%"
}, 'orange')

/* SECOND ANIMATION */
var tl2 = gsap.timeline({
    scrollTrigger:{
        trigger: ".three",
        start: "0% 95%",
        end: "20% 50%",
        scrub: true,
    }
});

tl2.from(".lemon1",{
    rotate: "-45deg",
    x: -200,
    opacity: 0
}, 'ca')

tl2.from("#cocacola",{
    rotate: "-20deg",
    y: 200,
    opacity: 0
}, 'ca')

tl2.from(".lemon2",{
    rotate: "45deg",
    x: 200,
    opacity: 0
}, 'ca')

tl2.from("#pepsi",{
    rotate: "20deg",
    y: 200,
    opacity: 0
}, 'ca')

tl2.to("#orange-cut",{
    width:"18%",
    left: "42%",
    top: "204%"
}, 'ca')

tl2.to("#fanta",{
    width:"35%",
    top: "210%",
    left: "33%",
}, 'ca')
