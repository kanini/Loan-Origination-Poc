# Component Inventory - GenAI PDF Extractor

## Component Specification

**Fidelity Level**: High
**Screen Type**: Responsive Web (Desktop ≥1024px, Tablet 768px-1023px, Mobile <768px)
**Viewport**: 1440x1024px (Desktop), 768x1024px (Tablet), 375x844px (Mobile)

## Component Summary

| Component Name | Type | Screens Used | Priority | Implementation Status |
|---------------|------|-------------|----------|---------------------|
| Header | Layout | All screens | High | Pending |
| Button | Interactive | All screens | High | Pending |
| Card | Content | SCR-001, SCR-004, SCR-005 | High | Pending |
| Table | Content | SCR-004, SCR-005 | High | Pending |
| DropZone | Interactive | SCR-002 | High | Pending |
| Toast | Feedback | All screens | High | Pending |
| Modal | Feedback | SCR-005 | High | Pending |
| SearchInput | Interactive | SCR-004, SCR-005 | Medium | Pending |
| FilterDropdown | Interactive | SCR-005 | Medium | Pending |
| Toggle | Interactive | SCR-004, SCR-005 | Medium | Pending |
| Spinner | Feedback | SCR-003, All screens | High | Pending |
| Badge | Content | SCR-001, SCR-005 | Medium | Pending |
| Breadcrumb | Navigation | SCR-002, SCR-003, SCR-004 | Medium | Pending |
| ProgressBar | Feedback | SCR-002 | Medium | Pending |
| PDFViewer | Content | SCR-004 | High | Pending |

## Detailed Component Specifications

### Layout Components

#### Header
- **Type**: Layout
- **Used In Screens**: All screens (SCR-001 through SCR-005)
- **Description**: Fixed top navigation with logo, menu items, and user profile
- **Variants**: Desktop (full menu), Mobile (hamburger menu)
- **Interactive States**: Default, Active (current page highlighted)
- **Responsive Behavior**:
  - Desktop (≥1024px): Full horizontal menu with logo left, nav center, profile right
  - Tablet (768px-1023px): Same as desktop
  - Mobile (<768px): Logo left, hamburger menu right, collapsible drawer
- **Implementation Notes**: Sticky position, z-index 1000, shadow on scroll

### Navigation Components

#### Breadcrumb
- **Type**: Navigation
- **Used In Screens**: SCR-002, SCR-003, SCR-004
- **Description**: Hierarchical navigation trail
- **Variants**: 2-level, 3-level
- **Interactive States**: Default, Hover (on clickable items)
- **Responsive Behavior**:
  - Desktop/Tablet: Full breadcrumb trail
  - Mobile: Truncated with ellipsis, show current page only
- **Implementation Notes**: Separator: "/" or ">" icon

### Content Components

#### Card (Document Card)
- **Type**: Content
- **Used In Screens**: SCR-001 (Recent Extractions), SCR-005 (History Grid View)
- **Description**: Document preview with thumbnail, filename, metadata, status badge
- **Variants**: Default, Hover
- **Interactive States**: Default, Hover (shadow lift), Focus
- **Responsive Behavior**:
  - Desktop: 3-4 columns grid
  - Tablet: 2 columns grid
  - Mobile: Single column
- **Implementation Notes**: Clickable entire card, cursor pointer

#### Card (Stat Card)
- **Type**: Content
- **Used In Screens**: SCR-001 (Quick Statistics)
- **Description**: Statistic display with label and value
- **Variants**: Default
- **Interactive States**: Default
- **Responsive Behavior**: Stacks vertically on mobile
- **Implementation Notes**: Icon optional, large number display

#### Card (Entity Category Card)
- **Type**: Content
- **Used In Screens**: SCR-004 (Results - Card View)
- **Description**: Entity fields grouped by category with label-value pairs
- **Variants**: Default, Editable
- **Interactive States**: Default, Hover (on editable fields), Focus (edit mode)
- **Responsive Behavior**: Full width on all breakpoints, stacks fields vertically
- **Implementation Notes**: Click-to-edit inline editing

#### Table
- **Type**: Content
- **Used In Screens**: SCR-004 (Results - Table View), SCR-005 (History List View)
- **Description**: Sortable data table with sticky headers
- **Variants**: Entity Table, Document List Table
- **Interactive States**: Default, Hover (row highlight), Focus (cell edit)
- **Responsive Behavior**:
  - Desktop/Tablet: Full table with horizontal scroll if needed
  - Mobile: Card view only (no table on mobile)
- **Implementation Notes**: TanStack Table, sticky header, row striping

### Interactive Components

#### Button (Primary)
- **Type**: Interactive
- **Used In Screens**: All screens
- **Description**: High-emphasis action button
- **Variants**: Primary, Secondary, Tertiary, Danger
- **Interactive States**: Default, Hover, Focus, Active, Disabled, Loading
- **Responsive Behavior**: Full width on mobile, auto width on desktop
- **Implementation Notes**: Min height 44px for touch targets

#### DropZone
- **Type**: Interactive
- **Used In Screens**: SCR-002 (Upload)
- **Description**: Drag-and-drop file upload area
- **Variants**: Default, Drag Over, Error
- **Interactive States**: Default, Hover, Drag Over, Error, Disabled
- **Responsive Behavior**: Full width on all breakpoints, min height 200px
- **Implementation Notes**: Accept PDF only, max 10MB

#### SearchInput
- **Type**: Interactive
- **Used In Screens**: SCR-004 (Table quick-search), SCR-005 (Global search)
- **Description**: Text input with search icon
- **Variants**: Default, With Clear Button
- **Interactive States**: Default, Hover, Focus, Disabled
- **Responsive Behavior**: Full width on mobile, fixed width on desktop
- **Implementation Notes**: Debounced search (300ms)

#### FilterDropdown
- **Type**: Interactive
- **Used In Screens**: SCR-005 (History filters)
- **Description**: Dropdown select for filtering
- **Variants**: Date Range, Status, Model
- **Interactive States**: Default, Hover, Focus, Open, Disabled
- **Responsive Behavior**: Full width on mobile, auto width on desktop
- **Implementation Notes**: Multi-select support, clear filters option

#### Toggle
- **Type**: Interactive
- **Used In Screens**: SCR-004 (Card/Table view), SCR-005 (Grid/List view)
- **Description**: Switch between two view modes
- **Variants**: Card/Table, Grid/List
- **Interactive States**: Default, Hover, Focus, Active
- **Responsive Behavior**: Same on all breakpoints
- **Implementation Notes**: Preserve state in session storage

### Feedback Components

#### Toast
- **Type**: Feedback
- **Used In Screens**: All screens
- **Description**: Temporary notification message
- **Variants**: Success, Error, Warning, Info
- **Interactive States**: Enter (slide-in), Exit (slide-out)
- **Responsive Behavior**: Top-right on desktop, top-center on mobile
- **Implementation Notes**: Auto-dismiss 5s, manual close button

#### Modal (Delete Confirmation)
- **Type**: Feedback
- **Used In Screens**: SCR-005 (History), SCR-004 (Results)
- **Description**: Confirmation dialog for destructive actions
- **Variants**: Delete Confirmation
- **Interactive States**: Open, Close
- **Responsive Behavior**: Centered overlay on desktop, full-screen on mobile
- **Implementation Notes**: Focus trap, ESC to close, backdrop click to close

#### Spinner
- **Type**: Feedback
- **Used In Screens**: SCR-003 (Processing), All screens (loading states)
- **Description**: Loading indicator
- **Variants**: Large (page-level), Small (inline)
- **Interactive States**: Animating
- **Responsive Behavior**: Same on all breakpoints
- **Implementation Notes**: Primary blue color, smooth rotation

#### ProgressBar
- **Type**: Feedback
- **Used In Screens**: SCR-002 (Upload progress)
- **Description**: Linear progress indicator
- **Variants**: Determinate (0-100%)
- **Interactive States**: Progress updating
- **Responsive Behavior**: Full width on all breakpoints
- **Implementation Notes**: Smooth transitions, percentage label

#### Badge
- **Type**: Content
- **Used In Screens**: SCR-001 (Status), SCR-005 (Status)
- **Description**: Status indicator label
- **Variants**: Success, Failed, Processing
- **Interactive States**: Default
- **Responsive Behavior**: Same on all breakpoints
- **Implementation Notes**: Color-coded (green/red/amber), uppercase text

### Specialized Components

#### PDFViewer
- **Type**: Content
- **Used In Screens**: SCR-004 (Results)
- **Description**: Embedded PDF viewer with controls
- **Variants**: Default
- **Interactive States**: Default, Loading, Error
- **Responsive Behavior**:
  - Desktop: Side panel (40% width)
  - Tablet: Separate tab
  - Mobile: Collapsible accordion
- **Implementation Notes**: react-pdf library, zoom controls, page navigation

## Component Relationships

```
Header
+-- Logo (Link to Dashboard)
+-- Navigation Menu
|   +-- Dashboard Link
|   +-- Upload Link
|   +-- History Link
+-- User Profile Icon

Card (Document Card)
+-- Thumbnail Image
+-- Filename (H4)
+-- Metadata (Date, Model)
+-- Status Badge

Table (Entity Table)
+-- Table Header (Sticky)
|   +-- Column Headers (Sortable)
+-- Table Body
    +-- Rows (Striped)
        +-- Cells (Editable)

DropZone
+-- Upload Icon
+-- Primary Text
+-- Secondary Text (File size limit)
```

## Component States Matrix

| Component | Default | Hover | Active | Focus | Disabled | Error | Loading | Empty |
|-----------|---------|-------|--------|-------|----------|-------|---------|-------|
| Button | x | x | x | x | x | - | x | - |
| SearchInput | x | x | - | x | x | x | - | x |
| DropZone | x | x | - | - | x | x | - | - |
| Card | x | x | - | x | - | - | x | x |
| Table | x | x | - | x | - | - | x | x |
| Modal | x | - | - | x | - | - | - | - |
| Toast | x | - | - | - | - | - | - | - |
| Toggle | x | x | x | x | x | - | - | - |

## Reusability Analysis

| Component | Reuse Count | Screens | Recommendation |
|-----------|-------------|---------|----------------|
| Header | 5 screens | All | Create as shared layout component |
| Button | 5 screens | All | Create as shared component with variants |
| Card | 3 screens | SCR-001, SCR-004, SCR-005 | Create as shared component with 3 variants |
| Table | 2 screens | SCR-004, SCR-005 | Create as shared component with configuration |
| Toast | 5 screens | All | Create as global notification service |
| SearchInput | 2 screens | SCR-004, SCR-005 | Create as shared component |
| Badge | 2 screens | SCR-001, SCR-005 | Create as shared component |

## Responsive Breakpoints Summary

| Breakpoint | Width | Components Affected | Key Adaptations |
|-----------|-------|-------------------|-----------------|
| Mobile | <768px | Header, Card, Table, Modal, PDFViewer | Hamburger menu, single-column cards, no tables (card view only), full-screen modals |
| Tablet | 768px-1023px | Card, PDFViewer | 2-column cards, tabbed PDF viewer |
| Desktop | ≥1024px | Card, PDFViewer | 3-4 column cards, side-by-side PDF viewer |

## Implementation Priority Matrix

### High Priority (Core Components)
- [ ] Header - Used in all screens, critical for navigation
- [ ] Button - Primary user interaction across all screens
- [ ] Card - Core content display for dashboard and history
- [ ] Table - Essential for results and history views
- [ ] DropZone - Critical for upload workflow
- [ ] Toast - Global feedback mechanism
- [ ] Spinner - Loading states across application

### Medium Priority (Feature Components)
- [ ] SearchInput - Important for filtering and search
- [ ] FilterDropdown - Important for history filtering
- [ ] Toggle - View switching functionality
- [ ] Badge - Status indicators
- [ ] Breadcrumb - Secondary navigation
- [ ] ProgressBar - Upload feedback
- [ ] PDFViewer - Results display

### Low Priority (Enhancement Components)
- [ ] Modal - Confirmation dialogs (can use browser confirm initially)

## Framework-Specific Notes
**Detected Framework**: React 18+ with TypeScript
**Component Library**: shadcn/ui (Radix UI primitives)
**Styling**: TailwindCSS

### Framework Patterns Applied
- Compound Components: Card with Card.Header, Card.Body, Card.Footer
- Render Props: Table with custom cell renderers
- Controlled Components: SearchInput, FilterDropdown, Toggle
- Portal Components: Modal, Toast (rendered outside DOM hierarchy)

### Component Library Mappings
| Wireframe Component | shadcn/ui Component | Customization Required |
|-------------------|-------------------|----------------------|
| Button | @/components/ui/button | Variant styles, loading state |
| Card | @/components/ui/card | Document card variant, stat card variant |
| Table | @/components/ui/table + TanStack Table | Sortable headers, inline editing |
| SearchInput | @/components/ui/input | Search icon, clear button |
| FilterDropdown | @/components/ui/select | Multi-select support |
| Toggle | @/components/ui/switch | Custom labels |
| Toast | @/components/ui/toast | Auto-dismiss timer |
| Modal | @/components/ui/dialog | Confirmation variant |

## Accessibility Considerations

| Component | ARIA Attributes | Keyboard Navigation | Screen Reader Notes |
|-----------|----------------|-------------------|-------------------|
| Header | role="banner", aria-label="Main navigation" | Tab through links, Enter to activate | Announce current page |
| Button | aria-label (icon-only), aria-disabled | Tab to focus, Enter/Space to activate | Announce loading state |
| Card | role="article" (document cards) | Tab to focus, Enter to open | Announce status badge |
| Table | role="table", scope on headers | Arrow keys for cell navigation | Announce sort direction |
| DropZone | aria-label="File upload area" | Tab to focus, Enter to open file dialog | Announce drag state |
| SearchInput | aria-label="Search documents" | Tab to focus, Esc to clear | Announce result count |
| Modal | role="dialog", aria-labelledby, aria-describedby | Tab trap, Esc to close | Announce on open |
| Toast | role="status", aria-live="polite" | Focus on action button if present | Auto-announce message |

## Design System Integration

**Design System Reference**: `.propel/context/docs/designsystem.md`

### Components Matching Design System
- [x] Button - Matches design tokens (colors, spacing, typography)
- [x] Card - Uses shadow-level_1, radius-md, spacing tokens
- [x] Table - Uses neutral colors, typography scale
- [x] Badge - Uses semantic colors (success/error/warning)
- [x] Toast - Uses semantic colors, shadow-level_3
- [x] Modal - Uses shadow-level_3, radius-lg

### New Components to Add to Design System
- [ ] DropZone - New pattern, requires dashed border token
- [ ] PDFViewer - New pattern, requires viewer controls specification
- [ ] StepIndicator - New pattern for upload workflow

---

**Document Version**: 1.0  
**Last Updated**: March 9, 2026  
**Status**: Complete
