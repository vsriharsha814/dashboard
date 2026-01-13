# Theme System Guide

## Overview
This portfolio now features a comprehensive light and dark mode theme system with smooth transitions and modern color palettes based on 2026 best practices.

## Color Themes

### Light Mode - Neo-Minimalist Neutrals
- **Background**: Soft warm white (#fafaf9)
- **Cards**: Pure white (#ffffff)
- **Text**: Deep stone gray (#1c1917)
- **Accent**: Professional blue (#2563eb)
- **Border**: Light stone (#e7e5e4)

The light mode uses a clean, minimal aesthetic with soft neutral shades that promote tranquility and complement bold typography.

### Dark Mode - Deep Slate with Blue Accents
- **Background**: Rich slate (#0f172a)
- **Cards**: Medium slate (#1e293b)
- **Text**: Light blue-tinted white (#f1f5f9)
- **Accent**: Bright blue (#3b82f6)
- **Border**: Dark slate (#334155)

The dark mode features a sophisticated slate palette with vibrant blue accents for a modern, professional look.

## Features

### Theme Toggle
- **Location**: Top-right corner of the navigation bar
- **Icons**: Sun icon for dark mode, moon icon for light mode
- **Interaction**: Smooth hover effects and color transitions

### Persistence
- User's theme preference is saved in localStorage
- Theme persists across browser sessions
- Automatic detection of system preference on first visit

### Smooth Transitions
- 300ms ease transitions on all color changes
- No jarring theme switches
- Prevents flash of unstyled content (FOUC)

## Implementation Details

### Key Components

1. **ThemeProvider** (`components/ThemeProvider.tsx`)
   - Context-based theme management
   - localStorage integration
   - System preference detection
   - FOUC prevention

2. **Enhanced Components**
   - All components updated with slate color palette
   - Consistent border and shadow treatments
   - Improved hover states with scale transforms
   - Blue accent color for CTAs and interactive elements

### CSS Variables

Custom properties defined in `globals.css`:
- Background, foreground, card colors
- Border, input, and ring colors
- Primary, secondary, accent colors
- All with light and dark variants

### Usage

The theme is automatically applied throughout the application. To use theme-aware styles:

```tsx
className="bg-white dark:bg-slate-800 text-gray-900 dark:text-white"
```

## Design Principles

1. **High Contrast**: Ensures readability in both modes
2. **Consistency**: Color usage is predictable across components
3. **Accessibility**: WCAG AA compliant color combinations
4. **Modern**: Follows 2026 design trends with subtle gradients and shadows
5. **Professional**: Blue accent color conveys trust and expertise

## Future Enhancements

Potential additions:
- Multiple theme options (e.g., high contrast, colorblind-friendly)
- Automatic theme switching based on time of day
- Animation preferences (reduced motion support)
- Custom color picker for personalization

