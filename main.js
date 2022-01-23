

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGL1Renderer({
  canvas: document.querySelector("#bg"),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render(scene, camera);

const geometry = new THREE.RingGeometry(8.961, 4.698, 10, 8 ,0, 6.283185307179586);
const material = new THREE.MeshBasicMaterial({
  color: 0xf4bbff,
  side: THREE.DoubleSide,
  wireframe: true,
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

const moosh = new THREE.RingGeometry(5, 10, 3,8,0,6.283185307179586);
const mat = new THREE.MeshBasicMaterial({
  color: 0xffe4e1,
  side: THREE.DoubleSide,
  wireframe: true,
});



const mosh = new THREE.Mesh(moosh, mat);
scene.add(mosh);

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(1, 1, 1);

const ambientLight = new THREE.AmbientLight(0xffffff);
pointLight.position.set(10, 5, 10);
scene.add(pointLight, ambientLight);

var controls = new THREE.OrbitControls(camera, renderer.domElement)

function addSquare() {
  const geometry = new THREE.BoxGeometry(0.5, 0.6, 0.5);
  const material = new THREE.MeshStandardMaterial({ color: 0xff77ff });
  const plane = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  plane.position.set(x, y, z);
  scene.add(plane);
}

Array(500).fill().forEach(addSquare);

const spaceTexture = new THREE.TextureLoader().load("https://images.unsplash.com/photo-1520034475321-cbe63696469a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=clamp");
scene.background = spaceTexture;


const imageLoader = new THREE.TextureLoader().load("https://images.unsplash.com/photo-1447433819943-74a20887a81e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1199&q=80");

const myImg = new THREE.Mesh(
  new THREE.SphereGeometry(7, 7, 7),
  new THREE.MeshBasicMaterial({ map: imageLoader })
);

scene.add(myImg);
myImg.position.z = -10;
myImg.position.setX(-30);
myImg.position.setY(10);


const moonTexture = new THREE.TextureLoader().load("https://images.unsplash.com/photo-1608178398319-48f814d0750c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=879&q=80");
const moon = new THREE.Mesh(
  new THREE.SphereGeometry(10, 10, 10),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
  })
);

scene.add(moon);

moon.position.z = 30;
moon.position.setX(-20);
moon.position.setY(5);

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  moon.rotation.x += 0.05;
  moon.rotation.y += 0.075;
  moon.rotation.z += 0.05;

  myImg.rotation.x += 0.01;
  myImg.rotation.y += 0.08;
  myImg.rotation.z += 0.09;

  camera.position.z = t * -0.01;

  camera.position.x = t * -0.002;
  camera.position.y = t * -0.002;
}
document.body.onscroll = moveCamera;

function animate() {
  requestAnimationFrame(animate);

  mesh.rotation.x += 0.02;
  mesh.rotation.y += 0.03;
  mesh.rotation.z += 0.01;


  mosh.rotation.y += 0.04;
  mosh.rotation.z += 0.01;

  moon.rotation.x += 0.01;
  moon.rotation.y += 0.01;
  moon.rotation.z += 0.01;
  controls.update();
  renderer.render(scene, camera);
}

animate();
