

## Redesign InteractiveCube — Glassmorphism Style

### Changes — Single file: `src/components/InteractiveCube.tsx`

Keep all drag/rotation/auto-rotate logic, face data, and component structure identical. Only change visual styles:

**Cube container area:**
- Add a light radial gradient background behind the cube (white → light blue) as a self-contained backdrop `div`
- Ground shadow: radial gradient ellipse beneath cube in teal/cyan tones, blurred
- Ambient glow: larger radial gradient in cyan behind the cube

**Cube faces (`CubeFace`):**
- Background: vibrant green-to-blue gradient (`hsla(163,70%,55%,0.5)` → `hsla(200,80%,55%,0.5)`)
- Border: 2px solid with cyan glow `hsla(180,80%,70%,0.7)`
- Box-shadow: strong cyan/teal outer glow (`0 0 20px hsla(180,80%,60%,0.4), 0 0 40px hsla(180,80%,60%,0.2)`)
- Specular highlight: thick top-half gradient (white 50% opacity → transparent), covering ~35% height
- Backdrop-filter: `blur(16px) saturate(1.6)`

**Icons & labels:**
- Icons: 72px, white, with `drop-shadow` glow
- Labels: 24px, bold, white with text-shadow glow
- Logo face "VIZ": 80px bold white

**Edge sparkles:** Keep with adjusted colors to match lighter theme

**"Arraste para explorar" label:** Change to darker text (`text-slate-500`) to contrast with light background

**Hover labels:** Adjust background to semi-transparent white glass pills

**Note:** The cube sits inside the dark-themed HeroSection. The light background will be self-contained within the InteractiveCube wrapper div, creating a striking contrast "window" effect. If this isn't desired, an alternative is to keep the cube's own wrapper transparent and only change face styles — but the request specifically asks for a light background.

