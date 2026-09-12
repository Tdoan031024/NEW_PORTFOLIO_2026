"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { KTX2Loader } from "three/examples/jsm/loaders/KTX2Loader.js";
import { MeshoptDecoder } from "three/examples/jsm/libs/meshopt_decoder.module.js";

type HeroThreeProps = {
  modelUrl?: string;
  walkUrl?: string;
  runUrl?: string;
  className?: string;
  introZoom?: boolean;
  enableControls?: boolean;
  enableRotate?: boolean;
  enablePan?: boolean;
  enableZoom?: boolean;
  showCoordinateHelper?: boolean;
  enableInteraction?: boolean;
  enableHover?: boolean;
  enableFloat?: boolean;
  initialCameraPosition?: { x: number; y: number; z: number };
  initialTarget?: { x: number; y: number; z: number };
  initialModelRotationY?: number;
  modelOffset?: { x?: number; y?: number; z?: number };
  maxRotationAngle?: number;
};

const DEFAULT_MODEL_URL = "/assets/models/room-IT-3d-normal.glb";
type NavTarget = "about" | "skills" | "works" | "contact";
type ExternalTarget = "mail" | "facebook" | "github" | "linkedin";

const NAV_SECTION_IDS: Record<NavTarget, string[]> = {
  about: ["about", "hero"],
  skills: ["skills"],
  works: ["projects", "works"],
  contact: ["contact"],
};

const EXTERNAL_LINKS: Record<ExternalTarget, string> = {
  mail: "mailto:dovantuyendoan14@gmail.com",
  facebook: "https://www.facebook.com/doans.310",
  github: "https://github.com/Tdoan031024",
  linkedin: "https://www.linkedin.com/in/dvtd/",
};

const NAV_MESH_PATTERNS: Record<NavTarget, RegExp[]> = {
  about: [/Plane\.038_329/i, /Object_533/i, /Text\.002_334/i, /Object_543/i],
  skills: [/Plane\.039_330/i, /Object_535/i, /Text\.001_333/i, /Object_541/i],
  works: [/Plane\.042_331/i, /Object_537/i, /Text\.003_335/i, /Object_545/i],
  contact: [/Plane\.043_332/i, /Object_539/i, /Text\.004_336/i, /Object_547/i],
};

const EXTERNAL_MESH_PATTERNS: Record<ExternalTarget, RegExp[]> = {
  mail: [
    /Sketchfab_model\.007_237/i,
    /mail_icon/i,
    /Object_3\.002_235/i,
    /Object_402/i,
    /Object_403/i,
  ],
  facebook: [],
  github: [
    /Sketchfab_model\.008_249/i,
    /root\.001_248/i,
    /GLTF_SceneRootNode\.001_247/i,
    /Curve\.012_0_246/i,
    /Object_4\.004_245/i,
    /Object_423/i,
    /Object_424/i,
  ],
  linkedin: [
    /Sketchfab_model\.009_255/i,
    /root\.003_254/i,
    /GLTF_SceneRootNode\.005_253/i,
    /Cube_0_251/i,
    /Object_4\.005_250/i,
    /Object_430/i,
    /Object_431/i,
  ],
};

const BALL_MESH_PATTERNS: RegExp[] = [/Sphere\s*_217/i, /Object_369/i];

type Rig = {
  head?: THREE.Object3D | null;
  torso?: THREE.Object3D | null;
  leftArm?: THREE.Object3D | null;
  rightArm?: THREE.Object3D | null;
};

const createFallbackCharacter = (
  baseColor: THREE.Color,
  highlightColor: THREE.Color,
) => {
  const group = new THREE.Group();

  const bodyMaterial = new THREE.MeshStandardMaterial({
    color: baseColor,
    roughness: 0.35,
    metalness: 0.5,
    emissive: baseColor,
    emissiveIntensity: 0.2,
  });
  const accentMaterial = new THREE.MeshStandardMaterial({
    color: highlightColor,
    roughness: 0.2,
    metalness: 0.8,
    emissive: highlightColor,
    emissiveIntensity: 0.25,
  });

  const torso = new THREE.Mesh(
    new THREE.CapsuleGeometry(0.35, 0.7, 6, 12),
    bodyMaterial,
  );
  torso.position.set(0, 0.25, 0);

  const head = new THREE.Mesh(
    new THREE.SphereGeometry(0.32, 24, 18),
    bodyMaterial,
  );
  head.position.set(0, 0.95, 0.05);

  const visor = new THREE.Mesh(
    new THREE.SphereGeometry(0.18, 24, 12),
    accentMaterial,
  );
  visor.position.set(0, 0.92, 0.28);

  const leftArm = new THREE.Mesh(
    new THREE.CylinderGeometry(0.08, 0.1, 0.55, 16),
    bodyMaterial,
  );
  leftArm.position.set(-0.48, 0.35, 0);
  leftArm.rotation.z = 0.35;

  const rightArm = new THREE.Mesh(
    new THREE.CylinderGeometry(0.08, 0.1, 0.55, 16),
    bodyMaterial,
  );
  rightArm.position.set(0.48, 0.35, 0);
  rightArm.rotation.z = -0.35;

  const base = new THREE.Mesh(
    new THREE.TorusGeometry(0.5, 0.12, 10, 28),
    accentMaterial,
  );
  base.position.set(0, -0.3, 0);
  base.rotation.x = Math.PI / 2;

  group.add(torso, head, visor, leftArm, rightArm, base);

  return {
    group,
    rig: {
      head,
      torso,
      leftArm,
      rightArm,
    } satisfies Rig,
  };
};

export default function HeroThree({
  modelUrl = DEFAULT_MODEL_URL,
  walkUrl,
  runUrl,
  className,
  introZoom = false,
  enableControls = true,
  enableRotate = false,
  enablePan = true,
  enableZoom = true,
  showCoordinateHelper = false,
  enableInteraction = true,
  enableHover = true,
  enableFloat = true,
  initialCameraPosition,
  initialTarget,
  initialModelRotationY,
  modelOffset,
  maxRotationAngle = Math.PI / 2,
}: HeroThreeProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);

  const defaultCam = initialCameraPosition ?? { x: 1.7, y: 2.04, z: 2.27 };
  const defaultTarget = initialTarget ?? { x: -0.05, y: 1, z: 0 };

  const [coords, setCoords] = useState<{
    cam: { x: number; y: number; z: number };
    target: { x: number; y: number; z: number };
  }>({
    cam: defaultCam,
    target: defaultTarget,
  });
  const [copied, setCopied] = useState(false);
  const [isModelLoading, setIsModelLoading] = useState(true);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lowPowerDevice =
      ((navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 8) <= 4 ||
      (navigator.hardwareConcurrency ?? 8) <= 4;
    const scene = new THREE.Scene();
    const renderer = new THREE.WebGLRenderer({
      antialias: !lowPowerDevice,
      alpha: true,
      powerPreference: "high-performance",
    });

    const handleContextLost = (event: Event) => {
      event.preventDefault();
      console.warn("WebGL context lost. Awaiting restoration...");
    };
    const handleContextRestored = () => {
      console.info("WebGL context restored.");
    };
    renderer.domElement.addEventListener("webglcontextlost", handleContextLost, false);
    renderer.domElement.addEventListener("webglcontextrestored", handleContextRestored, false);

    renderer.setPixelRatio(
      Math.min(window.devicePixelRatio, isCoarsePointer ? 0.9 : lowPowerDevice ? 0.95 : 1),
    );
    renderer.setClearColor(0x000000, 0);
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.shadowMap.enabled = false;
    container.appendChild(renderer.domElement);

    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100,
    );
    cameraRef.current = camera;
    const baseCameraPosition = initialCameraPosition ?? defaultCam;
    const baseTarget = initialTarget ?? defaultTarget;

    const startCamPos = {
      x: baseCameraPosition.x * 1.35,
      y: baseCameraPosition.y * 1.25,
      z: baseCameraPosition.z * 1.45,
    };
    const startTargetPos = {
      x: baseTarget.x,
      y: baseTarget.y,
      z: baseTarget.z,
    };

    if (introZoom) {
      camera.position.set(startCamPos.x, startCamPos.y, startCamPos.z);
    } else {
      camera.position.set(baseCameraPosition.x, baseCameraPosition.y, baseCameraPosition.z);
    }

    let controls: OrbitControls | null = null;
    let hasUserInteracted = false;
    let hasBouncedIntro = false;
    const canUseControls = Boolean(enableControls && (enableRotate || enablePan || enableZoom));
    if (canUseControls) {
      controls = new OrbitControls(camera, renderer.domElement);
      controlsRef.current = controls;
      controls.enableDamping = introZoom ? false : true;
      controls.dampingFactor = 0.05;
      controls.enableRotate = Boolean(enableRotate);
      controls.enablePan = enablePan;
      controls.enableZoom = Boolean(enableZoom);
      if (!enableZoom) {
        const camDist = new THREE.Vector3(baseCameraPosition.x, baseCameraPosition.y, baseCameraPosition.z).distanceTo(
          new THREE.Vector3(baseTarget.x, baseTarget.y, baseTarget.z),
        );
        controls.minDistance = camDist;
        controls.maxDistance = camDist;
      } else {
        controls.minDistance = 0.2;
        controls.maxDistance = 25;
      }
      // Giới hạn góc xoay ngang (Azimuth): Cung 90 độ (±45 độ quanh góc nhìn mặc định)
      const baseAzimuth = Math.atan2(
        baseCameraPosition.x - baseTarget.x,
        baseCameraPosition.z - baseTarget.z,
      );
      const halfAngle = maxRotationAngle / 2;
      controls.minAzimuthAngle = baseAzimuth - halfAngle;
      controls.maxAzimuthAngle = baseAzimuth + halfAngle;

      // Giới hạn góc xoay dọc (Polar): tránh lật ngược hoặc chìm xuống dưới sàn
      const camDistForPolar = new THREE.Vector3(baseCameraPosition.x, baseCameraPosition.y, baseCameraPosition.z).distanceTo(
        new THREE.Vector3(baseTarget.x, baseTarget.y, baseTarget.z),
      );
      const basePolar = Math.acos((baseCameraPosition.y - baseTarget.y) / Math.max(0.001, camDistForPolar));
      controls.minPolarAngle = Math.max(0.3, basePolar - Math.PI / 6); // Nhìn hơi nghiêng từ trên xuống
      controls.maxPolarAngle = Math.min(Math.PI * 0.48, basePolar + Math.PI / 8); // Chặn không bị chui xuống dưới sàn

      controls.enabled = false;
      controls.target.set(baseTarget.x, baseTarget.y, baseTarget.z);

      controls.addEventListener("start", () => {
        if (introZoom && !introCompleted) return;
        hasUserInteracted = true;
        controls!.enableDamping = true;
        ambientLight.intensity = 0.65;
        directionalLight.intensity = 1.05;
        rimLight.intensity = 0.6;
        group.scale.setScalar(1);
        group.position.y = 0;
      });

      controls.addEventListener("change", () => {
        if (showCoordinateHelper) {
          setCoords({
            cam: {
              x: Number(camera.position.x.toFixed(2)),
              y: Number(camera.position.y.toFixed(2)),
              z: Number(camera.position.z.toFixed(2)),
            },
            target: {
              x: Number(controls!.target.x.toFixed(2)),
              y: Number(controls!.target.y.toFixed(2)),
              z: Number(controls!.target.z.toFixed(2)),
            },
          });
        }
      });
    }
    renderer.domElement.style.touchAction =
      canUseControls && (enableRotate || enablePan || enableZoom) ? "none" : "pan-y";

    const syncCameraTarget = () => {
      if (!baseTarget || controls?.enabled) return;
      camera.lookAt(baseTarget.x, baseTarget.y, baseTarget.z);
    };
    syncCameraTarget();

    const ambientLight = new THREE.AmbientLight(0xffffff, introZoom ? 0.08 : 0.65);
    const directionalLight = new THREE.DirectionalLight(0xffffff, introZoom ? 0.15 : 1.05);
    directionalLight.position.set(2.2, 4.2, 2.1);
    const rimLight = new THREE.PointLight(0x7dd3fc, introZoom ? 0.15 : 0.6, 10);
    rimLight.position.set(-2, -0.6, 2.2);
    scene.add(ambientLight, directionalLight, rimLight);

    const group = new THREE.Group();
    group.visible = false;
    scene.add(group);

    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    let pointerDirty = false;
    let lastRaycastAt = 0;
    let hovered = false;
    let isPointerDownOnModel = false;
    let isModelActive = false;
    let mixer: THREE.AnimationMixer | null = null;
    let modelRoot: THREE.Object3D | null = null;
    let ballNode: THREE.Object3D | null = null;
    let ballBaseY = 0;
    let ballBounceStartAt = 0;
    let ballBounceUntil = 0;
    let rig: Rig = {};
    const actions = new Map<string, THREE.AnimationAction>();
    let activeAction: THREE.AnimationAction | null = null;
    let rafId = 0;
    const waveUntil = 0;
    const lastClickAt = 0;
    let introStartAt = 0;
    let introCompleted = false;
    let modelReady = false;
    renderer.domElement.style.opacity = "0";
    renderer.domElement.style.transition = "opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1)";
    renderer.domElement.style.pointerEvents = introZoom ? "none" : "auto";

    const lookTarget = new THREE.Vector2(0, 0);
    const lookCurrent = new THREE.Vector2(0, 0);
    const lookIntensity = isCoarsePointer ? 0.18 : 0.28;
    const torsoIntensity = isCoarsePointer ? 0.08 : 0.16;

    const highlightColor = new THREE.Color("#f472b6");
    const baseColor = new THREE.Color("#52f5ff");

    const playAction = (label: string) => {
      const nextAction = actions.get(label);
      if (!nextAction || nextAction === activeAction) return;
      if (activeAction) activeAction.fadeOut(0.25);
      nextAction.reset().fadeIn(0.25).play();
      activeAction = nextAction;
    };

    const registerAction = (label: string, clip?: THREE.AnimationClip) => {
      if (!mixer || !clip) return;
      const action = mixer.clipAction(clip);
      actions.set(label, action);
    };

    const fitModelToView = (object: THREE.Object3D) => {
      const box = new THREE.Box3().setFromObject(object);
      const size = new THREE.Vector3();
      const center = new THREE.Vector3();
      box.getSize(size);
      box.getCenter(center);
      const maxDim = Math.max(size.x, size.y, size.z);
      if (maxDim === 0) return;

      const targetSize = 1.3;
      const scale = targetSize / maxDim;
      object.scale.setScalar(scale);
      object.position.sub(center.multiplyScalar(scale));
      object.position.y += 0.15;
      if (modelOffset) {
        object.position.x += modelOffset.x ?? 0;
        object.position.y += modelOffset.y ?? 0;
        object.position.z += modelOffset.z ?? 0;
      }
    };

    let isDisposed = false;
    const ktx2Loader = new KTX2Loader()
      .setTranscoderPath("/assets/basis/")
      .detectSupport(renderer);

    const loader = new GLTFLoader();
    loader.setMeshoptDecoder(MeshoptDecoder);
    loader.setKTX2Loader(ktx2Loader);

    const markReady = () => {
      if (modelReady) return;
      modelReady = true;
      introStartAt = performance.now();
      group.visible = true;
      setIsModelLoading(false);
      window.dispatchEvent(new CustomEvent("model-3d-ready"));
      requestAnimationFrame(() => {
        if (renderer.domElement) {
          renderer.domElement.style.opacity = "1";
        }
      });
    };

    const handlePreloaderComplete = () => {
      introStartAt = performance.now();
      group.visible = true;
      if (renderer.domElement) {
        renderer.domElement.style.opacity = "1";
      }
    };
    window.addEventListener("intro-preloader-complete", handlePreloaderComplete);

    const safetyTimer = window.setTimeout(() => {
      if (!modelReady && !isDisposed) {
        console.warn("3D room model load timeout - forcing visibility");
        markReady();
      }
    }, 4500);

    const resolveTargetByName = (
      object: THREE.Object3D | null | undefined,
    ): { nav?: NavTarget; external?: ExternalTarget; ball?: boolean } => {
      let current: THREE.Object3D | null | undefined = object;
      while (current) {
        const name = current.name ?? "";
        if (BALL_MESH_PATTERNS.some((pattern) => pattern.test(name))) {
          return { ball: true };
        }
        for (const [target, patterns] of Object.entries(NAV_MESH_PATTERNS)) {
          if (patterns.some((pattern) => pattern.test(name))) {
            return { nav: target as NavTarget };
          }
        }
        for (const [target, patterns] of Object.entries(EXTERNAL_MESH_PATTERNS)) {
          if (patterns.some((pattern) => pattern.test(name))) {
            return { external: target as ExternalTarget };
          }
        }
        current = current.parent;
      }
      return {};
    };

    const resolveTarget = (
      hit: THREE.Intersection | undefined,
    ): { nav?: NavTarget; external?: ExternalTarget; ball?: boolean } => {
      if (!hit) return {};

      // 1. Tên mesh (hỗ trợ model gốc nếu còn lưu name)
      const byName = resolveTargetByName(hit.object);
      if (byName.nav || byName.external || byName.ball) {
        return byName;
      }

      // 2. Định vị toạ độ không gian 3D trong hệ toạ độ local của modelRoot
      // Cực kỳ quan trọng với các model đã được nén/gộp mesh (gltfpack) bị mất tên mesh riêng lẻ
      if (modelRoot && hit.point) {
        const local = modelRoot.worldToLocal(hit.point.clone());
        const { x, y, z } = local;

        // Các bảng điều hướng trên tường bên phải (About, Skills, Works, Contact)
        // Tâm x ≈ 7.02, z ≈ 3.52, xếp chồng theo trục Y
        if (x >= 4.8 && x <= 9.2 && z >= 2.4 && z <= 4.6) {
          if (y >= 5.95 && y <= 7.50) return { nav: "about" };
          if (y >= 4.60 && y < 5.95) return { nav: "skills" };
          if (y >= 3.25 && y < 4.60) return { nav: "works" };
          if (y >= 1.65 && y < 3.25) return { nav: "contact" };
        }

        // Các icon liên lạc mạng xã hội trên kệ tường bên trái (Mail, GitHub, LinkedIn)
        // Tâm x ≈ -3.1, y ≈ 4.88, xếp dọc theo trục Z
        if (x >= -3.9 && x <= -2.2 && y >= 3.8 && y <= 5.8) {
          if (z >= -1.80 && z <= -0.65) return { external: "mail" };
          if (z >= -3.00 && z < -1.80) return { external: "github" };
          if (z >= -4.40 && z < -3.00) return { external: "linkedin" };
        }

        // Quả bóng nảy
        const ballDist = Math.hypot(x - 2.538, y - 1.368, z - (-2.949));
        if (ballDist < 1.2) return { ball: true };
      }

      return {};
    };

    const scrollToSection = (target: NavTarget) => {
      const sectionId = NAV_SECTION_IDS[target].find((id) => document.getElementById(id));
      if (!sectionId) return;
      const element = document.getElementById(sectionId);
      element?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    MeshoptDecoder.ready.then(() => {
      if (isDisposed) return;
      loader.load(
        modelUrl,
        (gltf) => {
          if (isDisposed) return;
          modelRoot = gltf.scene;
          modelRoot.traverse((child) => {
            if (!(child as THREE.Mesh).isMesh) return;
            const mesh = child as THREE.Mesh;
            mesh.castShadow = false;
            mesh.receiveShadow = false;
          });
          group.add(modelRoot);
          fitModelToView(modelRoot);
          modelRoot.rotation.y = initialModelRotationY ?? Math.PI * -0.35;

          const findByName = (patterns: RegExp[]) => {
            let found: THREE.Object3D | null = null;
            modelRoot?.traverse((child) => {
              if (found || !child.name) return;
              if (patterns.some((pattern) => pattern.test(child.name))) found = child;
            });
            return found;
          };

          rig = {
            head: findByName([/head/i, /neck/i]),
            torso: findByName([/spine/i, /chest/i, /torso/i]),
            leftArm: findByName([/leftarm/i, /upperarm_l/i, /arm_l/i]),
            rightArm: findByName([/rightarm/i, /upperarm_r/i, /arm_r/i]),
          };

          modelRoot.traverse((child) => {
            if (ballNode || !child.name) return;
            if (BALL_MESH_PATTERNS.some((pattern) => pattern.test(child.name))) {
              ballNode = child;
            }
          });
          if (ballNode) ballBaseY = ballNode.position.y;

          if (gltf.animations.length) {
            mixer = new THREE.AnimationMixer(modelRoot);
            registerAction("idle", gltf.animations[0]);
            playAction("idle");

            if (walkUrl) {
              loader.load(
                walkUrl,
                (animGltf) => registerAction("walk", animGltf.animations[0]),
                undefined,
                () => {},
              );
            }
            if (runUrl) {
              loader.load(
                runUrl,
                (animGltf) => registerAction("run", animGltf.animations[0]),
                undefined,
                () => {},
              );
            }
          }

          markReady();
        },
        undefined,
        (error) => {
          console.error("Lỗi khi load 3D model:", error);
          if (isDisposed) return;
          const fallback = createFallbackCharacter(baseColor, highlightColor);
          modelRoot = fallback.group;
          rig = fallback.rig;
          group.add(modelRoot);
          fitModelToView(modelRoot);
          modelRoot.rotation.y = initialModelRotationY ?? Math.PI * -0.35;
          markReady();
        },
      );
    });

    const handlePointerMove = (event: PointerEvent) => {
      if (introZoom && !introCompleted) return;
      if (!enableHover) return;
      const rect = renderer.domElement.getBoundingClientRect();
      pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      pointerDirty = true;
      if (isModelActive && hovered) {
        lookTarget.set(pointer.x, pointer.y);
      } else {
        lookTarget.set(0, 0);
      }
    };

    const handlePointerLeave = () => {
      if (!enableHover) return;
      hovered = false;
      isModelActive = false;
      lookTarget.set(0, 0);
      isPointerDownOnModel = false;
      if (controls) controls.enabled = false;
      renderer.domElement.style.cursor = "default";
    };

    let pointerDownPos = { x: 0, y: 0 };

    const handlePointerDown = (event: PointerEvent) => {
      if (introZoom && !introCompleted) return;
      pointerDownPos = { x: event.clientX, y: event.clientY };
      if (!modelRoot) return;

      const rect = renderer.domElement.getBoundingClientRect();
      pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(pointer, camera);
      const hits = raycaster.intersectObject(modelRoot, true);

      if (hits.length > 0) {
        isPointerDownOnModel = true;
        isModelActive = true;
        hovered = true;
        lookTarget.set(pointer.x, pointer.y);
        const hitTarget = resolveTarget(hits[0]);
        if (controls && enableRotate && !hitTarget.nav && !hitTarget.external && !hitTarget.ball) {
          controls.enabled = true;
        } else if (controls) {
          controls.enabled = false;
        }
      } else {
        isPointerDownOnModel = false;
        isModelActive = false;
        lookTarget.set(0, 0);
        if (controls) {
          controls.enabled = false;
        }
      }
    };

    const handlePointerUp = () => {
      isPointerDownOnModel = false;
      if (!hovered) {
        isModelActive = false;
        lookTarget.set(0, 0);
        if (controls) controls.enabled = false;
        renderer.domElement.style.cursor = "default";
      } else {
        renderer.domElement.style.cursor = "grab";
      }
    };

    const handleClick = (event: MouseEvent) => {
      if (introZoom && !introCompleted) return;
      if (!modelRoot) return;
      // If user moved finger/cursor more than 16px, it was a scroll/drag, not a click
      const moveDist = Math.hypot(event.clientX - pointerDownPos.x, event.clientY - pointerDownPos.y);
      if (moveDist > 16) return;

      const rect = renderer.domElement.getBoundingClientRect();
      pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(pointer, camera);
      const hits = raycaster.intersectObject(modelRoot, true);
      if (hits.length > 0) {
        isModelActive = true;
        hovered = true;
        lookTarget.set(pointer.x, pointer.y);
      } else {
        isModelActive = false;
        lookTarget.set(0, 0);
        if (controls) controls.enabled = false;
        return;
      }

      const hitTarget = resolveTarget(hits[0]);

      if (hitTarget.ball) {
        ballBounceStartAt = performance.now();
        ballBounceUntil = ballBounceStartAt + 1400;
        return;
      }

      if (hitTarget.external) {
        window.open(EXTERNAL_LINKS[hitTarget.external], "_blank", "noopener,noreferrer");
        return;
      }

      if (hitTarget.nav) {
        scrollToSection(hitTarget.nav);
      }
    };

    if (enableInteraction) {
      if (enableHover) {
        renderer.domElement.addEventListener("pointermove", handlePointerMove);
        renderer.domElement.addEventListener("pointerleave", handlePointerLeave);
      }
      renderer.domElement.addEventListener("pointerdown", handlePointerDown);
      renderer.domElement.addEventListener("click", handleClick);
      window.addEventListener("pointerup", handlePointerUp);
    }

    const clock = new THREE.Clock();

    let isVisible = true;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible && !rafId) {
          clock.getDelta();
          rafId = window.requestAnimationFrame(animate);
        }
      },
      { threshold: 0.01, rootMargin: "300px" },
    );
    observer.observe(container);

    const animate = () => {
      if (!isVisible) {
        rafId = 0;
        return;
      }
      const delta = clock.getDelta();
      if (mixer) mixer.update(delta);

      if (introZoom && !introCompleted) {
        renderer.domElement.style.cursor = "default";
      } else if (enableHover && pointerDirty && modelRoot) {
        const nowMs = performance.now();
        const minRaycastGap = lowPowerDevice ? 66 : 33;
        if (nowMs - lastRaycastAt >= minRaycastGap) {
          lastRaycastAt = nowMs;
          pointerDirty = false;
          raycaster.setFromCamera(pointer, camera);
          const hits = raycaster.intersectObject(modelRoot, true);
          const isHover = hits.length > 0;
          hovered = isHover;
          if (!isHover) {
            isModelActive = false;
            lookTarget.set(0, 0);
            if (controls) controls.enabled = false;
          } else if (isModelActive) {
            lookTarget.set(pointer.x, pointer.y);
          }
          const hitTarget = hits.length ? resolveTarget(hits[0]) : {};
          renderer.domElement.style.cursor = hitTarget.nav || hitTarget.external || hitTarget.ball
            ? "pointer"
            : isHover
              ? isPointerDownOnModel
                ? "grabbing"
                : "grab"
              : "default";
        }
      }

      lookCurrent.x += (lookTarget.x - lookCurrent.x) * 0.08;
      lookCurrent.y += (lookTarget.y - lookCurrent.y) * 0.08;

      const now = performance.now();
      const introDuration = 2.8;
      const isIntroActive =
        introZoom &&
        modelReady &&
        !introCompleted &&
        (now - introStartAt) / 1000 <= introDuration;

      if (isIntroActive) {
        const elapsed = (now - introStartAt) / 1000;
        const t = Math.min(1, Math.max(0, elapsed / introDuration));

        // 1. Quá trình xuất hiện từ từ như cũ bằng đường cong Ease-in-out Cubic mượt mà
        const ease = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

        let camX = startCamPos.x + (baseCameraPosition.x - startCamPos.x) * ease;
        let camY = startCamPos.y + (baseCameraPosition.y - startCamPos.y) * ease;
        let camZ = startCamPos.z + (baseCameraPosition.z - startCamPos.z) * ease;

        // 2. Bước cuối (t: 0.55 -> 1.0): Hiệu ứng rướn nhẹ ra phía màn hình bằng đa thức siêu mượt (zero jerk)
        if (t >= 0.55) {
          const p = (t - 0.55) / 0.45;
          // Hàm đa thức quintic: đạo hàm cấp 1 & 2 tại 0 và 1 đều = 0, loại bỏ hoàn toàn độ giật/khựng
          const bell = 64 * p * p * p * (1 - p) * (1 - p) * (1 - p);
          const popCamOffset = 0.08 * bell; // Máy quay rướn nhẹ 8% rồi êm ái thu về vị trí

          const dirX = camX - baseTarget.x;
          const dirY = camY - baseTarget.y;
          const dirZ = camZ - baseTarget.z;
          camX -= dirX * popCamOffset;
          camY -= dirY * popCamOffset;
          camZ -= dirZ * popCamOffset;
        }

        camera.position.set(camX, camY, camZ);
        camera.lookAt(baseTarget.x, baseTarget.y, baseTarget.z);
        if (controls) {
          controls.target.set(baseTarget.x, baseTarget.y, baseTarget.z);
        }

        ambientLight.intensity = 0.2 + (0.65 - 0.2) * ease;
        directionalLight.intensity = 0.3 + (1.05 - 0.3) * ease;
        rimLight.intensity = 0.2 + (0.6 - 0.2) * ease;

        if (t >= 0.95 && !hasBouncedIntro) {
          hasBouncedIntro = true;
          ballBounceStartAt = performance.now();
          ballBounceUntil = ballBounceStartAt + 1200;
        }
      } else if (introZoom && modelReady && !introCompleted) {
        introCompleted = true;
        renderer.domElement.style.pointerEvents = "auto";
        group.scale.setScalar(1);
        camera.position.set(baseCameraPosition.x, baseCameraPosition.y, baseCameraPosition.z);
        if (controls) {
          controls.enabled = false;
          controls.target.set(baseTarget.x, baseTarget.y, baseTarget.z);
          controls.enableDamping = true;
          controls.update();
        }
        ambientLight.intensity = 0.65;
        directionalLight.intensity = 1.05;
        rimLight.intensity = 0.6;
      }

      const waveActive = now < waveUntil;
      const wavePhase = waveActive ? (now - lastClickAt) / 180 : 0;

      const baseModelRotY = initialModelRotationY ?? Math.PI * -0.35;
      if (rig.head || rig.torso) {
        if (rig.head) {
          rig.head.rotation.y = lookCurrent.x * lookIntensity;
          rig.head.rotation.x = lookCurrent.y * lookIntensity;
        }
        if (rig.torso) {
          rig.torso.rotation.y = lookCurrent.x * torsoIntensity;
          rig.torso.rotation.x = lookCurrent.y * torsoIntensity * 0.6;
        }
      } else if (modelRoot) {
        modelRoot.rotation.y = baseModelRotY + lookCurrent.x * 0.16;
        modelRoot.rotation.x = lookCurrent.y * 0.1;
      }

      if (rig.rightArm && waveActive) {
        rig.rightArm.rotation.z = -0.4 + Math.sin(wavePhase) * 0.6;
        rig.rightArm.rotation.x = Math.sin(wavePhase * 1.2) * 0.35;
      }

      if (ballNode) {
        if (now < ballBounceUntil) {
          const t = (now - ballBounceStartAt) / 1000;
          const damping = Math.max(0, (ballBounceUntil - now) / 1400);
          ballNode.position.y = ballBaseY + Math.abs(Math.sin(t * 8.2)) * 0.14 * damping;
        } else {
          ballNode.position.y = ballBaseY;
        }
      }

      if (enableFloat && !prefersReducedMotion && !lowPowerDevice && !hasUserInteracted) {
        group.rotation.y = Math.sin(performance.now() * 0.0004) * 0.08;
        group.rotation.x = Math.sin(performance.now() * 0.0003) * 0.04;
      }
      if (controls?.enabled && !isIntroActive) controls.update();
      renderer.render(scene, camera);
      rafId = window.requestAnimationFrame(animate);
    };

    rafId = window.requestAnimationFrame(animate);

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        if (!width || !height) return;
        
        // Cập nhật khoảng cách camera dựa trên chiều rộng màn hình (Responsive 3D)
        let scaleFactor = 1;
        if (width < 640) {
          scaleFactor = 1.45; // Mobile: xa hơn để thấy đc toàn bộ
        } else if (width < 1024) {
          scaleFactor = 1.25; // Tablet
        } else {
          scaleFactor = 1; // Desktop chuẩn (kể cả màn hình 1920px)
        }

        // Nếu animation intro đã xong và chưa can thiệp, cập nhật vị trí camera
        const now = performance.now();
        if (!hasUserInteracted && (!introZoom || !modelReady || (now - introStartAt) / 1000 > 2.8)) {
          camera.position.set(
            baseCameraPosition.x * scaleFactor,
            baseCameraPosition.y * scaleFactor,
            baseCameraPosition.z * scaleFactor,
          );
          if (controls) {
            controls.update();
          } else {
            syncCameraTarget();
          }
        }

        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height, false);
      }
    });
    resizeObserver.observe(container);

    return () => {
      window.removeEventListener("intro-preloader-complete", handlePreloaderComplete);
      window.clearTimeout(safetyTimer);
      resizeObserver.disconnect();
      observer.disconnect();
      if (enableInteraction) {
        if (enableHover) {
          renderer.domElement.removeEventListener("pointermove", handlePointerMove);
          renderer.domElement.removeEventListener("pointerleave", handlePointerLeave);
        }
        renderer.domElement.removeEventListener("pointerdown", handlePointerDown);
        renderer.domElement.removeEventListener("click", handleClick);
        window.removeEventListener("pointerup", handlePointerUp);
      }
      isDisposed = true;
      ktx2Loader.dispose();
      window.cancelAnimationFrame(rafId);
      controls?.dispose();

      scene.traverse((child) => {
        if (!(child as THREE.Mesh).isMesh) return;
        const mesh = child as THREE.Mesh;
        mesh.geometry?.dispose();
        const material = mesh.material as THREE.Material | THREE.Material[];
        if (Array.isArray(material)) material.forEach((mat) => mat.dispose());
        else material.dispose();
      });

      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [enableHover, enableInteraction, modelUrl, enableControls, enablePan, enableZoom, showCoordinateHelper]);

  const handleReset = () => {
    if (!controlsRef.current || !cameraRef.current) return;
    cameraRef.current.position.set(defaultCam.x, defaultCam.y, defaultCam.z);
    controlsRef.current.target.set(defaultTarget.x, defaultTarget.y, defaultTarget.z);
    controlsRef.current.update();
    setCoords({ cam: defaultCam, target: defaultTarget });
  };

  const handleCopy = () => {
    const snippet = `initialCameraPosition={{ x: ${coords.cam.x}, y: ${coords.cam.y}, z: ${coords.cam.z} }}\ninitialTarget={{ x: ${coords.target.x}, y: ${coords.target.y}, z: ${coords.target.z} }}`;
    navigator.clipboard.writeText(snippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative h-full w-full">
      {isModelLoading && (
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-3 z-20">
          <div className="relative flex h-12 w-12 items-center justify-center">
            <div className="absolute inset-0 rounded-full border-2 border-cyan-400/25 border-t-cyan-400 animate-spin" />
            <div className="h-4 w-4 rounded-full bg-cyan-400/40 shadow-[0_0_16px_rgba(34,211,238,0.85)] animate-pulse" />
          </div>
          <span className="text-[11px] font-mono tracking-widest text-cyan-300/80 uppercase animate-pulse">
            Đang tải không gian 3D...
          </span>
        </div>
      )}
      <div ref={containerRef} className={className ?? "h-full w-full"} />
      {showCoordinateHelper && (
        <div className="pointer-events-auto fixed bottom-6 left-6 z-[999] flex flex-col gap-2.5 rounded-2xl border border-cyan-400/30 bg-slate-950/90 p-4 text-xs text-white shadow-2xl backdrop-blur-xl max-w-sm sm:max-w-md">
          <div className="flex items-center justify-between gap-3">
            <span className="font-semibold text-cyan-300 flex items-center gap-1.5">
              <span>🎮</span> Căn chỉnh 3D (360° View)
            </span>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={handleCopy}
                className="cursor-pointer rounded-lg bg-cyan-400/20 px-2.5 py-1 text-[11px] font-semibold text-cyan-200 hover:bg-cyan-400/30 border border-cyan-400/30 transition active:scale-95"
              >
                {copied ? "✓ Đã copy!" : "Copy Tọa độ"}
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="cursor-pointer rounded-lg bg-white/10 px-2.5 py-1 text-[11px] font-medium text-white/80 hover:bg-white/20 border border-white/10 transition active:scale-95"
              >
                Reset
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 font-mono text-[11px]">
            <div className="rounded-lg bg-white/[0.04] p-2 border border-white/5">
              <div className="text-cyan-400 font-semibold mb-0.5">Camera (Vị trí & Zoom)</div>
              <div>x: {coords.cam.x}</div>
              <div>y: {coords.cam.y}</div>
              <div>z: {coords.cam.z}</div>
            </div>
            <div className="rounded-lg bg-white/[0.04] p-2 border border-white/5">
              <div className="text-pink-400 font-semibold mb-0.5">Target (Tâm nhìn)</div>
              <div>x: {coords.target.x}</div>
              <div>y: {coords.target.y}</div>
              <div>z: {coords.target.z}</div>
            </div>
          </div>

          <div className="text-[11px] text-white/60 space-y-0.5 pt-1 border-t border-white/10">
            <div>• <b>Chuột trái:</b> Xoay tự do 360° quanh phòng</div>
            <div>• <b>Chuột phải / Shift + Kéo:</b> Di chuyển vị trí (Pan)</div>
            <div>• <b>Cuộn chuột / Pinch cảm ứng:</b> Phóng to / Thu nhỏ (Zoom)</div>
          </div>
        </div>
      )}
    </div>
  );
}
