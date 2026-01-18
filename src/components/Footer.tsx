import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, Heart } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 border-t border-border">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <motion.a
            href="#home"
            className="text-2xl font-display font-bold text-gradient"
            whileHover={{ scale: 1.05 }}
          >
            Arslan Ahmad.
          </motion.a>

          <p className="text-muted-foreground text-sm flex items-center gap-1">
            © {currentYear} Arslan Ahmad. Made with{" Arslan Ahmad "}
            {/* <Heart size={14} className="text-primary" /> */}
             in Pakistan
          </p>

          <div className="flex gap-4">
            {[
              { icon: Github, href: "https://github.com/Arslanasif9t9" },
              { icon: Linkedin, href: "https://www.linkedin.com/in/arslan-ahmad-983834343/" },
              // { icon: Twitter, href: "https://twitter.com" },
            ].map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full text-muted-foreground hover:text-primary transition-colors"
                whileHover={{ y: -3 }}
              >
                <social.icon size={20} />
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
