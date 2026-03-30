"use client";

import React, { useEffect, useRef } from "react";
import { Renderer, Camera, Geometry, Program, Mesh } from "ogl";

interface ParticlesProps {
  particleCount?: number;
  particleSpread?: number;
  speed?: number;
  moveParticlesOnHover?: boolean;
  particleHoverFactor?: number;
  alphaParticles?: boolean;
  particleBaseSize?: number;
  sizeRandomness?: number;
  cameraDistance?: number;
  disableRotation?: boolean;
  pixelRatio?: number;
  className?: string;
}

const vertex = `
attribute vec3 position;
attribute vec4 random;
attribute vec3 color;

uniform mat4 modelMatrix;
uniform mat4 viewMatrix;
uniform mat4 projectionMatrix;
uniform float uTime;
uniform float uSpread;
uniform float uBaseSize;
uniform float uSizeRandomness;

varying vec3 vColor;

void main() {
  vColor = color;

  vec3 pos = position * uSpread;
  pos.z *= 10.0;

  vec4 mPos = modelMatrix * vec4(pos, 1.0);
  float t = uTime;

  mPos.x += sin(t * random.z + 6.28 * random.w) * mix(0.2, 2.0, random.x);
  mPos.y += sin(t * random.y + 6.28 * random.x) * mix(0.2, 2.0, random.w);
  mPos.z += sin(t * random.w + 6.28 * random.y) * mix(0.2, 2.0, random.z);

  vec4 mvPos = viewMatrix * mPos;

  float size = uBaseSize * 1.6;

  gl_PointSize =
    (size * (1.0 + uSizeRandomness * (random.x - 0.5))) /
    length(mvPos.xyz);

  gl_Position = projectionMatrix * mvPos;
}
`;

const fragment = `
precision highp float;

uniform float uAlphaParticles;
varying vec3 vColor;

void main() {
  vec2 uv = gl_PointCoord.xy;
  float d = length(uv - vec2(0.5));

  if(uAlphaParticles < 0.5) {
    if(d > 0.5) discard;
    gl_FragColor = vec4(vColor, 1.0);
  } else {
    float circle = smoothstep(0.5, 0.4, d);
    gl_FragColor = vec4(vColor, circle);
  }
}
`;

const Particles: React.FC<ParticlesProps> = ({
  particleCount = 500,
  particleSpread = 10,
  speed = 0.2,
  moveParticlesOnHover = true,
  particleHoverFactor = 4, // 🔥 increased for visible movement
  alphaParticles = false,
  particleBaseSize = 120,
  sizeRandomness = 1,
  cameraDistance = 20,
  disableRotation = false,
  pixelRatio,
  className
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const dpr =
      pixelRatio ??
      (typeof window !== "undefined"
        ? Math.min(window.devicePixelRatio, 2)
        : 1);

    const renderer = new Renderer({ dpr, alpha: true });
    const gl = renderer.gl;

    gl.canvas.style.width = "100%";
    gl.canvas.style.height = "100%";
    gl.clearColor(0, 0, 0, 0);

    container.appendChild(gl.canvas);

    const camera = new Camera(gl, { fov: 15 });
    camera.position.set(0, 0, cameraDistance);

    const resize = () => {
      renderer.setSize(container.clientWidth, container.clientHeight);
      camera.perspective({
        aspect: gl.canvas.width / gl.canvas.height
      });
    };

    window.addEventListener("resize", resize);
    resize();

    // ✅ attach to window (guaranteed working)
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x =
        (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y =
        -(e.clientY / window.innerHeight) * 2 + 1;
    };

    if (moveParticlesOnHover) {
      window.addEventListener("mousemove", handleMouseMove);
    }

    const positions = new Float32Array(particleCount * 3);
    const randoms = new Float32Array(particleCount * 4);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      positions.set(
        [Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1],
        i * 3
      );

      randoms.set(
        [Math.random(), Math.random(), Math.random(), Math.random()],
        i * 4
      );

      colors.set(
        [Math.random(), Math.random(), Math.random()],
        i * 3
      );
    }

    const geometry = new Geometry(gl, {
      position: { size: 3, data: positions },
      random: { size: 4, data: randoms },
      color: { size: 3, data: colors }
    });

    const program = new Program(gl, {
      vertex,
      fragment,
      uniforms: {
        uTime: { value: 0 },
        uSpread: { value: particleSpread },
        uBaseSize: { value: particleBaseSize * dpr },
        uSizeRandomness: { value: sizeRandomness },
        uAlphaParticles: { value: alphaParticles ? 1 : 0 }
      },
      transparent: true,
      depthTest: false
    });

    const particles = new Mesh(gl, {
      mode: gl.POINTS,
      geometry,
      program
    });

    let animationFrameId: number;
    let lastTime = performance.now();
    let elapsed = 0;

    const update = (t: number) => {
      animationFrameId = requestAnimationFrame(update);

      const delta = t - lastTime;
      lastTime = t;
      elapsed += delta * speed;

      program.uniforms.uTime.value = elapsed * 0.001;

      // 🔥 Direct strong cursor movement (no smoothing)
      if (moveParticlesOnHover) {
        particles.position.x =
          -mouseRef.current.x * particleHoverFactor;

        particles.position.y =
          -mouseRef.current.y * particleHoverFactor;
      }

      if (!disableRotation) {
        particles.rotation.x = Math.sin(elapsed * 0.0002) * 0.25;
        particles.rotation.y = Math.cos(elapsed * 0.0003) * 0.35;
        particles.rotation.z += 0.006 * speed;
      }

      renderer.render({ scene: particles, camera });
    };

    animationFrameId = requestAnimationFrame(update);

    return () => {
      window.removeEventListener("resize", resize);

      if (moveParticlesOnHover) {
        window.removeEventListener("mousemove", handleMouseMove);
      }

      cancelAnimationFrame(animationFrameId);

      if (container.contains(gl.canvas)) {
        container.removeChild(gl.canvas);
      }

      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, [
    particleCount,
    particleSpread,
    speed,
    moveParticlesOnHover,
    particleHoverFactor,
    alphaParticles,
    particleBaseSize,
    sizeRandomness,
    cameraDistance,
    disableRotation,
    pixelRatio
  ]);

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 z-0 bg-gradient-to-br from-black via-[#0f172a] to-[#020617] ${className}`}
    />
  );
};

export default Particles;