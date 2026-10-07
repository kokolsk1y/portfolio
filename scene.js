// Three.js is MIT licensed: https://github.com/mrdoob/three.js
// The persistent scene / chapter changes follow the interaction architecture
// researched in https://github.com/nothingnothings/r3f-portfolio (MIT).
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';

const canvas=document.querySelector('#world');
const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
const small=window.matchMedia('(max-width: 760px)');
let renderer;
try{
  renderer=new THREE.WebGLRenderer({canvas,alpha:true,antialias:!small.matches,powerPreference:'low-power'});
}catch(error){
  canvas.style.display='none';
}

if(renderer){
  renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,small.matches?1.2:1.75));
  renderer.outputColorSpace=THREE.SRGBColorSpace;
  const scene=new THREE.Scene();
  const camera=new THREE.PerspectiveCamera(42,window.innerWidth/window.innerHeight,.1,100);
  camera.position.set(0,0,15);
  const coreGroup=new THREE.Group();scene.add(coreGroup);
  const floatGroup=new THREE.Group();scene.add(floatGroup);
  const particlesGroup=new THREE.Group();scene.add(particlesGroup);
  const color=new THREE.Color('#ff927e');
  const targetColor=new THREE.Color('#ff927e');
  const glass=new THREE.MeshPhysicalMaterial({color:'#bce8e7',metalness:.3,roughness:.12,transparent:true,opacity:.62,transmission:.25,thickness:1.4,clearcoat:1});
  const metal=new THREE.MeshStandardMaterial({color:'#e6e0e2',metalness:.9,roughness:.19,flatShading:true});
  const glow=new THREE.MeshBasicMaterial({color,transparent:true,opacity:.8});
  const wire=new THREE.MeshBasicMaterial({color,wireframe:true,transparent:true,opacity:.24});
  const inner=new THREE.Mesh(new THREE.IcosahedronGeometry(2.2,1),glass);coreGroup.add(inner);
  const core=new THREE.Mesh(new THREE.IcosahedronGeometry(1.05,1),metal);coreGroup.add(core);
  const coreWire=new THREE.Mesh(new THREE.IcosahedronGeometry(2.45,1),wire);coreGroup.add(coreWire);
  const ringGeometry=new THREE.TorusGeometry(3.25,.023,6,128);
  const rings=[];
  for(let i=0;i<3;i++){
    const ring=new THREE.Mesh(ringGeometry,new THREE.MeshBasicMaterial({color,transparent:true,opacity:.55-i*.11}));
    ring.rotation.set(i*.73+.3,i*.7+.25,i*.45);
    coreGroup.add(ring);rings.push(ring);
  }
  const nodes=[];
  for(let i=0;i<7;i++){
    const angle=(i/7)*Math.PI*2;
    const node=new THREE.Mesh(new THREE.OctahedronGeometry(i%2?.19:.27,0),i%2?glow:metal);
    node.position.set(Math.cos(angle)*3.25,Math.sin(angle)*2.3,Math.sin(angle*2)*1.5);
    coreGroup.add(node);nodes.push(node);
  }
  const accentLight=new THREE.PointLight('#ff927e',45,14);accentLight.position.set(3,2,4);scene.add(accentLight);
  const coolLight=new THREE.PointLight('#6fc5d7',38,15);coolLight.position.set(-4,-2,3);scene.add(coolLight);
  scene.add(new THREE.AmbientLight('#aabbd8',1.5));
  const floatCount=small.matches?7:18;
  for(let i=0;i<floatCount;i++){
    const material=new THREE.MeshPhysicalMaterial({color:i%2?'#8ed8d8':'#e3b4a5',metalness:.45,roughness:.27,transparent:true,opacity:.48});
    const geometry=i%3===0?new THREE.OctahedronGeometry(.22+i%4*.06):new THREE.BoxGeometry(.22+i%4*.05,.22+i%4*.05,.22+i%4*.05);
    const object=new THREE.Mesh(geometry,material);
    object.position.set((Math.random()-.5)*16,(Math.random()-.5)*10,(Math.random()-.5)*9-2);
    object.userData.phase=Math.random()*Math.PI*2;
    floatGroup.add(object);
  }
  const starCount=small.matches?90:230;
  const points=new Float32Array(starCount*3);
  for(let i=0;i<starCount;i++){points[i*3]=(Math.random()-.5)*35;points[i*3+1]=(Math.random()-.5)*24;points[i*3+2]=(Math.random()-.5)*20-4}
  const geometry=new THREE.BufferGeometry();geometry.setAttribute('position',new THREE.BufferAttribute(points,3));
  const stars=new THREE.Points(geometry,new THREE.PointsMaterial({color:'#bbd1e0',size:.035,transparent:true,opacity:.55,sizeAttenuation:true}));particlesGroup.add(stars);
  const worldPosition=new THREE.Vector3();
  const targetPosition=new THREE.Vector3();
  let chapter=0,mode='story',off=false,mouseX=0,mouseY=0;
  function positionTarget(){
    const mobile=small.matches;
    const x=mobile?0:3.7;
    const z=chapter===3?1:chapter===4?-1:0;
    targetPosition.set(x,chapter%2===0?.1:-.25,z);
  }
  function resize(){
    const width=window.innerWidth,height=window.innerHeight;
    camera.aspect=width/height;camera.fov=small.matches?58:42;camera.position.z=small.matches?17:15;camera.updateProjectionMatrix();renderer.setSize(width,height,false);renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,small.matches?1.2:1.75));positionTarget();worldPosition.copy(targetPosition);coreGroup.position.copy(worldPosition)
  }
  window.addEventListener('resize',resize,{passive:true});resize();
  window.addEventListener('pointermove',event=>{mouseX=(event.clientX/window.innerWidth-.5)*2;mouseY=(event.clientY/window.innerHeight-.5)*2},{passive:true});
  document.addEventListener('portfolio-scene',event=>{chapter=event.detail.index;targetColor.set(event.detail.theme==='mint'?'#8de4cd':event.detail.theme==='violet'?'#b995ff':event.detail.theme==='blue'?'#88c9ff':event.detail.theme==='gold'?'#f4c985':'#ff927e');positionTarget()});
  document.addEventListener('portfolio-mode',event=>{mode=event.detail.mode;targetPosition.set(small.matches?0:3.5,0,mode==='match'?1.5:-1)});
  document.addEventListener('portfolio-motion',event=>{off=event.detail.off;if(!off)requestAnimationFrame(frame)});
  let previous=0;
  function frame(time){
    if(off||reduced.matches||document.hidden)return;
    const dt=Math.min(.05,(time-previous)/1000||.016);previous=time;
    const t=time*.001;
    color.lerp(targetColor,.025);
    glow.color.copy(color);wire.color.copy(color);rings.forEach(ring=>ring.material.color.copy(color));accentLight.color.copy(color);
    coreGroup.position.lerp(targetPosition,.025);
    coreGroup.rotation.y+=dt*.13;coreGroup.rotation.x+=(mouseY*.09-coreGroup.rotation.x)*.015;
    coreGroup.rotation.z+=(mouseX*.08-coreGroup.rotation.z)*.015;
    core.rotation.x+=dt*.19;core.rotation.y-=dt*.28;
    coreWire.rotation.y-=dt*.11;coreWire.rotation.z+=dt*.09;
    rings[0].rotation.z+=dt*.1;rings[1].rotation.x-=dt*.09;rings[2].rotation.y+=dt*.08;
    nodes.forEach((node,i)=>{node.rotation.y+=dt*.32;node.position.z=Math.sin(t*.65+i)*.5+Math.sin(i*2)*1.2});
    floatGroup.children.forEach((object,i)=>{object.rotation.x+=dt*.12;object.rotation.y+=dt*.17;object.position.y+=Math.sin(t*.4+object.userData.phase)*dt*.06});
    stars.rotation.y+=dt*.004;
    renderer.render(scene,camera);
    requestAnimationFrame(frame);
  }
  if(!reduced.matches)requestAnimationFrame(frame);else renderer.render(scene,camera);
  document.addEventListener('visibilitychange',()=>{if(!document.hidden&&!off&&!reduced.matches){previous=performance.now();requestAnimationFrame(frame)}});
}
