import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, animate, motion, useMotionValue, useReducedMotion, useSpring, useTransform, type PanInfo } from 'framer-motion';
import * as THREE from 'three';

const COUNT = 92;
const RADIUS = 3.25;
const HOME = 'ap-southeast-5';
const DEG = Math.PI / 180;
const TILT_LIMIT = 1.1;

type Region = { code: string; name: string; city: string; lat: number; lon: number };

const REGIONS: Region[] = [
  { code: 'us-east-1', name: 'US East', city: 'N. Virginia', lat: 38.9, lon: -77.4 },
  { code: 'us-east-2', name: 'US East', city: 'Ohio', lat: 40.0, lon: -83.0 },
  { code: 'us-west-1', name: 'US West', city: 'N. California', lat: 37.4, lon: -122.0 },
  { code: 'us-west-2', name: 'US West', city: 'Oregon', lat: 45.8, lon: -119.7 },
  { code: 'ca-central-1', name: 'Canada', city: 'Central', lat: 45.5, lon: -73.6 },
  { code: 'ca-west-1', name: 'Canada West', city: 'Calgary', lat: 51.0, lon: -114.1 },
  { code: 'mx-central-1', name: 'Mexico', city: 'Central', lat: 20.6, lon: -100.4 },
  { code: 'sa-east-1', name: 'South America', city: 'São Paulo', lat: -23.5, lon: -46.6 },
  { code: 'eu-west-1', name: 'Europe', city: 'Ireland', lat: 53.3, lon: -6.3 },
  { code: 'eu-west-2', name: 'Europe', city: 'London', lat: 51.5, lon: -0.1 },
  { code: 'eu-west-3', name: 'Europe', city: 'Paris', lat: 48.9, lon: 2.4 },
  { code: 'eu-central-1', name: 'Europe', city: 'Frankfurt', lat: 50.1, lon: 8.7 },
  { code: 'eu-central-2', name: 'Europe', city: 'Zurich', lat: 47.4, lon: 8.5 },
  { code: 'eu-south-1', name: 'Europe', city: 'Milan', lat: 45.5, lon: 9.2 },
  { code: 'eu-south-2', name: 'Europe', city: 'Spain', lat: 41.6, lon: -0.9 },
  { code: 'eu-north-1', name: 'Europe', city: 'Stockholm', lat: 59.3, lon: 18.1 },
  { code: 'il-central-1', name: 'Israel', city: 'Tel Aviv', lat: 32.1, lon: 34.8 },
  { code: 'me-south-1', name: 'Middle East', city: 'Bahrain', lat: 26.1, lon: 50.6 },
  { code: 'me-central-1', name: 'Middle East', city: 'UAE', lat: 24.5, lon: 54.4 },
  { code: 'af-south-1', name: 'Africa', city: 'Cape Town', lat: -33.9, lon: 18.4 },
  { code: 'ap-south-1', name: 'Asia Pacific', city: 'Mumbai', lat: 19.1, lon: 72.9 },
  { code: 'ap-south-2', name: 'Asia Pacific', city: 'Hyderabad', lat: 17.4, lon: 78.5 },
  { code: 'ap-southeast-1', name: 'Asia Pacific', city: 'Singapore', lat: 1.35, lon: 103.8 },
  { code: 'ap-southeast-5', name: 'Asia Pacific', city: 'Malaysia', lat: 3.1, lon: 101.7 },
  { code: 'ap-southeast-7', name: 'Asia Pacific', city: 'Thailand', lat: 13.8, lon: 100.5 },
  { code: 'ap-southeast-3', name: 'Asia Pacific', city: 'Jakarta', lat: -6.2, lon: 106.8 },
  { code: 'ap-east-1', name: 'Asia Pacific', city: 'Hong Kong', lat: 22.3, lon: 114.2 },
  { code: 'ap-east-2', name: 'Asia Pacific', city: 'Taipei', lat: 25.0, lon: 121.5 },
  { code: 'ap-northeast-1', name: 'Asia Pacific', city: 'Tokyo', lat: 35.7, lon: 139.7 },
  { code: 'ap-northeast-2', name: 'Asia Pacific', city: 'Seoul', lat: 37.6, lon: 127.0 },
  { code: 'ap-northeast-3', name: 'Asia Pacific', city: 'Osaka', lat: 34.7, lon: 135.5 },
  { code: 'ap-southeast-2', name: 'Asia Pacific', city: 'Sydney', lat: -33.9, lon: 151.2 },
  { code: 'ap-southeast-4', name: 'Asia Pacific', city: 'Melbourne', lat: -37.8, lon: 145.0 },
  { code: 'ap-southeast-6', name: 'Asia Pacific', city: 'New Zealand', lat: -36.8, lon: 174.8 },
];

const toVector = (lat: number, lon: number) => new THREE.Vector3(Math.cos(lat * DEG) * Math.sin(lon * DEG), Math.sin(lat * DEG), Math.cos(lat * DEG) * Math.cos(lon * DEG)).multiplyScalar(RADIUS);
const homeRegion = REGIONS.find((r) => r.code === HOME)!;

export function NetworkScene() {
  const canvasHost = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [hovered, setHovered] = useState<number | null>(null);
  const [selected, setSelected] = useState<number | null>(null);
  const [dragging, setDragging] = useState(false);

  // Globe orientation, driven by drag, inertia and focus springs, read by the three.js loop.
  // Starts facing the home region.
  const rotY = useMotionValue(-homeRegion.lon * DEG);
  const rotX = useMotionValue(0);
  const draggingRef = useRef(false);
  const selectedRef = useRef<number | null>(null);
  const pointer = useRef<{ x: number; y: number } | null>(null);
  const pick = useRef<(x: number, y: number, radius: number) => number | null>(() => null);

  // Cursor-follow tilt of the whole scene.
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const tiltX = useSpring(useTransform(py, [-.5, .5], [9, -9]), { stiffness: 120, damping: 18 });
  const tiltY = useSpring(useTransform(px, [-.5, .5], [-11, 11]), { stiffness: 120, damping: 18 });
  const scale = useSpring(1, { stiffness: 160, damping: 20 });

  const tipX = useMotionValue(0);
  const tipY = useMotionValue(0);
  const tipVisible = useRef(true);
  const [tipHidden, setTipHidden] = useState(false);

  useEffect(() => {
    const el = canvasHost.current;
    if (!el) return;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, 1, .1, 100);
    camera.position.z = 10;
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    } catch {
      el.classList.add('network-scene-fallback');
      return () => el.classList.remove('network-scene-fallback');
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.6));
    el.appendChild(renderer.domElement);
    const group = new THREE.Group();
    scene.add(group);
    const dotGeometry = new THREE.SphereGeometry(1, 10, 10);

    // Background mesh network.
    const points: THREE.Vector3[] = [];
    const meshMaterial = new THREE.MeshBasicMaterial({ color: '#efd8af', transparent: true, opacity: .55 });
    for (let i = 0; i < COUNT; i++) {
      const phi = Math.acos(-1 + (2 * i) / COUNT);
      const theta = Math.sqrt(COUNT * Math.PI) * phi;
      const v = new THREE.Vector3(Math.cos(theta) * Math.sin(phi), Math.sin(theta) * Math.sin(phi), Math.cos(phi)).multiplyScalar(RADIUS);
      points.push(v);
      const dot = new THREE.Mesh(dotGeometry, meshMaterial);
      dot.position.copy(v);
      dot.scale.setScalar(.022);
      group.add(dot);
    }
    const vertices: number[] = [];
    points.forEach((p, i) => points.slice(i + 1).forEach((other) => { if (p.distanceTo(other) < 1.3) vertices.push(p.x, p.y, p.z, other.x, other.y, other.z); }));
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    const lineMaterial = new THREE.LineBasicMaterial({ color: '#b8772f', transparent: true, opacity: .28 });
    group.add(new THREE.LineSegments(geometry, lineMaterial));

    // AWS region dots.
    const regionMeshes = REGIONS.map((region) => {
      const isHome = region.code === HOME;
      const dot = new THREE.Mesh(dotGeometry, new THREE.MeshBasicMaterial({ color: isHome ? '#f3c06a' : '#c18c3d' }));
      dot.position.copy(toVector(region.lat, region.lon));
      dot.scale.setScalar(isHome ? .07 : .05);
      dot.userData.base = isHome ? .07 : .05;
      group.add(dot);
      return dot;
    });

    // Halo ring that marks the active region.
    const halo = new THREE.Mesh(new THREE.RingGeometry(.12, .145, 40), new THREE.MeshBasicMaterial({ color: '#efd8af', transparent: true, opacity: 0, side: THREE.DoubleSide }));
    group.add(halo);

    const resize = () => { const width = el.clientWidth; const height = el.clientHeight; if (!width || !height) return; renderer.setSize(width, height, false); camera.aspect = width / height; camera.updateProjectionMatrix(); };
    resize();
    const observer = new ResizeObserver(resize); observer.observe(el);

    const world = new THREE.Vector3();
    const project = (index: number) => {
      regionMeshes[index].getWorldPosition(world);
      const front = world.z > .6;
      world.project(camera);
      return { x: (world.x + 1) / 2 * el.clientWidth, y: (1 - world.y) / 2 * el.clientHeight, front };
    };
    pick.current = (x, y, radius) => {
      let best = radius * radius;
      let hit: number | null = null;
      regionMeshes.forEach((_, i) => {
        const s = project(i);
        const d = (s.x - x) ** 2 + (s.y - y) ** 2;
        if (s.front && d < best) { best = d; hit = i; }
      });
      return hit;
    };

    let current: number | null = null;
    let frame = 0;
    let last = performance.now();
    const animateFrame = (now: number) => {
      frame = requestAnimationFrame(animateFrame);
      const dt = Math.min(now - last, 64); last = now;
      const focused = selectedRef.current !== null;
      if (!reduced && !focused && !draggingRef.current && !rotY.isAnimating()) rotY.set(rotY.get() + dt * (current === null ? .0001 : .00002));
      group.rotation.y = rotY.get();
      group.rotation.x = rotX.get() + (reduced || focused ? 0 : Math.sin(now * .00025) * .07);
      group.updateMatrixWorld();

      const p = pointer.current;
      const next = p && !draggingRef.current ? pick.current(p.x, p.y, 20) : null;
      if (next !== current) { current = next; setHovered(next); }

      const active = current ?? selectedRef.current;
      regionMeshes.forEach((mesh, i) => {
        const target = mesh.userData.base * (i === active ? 2 : 1);
        mesh.scale.setScalar(THREE.MathUtils.lerp(mesh.scale.x, target, .18));
      });
      const haloMaterial = halo.material as THREE.MeshBasicMaterial;
      if (active !== null) {
        const mesh = regionMeshes[active];
        halo.position.copy(mesh.position);
        halo.lookAt(mesh.position.clone().multiplyScalar(2));
        halo.scale.setScalar(1 + Math.sin(now * .006) * .15);
        const s = project(active);
        tipX.set(s.x); tipY.set(s.y);
        if (s.front !== tipVisible.current) { tipVisible.current = s.front; setTipHidden(!s.front); }
      }
      haloMaterial.opacity = THREE.MathUtils.lerp(haloMaterial.opacity, active === null ? 0 : .85, .15);
      lineMaterial.opacity = THREE.MathUtils.lerp(lineMaterial.opacity, active === null ? .28 : .42, .1);
      renderer.render(scene, camera);
    };
    frame = requestAnimationFrame(animateFrame);
    return () => { cancelAnimationFrame(frame); observer.disconnect(); renderer.dispose(); geometry.dispose(); dotGeometry.dispose(); scene.traverse((object) => { if (object instanceof THREE.Mesh || object instanceof THREE.LineSegments) { object.geometry.dispose(); const m = object.material; if (Array.isArray(m)) m.forEach((x) => x.dispose()); else m.dispose(); } }); renderer.domElement.remove(); pick.current = () => null; };
  }, [reduced, rotX, rotY, tipX, tipY]);

  // Spin the selected region to the front of the globe.
  useEffect(() => {
    selectedRef.current = selected;
    if (selected === null) {
      if (!draggingRef.current) animate(rotX, 0, { type: 'spring', stiffness: 40, damping: 14 });
      return;
    }
    const region = REGIONS[selected];
    const current = rotY.get();
    const delta = Math.atan2(Math.sin(-region.lon * DEG - current), Math.cos(-region.lon * DEG - current));
    const spring = reduced ? { duration: 0 } : { type: 'spring' as const, stiffness: 55, damping: 16 };
    animate(rotY, current + delta, spring);
    animate(rotX, THREE.MathUtils.clamp(region.lat * DEG, -TILT_LIMIT, TILT_LIMIT), spring);
  }, [selected, reduced, rotX, rotY]);

  const localPoint = (event: React.PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    return { x: event.clientX - rect.left, y: event.clientY - rect.top, rect };
  };
  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const { x, y, rect } = localPoint(event);
    pointer.current = { x, y };
    if (reduced || event.pointerType === 'touch') return;
    px.set(x / rect.width - .5);
    py.set(y / rect.height - .5);
  };
  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    const { x, y } = localPoint(event);
    pointer.current = { x, y };
  };
  const onPointerLeave = () => { pointer.current = null; px.set(0); py.set(0); scale.set(1); };
  const onTap = (event: PointerEvent) => {
    const host = canvasHost.current;
    if (!host) return;
    const rect = host.getBoundingClientRect();
    const hit = pick.current(event.clientX - rect.left, event.clientY - rect.top, event.pointerType === 'touch' ? 30 : 20);
    setSelected((prev) => (hit === null || hit === prev ? null : hit));
  };
  const onPanStart = () => { draggingRef.current = true; setDragging(true); rotY.stop(); rotX.stop(); };
  const onPan = (_: PointerEvent, info: PanInfo) => {
    rotY.set(rotY.get() + info.delta.x * .008);
    rotX.set(THREE.MathUtils.clamp(rotX.get() + info.delta.y * .006, -TILT_LIMIT, TILT_LIMIT));
  };
  const onPanEnd = (_: PointerEvent, info: PanInfo) => {
    draggingRef.current = false; setDragging(false);
    if (reduced) return;
    animate(rotY, rotY.get(), { type: 'inertia', velocity: info.velocity.x * .008, power: .5, timeConstant: 700 });
    animate(rotX, rotX.get(), { type: 'inertia', velocity: info.velocity.y * .006, min: -TILT_LIMIT, max: TILT_LIMIT, power: .4, timeConstant: 500, bounceStiffness: 120, bounceDamping: 16 })
      .then(() => { if (selectedRef.current === null) animate(rotX, 0, { type: 'spring', stiffness: 40, damping: 14 }); });
  };

  const active = hovered ?? selected;
  const region = active === null ? null : REGIONS[active];
  const pinned = active !== null && active === selected;

  return (
    <motion.div
      className={`network-scene${dragging ? ' is-dragging' : ''}${hovered !== null ? ' is-pointing' : ''}`}
      aria-hidden="true"
      style={{ rotateX: tiltX, rotateY: tiltY, scale, transformPerspective: 900 }}
      onPointerMove={onPointerMove}
      onPointerDown={onPointerDown}
      onPointerEnter={() => !reduced && scale.set(1.03)}
      onPointerLeave={onPointerLeave}
      onTap={onTap}
      onPanStart={onPanStart}
      onPan={onPan}
      onPanEnd={onPanEnd}
    >
      <div className="network-scene-canvas" ref={canvasHost} />
      <AnimatePresence>
        {region && !tipHidden && (
          <motion.div
            key={region.code}
            className={`network-scene-tip${pinned ? ' is-pinned' : ''}`}
            style={{ x: tipX, y: tipY }}
            initial={{ opacity: 0, scale: .8, filter: 'blur(4px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: .9, transition: { duration: .12 } }}
            transition={{ type: 'spring', stiffness: 320, damping: 24 }}
          >
            <span className="network-scene-tip-code">{region.code}{region.code === HOME && <em>Home</em>}</span>
            <strong>{region.name}</strong>
            <span className="network-scene-tip-city">{region.city}</span>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active === null && !dragging && (
          <motion.span className="network-scene-hint" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0, transition: { delay: 1.4 } }} exit={{ opacity: 0, y: 6 }}>
            {REGIONS.length} AWS regions · Tap a dot
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
