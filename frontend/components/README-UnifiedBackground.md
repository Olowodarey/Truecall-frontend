# Unified Background System

The unified background system provides consistent, interactive 3D particle backgrounds across your entire application using the Antigravity component and Three.js.

## Components

### 1. Antigravity.tsx
The core 3D particle system component that creates interactive particle effects.

### 2. UnifiedBackground.tsx
A wrapper component that provides different background variants and configurations.

## Usage

### Basic Usage

```tsx
import UnifiedBackground from './UnifiedBackground';

// In your component
<UnifiedBackground 
  variant="hero"
  showParticles={true}
  particleCount={300}
  opacity={0.6}
/>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'hero' \| 'section' \| 'minimal'` | `'section'` | Background style variant |
| `showParticles` | `boolean` | `true` | Whether to show particle system |
| `showDecorative` | `boolean` | `false` | Whether to show decorative elements |
| `showNetworkLines` | `boolean` | `false` | Whether to show network line SVGs |
| `particleCount` | `number` | `150` | Number of particles to render |
| `opacity` | `number` | `0.4` | Opacity of the particle system |
| `className` | `string` | `''` | Additional CSS classes |

### Variants

#### Hero (`variant="hero"`)
- Full gradient background from gray-900 via black to gray-900
- Optimized for landing pages and hero sections
- Higher particle density and larger particle sizes

#### Section (`variant="section"`)
- Gradient background from black via gray-900 to black
- Perfect for content sections
- Moderate particle density

#### Minimal (`variant="minimal"`)
- Simple black background
- Subtle particle effects
- Great for footers and minimal sections

## Implementation Examples

### Hero Section
```tsx
<section className="relative min-h-screen overflow-hidden">
  <UnifiedBackground 
    variant="hero"
    showParticles={true}
    showDecorative={true}
    showNetworkLines={true}
    particleCount={300}
    opacity={0.6}
  />
  <div className="relative z-10">
    {/* Your content */}
  </div>
</section>
```

### Content Section
```tsx
<section className="relative py-20">
  <UnifiedBackground 
    variant="section"
    showParticles={true}
    particleCount={120}
    opacity={0.25}
  />
  <div className="relative z-10 max-w-7xl mx-auto px-6">
    {/* Your content */}
  </div>
</section>
```

### Full Page Background
```tsx
<div className="relative min-h-screen">
  <UnifiedBackground 
    variant="section"
    showParticles={true}
    showNetworkLines={true}
    particleCount={200}
    opacity={0.4}
    className="fixed inset-0 -z-10"
  />
  {/* Page content */}
</div>
```

## Performance Considerations

- Use lower `particleCount` values for sections with less visual importance
- Reduce `opacity` for subtle effects
- Consider disabling particles on mobile devices for better performance
- The particle system automatically optimizes based on mouse interaction

## Customization

### Particle Colors
The particle color is set to `#f97316` (orange) by default. To change colors, modify the `color` prop in the Antigravity component within UnifiedBackground.tsx.

### Animation Speed
Adjust animation parameters in the Antigravity component:
- `waveSpeed`: Controls wave animation speed
- `pulseSpeed`: Controls particle pulsing
- `lerpSpeed`: Controls particle movement smoothness

### Particle Shapes
Available shapes: `'capsule' | 'sphere' | 'box' | 'tetrahedron'`

## Browser Compatibility

- Requires WebGL support
- Works best in modern browsers (Chrome, Firefox, Safari, Edge)
- Automatically falls back gracefully on unsupported devices