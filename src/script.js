import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import * as dat from 'lil-gui'
import wallVertexShader from './shaders/wall/vertex.glsl'
import wallFragmentShader from './shaders/wall/fragment.glsl'
import groundVertexShader from './shaders/ground/vertex.glsl'
import groundFragmentShader from './shaders/ground/fragment.glsl'
import patternsVertexShader from './shaders/patterns/vertex.glsl'
import patternsFragmentShader from './shaders/patterns/fragment.glsl'

/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

//Textures
const textureLoader = new THREE.TextureLoader()
const discoBallColor = textureLoader.load('/textures/discoBall/color.jpg')
const discoBallAmbientOcclusion = textureLoader.load('/textures/discoBall/ambientOcclusion.jpg')
const discoBallNormal = textureLoader.load('/textures/discoBall/normal.jpg')


const cubeTextureLoader = new THREE.CubeTextureLoader()
const envMap = cubeTextureLoader.load([
    '/textures/environmentMaps/0/px.jpg',
    '/textures/environmentMaps/0/nx.jpg',
    '/textures/environmentMaps/0/py.jpg',
    '/textures/environmentMaps/0/ny.jpg',
    '/textures/environmentMaps/0/pz.jpg',
    '/textures/environmentMaps/0/nz.jpg'
])

//Song
const holdingBack = '/sounds/holdingBack.webm'
const patterns = '/sounds/patterns.webm'

/**
 * Wall
 */
const geometry = new THREE.PlaneGeometry(3, 1.5, 64, 64)

const count = geometry.attributes.position.count
const randoms = new Float32Array(count)
for (let i = 0; i < count; i++) {
    randoms[i] = Math.random()
}
geometry.setAttribute('aRandom', new THREE.BufferAttribute(randoms, 1))

const wallMaterial = new THREE.RawShaderMaterial({
    vertexShader: wallVertexShader,
    fragmentShader: wallFragmentShader,
    transparent: true,
    uniforms: {
        uFrequency: { value: new THREE.Vector2(6, 5) },
        uTime: { value: 0 },
        uNoiseWeightLow: { value: 0 },
        uNoiseWeightHigh: { value: 0 }
    }
})

const patternsMaterial = new THREE.RawShaderMaterial({
    vertexShader: patternsVertexShader,
    fragmentShader: patternsFragmentShader,
    uniforms: {
        uWeight: { value: 1 },
        uTime: { value: 0 },
        uFreq: { value: 1 }
    }
})

const parameters = {
    frequencySample: 3,
}

const wallMeshP = new THREE.Mesh(geometry, patternsMaterial)
wallMeshP.position.y += 0.3

const wallMeshH = new THREE.Mesh(geometry, wallMaterial)
wallMeshH.position.y += 0.3


/**
 * Ground
 */
const groundGeometry = new THREE.PlaneGeometry(3, 1, 1, 1)

const checkerboardMaterial = new THREE.RawShaderMaterial({
    vertexShader: groundVertexShader,
    fragmentShader: groundFragmentShader,
    uniforms: {
        uWeight: { value: 1 }
    }
})
const groundMesh = new THREE.Mesh(
    groundGeometry,
    checkerboardMaterial
)
groundMesh.position.y -= 0.5
groundMesh.rotation.x = -1

/**
 * Disco Ball
 */
const discoBallMaterial = new THREE.MeshStandardMaterial({
    map: discoBallColor,
    aoMap: discoBallAmbientOcclusion,
    roughness: 0.3,
    normalMap: discoBallNormal,
    metalness: 0.9,
    envMap: envMap
})
const discoBall = new THREE.Mesh(
    new THREE.SphereGeometry(0.12, 50, 50),
    discoBallMaterial
)

discoBall.position.set(0, 0.3, 0.4)


const particlesGeometry = new THREE.BufferGeometry()
const particlesCount = 500
const points = new Float32Array(particlesCount * 3)
for (let i = 0; i < particlesCount * 3; i++) {
    points[i] = 2 * (Math.random() - 0.5)
}
particlesGeometry.setAttribute('position', new THREE.BufferAttribute(points, 3))

const particlesMaterial = new THREE.PointsMaterial()
particlesMaterial.transparent = true
particlesMaterial._alphaTest = 0.001
particlesMaterial.size = 0.01
particlesMaterial.sizeAttenuation = true


const particles = new THREE.Points(particlesGeometry, particlesMaterial)

/**
 * Lights
 */

const ambientLight = new THREE.DirectionalLight(0xffffff, 0.5)
ambientLight.position.set(0, 1, 3)
    // scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.1)
directionalLight.position.set(-5, -5, 0.5)
directionalLight.lookAt(discoBall)
scene.add(directionalLight)

const pointLight = new THREE.PointLight(0xffffff, 0.4)
pointLight.position.set(1, 0.3, 1)
scene.add(pointLight)



/**
 * GUI
 */
gui.add(wallMaterial.uniforms.uFrequency.value, 'x').min(0).max(20).step(0.01).name('frequencyX')
gui.add(wallMaterial.uniforms.uFrequency.value, 'y').min(0).max(20).step(0.01).name('frequencyY')
gui.add(parameters, 'frequencySample').min(0).max(15).step(1).name('frequencySample')



/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.set(0, -0.3, 1.2)
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Audio
 */
// create an AudioListener and add it to the camera
const listener = new THREE.AudioListener();
camera.add(listener);

// create an Audio source
const sound = new THREE.Audio(listener);

// load a sound and set it as the Audio object's buffer
const audioLoader = new THREE.AudioLoader();
let playingP = false;
let playingH = false;

window.addEventListener('keyup', event => {
    if (event.code === 'KeyP' && !playingP && !playingH) {
        audioLoader.load(patterns, function(buffer) {
            sound.setBuffer(buffer);
            sound.setLoop(true);
            sound.setVolume(0.5);
            sound.play();
        });
        playingP = true
        scene.add(wallMeshP)
    } else if (event.code === 'KeyH' && !playingH && !playingP) {
        audioLoader.load(holdingBack, function(buffer) {
            sound.setBuffer(buffer);
            sound.setLoop(true);
            sound.setVolume(0.5);
            sound.play();
        });
        playingH = true
        scene.add(wallMeshH, discoBall, groundMesh)
    } else if (event.code === 'KeyP' && playingP) {
        sound.stop()
        scene.remove(wallMeshP, particles)
        playingP = false
    } else if (event.code === 'KeyH' && playingH) {
        sound.stop()
        scene.remove(wallMeshH, particles, discoBall, groundMesh)
        playingH = false
    }
})

// create an AudioAnalyser, passing in the sound and desired fftSize
const analyser = new THREE.AudioAnalyser(sound, 64);

/**
 * Animate
 */
const clock = new THREE.Clock()
const showBlueLight = false;

const tick = () => {
    const elapsedTime = clock.getElapsedTime()
    wallMaterial.uniforms.uTime.value = elapsedTime

    const data = analyser.getFrequencyData();
    wallMaterial.uniforms.uNoiseWeightLow.value = data[13] / 750
    wallMaterial.uniforms.uNoiseWeightHigh.value = data[parameters.frequencySample] / 1500

    checkerboardMaterial.uniforms.uWeight.value = analyser.getAverageFrequency() / 250

    patternsMaterial.uniforms.uTime.value = elapsedTime
    patternsMaterial.uniforms.uFreq.value = analyser.getAverageFrequency() / 100

    pointLight.position.x = Math.sin(2 * elapsedTime)
    pointLight.position.z = Math.cos(2 * elapsedTime)

    discoBall.rotation.y = 10 * elapsedTime
    particles.rotation.y = -0.5 * elapsedTime

    if (!showBlueLight && (analyser.getAverageFrequency() > 130)) {
        scene.add(particles)
    }

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()