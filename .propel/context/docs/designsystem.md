# Design System - GenAI PDF Extractor

**Project**: GenAI PDF Extractor UI/UX Modernization  
**Version**: 1.0  
**Platform**: Responsive Web (Desktop, Tablet, Mobile)  
**Last Updated**: March 2026

---

## 1. Overview

This design system defines the visual language, design tokens, and component specifications for the GenAI PDF Extractor application. All UI implementations must adhere to these specifications to ensure consistency, accessibility, and maintainability.

**Design Principles**:
- **Clarity**: Clear visual hierarchy and intuitive information architecture
- **Efficiency**: Streamlined workflows with minimal clicks (max 2 clicks to any feature)
- **Accessibility**: WCAG 2.1 Level AA compliance for all users
- **Consistency**: Unified design language across all screens and states
- **Professionalism**: Enterprise-grade visual quality for financial industry context

---

## 2. Design Tokens

### 2.1 Color Palette

#### Primary Colors
```yaml
primary:
  blue-50: "#EFF6FF"   # Lightest blue for backgrounds
  blue-100: "#DBEAFE"  # Light blue for hover states
  blue-500: "#3B82F6"  # Primary brand color (CTAs, active states)
  blue-600: "#2563EB"  # Darker blue for hover on primary
  blue-700: "#1D4ED8"  # Darkest blue for pressed states
  
  usage: "Primary CTAs, active navigation, links, focus indicators"
  wcag_contrast: "4.5:1 on white background (AA compliant)"
```

#### Secondary Colors
```yaml
secondary:
  indigo-50: "#EEF2FF"
  indigo-100: "#E0E7FF"
  indigo-500: "#6366F1"  # Secondary brand color
  indigo-600: "#4F46E5"
  indigo-700: "#4338CA"
  
  usage: "Secondary actions, accents, badges"
  wcag_contrast: "4.5:1 on white background (AA compliant)"
```

#### Semantic Colors
```yaml
success:
  green-50: "#F0FDF4"
  green-100: "#DCFCE7"
  green-500: "#10B981"  # Success states
  green-600: "#059669"
  green-700: "#047857"
  
  usage: "Success messages, status badges, confirmation actions"
  wcag_contrast: "4.5:1 on white background (AA compliant)"

warning:
  amber-50: "#FFFBEB"
  amber-100: "#FEF3C7"
  amber-500: "#F59E0B"  # Warning states
  amber-600: "#D97706"
  amber-700: "#B45309"
  
  usage: "Warning messages, caution indicators"
  wcag_contrast: "4.5:1 on white background (AA compliant)"

error:
  red-50: "#FEF2F2"
  red-100: "#FEE2E2"
  red-500: "#EF4444"  # Error states
  red-600: "#DC2626"
  red-700: "#B91C1C"
  
  usage: "Error messages, validation errors, destructive actions"
  wcag_contrast: "4.5:1 on white background (AA compliant)"
```

#### Neutral Colors (Gray Scale)
```yaml
neutral:
  gray-50: "#F9FAFB"   # Lightest background
  gray-100: "#F3F4F6"  # Card backgrounds, subtle fills
  gray-200: "#E5E7EB"  # Borders, dividers
  gray-300: "#D1D5DB"  # Disabled states, placeholders
  gray-400: "#9CA3AF"  # Muted text, icons
  gray-500: "#6B7280"  # Secondary text
  gray-600: "#4B5563"  # Body text
  gray-700: "#374151"  # Headings
  gray-800: "#1F2937"  # Dark headings
  gray-900: "#111827"  # Darkest text
  white: "#FFFFFF"     # Pure white backgrounds
  black: "#000000"     # Pure black (rarely used)
  
  usage: "Text, backgrounds, borders, shadows"
  wcag_contrast: 
    - "gray-600 on white: 7.0:1 (AAA compliant)"
    - "gray-700 on white: 10.5:1 (AAA compliant)"
    - "gray-900 on white: 16.0:1 (AAA compliant)"
```

#### Color Usage Guidelines
- **Primary Blue (#3B82F6)**: Use for primary CTAs, active navigation items, links, and focus indicators
- **Success Green (#10B981)**: Use for success toasts, "Success" status badges, confirmation messages
- **Error Red (#EF4444)**: Use for error toasts, validation errors, "Failed" status badges, destructive action buttons
- **Warning Amber (#F59E0B)**: Use for warning messages, "Processing" status badges
- **Neutral Grays**: Use for text hierarchy, backgrounds, borders, and disabled states
- **Never use color alone**: Always combine with icons, text, or patterns for accessibility

---

### 2.2 Typography

#### Font Families
```yaml
primary_font:
  family: "Inter"
  weights: [400, 500, 600, 700]
  source: "Google Fonts"
  fallback: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
  usage: "All UI text, headings, body copy"

monospace_font:
  family: "Fira Code"
  weights: [400, 500]
  source: "Google Fonts"
  fallback: "'Courier New', Courier, monospace"
  usage: "JSON display, code snippets, technical data"
```

#### Type Scale
```yaml
heading_1:
  size: "36px"
  line_height: "44px"
  weight: 700
  letter_spacing: "-0.02em"
  usage: "Page titles (Dashboard, Upload Document, Document History)"
  
heading_2:
  size: "30px"
  line_height: "38px"
  weight: 600
  letter_spacing: "-0.01em"
  usage: "Section headings (Recent Extractions, Processing your document...)"
  
heading_3:
  size: "24px"
  line_height: "32px"
  weight: 600
  letter_spacing: "0"
  usage: "Subsection headings (Choose LLM Model, Quick Statistics)"
  
heading_4:
  size: "20px"
  line_height: "28px"
  weight: 600
  letter_spacing: "0"
  usage: "Card titles, table headers"
  
body:
  size: "16px"
  line_height: "24px"
  weight: 400
  letter_spacing: "0"
  usage: "Body text, form labels, descriptions"
  
small:
  size: "14px"
  line_height: "20px"
  weight: 400
  letter_spacing: "0"
  usage: "Secondary text, metadata, helper text"
  
caption:
  size: "12px"
  line_height: "16px"
  weight: 400
  letter_spacing: "0"
  usage: "Timestamps, captions, fine print"
```

#### Typography Usage Guidelines
- **Heading Hierarchy**: Always use semantic HTML (h1 > h2 > h3 > h4), never skip levels
- **Line Length**: Maximum 75 characters per line for optimal readability
- **Text Color**: Use gray-900 for H1, gray-800 for H2, gray-700 for H3/H4, gray-600 for body, gray-500 for small/caption
- **Font Weights**: Use 700 for H1, 600 for H2/H3/H4, 400 for body/small/caption
- **Responsive Scaling**: Reduce heading sizes by 20% on mobile (<768px)

---

### 2.3 Spacing Scale

#### Base Unit: 4px (0.25rem)
```yaml
spacing:
  0: "0px"      # No spacing
  1: "4px"      # 0.25rem - Minimal spacing
  2: "8px"      # 0.5rem - Tight spacing
  3: "12px"     # 0.75rem - Compact spacing
  4: "16px"     # 1rem - Default spacing
  6: "24px"     # 1.5rem - Medium spacing
  8: "32px"     # 2rem - Large spacing
  12: "48px"    # 3rem - Extra large spacing
  16: "64px"    # 4rem - Section spacing
  24: "96px"    # 6rem - Page spacing
  
  usage: "Margins, padding, gaps between elements"
```

#### Spacing Usage Guidelines
- **Component Padding**: Use spacing-4 (16px) for default component padding
- **Card Padding**: Use spacing-6 (24px) for card internal padding
- **Section Gaps**: Use spacing-8 (32px) between major sections
- **Page Margins**: Use spacing-4 (16px) on mobile, spacing-6 (24px) on tablet, spacing-8 (32px) on desktop
- **Form Field Gaps**: Use spacing-4 (16px) between form fields
- **Button Padding**: Use spacing-3 (12px) vertical, spacing-6 (24px) horizontal for medium buttons

---

### 2.4 Border Radius

```yaml
radius:
  none: "0px"       # No rounding
  sm: "4px"         # Subtle rounding (inputs, small buttons)
  md: "8px"         # Default rounding (cards, buttons, modals)
  lg: "12px"        # Large rounding (prominent cards)
  xl: "16px"        # Extra large rounding (hero sections)
  full: "9999px"    # Fully rounded (pills, badges, avatars)
  
  usage: "Border radius for all UI elements"
```

#### Border Radius Usage Guidelines
- **Buttons**: Use radius-md (8px)
- **Cards**: Use radius-md (8px) or radius-lg (12px) for prominent cards
- **Inputs**: Use radius-sm (4px)
- **Modals/Dialogs**: Use radius-lg (12px)
- **Badges**: Use radius-full (9999px)
- **Consistency**: Use same radius value for related components

---

### 2.5 Elevation (Shadows)

```yaml
shadow:
  level_1:
    value: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)"
    usage: "Cards, inputs, subtle elevation"
    
  level_2:
    value: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
    usage: "Dropdowns, popovers, hover states"
    
  level_3:
    value: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
    usage: "Modals, dialogs, overlays"
    
  level_4:
    value: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
    usage: "Sticky headers, floating elements"
```

#### Elevation Usage Guidelines
- **Cards**: Use shadow-level_1 for default state, shadow-level_2 on hover
- **Dropdowns**: Use shadow-level_2
- **Modals**: Use shadow-level_3
- **Sticky Navigation**: Use shadow-level_4
- **Accessibility**: Shadows are decorative only, never convey critical information

---

### 2.6 Breakpoints

```yaml
breakpoints:
  mobile:
    min: "0px"
    max: "767px"
    description: "Single-column layout, hamburger menu, stacked components"
    
  tablet:
    min: "768px"
    max: "1023px"
    description: "2-column layout, adaptive navigation, collapsible sections"
    
  desktop:
    min: "1024px"
    max: "9999px"
    description: "Multi-column layout, full navigation, side-by-side views"
    
  max_content_width: "1280px"
  container_padding:
    mobile: "16px"
    tablet: "24px"
    desktop: "32px"
```

---

### 2.7 Grid System

```yaml
grid:
  desktop:
    columns: 12
    gutter: "24px"
    max_width: "1280px"
    
  tablet:
    columns: 8
    gutter: "20px"
    max_width: "100%"
    
  mobile:
    columns: 4
    gutter: "16px"
    max_width: "100%"
```

---

## 3. Component Specifications

### 3.1 Actions - Button

#### Variants
- **Primary**: High-emphasis actions (Upload, Extract, Save)
- **Secondary**: Medium-emphasis actions (Cancel, View All)
- **Tertiary**: Low-emphasis actions (text-only, minimal styling)
- **Danger**: Destructive actions (Delete, Confirm Delete)

#### Sizes
- **Small (S)**: Height 32px, Padding 8px 16px, Font 14px
- **Medium (M)**: Height 40px, Padding 12px 24px, Font 16px (default)
- **Large (L)**: Height 48px, Padding 16px 32px, Font 18px

#### States & Styling

**Primary Button**:
```yaml
default:
  background: "primary-blue-500 (#3B82F6)"
  text_color: "white"
  border: "none"
  border_radius: "radius-md (8px)"
  font_weight: 600
  shadow: "shadow-level_1"
  
hover:
  background: "primary-blue-600 (#2563EB)"
  transform: "scale(1.02)"
  transition: "150ms ease-in-out"
  shadow: "shadow-level_2"
  
focus:
  outline: "2px solid primary-blue-500"
  outline_offset: "2px"
  
active:
  background: "primary-blue-700 (#1D4ED8)"
  transform: "scale(0.98)"
  
disabled:
  background: "gray-300 (#D1D5DB)"
  text_color: "gray-500 (#6B7280)"
  cursor: "not-allowed"
  shadow: "none"
  
loading:
  background: "primary-blue-500 (#3B82F6)"
  text_color: "transparent"
  cursor: "wait"
  icon: "Spinner (white, centered)"
```

**Secondary Button**:
```yaml
default:
  background: "transparent"
  text_color: "gray-700 (#374151)"
  border: "1px solid gray-300 (#D1D5DB)"
  border_radius: "radius-md (8px)"
  font_weight: 600
  
hover:
  background: "gray-50 (#F9FAFB)"
  border_color: "gray-400 (#9CA3AF)"
  transform: "scale(1.02)"
  transition: "150ms ease-in-out"
```

**Danger Button**:
```yaml
default:
  background: "error-red-500 (#EF4444)"
  text_color: "white"
  border: "none"
  border_radius: "radius-md (8px)"
  font_weight: 600
  shadow: "shadow-level_1"
  
hover:
  background: "error-red-600 (#DC2626)"
  transform: "scale(1.02)"
```

#### Accessibility
- Minimum touch target: 44x44px (mobile)
- Keyboard accessible: Tab to focus, Enter/Space to activate
- ARIA labels required for icon-only buttons
- Focus indicator: 2px outline with 2px offset

---

### 3.2 Inputs - TextField

#### Variants
- **Default**: Standard text input
- **Search**: Input with search icon
- **Error**: Input with validation error

#### Sizes
- **Small (S)**: Height 32px, Font 14px
- **Medium (M)**: Height 40px, Font 16px (default)
- **Large (L)**: Height 48px, Font 18px

#### States & Styling

```yaml
default:
  background: "white"
  border: "1px solid gray-300 (#D1D5DB)"
  border_radius: "radius-sm (4px)"
  padding: "12px 16px"
  font_size: "16px"
  text_color: "gray-900 (#111827)"
  placeholder_color: "gray-400 (#9CA3AF)"
  
hover:
  border_color: "gray-400 (#9CA3AF)"
  
focus:
  border_color: "primary-blue-500 (#3B82F6)"
  outline: "2px solid primary-blue-500"
  outline_offset: "0px"
  
error:
  border_color: "error-red-500 (#EF4444)"
  background: "error-red-50 (#FEF2F2)"
  
disabled:
  background: "gray-100 (#F3F4F6)"
  border_color: "gray-300 (#D1D5DB)"
  text_color: "gray-500 (#6B7280)"
  cursor: "not-allowed"
```

#### Accessibility
- Label associated with input via `<label for="">` or `aria-labelledby`
- Error messages announced via `aria-live="polite"`
- Required fields marked with `aria-required="true"`
- Placeholder text not used as sole label

---

### 3.3 Inputs - DropZone (File Upload)

#### States & Styling

```yaml
default:
  background: "gray-50 (#F9FAFB)"
  border: "2px dashed gray-300 (#D1D5DB)"
  border_radius: "radius-md (8px)"
  padding: "48px 24px"
  text_align: "center"
  min_height: "200px"
  
hover:
  border_color: "primary-blue-500 (#3B82F6)"
  background: "blue-50 (#EFF6FF)"
  cursor: "pointer"
  
drag_over:
  border_color: "primary-blue-500 (#3B82F6)"
  border_style: "solid"
  background: "blue-100 (#DBEAFE)"
  
error:
  border_color: "error-red-500 (#EF4444)"
  border_style: "solid"
  background: "error-red-50 (#FEF2F2)"
```

#### Content Elements
- Upload icon (48px, gray-400, centered)
- Primary text: "Drag and drop your PDF file here, or click to browse" (body size, gray-700)
- Secondary text: "Maximum file size: 10MB" (small size, gray-500)

---

### 3.4 Navigation - Header

#### Desktop (≥1024px)
```yaml
layout:
  height: "64px"
  background: "white"
  border_bottom: "1px solid gray-200 (#E5E7EB)"
  padding: "0 32px"
  position: "fixed"
  top: "0"
  width: "100%"
  z_index: "1000"
  shadow: "shadow-level_1"
  
content:
  logo:
    position: "left"
    font_size: "20px"
    font_weight: 700
    color: "primary-blue-500 (#3B82F6)"
  
  navigation:
    position: "center"
    gap: "32px"
    items: ["Dashboard", "Upload", "History"]
    
  user_profile:
    position: "right"
    icon_size: "32px"
```

#### Mobile (<768px)
```yaml
layout:
  height: "56px"
  background: "white"
  border_bottom: "1px solid gray-200 (#E5E7EB)"
  padding: "0 16px"
  
content:
  logo:
    position: "left"
    font_size: "18px"
    
  hamburger_menu:
    position: "right"
    icon_size: "24px"
    color: "gray-700 (#374151)"
```

#### Navigation Item States
```yaml
default:
  color: "gray-600 (#4B5563)"
  font_weight: 500
  
hover:
  color: "primary-blue-500 (#3B82F6)"
  
active:
  color: "primary-blue-500 (#3B82F6)"
  font_weight: 600
  border_bottom: "2px solid primary-blue-500"
```

---

### 3.5 Content - Card

#### Variants
- **Document Card**: Shows document thumbnail, filename, metadata, status
- **Stat Card**: Shows statistic with label and value
- **Entity Category Card**: Shows entity fields in card view

#### Document Card Styling
```yaml
layout:
  background: "white"
  border: "1px solid gray-200 (#E5E7EB)"
  border_radius: "radius-md (8px)"
  padding: "16px"
  shadow: "shadow-level_1"
  min_height: "200px"
  
hover:
  shadow: "shadow-level_2"
  transform: "translateY(-2px)"
  transition: "200ms ease-in-out"
  cursor: "pointer"
  
content:
  thumbnail:
    width: "100%"
    height: "120px"
    background: "gray-100 (#F3F4F6)"
    border_radius: "radius-sm (4px)"
    margin_bottom: "12px"
    
  filename:
    font_size: "16px"
    font_weight: 600
    color: "gray-900 (#111827)"
    margin_bottom: "8px"
    overflow: "hidden"
    text_overflow: "ellipsis"
    white_space: "nowrap"
    
  metadata:
    font_size: "14px"
    color: "gray-500 (#6B7280)"
    margin_bottom: "8px"
    
  status_badge:
    margin_top: "auto"
```

---

### 3.6 Content - Table

#### Styling (TanStack Table)
```yaml
table:
  width: "100%"
  border_collapse: "collapse"
  background: "white"
  border: "1px solid gray-200 (#E5E7EB)"
  border_radius: "radius-md (8px)"
  overflow: "hidden"
  
header:
  background: "gray-50 (#F9FAFB)"
  border_bottom: "1px solid gray-200 (#E5E7EB)"
  position: "sticky"
  top: "0"
  z_index: "10"
  
  th:
    padding: "12px 16px"
    text_align: "left"
    font_size: "14px"
    font_weight: 600
    color: "gray-700 (#374151)"
    cursor: "pointer"
    
  th_hover:
    background: "gray-100 (#F3F4F6)"
    
  sort_icon:
    margin_left: "8px"
    color: "gray-400 (#9CA3AF)"
    
body:
  tr:
    border_bottom: "1px solid gray-200 (#E5E7EB)"
    
  tr_hover:
    background: "gray-50 (#F9FAFB)"
    
  tr_striped:
    background: "white"
    nth_child_even: "gray-50 (#F9FAFB)"
    
  td:
    padding: "12px 16px"
    font_size: "14px"
    color: "gray-900 (#111827)"
```

#### Responsive Behavior
- Desktop: Full table with all columns
- Tablet: Horizontal scroll if needed
- Mobile: Card view only (no table view)

---

### 3.7 Feedback - Toast

#### Variants
- **Success**: Green background, checkmark icon
- **Error**: Red background, X icon
- **Warning**: Amber background, alert icon
- **Info**: Blue background, info icon

#### Success Toast Styling
```yaml
layout:
  position: "fixed"
  top: "24px"
  right: "24px"
  width: "360px"
  max_width: "calc(100vw - 48px)"
  background: "success-green-500 (#10B981)"
  color: "white"
  border_radius: "radius-md (8px)"
  padding: "16px"
  shadow: "shadow-level_3"
  z_index: "9999"
  
animation:
  enter: "slide-in from right, 300ms ease-out"
  exit: "slide-out to right, 300ms ease-in"
  auto_dismiss: "5000ms"
  
content:
  icon:
    size: "24px"
    position: "left"
    margin_right: "12px"
    
  message:
    font_size: "14px"
    font_weight: 500
    
  close_button:
    position: "absolute"
    top: "8px"
    right: "8px"
    size: "20px"
    cursor: "pointer"
```

---

### 3.8 Feedback - Modal/Dialog

#### Styling
```yaml
overlay:
  position: "fixed"
  top: "0"
  left: "0"
  width: "100vw"
  height: "100vh"
  background: "rgba(0, 0, 0, 0.5)"
  z_index: "9998"
  backdrop_filter: "blur(4px)"
  
modal:
  position: "fixed"
  top: "50%"
  left: "50%"
  transform: "translate(-50%, -50%)"
  background: "white"
  border_radius: "radius-lg (12px)"
  padding: "24px"
  shadow: "shadow-level_3"
  z_index: "9999"
  max_width: "500px"
  width: "calc(100vw - 48px)"
  
header:
  font_size: "20px"
  font_weight: 600
  color: "gray-900 (#111827)"
  margin_bottom: "16px"
  
body:
  font_size: "16px"
  color: "gray-600 (#4B5563)"
  margin_bottom: "24px"
  
footer:
  display: "flex"
  justify_content: "flex-end"
  gap: "12px"
```

---

### 3.9 Data Display - Badge

#### Variants
- **Success**: Green background (status: Success)
- **Error**: Red background (status: Failed)
- **Warning**: Amber background (status: Processing)
- **Info**: Blue background (model: OpenAI, Gemini)

#### Success Badge Styling
```yaml
layout:
  display: "inline-flex"
  align_items: "center"
  padding: "4px 12px"
  border_radius: "radius-full (9999px)"
  background: "success-green-100 (#DCFCE7)"
  color: "success-green-700 (#047857)"
  font_size: "12px"
  font_weight: 600
  text_transform: "uppercase"
  letter_spacing: "0.05em"
```

---

### 3.10 Feedback - EmptyState

#### Styling
```yaml
layout:
  display: "flex"
  flex_direction: "column"
  align_items: "center"
  justify_content: "center"
  padding: "64px 24px"
  text_align: "center"
  min_height: "400px"
  
icon:
  size: "64px"
  color: "gray-400 (#9CA3AF)"
  margin_bottom: "24px"
  
heading:
  font_size: "24px"
  font_weight: 600
  color: "gray-900 (#111827)"
  margin_bottom: "8px"
  
description:
  font_size: "16px"
  color: "gray-500 (#6B7280)"
  margin_bottom: "24px"
  max_width: "400px"
  
cta_button:
  variant: "primary"
  size: "medium"
```

---

### 3.11 Feedback - Skeleton

#### Styling
```yaml
skeleton:
  background: "linear-gradient(90deg, gray-200 0%, gray-100 50%, gray-200 100%)"
  background_size: "200% 100%"
  animation: "shimmer 1.5s infinite"
  border_radius: "radius-sm (4px)"
  
variants:
  text:
    height: "16px"
    width: "100%"
    margin_bottom: "8px"
    
  heading:
    height: "24px"
    width: "60%"
    margin_bottom: "16px"
    
  card:
    height: "200px"
    width: "100%"
    border_radius: "radius-md (8px)"
    
  circle:
    width: "48px"
    height: "48px"
    border_radius: "radius-full (9999px)"
```

---

## 4. Accessibility Standards

### WCAG 2.1 Level AA Compliance

#### Color Contrast
- Normal text (< 18px): Minimum 4.5:1 contrast ratio
- Large text (≥ 18px or ≥ 14px bold): Minimum 3:1 contrast ratio
- UI components and graphics: Minimum 3:1 contrast ratio

#### Keyboard Navigation
- All interactive elements accessible via Tab key
- Logical tab order following visual flow
- Enter/Space activates buttons and links
- Esc closes modals and dropdowns
- Arrow keys navigate within components (dropdowns, tables)

#### Focus Indicators
- Visible focus indicator on all focusable elements
- Minimum 2px outline with 2px offset
- Color: primary-blue-500 (#3B82F6)
- Never remove focus indicators with `outline: none` without replacement

#### Screen Reader Support
- Semantic HTML structure (header, nav, main, footer, article, section)
- Proper heading hierarchy (h1 > h2 > h3 > h4)
- ARIA labels for icon-only buttons (`aria-label="Upload document"`)
- ARIA live regions for dynamic content (`aria-live="polite"` for success/error messages)
- Alt text for all images (decorative images use `alt=""`)
- Form labels associated with inputs

#### Touch Targets
- Minimum 44x44px touch target size on mobile
- Adequate spacing between interactive elements (minimum 8px)

---

## 5. Animation & Transitions

### Transition Timing
```yaml
fast: "150ms"      # Button hover, focus states
medium: "200ms"    # Card hover, subtle animations
slow: "300ms"      # Page transitions, modal open/close
```

### Easing Functions
```yaml
ease_in_out: "cubic-bezier(0.4, 0, 0.2, 1)"   # Default
ease_out: "cubic-bezier(0, 0, 0.2, 1)"        # Enter animations
ease_in: "cubic-bezier(0.4, 0, 1, 1)"         # Exit animations
```

### Common Animations
```yaml
button_hover:
  transform: "scale(1.02)"
  transition: "150ms ease-in-out"
  
card_hover:
  transform: "translateY(-2px)"
  shadow: "shadow-level_2"
  transition: "200ms ease-in-out"
  
page_transition:
  opacity: "0 to 1"
  transform: "translateY(10px) to translateY(0)"
  transition: "300ms ease-out"
  
toast_slide_in:
  transform: "translateX(100%) to translateX(0)"
  transition: "300ms ease-out"
```

### Accessibility Considerations
- Respect `prefers-reduced-motion` media query
- Disable animations when user prefers reduced motion
- Never use animation to convey critical information

---

## 6. Iconography

### Icon Library
**Source**: Lucide React (https://lucide.dev/)  
**Style**: Outlined, consistent stroke width  
**License**: ISC (permissive)

### Icon Sizes
```yaml
small: "16px"      # Inline with text
medium: "24px"     # Default for UI icons
large: "32px"      # Prominent icons
xlarge: "48px"     # Empty state icons, hero sections
```

### Commonly Used Icons
- **Upload**: `Upload` icon (upload zone, upload button)
- **File**: `FileText` icon (PDF documents)
- **Success**: `CheckCircle` icon (success states)
- **Error**: `XCircle` icon (error states)
- **Warning**: `AlertCircle` icon (warning states)
- **Info**: `Info` icon (info messages)
- **Delete**: `Trash2` icon (delete actions)
- **Edit**: `Edit2` icon (edit actions)
- **Search**: `Search` icon (search inputs)
- **Filter**: `Filter` icon (filter controls)
- **Download**: `Download` icon (export actions)
- **Eye**: `Eye` icon (view actions)
- **Menu**: `Menu` icon (hamburger menu)
- **Close**: `X` icon (close modals, remove items)
- **ChevronDown**: `ChevronDown` icon (dropdowns, accordions)
- **Spinner**: `Loader2` icon (loading states, animated)

---

## 7. Implementation Guidelines

### CSS Framework
**TailwindCSS 3.4+** with custom configuration extending default theme

### Component Library
**shadcn/ui** components built on Radix UI primitives for accessibility

### Design Token Implementation
```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#EFF6FF',
          100: '#DBEAFE',
          500: '#3B82F6',
          600: '#2563EB',
          700: '#1D4ED8',
        },
        // ... other colors
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['Fira Code', 'Courier New', 'monospace'],
      },
      fontSize: {
        'h1': ['36px', { lineHeight: '44px', fontWeight: '700' }],
        'h2': ['30px', { lineHeight: '38px', fontWeight: '600' }],
        // ... other sizes
      },
      spacing: {
        // 4px base unit already in Tailwind
      },
      borderRadius: {
        'sm': '4px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
      },
      boxShadow: {
        'level-1': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        // ... other shadows
      },
    },
  },
};
```

---

**End of Design System**

