// src/main.js (or similar)
import * as THREE from 'three'; 
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'; 

let scene, camera, renderer;

// *** IMPORTANT: Use your GitHub Pages URLs if raw.githubusercontent.com fails ***
const ROOM_URL = 'https://raw.githubusercontent.com/noelkercy-sudo/stupidgame/main/bed.glb'; 
const BED_URL = 'https://raw.githubusercontent.com/noelkercy-sudo/stupidgame/main/bed2.glb';

function init() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x333333); 
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0.7, 0.5); 
    camera.rotation.x = -0.1; 

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement); 
    
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(5, 10, 5);
    scene.add(directionalLight);

    window.addEventListener('resize', onWindowResize, false);
    loadBedroomAssets();
}

async function loadBedroomAssets() {
    const loader = new GLTFLoader(); 
    console.log('Starting concurrent asset loading...');

    try {
        const [roomGltf, bedGltf] = await Promise.all([
            loader.loadAsync(ROOM_URL),
            loader.loadAsync(BED_URL)
        ]);

        scene.add(roomGltf.scene);
        scene.add(bedGltf.scene);

        console.log('✅ All assets loaded. Starting animation loop.');
        animate(); 
    } catch (error) {
        console.error('❌ Failed to load one or more GLB assets:', error);
    }
}

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

function onWindowResize() {
    if (camera) { 
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }
}

init();