
import * as THREE from 'three';
// 引入轨道控制器扩展库OrbitControls.js
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';


const scene = new THREE.Scene();
const geometry = new THREE.BoxGeometry(100, 100, 100); 
const material = new THREE.MeshLambertMaterial({
    color: 0xff0000,//0xff0000设置材质颜色为红色
    // transparent:true,//开启透明
    // opacity:0.5,//设置透明度
}); 

const mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh

//设置网格模型在三维空间中的位置坐标，默认是坐标原点
mesh.position.set(50,0,0);
scene.add(mesh);

//点光源：两个参数分别表示光源颜色和光照强度
// 参数1：0xffffff是纯白光,表示光源颜色
// 参数2：1.0,表示光照强度，可以根据需要调整
const pointLight = new THREE.PointLight(0xffffff, 4.0,400);

pointLight.position.set(200,200,200);//点光源放在x轴上
pointLight.decay = 0.2;//设置光源不随距离衰减



scene.add(pointLight); //点光源添加到场景中


// 添加坐标轴
const axesHelper = new THREE.AxesHelper(300);
scene.add(axesHelper);







const width = 400; //宽度
const height = 400; //高度
// 实例化一个透视投影相机对象
const camera = new THREE.PerspectiveCamera(60,width/height,1,3000);
//相机在Three.js三维坐标系中的位置
// 根据需要设置相机位置具体值
camera.position.set(200, 200,200); 
//相机观察目标指向Threejs 3D空间中某个位置
camera.lookAt(0,0,0); //坐标原点

// 创建渲染器对象
const renderer = new THREE.WebGLRenderer();

renderer.setSize(width, height); //设置three.js渲染区域的尺寸(像素px)

renderer.render(scene, camera); //执行渲染操作


const controls = new OrbitControls(camera, renderer.domElement);
// controls.addEventListener('change', function () {
//     // 浏览器控制台查看相机位置变化
//     console.log('camera.position',camera.position);
//     renderer.render(scene, camera); //执行渲染操作
// });//监听鼠标、键盘事件


document.getElementById('light').appendChild(renderer.domElement);



function render() {
    stats.update();
    renderer.render(scene, camera); //执行渲染操作
    mesh.rotateY(0.01);//每次绕y轴旋转0.01弧度
    requestAnimationFrame(render);//请求再次执行渲染函数render，渲染下一帧
}
render();
