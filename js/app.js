/* Neil 'regalstreak' Agarwal <neil@neilagarwal.me> */

import * as THREE from 'three';

/* Global Variables */
let container = document.querySelector('#scene-container');
let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(35, container.clientWidth / container.clientHeight, 0.1, 100);
let renderer = new THREE.WebGLRenderer({ antialias: true });

let mesh;

let raycaster = new THREE.Raycaster();
let mouse = new THREE.Vector2();
let INTERSECTED;

/* Init Function */
const init = () => {
    scene.background = new THREE.Color(0x000000);

    createCamera();
    createLights();
    createMeshes();
    createRenderer();

    container.appendChild(renderer.domElement);

    renderer.setAnimationLoop(() => {
        update();
        render();
    })
}

/* Main Functions */
const createCamera = () => {
    camera.position.set(0, 0, 10);
}

const createLights = () => {
    const light = new THREE.DirectionalLight(0xffffff, 5);
    light.position.set(10, 10, 10);

    scene.add(light);
}

const createMeshes = () => {

    const geometry = new THREE.BoxBufferGeometry(1.5, 1.5, 1.5);
    const material = new THREE.MeshStandardMaterial({
        color: 0x800000
    })
    mesh = new THREE.Mesh(geometry, material);

    scene.add(mesh);
}

const createRenderer = () => {
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
}

const update = () => {
    mesh.rotation.x += 0.02;
    mesh.rotation.y += 0.02;
    mesh.rotation.z += 0.02;
}

const render = () => {
    setupHoverRaycaster();
    renderer.render(scene, camera);
}

/* Event Listeners */
const onWindowResize = () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
}

// Convert mouse movements to normalised coordinates in range (-1, 1)
const onMouseMove = (e) => {
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (e.clientY / window.innerHeight) * 2 + 1;
}

window.addEventListener('resize', onWindowResize);
window.addEventListener('mousemove', onMouseMove);

/* Functions */
const setupHoverRaycaster = () => {
    raycaster.setFromCamera(mouse, camera);

    let intersects = raycaster.intersectObjects(scene.children);

    if (intersects.length > 0) {
        if (INTERSECTED != intersects[0].object) {
            if (INTERSECTED) {
                INTERSECTED.material.color.setHex(INTERSECTED.currentHex);
            }

            INTERSECTED = intersects[0].object;
            INTERSECTED.currentHex = INTERSECTED.material.color.getHex();
            INTERSECTED.material.color.setRGB(0, 1, 0);

        }
    } else {
        if (INTERSECTED) {
            INTERSECTED.material.color.setHex(INTERSECTED.currentHex);
        }
        INTERSECTED = null;
    }
}


/* Let the magic begin */
init();
