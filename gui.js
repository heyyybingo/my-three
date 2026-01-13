// 引入dat.gui.js的一个类GUI
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';


//创建stats对象
//引入性能监视器stats.js
import Stats from 'three/addons/libs/stats.module.js';

import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';


const scene = new THREE.Scene();
// const geometry = new THREE.BoxGeometry(100, 100, 100); 
// const material = new THREE.MeshBasicMaterial({
//     color: 0xff0000,//0xff0000设置材质颜色为红色
//     transparent:true,//开启透明
//     opacity:0.5,//设置透明度
// }); 
const num = 1000; //控制长方体模型数量
const boxes=[];

const geometry = new THREE.BoxGeometry(30, 30, 30);
    const material = new THREE.MeshLambertMaterial({
        color: 0xff0000
    });
    const mesh = new THREE.Mesh(geometry, material);
    // 随机生成长方体xyz坐标
    const x = (Math.random() - 0.5) * 100
    const y = (Math.random() - 0.5) * 100
    const z = (Math.random() - 0.5) * 100
    mesh.position.set(x, y, z)
    scene.add(mesh); // 模型对象插入场景中
    boxes.push(mesh)


const pointLight = new THREE.PointLight(0xffffff, 8.0,400);
pointLight.position.set(200,200,200);//点光源放在x轴上
pointLight.decay = 0.2;//设置光源不随距离衰减
scene.add(pointLight); //点光源添加到场景中

const width = 400; //宽度
const height = 400; //高度
// 实例化一个透视投影相机对象
const camera = new THREE.PerspectiveCamera(60,width/height,1,3000);
//相机在Three.js三维坐标系中的位置
// 根据需要设置相机位置具体值
camera.position.set(200, 200, 200); 
//相机观察目标指向Threejs 3D空间中某个位置
camera.lookAt(0,0,0); //坐标原点



// 添加坐标轴
const axesHelper = new THREE.AxesHelper(150);
scene.add(axesHelper);
// 创建渲染器对象
const renderer = new THREE.WebGLRenderer();

renderer.setSize(width, height); //设置three.js渲染区域的尺寸(像素px)

renderer.render(scene, camera); //执行渲染操作

document.getElementById('gui').appendChild(renderer.domElement);

//const controls = new OrbitControls(camera, renderer.domElement);


const stats = new Stats();
// stats.showPanel( 0 ); // 0: fps, 1: ms, 2: mb, 3+: custom
//stats.domElement:web页面上输出计算结果,一个div元素，
document.body.appendChild(stats.dom);
// 渲染函数
function render() {
	//requestAnimationFrame循环调用的函数中调用方法update(),来刷新时间
	stats.update();
   
	renderer.render(scene, camera); //执行渲染操作
   
	// stats.end();    
	requestAnimationFrame(render); //请求再次执行渲染函数render，渲染下一帧
}
render();

// 实例化一个gui对象
const gui = new GUI();

gui.add(mesh.position, 'x', 0, 180);
gui.add(mesh.position, 'y', 0, 180);
gui.add(mesh.position, 'z', 0, 180);
document.body.appendChild(gui.domElement);


