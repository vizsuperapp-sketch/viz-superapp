@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700&display=swap');

:root {
  --viz-blue: #3B82F6;
  --viz-cyan: #06B6D4;
  --viz-green: #10B981;
  --viz-emerald: #34D399;
  --viz-gradient: linear-gradient(135deg, #60A5FA 0%, #34D399 50%, #06B6D4 100%);
  --glass-bg: rgba(255, 255, 255, 0.04);
  --glass-border: rgba(255, 255, 255, 0.08);
  --glass-hover-bg: rgba(255, 255, 255, 0.08);
  --glass-hover-border: rgba(255, 255, 255, 0.18);
  --text-primary: rgba(255, 255, 255, 1);
  --text-secondary: rgba(255, 255, 255, 0.5);
  --text-muted: rgba(255, 255, 255, 0.35);
  --text-hint: rgba(255, 255, 255, 0.25);
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
}

body {
  background: #020617;
  color: var(--text-primary);
  font-family: 'DM Sans', system-ui, -apple-system, sans-serif;
  font-weight: 400;
  line-height: 1.6;
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

h1, h2, h3, h4, h5, h6 {
  font-family: 'Outfit', sans-serif;
  letter-spacing: -0.03em;
  line-height: 1.1;
}

::selection {
  background: rgba(59, 130, 246, 0.3);
}

input::placeholder {
  color: rgba(255, 255, 255, 0.3);
}

/* Glass card utility */
.glass-card {
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: 20px;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  padding: 28px 24px;
  transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
}

.glass-card:hover {
  background: var(--glass-hover-bg);
  border-color: var(--glass-hover-border);
  transform: translateY(-4px);
}

/* Gradient text utility */
.gradient-text {
  background: var(--viz-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Scroll reveal animation */
.reveal {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.8s cubic-bezier(0.23, 1, 0.32, 1), transform 0.8s cubic-bezier(0.23, 1, 0.32, 1);
}

.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}

/* Pulse animation for status dots */
@keyframes pulse-dot {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(1.5); }
}

.animate-pulse-dot {
  animation: pulse-dot 2s ease-in-out infinite;
}

/* Ambient glow pulse */
@keyframes ambient-pulse {
  0%, 100% { opacity: 0.6; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.08); }
}

.animate-ambient {
  animation: ambient-pulse 5s ease-in-out infinite;
}

/* Fade slide up */
@keyframes fade-slide-up {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fade-up {
  animation: fade-slide-up 0.6s ease-out forwards;
}

/* Section label style */
.section-label {
  font-size: 12px;
  font-weight: 600;
  color: #60A5FA;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  text-align: center;
  margin-bottom: 12px;
}

/* Section heading style */
.section-heading {
  font-family: 'Outfit', sans-serif;
  font-size: clamp(28px, 4vw, 44px);
  font-weight: 800;
  text-align: center;
  letter-spacing: -0.03em;
  margin-bottom: 48px;
}

/* Responsive hide */
@media (max-width: 768px) {
  .hide-mobile { display: none !important; }
}