"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

type HeroThreeProps = {
  modelUrl?: string;
  walkUrl?: string;
  runUrl?: string;
  className?: string;
  introZoom?: boolean;
  enableControls?: boolean;
  enableInteraction?: boolean;
  enableHover?: boolean;
  enableFloat?: boolean;
  initialCameraPosition?: { x: number; y: number; z: number };
  initialTarget?: { x: number; y: number; z: number };
  initialModelRotationY?: number;
  modelOffset?: { x?: number; y?: number; z?: number };
};

const DEFAULT_MODEL_URL = "/assets/models/room_IT_3d.glb";
type NavTarget = "about" | "skills" | "works" | "contact";
type ExternalTarget = "mail" | "facebook" | "github" | "linkedin";

const NAV_SECTION_IDS: Record<NavTarget, string[]> = {
  about: ["hero", "about"],
  skills: ["skills"],
  works: ["projects", "works"],
  contact: ["contact"],
};

const EXTERNAL_LINKS: Record<ExternalTarget, string> = {
  mail: "mailto:hello@doan.tech",
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
  enableInteraction = true,
  enableHover = true,
  enableFloat = true,
  initialCameraPosition,
  initialTarget,
  initialModelRotationY,
  modelOffset,
}: HeroThreeProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

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
    const baseCameraPosition = initialCameraPosition ?? { x: 0, y: 1.1, z: 3.2 };
    let dynamicBaseZ = baseCameraPosition.z;
    const introStartZ = introZoom ? dynamicBaseZ + 1.2 : dynamicBaseZ;
    camera.position.set(
      baseCameraPosition.x,
      baseCameraPosition.y,
      introStartZ,
    );

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enablePan = false;
    controls.enableZoom = false;
    controls.minDistance = 1.6;
    controls.maxDistance = 6;
    controls.enabled = enableControls && !isCoarsePointer;
    if (initialTarget) {
      controls.target.set(initialTarget.x, initialTarget.y, initialTarget.z);
    }
    const syncCameraTarget = () => {
      if (!initialTarget || controls.enabled) return;
      camera.lookAt(initialTarget.x, initialTarget.y, initialTarget.z);
    };
    syncCameraTarget();

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.05);
    directionalLight.position.set(2.2, 4.2, 2.1);
    const rimLight = new THREE.PointLight(0x7dd3fc, 0.6, 10);
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
    let modelReady = false;
    let revealOpacity = 0;
    let revealArmed = false;
    renderer.domElement.style.opacity = "0";

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

    const loader = new GLTFLoader();
    const markReady = () => {
      modelReady = true;
      introStartAt = performance.now();
      group.visible = true;
    };

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

    const scrollToSection = (target: NavTarget) => {
      const sectionId = NAV_SECTION_IDS[target].find((id) => document.getElementById(id));
      if (!sectionId) return;
      const element = document.getElementById(sectionId);
      element?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    loader.load(
      modelUrl,
      (gltf) => {
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
      () => {
        const fallback = createFallbackCharacter(baseColor, highlightColor);
        modelRoot = fallback.group;
        rig = fallback.rig;
        group.add(modelRoot);
        fitModelToView(modelRoot);
        modelRoot.rotation.y = initialModelRotationY ?? Math.PI * -0.35;
        markReady();
      },
    );

    const handlePointerMove = (event: PointerEvent) => {
      if (!enableHover) return;
      const rect = renderer.domElement.getBoundingClientRect();
      pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      lookTarget.set(pointer.x, pointer.y);
      pointerDirty = true;
    };

    const handlePointerLeave = () => {
      if (!enableHover) return;
      hovered = false;
      lookTarget.set(0, 0);
      isPointerDownOnModel = false;
      renderer.domElement.style.cursor = "default";
    };

    const handlePointerUp = () => {
      isPointerDownOnModel = false;
      if (!hovered) {
        renderer.domElement.style.cursor = "default";
      } else {
        renderer.domElement.style.cursor = "grab";
      }
    };

    const handleClick = (event: PointerEvent) => {
      if (!modelRoot) return;
      const rect = renderer.domElement.getBoundingClientRect();
      pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(pointer, camera);
      const hits = raycaster.intersectObject(modelRoot, true);
      const hitTarget = hits.length ? resolveTargetByName(hits[0].object) : {};
      isPointerDownOnModel = hits.length > 0;

      if (isPointerDownOnModel && !hitTarget.nav && !hitTarget.external && !hitTarget.ball) {
        renderer.domElement.style.cursor = "grabbing";
      }

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
      renderer.domElement.addEventListener("pointerdown", handleClick);
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
      { threshold: 0.05 },
    );
    observer.observe(container);

    const animate = () => {
      if (!isVisible) {
        rafId = 0;
        return;
      }
      const delta = clock.getDelta();
      if (mixer) mixer.update(delta);

      if (enableHover && pointerDirty && modelRoot) {
        const nowMs = performance.now();
        const minRaycastGap = lowPowerDevice ? 66 : 33;
        if (nowMs - lastRaycastAt >= minRaycastGap) {
          lastRaycastAt = nowMs;
          pointerDirty = false;
          raycaster.setFromCamera(pointer, camera);
          const hits = raycaster.intersectObject(modelRoot, true);
          const isHover = hits.length > 0;
          const hitTarget = hits.length ? resolveTargetByName(hits[0].object) : {};
          renderer.domElement.style.cursor = hitTarget.nav || hitTarget.external || hitTarget.ball
            ? "pointer"
            : isHover
              ? isPointerDownOnModel
                ? "grabbing"
                : "grab"
              : "default";
          hovered = isHover;
        }
      }

      lookCurrent.x += (lookTarget.x - lookCurrent.x) * 0.08;
      lookCurrent.y += (lookTarget.y - lookCurrent.y) * 0.08;

      const now = performance.now();
      if (modelReady && !revealArmed) revealArmed = true;
      if (revealArmed && revealOpacity < 1) {
        revealOpacity = Math.min(1, revealOpacity + delta * 3.6);
        renderer.domElement.style.opacity = revealOpacity.toFixed(3);
      }

      if (introZoom && modelReady) {
        const elapsed = (now - introStartAt) / 1000;
        const duration = 4.8;
        if (elapsed <= duration) {
          const phase = elapsed / duration;
          const ease = (value: number) => value * value * (3 - 2 * value);
          const lerp = (from: number, to: number, value: number) =>
            from + (to - from) * value;
          if (phase <= 0.52) {
            const t = ease(phase / 0.52);
            camera.position.z = lerp(introStartZ, 1.9, t);
          } else {
            const t = ease((phase - 0.52) / 0.48);
            camera.position.z = lerp(1.9, dynamicBaseZ, t);
          }
          syncCameraTarget();
        }
      }

      const waveActive = now < waveUntil;
      const wavePhase = waveActive ? (now - lastClickAt) / 180 : 0;

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
        modelRoot.rotation.y = lookCurrent.x * 0.2;
        modelRoot.rotation.x = lookCurrent.y * 0.12;
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

      if (enableFloat && !prefersReducedMotion && !lowPowerDevice) {
        group.rotation.y = Math.sin(performance.now() * 0.0004) * 0.08;
        group.rotation.x = Math.sin(performance.now() * 0.0003) * 0.04;
      }
      if (controls.enabled) controls.update();
      renderer.render(scene, camera);
      rafId = window.requestAnimationFrame(animate);
    };

    rafId = window.requestAnimationFrame(animate);

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        if (!width || !height) return;
        
        // Cập nhật khoảng cách camera dựa trên chiều rộng màn hình (Responsive 3D)
        const baseZ = baseCameraPosition.z;
        if (width < 640) {
          dynamicBaseZ = baseZ * 1.7; // Mobile: xa hơn để thấy đc toàn bộ
        } else if (width < 1024) {
          dynamicBaseZ = baseZ * 1.35; // Tablet
        } else if (width > 1536) {
          dynamicBaseZ = baseZ * 0.9; // Large monitors 20-27in: gần hơn một chút
        } else {
          dynamicBaseZ = baseZ; // Laptop / Desktop chuẩn
        }

        // Nếu animation intro đã xong, cập nhật ngay z của camera
        const now = performance.now();
        if (!introZoom || !modelReady || (now - introStartAt) / 1000 > 4.8) {
          camera.position.z = dynamicBaseZ;
          syncCameraTarget();
        }

        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height, false);
      }
    });
    resizeObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
      observer.disconnect();
      if (enableInteraction) {
        if (enableHover) {
          renderer.domElement.removeEventListener("pointermove", handlePointerMove);
          renderer.domElement.removeEventListener("pointerleave", handlePointerLeave);
        }
        renderer.domElement.removeEventListener("pointerdown", handleClick);
        window.removeEventListener("pointerup", handlePointerUp);
      }
      window.cancelAnimationFrame(rafId);
      controls.dispose();

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
  }, [enableHover, enableInteraction, modelUrl]);

  return <div ref={containerRef} className={className ?? "h-full w-full"} />;
}
