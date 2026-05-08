"use client";

import { useEffect, useRef } from "react";

export function FluidBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl");
    if (!gl) return;

    let animationId: number;
    let mouseX = 0.5;
    let mouseY = 0.5;
    let time = 0;

    const vertexShader = `
      attribute vec2 position;
      void main() {
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

    const fragmentShader = `
      precision highp float;
      uniform vec2 resolution;
      uniform float time;
      uniform vec2 mouse;
      
      #define PI 3.14159265359
      
      float noise(vec2 p) {
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
      }
      
      float smoothNoise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        f = f * f * (3.0 - 2.0 * f);
        
        float a = noise(i);
        float b = noise(i + vec2(1.0, 0.0));
        float c = noise(i + vec2(0.0, 1.0));
        float d = noise(i + vec2(1.0, 1.0));
        
        return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
      }
      
      float fbm(vec2 p) {
        float value = 0.0;
        float amplitude = 0.5;
        for (int i = 0; i < 6; i++) {
          value += amplitude * smoothNoise(p);
          p *= 2.0;
          amplitude *= 0.5;
        }
        return value;
      }
      
      void main() {
        vec2 uv = gl_FragCoord.xy / resolution;
        vec2 p = uv * 2.0 - 1.0;
        p.x *= resolution.x / resolution.y;
        
        // Mouse influence
        vec2 m = mouse * 2.0 - 1.0;
        m.x *= resolution.x / resolution.y;
        float mouseDist = length(p - m);
        float mouseInfluence = smoothstep(0.8, 0.0, mouseDist) * 0.3;
        
        // Animated noise
        float t = time * 0.15;
        vec2 q = vec2(0.0);
        q.x = fbm(p + t);
        q.y = fbm(p + vec2(1.0));
        
        vec2 r = vec2(0.0);
        r.x = fbm(p + q + vec2(1.7, 9.2) + t * 0.3);
        r.y = fbm(p + q + vec2(8.3, 2.8) + t * 0.2);
        
        float f = fbm(p + r + mouseInfluence);
        
        // Color palette (void, slate, parchment, ember)
        vec3 color1 = vec3(0.098, 0.118, 0.137); // #191E23
        vec3 color2 = vec3(0.353, 0.514, 0.561); // #5A838F
        vec3 color3 = vec3(0.941, 0.929, 0.863); // #F0EDDC
        vec3 color4 = vec3(0.910, 0.361, 0.176); // #E85C2D
        
        vec3 color = mix(color1, color2, clamp(f * 2.0, 0.0, 1.0));
        color = mix(color, color3, clamp(length(q) * 0.5, 0.0, 0.15));
        color = mix(color, color4, clamp(mouseInfluence * 2.0, 0.0, 0.1));
        
        // Vignette
        float vignette = 1.0 - smoothstep(0.5, 1.5, length(uv - 0.5) * 1.5);
        color *= 0.7 + vignette * 0.3;
        
        gl_FragColor = vec4(color, 1.0);
      }
    `;

    function createShader(gl: WebGLRenderingContext, type: number, source: string) {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      return shader;
    }

    const vs = createShader(gl, gl.VERTEX_SHADER, vertexShader);
    const fs = createShader(gl, gl.FRAGMENT_SHADER, fragmentShader);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    gl.useProgram(program);

    const vertices = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]);
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const positionLocation = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    const resolutionLocation = gl.getUniformLocation(program, "resolution");
    const timeLocation = gl.getUniformLocation(program, "time");
    const mouseLocation = gl.getUniformLocation(program, "mouse");

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 1.5);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX / window.innerWidth;
      mouseY = 1.0 - e.clientY / window.innerHeight;
    };

    const render = () => {
      time += 0.016;
      gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
      gl.uniform1f(timeLocation, time);
      gl.uniform2f(mouseLocation, mouseX, mouseY);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      animationId = requestAnimationFrame(render);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);
    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ zIndex: 0 }}
    />
  );
}
