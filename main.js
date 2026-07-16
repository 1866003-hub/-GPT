import * as THREE from "three";
import { PointerLockControls } from "three/addons/controls/PointerLockControls.js";

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87ceeb);

const camera = new THREE.PerspectiveCamera(
75,
window.innerWidth/window.innerHeight,
0.1,
1000
);

const renderer = new THREE.WebGLRenderer({
antialias:false
});

renderer.setSize(window.innerWidth,window.innerHeight);
renderer.setPixelRatio(1);
document.body.appendChild(renderer.domElement);

const controls = new PointerLockControls(camera,document.body);

document.getElementById("play").onclick=()=>{
controls.lock();
document.getElementById("menu").style.display="none";
};

controls.addEventListener("unlock",()=>{
document.getElementById("menu").style.display="flex";
});

scene.add(controls.object);

camera.position.set(0,5,0);

// Light
const light=new THREE.DirectionalLight(0xffffff,2);
light.position.set(50,100,50);
scene.add(light);

scene.add(new THREE.AmbientLight(0xffffff,0.5));

// ===== Ground =====

const box=new THREE.BoxGeometry(1,1,1);

const grass=new THREE.MeshLambertMaterial({
color:0x55aa33
});

// マイナス座標対応
for(let x=-32;x<=32;x++){

for(let z=-32;z<=32;z++){

const cube=new THREE.Mesh(box,grass);

cube.position.set(x,-0.5,z);

scene.add(cube);

}

}

// ===== Movement =====

const key={};

window.addEventListener("keydown",e=>key[e.code]=true);
window.addEventListener("keyup",e=>key[e.code]=false);

const clock=new THREE.Clock();

function animate(){

requestAnimationFrame(animate);

const dt=clock.getDelta();

if(controls.isLocked){

const speed=8;

if(key["KeyW"]) controls.moveForward(speed*dt);

if(key["KeyS"]) controls.moveForward(-speed*dt);

if(key["KeyA"]) controls.moveRight(-speed*dt);

if(key["KeyD"]) controls.moveRight(speed*dt);

}

renderer.render(scene,camera);

}

animate();

window.onresize=()=>{

camera.aspect=window.innerWidth/window.innerHeight;

camera.updateProjectionMatrix();

renderer.setSize(window.innerWidth,window.innerHeight);

};
