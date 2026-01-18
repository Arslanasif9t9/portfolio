import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  speed: number;
}

const InteractiveBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [particles, setParticles] = useState<Particle[]>([]);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 25, stiffness: 150 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Generate random particles
    const generatedParticles: Particle[] = [];
    for (let i = 0; i < 50; i++) {
      generatedParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 2,
        opacity: Math.random() * 0.5 + 0.1,
        speed: Math.random() * 2 + 0.5,
      });
    }
    setParticles(generatedParticles);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 overflow-hidden pointer-events-none z-0"
    >
      {/* Gradient orbs that follow cursor */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full opacity-30"
        style={{
          background: "radial-gradient(circle, hsl(var(--primary)) 0%, transparent 70%)",
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
      
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full opacity-20"
        style={{
          background: "radial-gradient(circle, hsl(var(--accent)) 0%, transparent 70%)",
          x: cursorX,
          y: cursorY,
          translateX: "-30%",
          translateY: "-70%",
        }}
      />

      {/* Animated grid lines */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(hsl(var(--primary)) 1px, transparent 1px),
              linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      {/* Floating particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-primary"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            opacity: particle.opacity,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.sin(particle.id) * 20, 0],
            opacity: [particle.opacity, particle.opacity * 1.5, particle.opacity],
          }}
          transition={{
            duration: particle.speed * 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: particle.id * 0.1,
          }}
        />
      ))}

      {/* Interactive cursor trail effect */}
      <motion.div
        className="absolute w-4 h-4 rounded-full bg-primary/50 blur-sm"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
      
      <motion.div
        className="absolute w-8 h-8 rounded-full border border-primary/30"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        transition={{ type: "spring", damping: 30, stiffness: 200 }}
      />

      {/* Corner decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 opacity-20">
        <div className="absolute top-10 left-10 w-32 h-32 border border-primary/30 rotate-45" />
        <div className="absolute top-16 left-16 w-20 h-20 border border-accent/20 rotate-45" />
      </div>
      
      <div className="absolute bottom-0 right-0 w-64 h-64 opacity-20">
        <div className="absolute bottom-10 right-10 w-32 h-32 border border-primary/30 rotate-45" />
        <div className="absolute bottom-16 right-16 w-20 h-20 border border-accent/20 rotate-45" />
      </div>

      {/* Animated connecting dots */}
      <motion.div
        className="absolute w-2 h-2 rounded-full bg-primary/40"
        style={{
          left: 0,
          top: 0,
        }}
        animate={{
          x: [0, 100, 0],
          y: [0, 100, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute w-2 h-2 rounded-full bg-accent/40"
        style={{
          right: 0,
          bottom: 0,
        }}
        animate={{
          x: [0, -100, 0],
          y: [0, -100, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
};

export default InteractiveBackground;
