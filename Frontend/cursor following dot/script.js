const mouseFollower = document.querySelector(".cursor-follower");

let x , y = 0;


//--------Approach 1--------------
// addEventListener("mousemove", (e) => {
//     const {clientX, clientY} = e;

//     mouseFollower.style.left = clientX + "px";
//     mouseFollower.style.top = clientY + "px";
// })


//--------Approach 2--------------
// addEventListener("mousemove", (e) => {
//     const {clientX, clientY} = e;

//     x = clientX;
//     y = clientY;
//     mouseFollower.style.transform = `translate(${x}px, ${y}px)`;
// })


// //--------Approach 3--------------
// addEventListener("mousemove", (e) => {
//     const {clientX, clientY} = e;

//     mouseFollower.style.transform = `translate(${clientX}px, ${clientY}px)`;
// })


//--------Approach 4--------------
// addEventListener("mousemove", (e) => {
//     const {clientX, clientY} = e;

//     x = clientX;
//     y = clientY;
//     mouserMover();
// })

// function mouserMover(){
//     mouseFollower.style.transform = `translate(${x}px, ${y}px)`;
// }


//--------Approach 5--------------
addEventListener("mousemove", (e) => {
    const {clientX, clientY} = e;
    x = clientX;
    y = clientY;
    mouserMover();
})

function mouserMover(){
    mouseFollower.style.transform = `translate(${x}px, ${y}px)`;
    requestAnimationFrame(mouserMover);
}