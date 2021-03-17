import * as THREE from "three";

const run = (canvas) => {
  const renderer = new THREE.WebGLRenderer({ canvas });
  const camera = new THREE.PerspectiveCamera(40, 2, 0.1, 1000);
  camera.position.z = 120;
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xaaaaaa);
  const geometry = new THREE.BoxGeometry(1, 1, 1);

  const resizeRendererToDisplaySize = (renderer) => {
    const canvas = renderer.domElement;
    const pixelRatio = window.devicePixelRatio;
    const width = (canvas.clientWidth * pixelRatio) | 0;
    const height = (canvas.clientHeight * pixelRatio) | 0;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
  };

  const makeInstance = (geometry, color, x) => {
    const material = new THREE.MeshPhongMaterial({ color });

    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    cube.position.x = x;

    return cube;
  };

  const objects = [];
  const spread = 15;

  const addObject = (x, y, obj) => {
    obj.position.x = x * spread;
    obj.position.y = y * spread;

    scene.add(obj);
    objects.push(obj);
  };

  const createMaterial = () => {
    const material = new THREE.MeshPhongMaterial({side:THREE.DoubleSide});

    const hue = Math.random();
    const saturation = 1;
    const luminance = 0.5;
    material.color.setHSL(hue, saturation, luminance);

    return material;
  }

  const addSolidGeometry = (x, y, geometry) => {
    const mesh = new THREE.Mesh(geometry, createMaterial());
    addObject(x, y, mesh);
  }

  addSolidGeometry(-2,-2, new THREE.BoxGeometry(6,6,6));
  addSolidGeometry(-2,0, new THREE.TorusGeometry(10, 2, 4, 20, 4));

  const cubes = [
    makeInstance(geometry, 0x44aa88, 0, scene),
    makeInstance(geometry, 0x8844aa, -2, scene),
    makeInstance(geometry, 0xaa8844, 2, scene),
  ];

  {
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(-1, 2, 4);
    scene.add(light);
  }

  function render(time) {
    time *= 0.001;
    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }

    cubes.forEach((cube, ndx) => {
      const speed = 1 + ndx * 0.1;
      const rot = time * speed;
      cube.rotation.x = rot;
      cube.rotation.y = rot;
    });

    renderer.render(scene, camera);

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
};

export default run;
