import * as THREE from 'three';

// starting positon of the images
const Starty = 10;
// make a new scene
const scene = new THREE.Scene();
// put the camrea in
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 30;
camera.position.y = Starty;
camera.position.x = 5
scene.background = new THREE.TextureLoader().load("img/bg2.jpg")
console.log(scene)
// make list of imgs
const geometry = new THREE.PlaneGeometry(25, 20);
let imgList = [
    "roll.jpg",
    "monk.jpg",
    "fries.jpg"

]
// add the images as a plane mesh to the scene
for (const image in imgList) {
// every msh ase a gemoutry and a material
    const texture = new THREE.TextureLoader().load("img/" + imgList[image])
    const material = new THREE.MeshBasicMaterial({
        color: 0xfffff0,
        side: THREE.DoubleSide,
        map: texture // add the texture
    });

    const plane = new THREE.Mesh(geometry, material);
    // set initial and add new plane
    plane.rotation.y = 10;
    plane.position.x = -2;
    plane.position.y = image * -50;
    scene.add(plane);
}

// move the camera with the scrool bar
function moveCamera() {
    const top = document.body.getBoundingClientRect().top;
    camera.position.y = Starty + top * 0.10;

}
// add scrollbar event
document.body.onscroll = moveCamera;
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg')
});
// set renderer size and add to page
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
// resize to fit window and to fit phone
resizeWindow();

function resizeWindow() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    //addjust for phone or desktop size
    if (window.innerWidth <= 600) {
        camera.position.x = -2;
        for (const child in scene.children) {
            scene.children[child].rotation.y = 0;
            scene.children[child].position.y = child * -50;
        }
    } else {
        camera.position.x = 15;
        for (const child in scene.children) {
            scene.children[child].rotation.y = 15 * (Math.PI / 180);
            scene.children[child].position.y = child * -30;
        }
    }
}
// resize canvas on window resize
window.addEventListener('resize', resizeWindow, false)
// animation loop ( calls itself recursively)

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
// start the animation
animate();