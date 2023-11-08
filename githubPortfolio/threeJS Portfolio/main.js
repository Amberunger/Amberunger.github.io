import * as THREE from 'three';

import {
  OrbitControls
} from 'three/examples/jsm/controls/OrbitControls'
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
)
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg')
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.z = 90
camera.position.y = 10
const ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.1)

const pointLight = new THREE.PointLight(0xFFFFFF, 1000, 1000)
pointLight.position.set(0, 20, 20)

scene.add(pointLight)
scene.add(ambientLight)


//HELPERS
const lightHelper = new THREE.PointLightHelper(pointLight)
const gridHelper = new THREE.GridHelper(200, 50)
const axesHelper = new THREE.AxesHelper(20, 20, 20);
scene.add(lightHelper, gridHelper, axesHelper)

const geoPog = new THREE.CylinderGeometry(41.37, 41.37, 6, 31)
const texturePog = new THREE.TextureLoader().load("ws.png")
const matPog = new THREE.MeshStandardMaterial({
  color: 0X35FFFFFFFFF,
  wireframe: false,
  map: texturePog
})
const pog = new THREE.Mesh(geoPog, matPog);

scene.add(pog)


//const controls = new OrbitControls(camera,renderer.domElement);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25)
  const material = new THREE.MeshStandardMaterial({
    color: 0xffffff
  })
  const star = new THREE.Mesh(geometry, material)

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100))
  star.position.set(x, y, z);
  scene.add(star)
}
const spaceTexture = new THREE.TextureLoader().load('Stat.jpg');
scene.background = spaceTexture;
const moonTexture = new THREE.TextureLoader().load('moon.jpg');

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(15, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture
  })
);
scene.add(moon)
Array(400).fill().forEach(addStar)

function animate(time) {
  requestAnimationFrame(animate);

  pog.rotation.x += .01;

  pog.rotation.y += .01;

  pog.rotation.z += .1;


  //controls.update()
  renderer.render(scene, camera);
}

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  moon.rotation.x += .04;

  moon.rotation.y += .04;

  moon.rotation.z += .04;
  camera.position.z = t * -0.1 +99
  camera.position.x = t * -0.0002
  camera.position.y = t * -0.0002
}
document.body.onscroll = moveCamera
animate();