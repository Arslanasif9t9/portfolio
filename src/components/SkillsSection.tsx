import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const skills = [
  { name: "HTML5 & CSS3", level: 99 },
  { name: "JavaScript", level: 90 },
  { name: "Tailwind CSS", level: 95 },
  { name: "React", level: 75 },
  { name: "Figma", level: 85 },
  { name: "Node.js", level: 50 },
  { name: "MySQL", level: 98 },
  { name: "Laravel.php", level: 80 },
  // { name: "Next.js", level: 85 },
  // { name: "MongoDB", level: 82 },
  // { name: "PostgreSQL", level: 80 },
];

const technologies = [
  "HTML & CSS",
  "JavaScript",
  "React",
  // "TypeScript",
  "Node.js",
  "Next.js",
  "Express",
  "MongoDB",
  "MySQL",
  "Php",
  "Laravel",
  // "Redis",
  // "Docker",
  // "AWS",
  "Git",
  "Github",
  "Tailwind CSS",
  "Sass",
  "Figma",
  "REST APIs",
  // "GraphQL",
  // "Firebase",
];

const SkillsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="py-32 bg-muted/30" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium mb-4 block">
            My Expertise
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold">
            Skills & <span className="text-gradient">Technologies</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Skill Bars */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            {skills.map((skill, index) => (
              <div key={skill.name}>
                <div className="flex justify-between mb-2">
                  <span className="font-medium">{skill.name}</span>
                  <span className="text-muted-foreground">{skill.level}%</span>
                </div>
                <div className="h-3 bg-secondary rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={isInView ? { width: `${skill.level}%` } : {}}
                    transition={{ duration: 1, delay: 0.4 + index * 0.1 }}
                    className="h-full bg-gradient-to-r from-primary to-[hsl(200,80%,50%)] rounded-full"
                  />
                </div>
              </div>
            ))}
          </motion.div>

          {/* Technology Tags */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="text-2xl font-display font-semibold mb-6">
              Technologies I Work With
            </h3>
            <div className="flex flex-wrap gap-3">
              {technologies.map((tech, index) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.3, delay: 0.5 + index * 0.03 }}
                  className="px-4 py-2 bg-secondary rounded-full text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-colors cursor-default"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
