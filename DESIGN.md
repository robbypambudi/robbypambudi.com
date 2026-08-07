---
name: Robby Pambudi Portfolio
description: Neo-brutalist recruiter portfolio with cool-shifted purple accent and CV-backed content.
colors:
  background-light: '#f5eef8'
  background-dark: '#3d2a52'
  secondary-background: '#ffffff'
  secondary-background-dark: '#1a1a1a'
  foreground-light: '#000000'
  foreground-dark: '#ebebeb'
  main: '#8b6bc9'
  main-foreground: '#000000'
  border: '#000000'
  chart-2: '#5ec4a8'
  chart-3: '#f0d45c'
  chart-4: '#f0785c'
typography:
  body:
    fontFamily: 'DM Sans, system-ui, sans-serif'
    fontWeight: 500
  heading:
    fontFamily: 'DM Sans, system-ui, sans-serif'
    fontWeight: 700
rounded:
  base: '5px'
spacing:
  shadow: '4px 4px 0px 0px #000000'
components:
  button-primary:
    backgroundColor: '{colors.main}'
    textColor: '{colors.main-foreground}'
    border: '2px solid {colors.border}'
    boxShadow: '{spacing.shadow}'
---

# Design System — Neo-brutalist (Robby)

## Product Context

Recruiter-facing software engineer portfolio. Structure mirrors Ashutosh Dash neo-brutalism; content and cool-shifted purple accent are Robby's.

## Aesthetic Direction

**Playful, bold, clean neo-brutalism.** Thick black borders, hard 4px offset shadows, saturated section bands, DM Sans. Purple `--main` shifted cooler (~275–285 hue feel via `#8b6bc9`) vs pure magenta-violet templates.

**Anti-reference:** Tokyo Night spray wall, dark navy glow templates, cream+serif terracotta, fake testimonials.

## Layout

Home: Hero (+ card game) → TechSkills marquee → Experience → Projects → FAQ → Publications teaser → Contact/Getform. Secondary: `/publications`, `/activities`.

## Motion

Motion/react entrances on scroll; card game idle flips respect `prefers-reduced-motion` when implemented. Theme toggle light/dark.

## Do's and Don'ts

**Do** keep Getform; cite CV metrics only; pin dark text on chart-colored sections when needed for contrast.

**Don't** invent reviews; ship Insights/PostHog; restore spray wall as primary hero.
