import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import * as dat from 'dat.gui'
import galaxy from '../imgs/galaxy.jpg'
import whatsup from '../imgs/whatsup.jpg'

const renderer = new THREE.WebGLRenderer();

renderer.shadowMap.enabled = true;


renderer.setSize(window.innerWidth,window.innerHeight);

document.body.appendChild(renderer.domElement);


const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth/window.innerHeight,
    0.1,
    1000
);

const orbit = new OrbitControls(camera,renderer.domElement);

const axesHelper = new THREE.AxesHelper(100);
scene.add(axesHelper)

camera.position.set(-10,30,30);
orbit.update();

const planeGeometry = new THREE.PlaneGeometry(30,30);
const planeMaterial = new THREE.MeshStandardMaterial({color:0xFFFFFF,side:THREE.DoubleSide});
const plane = new THREE.Mesh(planeGeometry,planeMaterial);
plane.rotation.x = -0.5 * Math.PI
plane.receiveShadow=true;
scene.add(plane)


const boxGeometry= new THREE.BoxGeometry();
const boxMaterial = new THREE.MeshBasicMaterial({color:0x00FF00})
const box = new THREE.Mesh(boxGeometry,boxMaterial);
box.position.set(0,1,0);
scene.add(box);


const gridHelper = new THREE.GridHelper(30);
scene.add(gridHelper)

const sphereGrometry = new THREE.SphereGeometry(4,50,50);
const sphereMaterial = new THREE.MeshStandardMaterial({color:0x0000FF,wireframe:false});
const sphere = new THREE.Mesh(sphereGrometry,sphereMaterial);
sphere.position.set(-10,10,0);
sphere.castShadow=true;
scene.add(sphere);

const ambientLight = new THREE.AmbientLight(0x333333);
scene.add(ambientLight);

// const directionalLight = new THREE.DirectionalLight(0xFFFFFF,0.8);
// directionalLight.position.set(-30,50,0);
// directionalLight.castShadow=true;
// directionalLight.shadow.camera.bottom=-12;
// scene.add(directionalLight);

// const dLightHelper = new THREE.DirectionalLightHelper(directionalLight)
// scene.add(dLightHelper)

// const dLightShadowHelper = new THREE.CameraHelper(directionalLight.shadow.camera);
// scene.add(dLightShadowHelper);

const spotLight = new THREE.SpotLight(0xFFFFFF);
spotLight.position.set(-100,100,0);
spotLight.castShadow=true;
spotLight.angle=0.2;
scene.add(spotLight);

const sLightHelper= new THREE.SpotLightHelper(spotLight);
scene.add(sLightHelper);

// scene.fog = new THREE.Fog(0xFFFFFF,0,200)
scene.fog = new THREE.FogExp2(0xFFFFFF,0.01);

// renderer.setClearColor(0xFFFFFF);
 const textureLoader=new THREE.TextureLoader();
//  scene.background=textureLoader.load(galaxy)

// const cubeTextureLoader = new THREE.CubeTextureLoader();
// scene.background = cubeTextureLoader.load([galaxy,galaxy,galaxy,galaxy,galaxy,galaxy]);


const box2Geometry = new THREE.BoxGeometry(4,4,4);
const box2MultiMaterial = [
    new THREE.MeshBasicMaterial({map:textureLoader.load(whatsup)}),
    new THREE.MeshBasicMaterial({map:textureLoader.load(whatsup)}),
    new THREE.MeshBasicMaterial({map:textureLoader.load(whatsup)}),
    new THREE.MeshBasicMaterial({map:textureLoader.load(whatsup)}),
    new THREE.MeshBasicMaterial({map:textureLoader.load(galaxy)}),
    new THREE.MeshBasicMaterial({map:textureLoader.load(galaxy)}),
];
// const box2Material = new THREE.MeshBasicMaterial({
    
//     map:textureLoader.load(galaxy)
// })
const box2=new THREE.Mesh(box2Geometry,box2MultiMaterial);
box2.position.set(5,5,5);
box2.castShadow=true;
scene.add(box2);

const gui = new dat.GUI();

const options = {
    sphereColor : '#FFca00',
    wireframe : false,
    speed : 0.01,
    angle : 0.2,
    penumbra : 0,
    intensity : 1,
    ClearColor : 0xFFFFFF,

};

gui.addColor(options,'sphereColor').onChange(function(e){
    sphere.material.color.set(e)
});

gui.add(options,'wireframe').onChange(function(e){
    sphere.material.wireframe=e
});

gui.add(options,'speed',0,0.1);

gui.add(options,'angle', 0 , 1);
gui.add(options,'penumbra', 0 , 1);
gui.add(options,'intensity', 0 , 1);

gui.addColor(options,'ClearColor').onChange(function(e){
    renderer.setClearColor(e)
});

let step=0;
let speed=0.01;

function animate(time){
    // box.rotation.x +=time/1000000;
    // box.rotation.y +=time/1000000;
    box.rotation.x +=0.01;
    box.rotation.y +=0.01;

    step+=options.speed;
    
    spotLight.angle = options.angle;
    spotLight.intensity = options.intensity;
    spotLight.penumbra = options.penumbra;
    sLightHelper.update();

    sphere.position.y=10*Math.abs(Math.sin(step));

    renderer.render(scene,camera)
    
}
renderer.setAnimationLoop(animate)

renderer.render(scene,camera);

