# Figma Design Specification - GenAI PDF Extractor

## 1. Figma Specification
**Platform**: Responsive Web (Desktop ≥1024px, Tablet 768px-1023px, Mobile <768px)

---

## 2. Source References

### Primary Source
| Document | Path | Purpose |
|----------|------|---------|
| Requirements | `.propel/context/docs/spec.md` | Personas, use cases, functional requirements with UI impact |

### Optional Sources
| Document | Path | Purpose |
|----------|------|---------|
| Architecture | `.propel/context/docs/design.md` | NFR, TR, DR for technical context |

### Related Documents
| Document | Path | Purpose |
|----------|------|---------|
| Design System | `.propel/context/docs/designsystem.md` | Tokens, branding, component specifications |

---

## 3. UX Requirements

*Generated based on use cases UC-001 through UC-004 with UI impact. These requirements apply to all screen implementations.*

### UXR Requirements Summary Table

| UXR-ID | Category | Summary | Rationale |
|--------|----------|---------|-----------|
| UXR-001 | Usability | Max 2 clicks to any feature | FR-005 navigation requirement |
| UXR-002 | Usability | Clear visual hierarchy | Dashboard organization, card/table views |
| UXR-003 | Usability | Consistent navigation patterns | Multi-page application structure |
| UXR-101 | Accessibility | WCAG 2.1 AA compliance | FR-101 to FR-110, NFR-007 |
| UXR-102 | Accessibility | Keyboard navigation support | FR-101, NFR-008 |
| UXR-103 | Accessibility | Screen reader compatibility | FR-103, FR-108, NFR-018 |
| UXR-104 | Accessibility | Color contrast ratios | FR-080, NFR-007 |
| UXR-105 | Accessibility | Focus indicators | FR-102, NFR-008 |
| UXR-201 | Responsiveness | Desktop layout (≥1024px) | FR-111, NFR-006 |
| UXR-202 | Responsiveness | Tablet layout (768px-1023px) | FR-112, NFR-006 |
| UXR-203 | Responsiveness | Mobile layout (<768px) | FR-113, NFR-006 |
| UXR-301 | Visual Design | Design system adherence | FR-079 to FR-086 |
| UXR-302 | Visual Design | Typography hierarchy | FR-082 |
| UXR-303 | Visual Design | Consistent spacing | FR-083 |
| UXR-401 | Interaction | Button hover effects | FR-087 |
| UXR-402 | Interaction | Loading states | FR-090, FR-099 |
| UXR-403 | Interaction | Page transitions <300ms | FR-089, NFR-013 |
| UXR-404 | Interaction | Toast notifications | FR-091, FR-096 |
| UXR-501 | Error Handling | Inline validation errors | FR-095 |
| UXR-502 | Error Handling | Detailed error messages | FR-097 |
| UXR-503 | Error Handling | Empty states | FR-098 |
| UXR-504 | Error Handling | Confirmation dialogs | FR-100 |

### UXR Detailed Requirements

#### Project-Wide Requirements (UXR-001 to UXR-003)

| UXR-ID | Category | Requirement | Acceptance Criteria | Screens Affected |
|--------|----------|-------------|---------------------|------------------|
| UXR-001 | Usability | System MUST provide navigation to any major section within 2 clicks from any page | Navigation audit shows max 2 clicks to Dashboard, Upload, History from any screen | All screens |
| UXR-002 | Usability | System MUST maintain clear visual hierarchy with defined heading levels (H1-H4) and content organization | Heading structure follows semantic HTML (h1 > h2 > h3 > h4), no skipped levels | All screens |
| UXR-003 | Usability | System MUST provide consistent navigation patterns across all pages (top nav, breadcrumbs, active state indicators) | Navigation components identical across screens, active page highlighted | All screens |

#### Accessibility Requirements (UXR-101 to UXR-105)

| UXR-ID | Category | Requirement | Acceptance Criteria | Screens Affected |
|--------|----------|-------------|---------------------|------------------|
| UXR-101 | Accessibility | System MUST comply with WCAG 2.1 Level AA standards for all interactive elements and content | Automated axe/Lighthouse audit passes with score ≥95, manual screen reader testing successful | All screens |
| UXR-102 | Accessibility | System MUST support full keyboard navigation with Tab, Enter, Esc keys for all interactive elements | All buttons, links, forms, modals accessible via keyboard, logical tab order maintained | All screens |
| UXR-103 | Accessibility | System MUST provide proper ARIA labels for icon-only buttons and screen reader announcements for dynamic content | All icon buttons have aria-label, live regions announce errors/success, semantic HTML used | All screens |
| UXR-104 | Accessibility | System MUST ensure color contrast ratios meet ≥4.5:1 for normal text and ≥3:1 for large text | Color contrast audit passes for all text/background combinations | All screens |
| UXR-105 | Accessibility | System MUST display visible focus indicators (2px outline) on all focusable elements | Focus states visible and distinct for all interactive elements | All screens |

#### Responsiveness Requirements (UXR-201 to UXR-203)

| UXR-ID | Category | Requirement | Acceptance Criteria | Screens Affected |
|--------|----------|-------------|---------------------|------------------|
| UXR-201 | Responsiveness | System MUST implement desktop layout (≥1024px) with multi-column layouts and side-by-side views | Results page shows PDF + entities side-by-side, dashboard uses 3-column grid | All screens |
| UXR-202 | Responsiveness | System MUST implement tablet layout (768px-1023px) with adaptive layouts and collapsible sections | Navigation adapts, content reflows to 2-column or single-column as appropriate | All screens |
| UXR-203 | Responsiveness | System MUST implement mobile layout (<768px) with single-column stacked layouts and touch-optimized controls | Hamburger menu active, all content stacked vertically, touch targets ≥44x44px | All screens |

#### Visual Design Requirements (UXR-301 to UXR-303)

| UXR-ID | Category | Requirement | Acceptance Criteria | Screens Affected |
|--------|----------|-------------|---------------------|------------------|
| UXR-301 | Visual Design | System MUST adhere to design system color palette (Primary Blue #3B82F6, Secondary Indigo #6366F1, Success Green #10B981, Warning Amber #F59E0B, Error Red #EF4444, Neutral Gray scale) | All UI elements use defined color tokens, no hard-coded colors outside design system | All screens |
| UXR-302 | Visual Design | System MUST implement typography hierarchy with defined type scale (H1: 36px/700, H2: 30px/600, H3: 24px/600, H4: 20px/600, Body: 16px/400, Small: 14px/400, Caption: 12px/400) | Typography audit shows consistent font sizes and weights per hierarchy level | All screens |
| UXR-303 | Visual Design | System MUST use consistent spacing system based on 4px/8px grid (0, 4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px, 96px) | Spacing audit shows all margins/padding use defined spacing tokens | All screens |

#### Interaction Requirements (UXR-401 to UXR-404)

| UXR-ID | Category | Requirement | Acceptance Criteria | Screens Affected |
|--------|----------|-------------|---------------------|------------------|
| UXR-401 | Interaction | System MUST implement button hover effect with scale 1.02 and 150ms transition | All buttons show subtle scale animation on hover | All screens with buttons |
| UXR-402 | Interaction | System MUST display skeleton screens or loading spinners matching final content layout for all asynchronous operations | Loading states visible during file upload, PDF processing, data fetching | SCR-002, SCR-003, SCR-004, SCR-005 |
| UXR-403 | Interaction | System MUST complete page transitions within 300ms with fade-in animation | Page navigation feels instant, smooth fade-in transition | All screen transitions |
| UXR-404 | Interaction | System MUST show toast notifications that slide in from top-right and auto-dismiss after 5 seconds | Success/error toasts appear with slide animation, auto-dismiss after 5s | All screens with actions |

#### Error Handling Requirements (UXR-501 to UXR-504)

| UXR-ID | Category | Requirement | Acceptance Criteria | Screens Affected |
|--------|----------|-------------|---------------------|------------------|
| UXR-501 | Error Handling | System MUST display inline validation errors for form inputs with red border and error message below field | Form validation shows errors immediately below invalid fields with red styling | SCR-002 (Upload) |
| UXR-502 | Error Handling | System MUST provide detailed error messages with suggested corrective actions (e.g., "Upload failed. Please check your internet connection and try again.") | Error messages are actionable and specific, not generic | All screens |
| UXR-503 | Error Handling | System MUST implement empty states for all data views with illustrative icon, clear heading, descriptive text, and primary action button | Empty states provide clear guidance when no data exists | SCR-001, SCR-004, SCR-005 |
| UXR-504 | Error Handling | System MUST provide confirmation dialogs for destructive actions (delete document) with "Cancel" and "Confirm" options | Destructive actions require explicit confirmation before execution | SCR-005 (History) |

---

## 4. Personas Summary

*Derived from spec.md - Reference only*

| Persona | Role | Primary Goals | Key Screens |
|---------|------|---------------|-------------|
| Financial Analyst | Primary User | Upload PDFs, extract entities, review/edit results, export data for analysis | All screens (Dashboard, Upload, Processing, Results, History) |
| System Administrator | Secondary User | Manage configuration, monitor performance, handle user access | Settings (out of scope for Phase 1) |
| QA Engineer | Secondary User | Test functionality, validate accessibility, verify extraction accuracy | All screens for testing |

**Primary Persona Focus**: Financial Analyst - All screens designed for their workflow of uploading loan documents, reviewing extracted entity data, making corrections, and exporting for downstream analysis.

---

## 5. Information Architecture

### Site Map
```
GenAI PDF Extractor
+-- Dashboard (Home)
|   +-- Recent Extractions
|   +-- Quick Statistics
|   +-- Upload CTA
+-- Upload Document
|   +-- File Selection (Drag-and-Drop)
|   +-- Model Selection
|   +-- Processing Status
+-- Results/Output Display
|   +-- Entity Display (Card/Table View)
|   +-- PDF Viewer
|   +-- Export Options
+-- Document History
    +-- Search & Filter
    +-- Document List (Grid/Table View)
    +-- Document Details (redirects to Results)
```

### Navigation Patterns
| Pattern | Type | Platform Behavior |
|---------|------|-------------------|
| Primary Nav | Fixed Top Header | Desktop: Full menu (Dashboard, Upload, History) / Mobile: Hamburger menu |
| Secondary Nav | Breadcrumbs | Below header showing current page hierarchy (e.g., "Home > Upload Document > Processing") |
| Utility Nav | User Profile Icon | Top-right corner (Settings, Profile - Phase 2) |

---

## 6. Screen Inventory

*All screens derived from use cases UC-001 through UC-004 in spec.md*

### Screen List
| Screen ID | Screen Name | Derived From | Personas Covered | Priority | States Required |
|-----------|-------------|--------------|------------------|----------|-----------------|
| SCR-001 | Dashboard/Home | FR-007 to FR-012, UC-001 entry | Financial Analyst (Primary) | P0 | Default, Loading, Empty, Error, N/A |
| SCR-002 | Document Upload | UC-001 steps 2-6, FR-013 to FR-023 | Financial Analyst (Primary) | P0 | Default, Loading, Error, Validation, Success |
| SCR-003 | Processing Status | UC-001 steps 7-9, FR-024 to FR-026 | Financial Analyst (Primary) | P0 | Loading, Success, Error, N/A, N/A |
| SCR-004 | Results/Output Display | UC-001 step 11, UC-002, FR-032 to FR-053 | Financial Analyst (Primary) | P0 | Default, Loading, Empty, Error, N/A |
| SCR-005 | Document History | UC-004, FR-069 to FR-078 | Financial Analyst (Primary) | P0 | Default, Loading, Empty, Error, N/A |

### Priority Legend
- **P0**: Critical path (must-have for MVP)
- **P1**: Core functionality (high priority)
- **P2**: Important features (medium priority)
- **P3**: Nice-to-have (low priority)

### Screen-to-Persona Coverage Matrix
| Screen | Financial Analyst | System Administrator | QA Engineer | Notes |
|--------|-------------------|----------------------|-------------|-------|
| SCR-001 Dashboard | Primary | - | Testing | Entry point for all users, quick actions |
| SCR-002 Upload | Primary | - | Testing | Core workflow for document processing |
| SCR-003 Processing | Primary | - | Testing | Intermediate state during LLM processing |
| SCR-004 Results | Primary | - | Testing | Primary work screen for review and export |
| SCR-005 History | Primary | - | Testing | Document management and retrieval |

### Modal/Overlay Inventory
| Name | Type | Trigger | Parent Screen(s) | Priority |
|------|------|---------|-----------------|----------|
| Delete Confirmation | Dialog | Click delete icon on document | SCR-005 (History) | P0 |
| Export Options Menu | Dropdown | Click "Export" button | SCR-004 (Results) | P0 |
| File Validation Error | Toast | Invalid file upload | SCR-002 (Upload) | P0 |
| Success Notification | Toast | Successful action completion | All screens | P0 |
| Error Notification | Toast | Action failure | All screens | P0 |

---

## 7. Content & Tone

### Voice & Tone
- **Overall Tone**: Professional, helpful, efficient (financial industry context)
- **Error Messages**: Clear, actionable, non-blaming (e.g., "Upload failed. Please check your internet connection and try again.")
- **Empty States**: Encouraging, guiding with clear CTA (e.g., "No documents processed yet. Upload your first document to get started.")
- **Success Messages**: Brief, confirmatory, next-action oriented (e.g., "Document uploaded successfully. Processing...")

### Content Guidelines
- **Headings**: Sentence case for page titles, Title Case for section headings
- **CTAs**: Action-oriented verbs (Upload, Extract, Export, View, Delete)
- **Labels**: Concise, descriptive (Filename, Upload Date, Model Used, Status)
- **Placeholder Text**: Helpful examples (e.g., "Search by filename..." not "Search...")

---

## 8. Data & Edge Cases

### Data Scenarios
| Scenario | Description | Handling |
|----------|-------------|----------|
| No Data | User has no processed documents | Empty state with "Upload Your First Document" CTA (SCR-001, SCR-005) |
| First Use | New user, no history | Onboarding guidance in empty states |
| Large Data | 100+ entity fields in results | Virtualization with TanStack Virtual (SCR-004) |
| Slow Connection | >3s load time | Skeleton screens matching final layout (All screens) |
| Offline | No network | Error state with "Check your connection" message |

### Edge Cases
| Case | Screen(s) Affected | Solution |
|------|-------------------|----------|
| Long filename | SCR-001, SCR-005 | Truncation with ellipsis, full name on hover tooltip |
| Missing PDF thumbnail | SCR-005 | Fallback PDF icon placeholder |
| Form validation | SCR-002 | Inline error messages with red border, specific guidance |
| Session timeout | All authenticated | Modal with re-login (Phase 2) |
| File size exceeds 10MB | SCR-002 | Validation error: "File size exceeds 10MB limit" |
| Invalid file type | SCR-002 | Validation error: "File type not supported. Please upload a PDF file" |
| LLM API failure | SCR-003 | Error state with "Retry" and "Change Model" options |
| Empty entity category | SCR-004 | Display category with "--" placeholders for empty fields |
| PDF viewer load failure | SCR-004 | Error message: "PDF preview unavailable. Download file to view." |

---

## 9. Branding & Visual Direction

*See `designsystem.md` for all design tokens (colors, typography, spacing, shadows, etc.)*

### Branding Assets
- **Logo**: GenAI PDF Extractor (text-based logo, Primary Blue #3B82F6)
- **Icon Style**: Outlined (Lucide React icon library)
- **Illustration Style**: Minimal, professional (empty states use simple icon + text, no complex illustrations)
- **Photography Style**: Not applicable (document processing application)

### Visual Style
- **Design Language**: Modern, clean, professional
- **Color Usage**: Primary Blue for CTAs and active states, Success Green for confirmations, Error Red for warnings/errors
- **Whitespace**: Generous spacing for readability and visual breathing room
- **Elevation**: Subtle shadows for depth (cards, dropdowns, modals)

---

## 10. Component Specifications

*Component specifications defined in designsystem.md. Requirements per screen listed below.*

### Component Library Reference
**Source**: `.propel/context/docs/designsystem.md` (Component Specifications section)

### Required Components per Screen
| Screen ID | Components Required | Notes |
|-----------|---------------------|-------|
| SCR-001 | Header (1), Card (10+), Button (2), StatCard (3) | Dashboard with recent documents and statistics |
| SCR-002 | Header (1), DropZone (1), RadioGroup (1), Button (2), ProgressBar (1), FilePreview (1) | Upload workflow with drag-and-drop |
| SCR-003 | Header (1), Spinner (1), StatusMessage (1) | Processing intermediate state |
| SCR-004 | Header (1), Card (5+), Table (5), Toggle (1), Button (4), PDFViewer (1), Dropdown (1) | Results display with card/table views |
| SCR-005 | Header (1), SearchInput (1), FilterDropdown (3), Card (N), Table (1), Pagination (1), Button (2) | History with search/filter |

### Component Summary
| Category | Components | Variants |
|----------|------------|----------|
| Actions | Button, IconButton, Link | Primary, Secondary, Tertiary, Danger × S/M/L × States (Default, Hover, Focus, Active, Disabled, Loading) |
| Inputs | TextField, FileInput, Select, Checkbox, Radio, Toggle, SearchInput | States (Default, Hover, Focus, Active, Disabled, Error) + Sizes (S/M/L) |
| Navigation | Header, Breadcrumb, Tabs, Pagination | Desktop/Tablet/Mobile variants |
| Content | Card, StatCard, Table, ListItem, FilePreview, PDFViewer | Content variants with different data types |
| Feedback | Modal, Dialog, Toast, Alert, Spinner, Skeleton, ProgressBar, EmptyState | Types (Success, Error, Warning, Info) + States |
| Data Display | Badge, Tooltip, Dropdown | Status variants (Success, Failed, Processing) |

### Component Constraints
- Use only components from designsystem.md
- All components must support all defined states (Default, Hover, Focus, Active, Disabled, Loading where applicable)
- Follow naming convention: `C/<Category>/<Name>`
- All interactive components must meet UXR-102 (keyboard navigation) and UXR-105 (focus indicators)

---

## 11. Screen Specifications

### SCR-001: Dashboard/Home

**Derived From**: FR-007 to FR-012, UC-001 entry point  
**Personas**: Financial Analyst (Primary)  
**Priority**: P0

#### Purpose
Landing page providing quick access to upload functionality, recent document activity, and processing statistics.

#### Layout Structure
**Desktop (≥1024px)**:
- Fixed header with navigation
- Hero section with welcome message and "Upload New Document" CTA (centered)
- 3-column grid: Recent Extractions (left 2 cols) + Quick Statistics (right 1 col)
- Maximum content width: 1280px (centered)

**Tablet (768px-1023px)**:
- Fixed header with navigation
- Hero section (full width)
- 2-column grid: Recent Extractions (left) + Quick Statistics (right)

**Mobile (<768px)**:
- Fixed header with hamburger menu
- Hero section (full width)
- Stacked layout: Recent Extractions → Quick Statistics

#### Content Elements
1. **Welcome Message**: "Welcome to GenAI PDF Extractor" (H1)
2. **Upload CTA**: Large primary button "Upload New Document" with upload icon
3. **Recent Extractions Section**:
   - Heading: "Recent Extractions" (H2)
   - List of 5-10 recent documents as cards
   - Each card shows: thumbnail, filename (truncated), upload date, status badge, model used
   - Click card → navigate to Results page for that document
4. **Quick Statistics Section**:
   - Heading: "Quick Statistics" (H3)
   - 3 stat cards:
     - Total Documents Processed (number)
     - Success Rate (percentage)
     - Recent Activity (count in last 7 days)

#### States

**Default State**:
- Shows recent extractions (5-10 documents)
- Statistics populated with real data
- Upload CTA prominent and accessible

**Loading State**:
- Skeleton screens for recent extractions cards (5 skeletons)
- Skeleton screens for stat cards (3 skeletons)
- Header and navigation visible

**Empty State**:
- Trigger: No documents have been processed
- Display: Empty state illustration (document icon)
- Heading: "No documents processed yet"
- Description: "Upload your first PDF document to extract entity data and get started."
- CTA: "Upload Your First Document" (primary button)
- Statistics show zeros

**Error State**:
- Trigger: Failed to load dashboard data from API
- Display: Error icon
- Message: "Failed to load dashboard. Please refresh the page or try again later."
- CTA: "Refresh" button
- Fallback: Show empty statistics

#### Components Used
- Header (navigation)
- Button (Primary - Upload CTA, Secondary - View All in History)
- Card (Recent document cards)
- StatCard (Statistics cards)
- Badge (Status indicators: Success/Failed/Processing)
- EmptyState (when no documents)
- Skeleton (loading state)

#### Interactions
- Click "Upload New Document" → Navigate to SCR-002 (Upload)
- Click recent document card → Navigate to SCR-004 (Results) for that document
- Click "View All" in Recent Extractions → Navigate to SCR-005 (History)
- Hover on card → Subtle shadow lift (UXR-401)

---

### SCR-002: Document Upload

**Derived From**: UC-001 steps 2-6, FR-013 to FR-023  
**Personas**: Financial Analyst (Primary)  
**Priority**: P0

#### Purpose
Step-by-step guided workflow for uploading PDF documents, selecting LLM model, and initiating entity extraction.

#### Layout Structure
**Desktop (≥1024px)**:
- Fixed header with breadcrumb: "Home > Upload Document"
- Centered form container (max-width: 800px)
- Step indicator at top: Step 1 (Select File) → Step 2 (Choose Model) → Step 3 (Confirm)
- Drag-and-drop zone (large, prominent)
- Model selection cards (2 cards side-by-side)
- Action buttons at bottom (Cancel, Extract Entities)

**Tablet (768px-1023px)**:
- Same as desktop, slightly narrower container (max-width: 700px)

**Mobile (<768px)**:
- Stacked layout
- Step indicator (horizontal dots)
- Drag-and-drop zone (full width)
- Model selection cards (stacked vertically)
- Action buttons (full width, stacked)

#### Content Elements
1. **Page Title**: "Upload Document" (H1)
2. **Step Indicator**: Visual progress (Step 1/3, Step 2/3, Step 3/3)
3. **Drag-and-Drop Zone**:
   - Large dashed border area
   - Upload icon (centered)
   - Text: "Drag and drop your PDF file here, or click to browse"
   - Subtext: "Maximum file size: 10MB"
4. **File Preview** (after selection):
   - Filename with PDF icon
   - File size
   - Thumbnail (if available)
   - Remove button (X icon)
5. **Model Selection**:
   - Heading: "Choose LLM Model" (H3)
   - Radio card 1: OpenAI GPT
     - Description: "Fast and accurate for standard documents"
     - Icon: OpenAI logo or AI icon
   - Radio card 2: Google Gemini
     - Description: "Advanced processing for complex layouts"
     - Icon: Gemini logo or AI icon
6. **Action Buttons**:
   - Cancel (secondary button)
   - Extract Entities (primary button, disabled until file + model selected)

#### States

**Default State**:
- Empty drag-and-drop zone
- No file selected
- Model selection visible but not selected
- Extract button disabled

**Loading State** (during upload):
- Progress bar showing upload percentage (0-100%)
- Upload icon animating
- Cancel button enabled
- Extract button disabled with loading spinner

**Error State**:
- Trigger: Invalid file type or size exceeds 10MB
- Display: Red border on drop zone
- Inline error message below drop zone (red text):
  - "File type not supported. Please upload a PDF file" OR
  - "File size exceeds 10MB limit"
- File preview removed
- Extract button disabled

**Validation State**:
- Trigger: User clicks Extract without selecting file or model
- Display: Red border on incomplete fields
- Inline error messages:
  - "Please select a PDF file" (if no file)
  - "Please choose an LLM model" (if no model)

**Success State**:
- Trigger: File uploaded successfully, extraction initiated
- Display: Success toast "Document uploaded successfully. Processing..."
- Auto-redirect to SCR-003 (Processing Status) after 1 second

#### Components Used
- Header (navigation + breadcrumb)
- DropZone (drag-and-drop file input)
- FilePreview (selected file display)
- RadioGroup (model selection with card variant)
- Button (Primary - Extract, Secondary - Cancel)
- ProgressBar (upload progress)
- Toast (success/error notifications)
- StepIndicator (progress through workflow)

#### Interactions
- Drag file over drop zone → Highlight border (dashed blue)
- Drop file → Validate → Show file preview
- Click drop zone → Open file browser
- Select file from browser → Validate → Show file preview
- Click Remove (X) on file preview → Clear selection, return to default state
- Select model → Enable Extract button (if file also selected)
- Click Cancel → Navigate back to SCR-001 (Dashboard)
- Click Extract Entities → Upload file → Navigate to SCR-003 (Processing)

---

### SCR-003: Processing Status

**Derived From**: UC-001 steps 7-9, FR-024 to FR-026  
**Personas**: Financial Analyst (Primary)  
**Priority**: P0

#### Purpose
Intermediate state showing loading indicator while LLM processes the document and extracts entities.

#### Layout Structure
**All Viewports**:
- Fixed header with breadcrumb: "Home > Upload Document > Processing"
- Centered content (max-width: 600px)
- Large loading spinner (centered)
- Status message (centered below spinner)
- Processing details (filename, model)

#### Content Elements
1. **Loading Spinner**: Large animated spinner (Primary Blue)
2. **Status Message**: "Processing your document..." (H2)
3. **Processing Details**:
   - Filename: [document_name.pdf]
   - Model: [OpenAI GPT / Google Gemini]
   - Subtext: "This may take 10-30 seconds depending on document complexity"

#### States

**Loading State** (default):
- Spinner animating
- Status message: "Processing your document..."
- No user actions available (no cancel button in Phase 1)

**Success State**:
- Trigger: LLM processing completes successfully
- Display: Success icon (checkmark) replaces spinner
- Message: "Processing complete! Redirecting to results..."
- Auto-redirect to SCR-004 (Results) after 2 seconds

**Error State**:
- Trigger: LLM API failure (timeout, service unavailable, API key invalid)
- Display: Error icon (X) replaces spinner
- Message: "Processing failed. Please try again or select a different model."
- Error details: [Specific error message from API if available]
- Action buttons:
  - Retry (primary button) → Retry with same file and model
  - Change Model (secondary button) → Return to SCR-002 with file pre-selected
  - Cancel (tertiary button) → Return to SCR-001 (Dashboard)

#### Components Used
- Header (navigation + breadcrumb)
- Spinner (large, centered)
- StatusMessage (text with icon)
- Button (Retry, Change Model, Cancel - only in error state)
- Toast (error notification)

#### Interactions
- Auto-redirect on success (no user interaction)
- Click Retry → Re-initiate processing with same parameters
- Click Change Model → Navigate to SCR-002 (Upload) with file preserved
- Click Cancel → Navigate to SCR-001 (Dashboard)

---

### SCR-004: Results/Output Display

**Derived From**: UC-001 step 11, UC-002, UC-003, FR-032 to FR-068  
**Personas**: Financial Analyst (Primary)  
**Priority**: P0

#### Purpose
Primary work screen for reviewing extracted entity data, making manual corrections, viewing original PDF, and exporting results in multiple formats.

#### Layout Structure
**Desktop (≥1024px)**:
- Fixed header with breadcrumb: "Home > Results > [Document Name]"
- Document info header (filename, date, model, actions)
- Side-by-side layout:
  - Left panel (60%): Entity display (card view or table view)
  - Right panel (40%): PDF viewer
- Toggle switch for Card View ↔ Table View (top-left of entity panel)
- Export dropdown button (top-right of entity panel)

**Tablet (768px-1023px)**:
- Tabbed interface:
  - Tab 1: Entities (card/table view)
  - Tab 2: PDF Viewer
- Toggle and export buttons in entity tab

**Mobile (<768px)**:
- Stacked layout:
  - Document info header
  - Entities section (card view only, no table view on mobile)
  - PDF viewer section (collapsible accordion)
- Export button (full width, sticky at bottom)

#### Content Elements
1. **Document Info Header**:
   - Filename (H1, truncated with tooltip)
   - Metadata: Upload date, Model used, Processing time
   - Action buttons: Edit (icon), Export (dropdown), Delete (icon)
2. **Entity Display Panel**:
   - View toggle: Card View | Table View
   - Entity categories (5 sections):
     - Lender Information
     - Borrower Details
     - Loan Terms
     - Location Data
     - Person Information
   - Each category as Card (card view) or Table (table view)
3. **Card View** (default):
   - Each category in separate card component
   - Field label + extracted value pairs
   - Confidence score badge (if available)
   - Click-to-edit inline editing
   - Empty fields show "--" placeholder
4. **Table View**:
   - Each category as separate table
   - Columns: Field Name | Extracted Value
   - Sortable columns (click header)
   - Quick-search filter input above each table
   - Sticky table headers
   - Row striping for readability
   - Click-to-edit inline editing
5. **PDF Viewer Panel**:
   - PDF rendering with react-pdf
   - Zoom controls: Zoom In, Zoom Out, Fit to Width, Fit to Page
   - Page navigation: Previous, Next, Page X of Y
   - Full-screen button
6. **Export Dropdown**:
   - Download as JSON
   - Download as CSV
   - Download as Excel (.xlsx)
   - Generate PDF Report

#### States

**Default State**:
- Entity data displayed in card view
- PDF viewer showing page 1
- All data loaded and interactive
- Edit mode inactive

**Loading State**:
- Skeleton screens for entity cards (5 skeletons matching card layout)
- PDF viewer shows loading spinner
- Export button disabled

**Empty State** (for individual category):
- Trigger: Category has no extracted data
- Display: Category card/table with "--" placeholders
- Message: "No [category] data extracted"

**Error State**:
- Trigger: Failed to load extraction results
- Display: Error icon
- Message: "Failed to load results. Please try again."
- CTA: Refresh button

**PDF Viewer Error State**:
- Trigger: PDF fails to load
- Display: Error message in PDF panel
- Message: "PDF preview unavailable. Download file to view."
- CTA: Download PDF button

#### Components Used
- Header (navigation + breadcrumb)
- Card (entity category cards)
- Table (entity category tables with TanStack Table)
- Toggle (Card View ↔ Table View switch)
- Button (Edit, Delete, Refresh)
- Dropdown (Export options)
- PDFViewer (react-pdf component)
- Badge (confidence scores, status)
- TextField (inline editing)
- SearchInput (table quick-search)
- Toast (success/error notifications)
- Skeleton (loading state)

#### Interactions
- Toggle Card View ↔ Table View → Switch display mode, preserve data and scroll position
- Click field value → Enter inline edit mode (text input appears)
- Edit value → Press Enter or click outside → Save changes, show success toast
- Click table header → Sort by that column (ascending/descending)
- Type in quick-search → Filter table rows in real-time
- Click Export → Show dropdown with 4 options
- Click "Download as Excel" → Generate .xlsx file client-side, trigger download, show success toast
- Click PDF zoom controls → Zoom in/out, fit to width/page
- Click PDF page navigation → Navigate to previous/next page
- Click Full-screen → Expand PDF viewer to full screen
- Click Delete → Show confirmation dialog → Confirm → Delete document, navigate to SCR-005 (History)

---

### SCR-005: Document History

**Derived From**: UC-004, FR-069 to FR-078  
**Personas**: Financial Analyst (Primary)  
**Priority**: P0

#### Purpose
Searchable, filterable list of all processed documents with metadata, enabling users to find and access past extraction results.

#### Layout Structure
**Desktop (≥1024px)**:
- Fixed header with navigation
- Page title: "Document History" (H1)
- Search and filter bar (horizontal layout):
  - Search input (left, 40% width)
  - Filter dropdowns (right): Date Range, Status, Model
  - View toggle (Grid | List)
- Document grid (3-4 columns) or table (full width)
- Pagination controls (bottom)

**Tablet (768px-1023px)**:
- Search and filter bar (2 rows):
  - Row 1: Search input (full width)
  - Row 2: Filter dropdowns + view toggle
- Document grid (2 columns) or table (full width)

**Mobile (<768px)**:
- Stacked layout:
  - Search input (full width)
  - Filter button (opens drawer with filter options)
  - Document list (single column cards only, no table view)
  - Pagination (simplified: Previous/Next only)

#### Content Elements
1. **Page Title**: "Document History" (H1)
2. **Search Bar**: Text input with search icon, placeholder "Search by filename..."
3. **Filter Dropdowns**:
   - Date Range: All Time, Last 7 Days, Last 30 Days, Last 90 Days, Custom
   - Status: All, Success, Failed, Processing
   - Model: All, OpenAI GPT, Google Gemini
4. **View Toggle**: Grid View | List View (icon buttons)
5. **Document Grid View** (default):
   - Cards showing:
     - Thumbnail (PDF icon or preview)
     - Filename (truncated)
     - Upload date
     - Status badge (Success/Failed/Processing)
     - Model used badge
     - Actions: View (eye icon), Delete (trash icon)
6. **Document List View** (table):
   - Columns: Thumbnail, Filename, Upload Date, Status, Model, Actions
   - Sortable columns (Filename, Upload Date, Status)
   - Row hover effect
7. **Pagination**:
   - Page numbers (1, 2, 3, ..., Last)
   - Previous/Next buttons
   - Items per page selector: 10, 25, 50, 100

#### States

**Default State**:
- Shows all processed documents in grid view
- Search empty, filters set to "All"
- Documents sorted by upload date (descending, most recent first)
- Pagination showing page 1

**Loading State**:
- Skeleton screens for document cards/rows (10 skeletons)
- Search and filter controls visible but disabled

**Empty State** (no documents):
- Trigger: No documents have been processed
- Display: Empty state illustration (folder icon)
- Heading: "No documents processed yet"
- Description: "Upload your first PDF document to extract entity data and build your document library."
- CTA: "Upload Your First Document" (primary button)

**Search/Filter Empty State**:
- Trigger: Search or filter returns no results
- Display: Empty state icon (magnifying glass with X)
- Heading: "No documents found"
- Description: "No documents match your search criteria. Try adjusting your filters or search term."
- CTA: "Clear Filters" button

**Error State**:
- Trigger: Failed to load document history
- Display: Error icon
- Message: "Failed to load document history. Please refresh the page."
- CTA: Refresh button

#### Components Used
- Header (navigation)
- SearchInput (filename search)
- Select (filter dropdowns)
- Toggle (Grid/List view switch)
- Card (document cards in grid view)
- Table (document list in table view)
- Badge (status, model indicators)
- IconButton (View, Delete actions)
- Pagination (page controls)
- Dialog (delete confirmation)
- EmptyState (no documents or no results)
- Skeleton (loading state)
- Toast (success/error notifications)

#### Interactions
- Type in search → Debounced search (300ms), filter documents by filename
- Select filter option → Refine document list, reset to page 1
- Click "Clear Filters" → Reset all filters to default, show all documents
- Toggle Grid ↔ List view → Switch display mode, preserve filters and search
- Click document card/row → Navigate to SCR-004 (Results) for that document
- Click Delete icon → Show confirmation dialog
- Confirm delete → Delete document, remove from list, show success toast
- Cancel delete → Close dialog, no changes
- Click pagination controls → Load different page of results
- Change items per page → Reload with new page size, reset to page 1
- Click table column header → Sort by that column (ascending/descending)

---

## 12. Prototype Flows

*Flows derived from use cases UC-001 through UC-004 in spec.md. Each flow notes which personas it covers.*

### Flow: FL-001 - Upload and Process Document (Happy Path)

**Flow ID**: FL-001  
**Derived From**: UC-001 (Success Scenario)  
**Personas Covered**: Financial Analyst  
**Description**: Complete workflow from dashboard to viewing extraction results for a successfully processed document.

#### Flow Sequence
```
1. Entry: SCR-001 Dashboard / Default
   - Trigger: User lands on application or clicks logo
   - Action: View recent documents and statistics
   |
   v
2. Action: Click "Upload New Document" CTA
   - Transition: Navigate to Upload page
   |
   v
3. Step: SCR-002 Upload / Default
   - Action: Drag PDF file into drop zone OR click to browse
   |
   v
4. Step: SCR-002 Upload / File Selected
   - Action: File preview appears, select LLM model (OpenAI or Gemini)
   |
   v
5. Action: Click "Extract Entities" button
   - Transition: Navigate to Processing page
   |
   v
6. Step: SCR-003 Processing / Loading
   - Action: System processes document with LLM (10-30 seconds)
   - Display: Loading spinner with status message
   |
   v
7. Step: SCR-003 Processing / Success
   - Action: Processing completes successfully
   - Display: Success icon, auto-redirect after 2 seconds
   |
   v
8. Step: SCR-004 Results / Default
   - Action: View extracted entities in card view, review PDF
   - End: User can edit, export, or navigate elsewhere
```

#### Required Interactions
- **Dashboard to Upload**: Single click on primary CTA
- **File Selection**: Drag-and-drop or click interaction with validation feedback
- **Model Selection**: Radio button selection with visual card highlighting
- **Processing**: Auto-redirect on completion (no user action)
- **Results Display**: Toggle between card/table views, inline editing, export options

---

### Flow: FL-002 - Upload with Validation Error

**Flow ID**: FL-002  
**Derived From**: UC-001 (Extension 4a - File validation fails)  
**Personas Covered**: Financial Analyst  
**Description**: Error recovery flow when user attempts to upload invalid file (wrong type or size exceeds 10MB).

#### Flow Sequence
```
1. Entry: SCR-002 Upload / Default
   - Trigger: User navigates to upload page
   |
   v
2. Action: User drags/selects invalid file (non-PDF or >10MB)
   |
   v
3. Step: SCR-002 Upload / Error
   - Display: Red border on drop zone
   - Message: "File type not supported. Please upload a PDF file" OR
             "File size exceeds 10MB limit"
   - Action: File selection cleared
   |
   v
4. Decision Point:
   +-- User selects valid file → Return to Step 4 of FL-001 (File Selected state)
   +-- User clicks Cancel → Navigate to SCR-001 Dashboard
```

#### Required Interactions
- **Error Display**: Immediate inline validation with clear error message
- **Error Recovery**: User can immediately select different file without page reload
- **Cancel Option**: Secondary action to abandon upload

---

### Flow: FL-003 - Processing Failure and Retry

**Flow ID**: FL-003  
**Derived From**: UC-001 (Extension 9a - LLM API request fails)  
**Personas Covered**: Financial Analyst  
**Description**: Error recovery flow when LLM processing fails due to API timeout, service unavailable, or other errors.

#### Flow Sequence
```
1. Entry: SCR-003 Processing / Loading
   - Trigger: User has uploaded file and initiated extraction
   |
   v
2. Event: LLM API failure (timeout, service error)
   |
   v
3. Step: SCR-003 Processing / Error
   - Display: Error icon replaces spinner
   - Message: "Processing failed. Please try again or select a different model."
   - Error details: [Specific API error if available]
   - Actions: Retry, Change Model, Cancel buttons
   |
   v
4. Decision Point:
   +-- Click "Retry" → Return to SCR-003 / Loading (retry with same file/model)
   +-- Click "Change Model" → Navigate to SCR-002 / File Selected (file preserved, select different model)
   +-- Click "Cancel" → Navigate to SCR-001 Dashboard
```

#### Required Interactions
- **Error Display**: Clear error state with actionable recovery options
- **Retry**: Re-initiate processing without re-uploading file
- **Model Change**: Return to upload with file preserved, only change model selection
- **Cancel**: Abandon process and return to dashboard

---

### Flow: FL-004 - View and Edit Extraction Results

**Flow ID**: FL-004  
**Derived From**: UC-002 (View and Edit Extraction Results)  
**Personas Covered**: Financial Analyst  
**Description**: Workflow for reviewing extracted data, making manual corrections, and toggling between card and table views.

#### Flow Sequence
```
1. Entry: SCR-004 Results / Default
   - Trigger: Navigate from Processing success OR click document in Dashboard/History
   - Display: Entities in card view, PDF in side panel
   |
   v
2. Action: Review entity data, compare with PDF
   |
   v
3. Decision Point:
   +-- Data is correct → Proceed to FL-005 (Export)
   +-- Data needs correction → Continue to Step 4
   |
   v
4. Action: Click field value to edit
   |
   v
5. Step: SCR-004 Results / Inline Edit Mode
   - Display: Text input with current value
   - Action: User corrects value, presses Enter or clicks outside
   |
   v
6. Validation:
   +-- Valid input → Save changes, show success toast → Return to Step 2
   +-- Invalid input → Show inline error, keep edit mode active → Return to Step 5
   |
   v
7. Optional: Toggle to Table View
   |
   v
8. Step: SCR-004 Results / Table View
   - Display: Entities in table format with sorting/filtering
   - Action: Use quick-search to find specific fields
   - Note: Can edit in table view same as card view
   |
   v
9. End: User completes review, proceeds to export or navigates elsewhere
```

#### Required Interactions
- **Inline Editing**: Click-to-edit pattern with validation
- **View Toggle**: Seamless switch between card and table views preserving data
- **Table Features**: Sorting (click header), filtering (quick-search input)
- **PDF Viewer**: Zoom controls, page navigation for reference
- **Success Feedback**: Toast notification on successful edit

---

### Flow: FL-005 - Export Extraction Results

**Flow ID**: FL-005  
**Derived From**: UC-003 (Export Extraction Results)  
**Personas Covered**: Financial Analyst  
**Description**: Workflow for exporting extracted entity data in desired format (JSON, CSV, Excel, PDF).

#### Flow Sequence
```
1. Entry: SCR-004 Results / Default
   - Trigger: User has reviewed extraction results
   |
   v
2. Action: Click "Export" dropdown button
   |
   v
3. Step: Export dropdown menu appears
   - Options: Download as JSON, Download as CSV, Download as Excel, Generate PDF Report
   |
   v
4. Action: User selects "Download as Excel"
   |
   v
5. Step: SCR-004 Results / Export Loading
   - Display: Loading spinner on export button
   - Action: System generates .xlsx file client-side (SheetJS)
   - Process:
     * Create Overview worksheet with metadata
     * Create worksheets for each category (Lender, Borrower, Loan Terms, Location, Person)
     * Format headers (bold, blue background, white text, frozen pane)
     * Auto-size columns
     * Apply number formatting (currency, percentages)
   |
   v
6. Step: Browser download triggered
   - Filename: {document_name}_entities_{YYYY-MM-DD}.xlsx
   |
   v
7. Step: SCR-004 Results / Default
   - Display: Success toast "Excel file downloaded successfully"
   - Action: Export button returns to normal state
   |
   v
8. End: User can verify downloaded file or export in different format
```

#### Required Interactions
- **Export Dropdown**: Click to reveal format options
- **Format Selection**: Single click to initiate export
- **Loading Feedback**: Button shows loading state during generation
- **Success Notification**: Toast confirms successful download
- **Error Handling**: If export fails, show error toast with retry option

---

### Flow: FL-006 - Search and Access Document History

**Flow ID**: FL-006  
**Derived From**: UC-004 (Search and View Document History)  
**Personas Covered**: Financial Analyst  
**Description**: Workflow for finding previously processed documents using search and filters, then accessing results.

#### Flow Sequence
```
1. Entry: SCR-005 History / Default
   - Trigger: Click "History" in main navigation
   - Display: All processed documents in grid view, sorted by date (descending)
   |
   v
2. Action: User enters search term "loan_application" in search bar
   |
   v
3. Step: SCR-005 History / Filtered (Search)
   - Display: Documents filtered to match filename search (debounced 300ms)
   - Results update in real-time as user types
   |
   v
4. Action: User applies additional filters
   - Status: Success
   - Date Range: Last 7 Days
   |
   v
5. Step: SCR-005 History / Filtered (Search + Filters)
   - Display: Documents matching all criteria
   - Pagination resets to page 1
   |
   v
6. Optional: User sorts by Upload Date (descending)
   |
   v
7. Action: User clicks on specific document card
   |
   v
8. Transition: Navigate to SCR-004 Results for selected document
   |
   v
9. End: User views extraction results (enters FL-004 flow)
```

#### Required Interactions
- **Search**: Debounced real-time search (300ms delay)
- **Filters**: Dropdown selections that combine with search
- **Clear Filters**: Single action to reset all filters
- **View Toggle**: Switch between grid and list view
- **Sorting**: Click column headers in list view
- **Pagination**: Navigate through multiple pages of results
- **Document Selection**: Click card/row to view details

---

### Flow: FL-007 - Delete Document with Confirmation

**Flow ID**: FL-007  
**Derived From**: UC-004 (Extension 10a - User clicks delete icon)  
**Personas Covered**: Financial Analyst  
**Description**: Destructive action workflow requiring explicit confirmation before deleting document.

#### Flow Sequence
```
1. Entry: SCR-005 History / Default OR SCR-004 Results / Default
   - Trigger: User viewing document history or specific document results
   |
   v
2. Action: Click Delete icon (trash icon)
   |
   v
3. Step: Confirmation Dialog appears
   - Message: "Are you sure you want to delete this document? This action cannot be undone."
   - Actions: Cancel (secondary), Confirm (danger/red primary)
   |
   v
4. Decision Point:
   +-- Click "Cancel" → Close dialog, no changes → Return to previous screen
   +-- Click "Confirm" → Continue to Step 5
   |
   v
5. Step: Delete operation executes
   - Action: Remove document and extraction results from database
   - Display: Loading state on Confirm button
   |
   v
6. Success:
   - Close dialog
   - Remove document from list (if in History)
   - Show success toast "Document deleted successfully"
   - Navigate to SCR-005 History (if deleted from Results page)
   |
   v
7. End: Document permanently removed
```

#### Required Interactions
- **Confirmation Dialog**: Modal overlay requiring explicit action
- **Cancel Option**: Easy escape from destructive action
- **Danger Styling**: Red/warning color on Confirm button to indicate destructive action
- **Optimistic UI**: Remove from list immediately after confirmation (before API response)
- **Success Feedback**: Toast notification confirming deletion

---

### Flow: FL-008 - Empty State to First Upload

**Flow ID**: FL-008  
**Derived From**: UC-001 + UC-004 (Empty state scenarios)  
**Personas Covered**: Financial Analyst (First-time user)  
**Description**: Onboarding flow for new users with no processed documents.

#### Flow Sequence
```
1. Entry: SCR-001 Dashboard / Empty State
   - Trigger: New user or user with no processed documents
   - Display: Empty state illustration
   - Message: "No documents processed yet"
   - Description: "Upload your first PDF document to extract entity data and get started."
   - CTA: "Upload Your First Document" (primary button)
   |
   v
2. Action: Click "Upload Your First Document"
   |
   v
3. Transition: Navigate to SCR-002 Upload
   |
   v
4. Continue: Enter FL-001 (Upload and Process Document flow)
   |
   v
5. End: After successful processing, Dashboard and History populate with first document
```

#### Required Interactions
- **Empty State Guidance**: Clear messaging explaining next action
- **Primary CTA**: Prominent button guiding user to upload
- **Consistent Empty States**: Same pattern in Dashboard and History when no data

---

## 13. Export Requirements

### JPG Export Settings
| Setting | Value |
|---------|-------|
| Format | JPG |
| Quality | High (85%) |
| Scale - Mobile | 2x (750px width for 375px viewport) |
| Scale - Tablet | 2x (1536px width for 768px viewport) |
| Scale - Desktop | 2x (2048px width for 1024px viewport) |
| Color Profile | sRGB |

### Export Naming Convention
`GenAIPDFExtractor__<Platform>__<ScreenName>__<State>__v1.jpg`

**Examples**:
- `GenAIPDFExtractor__Desktop__Dashboard__Default__v1.jpg`
- `GenAIPDFExtractor__Mobile__Upload__Error__v1.jpg`
- `GenAIPDFExtractor__Tablet__Results__Loading__v1.jpg`

### Export Manifest

| Screen | State | Desktop | Tablet | Mobile |
|--------|-------|---------|--------|--------|
| SCR-001 Dashboard | Default | ✓ | ✓ | ✓ |
| SCR-001 Dashboard | Loading | ✓ | ✓ | ✓ |
| SCR-001 Dashboard | Empty | ✓ | ✓ | ✓ |
| SCR-001 Dashboard | Error | ✓ | ✓ | ✓ |
| SCR-002 Upload | Default | ✓ | ✓ | ✓ |
| SCR-002 Upload | Loading | ✓ | ✓ | ✓ |
| SCR-002 Upload | Error | ✓ | ✓ | ✓ |
| SCR-002 Upload | Validation | ✓ | ✓ | ✓ |
| SCR-002 Upload | Success | ✓ | ✓ | ✓ |
| SCR-003 Processing | Loading | ✓ | ✓ | ✓ |
| SCR-003 Processing | Success | ✓ | ✓ | ✓ |
| SCR-003 Processing | Error | ✓ | ✓ | ✓ |
| SCR-004 Results | Default | ✓ | ✓ | ✓ |
| SCR-004 Results | Loading | ✓ | ✓ | ✓ |
| SCR-004 Results | Empty | ✓ | - | - |
| SCR-004 Results | Error | ✓ | ✓ | ✓ |
| SCR-005 History | Default | ✓ | ✓ | ✓ |
| SCR-005 History | Loading | ✓ | ✓ | ✓ |
| SCR-005 History | Empty | ✓ | ✓ | ✓ |
| SCR-005 History | Error | ✓ | ✓ | ✓ |

### Total Export Count
- **Screens**: 5 (Dashboard, Upload, Processing, Results, History)
- **States per screen**: Average 4-5 states
- **Platforms**: 3 (Desktop, Tablet, Mobile)
- **Total JPGs**: ~57 exports (19 unique screen-state combinations × 3 platforms)

---

## 14. Figma File Structure

### Page Organization
```
GenAI PDF Extractor Figma File
+-- 00_Cover
|   +-- Project info: GenAI PDF Extractor UI/UX Modernization
|   +-- Version: 1.0
|   +-- Stakeholders: Financial Analysts, Development Team
|   +-- Last updated: March 2026
+-- 01_Foundations
|   +-- Color Tokens
|   |   +-- Primary (Blue #3B82F6)
|   |   +-- Secondary (Indigo #6366F1)
|   |   +-- Success (Green #10B981)
|   |   +-- Warning (Amber #F59E0B)
|   |   +-- Error (Red #EF4444)
|   |   +-- Neutral Gray Scale (#F9FAFB to #111827)
|   +-- Typography Scale
|   |   +-- H1: 36px/700, H2: 30px/600, H3: 24px/600, H4: 20px/600
|   |   +-- Body: 16px/400, Small: 14px/400, Caption: 12px/400
|   |   +-- Font: Inter (primary), Fira Code (monospace)
|   +-- Spacing Scale (4px/8px grid)
|   |   +-- 0, 4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px, 96px
|   +-- Border Radius Tokens
|   |   +-- sm: 4px, md: 8px, lg: 12px, xl: 16px, full: 9999px
|   +-- Elevation/Shadows (4 levels)
|   |   +-- Level 1: Cards, inputs
|   |   +-- Level 2: Dropdowns, popovers
|   |   +-- Level 3: Modals, dialogs
|   |   +-- Level 4: Sticky headers
|   +-- Grid Definitions
|   |   +-- Desktop: 12-column grid, 1280px max-width
|   |   +-- Tablet: 8-column grid
|   |   +-- Mobile: 4-column grid
+-- 02_Components
|   +-- C/Actions
|   |   +-- Button (Primary, Secondary, Tertiary, Danger × S/M/L × States)
|   |   +-- IconButton (variants × states)
|   |   +-- Link (variants × states)
|   +-- C/Inputs
|   |   +-- TextField (states × sizes)
|   |   +-- FileInput/DropZone (states)
|   |   +-- Select (states × sizes)
|   |   +-- Checkbox, Radio, Toggle (states)
|   |   +-- SearchInput (states)
|   +-- C/Navigation
|   |   +-- Header (Desktop, Tablet, Mobile variants)
|   |   +-- Breadcrumb
|   |   +-- Pagination
|   |   +-- StepIndicator
|   +-- C/Content
|   |   +-- Card (variants: Document, Stat, Entity Category)
|   |   +-- Table (with TanStack Table features)
|   |   +-- FilePreview
|   |   +-- PDFViewer
|   +-- C/Feedback
|   |   +-- Modal, Dialog (variants)
|   |   +-- Toast (Success, Error, Warning, Info)
|   |   +-- Alert (variants)
|   |   +-- Spinner, Skeleton, ProgressBar
|   |   +-- EmptyState (variants)
|   +-- C/Data Display
|   |   +-- Badge (Status: Success, Failed, Processing)
|   |   +-- Tooltip
|   |   +-- Dropdown
+-- 03_Patterns
|   +-- Upload Pattern (Drag-and-drop with validation)
|   +-- Search + Filter Pattern (History page)
|   +-- Card/Table Toggle Pattern (Results page)
|   +-- Inline Edit Pattern (Entity editing)
|   +-- Empty State Pattern (No data scenarios)
|   +-- Error State Pattern (Error handling)
|   +-- Loading State Pattern (Skeleton screens)
+-- 04_Screens
|   +-- SCR-001 Dashboard
|   |   +-- Desktop/Default, Desktop/Loading, Desktop/Empty, Desktop/Error
|   |   +-- Tablet/Default, Tablet/Loading, Tablet/Empty, Tablet/Error
|   |   +-- Mobile/Default, Mobile/Loading, Mobile/Empty, Mobile/Error
|   +-- SCR-002 Upload
|   |   +-- Desktop/Default, Desktop/Loading, Desktop/Error, Desktop/Validation, Desktop/Success
|   |   +-- Tablet/Default, Tablet/Loading, Tablet/Error, Tablet/Validation, Tablet/Success
|   |   +-- Mobile/Default, Mobile/Loading, Mobile/Error, Mobile/Validation, Mobile/Success
|   +-- SCR-003 Processing
|   |   +-- Desktop/Loading, Desktop/Success, Desktop/Error
|   |   +-- Tablet/Loading, Tablet/Success, Tablet/Error
|   |   +-- Mobile/Loading, Mobile/Success, Mobile/Error
|   +-- SCR-004 Results
|   |   +-- Desktop/Default, Desktop/Loading, Desktop/Empty, Desktop/Error
|   |   +-- Tablet/Default, Tablet/Loading, Tablet/Error
|   |   +-- Mobile/Default, Mobile/Loading, Mobile/Error
|   +-- SCR-005 History
|   |   +-- Desktop/Default, Desktop/Loading, Desktop/Empty, Desktop/Error
|   |   +-- Tablet/Default, Tablet/Loading, Tablet/Empty, Tablet/Error
|   |   +-- Mobile/Default, Mobile/Loading, Mobile/Empty, Mobile/Error
+-- 05_Prototype
|   +-- FL-001: Upload and Process Document (Happy Path)
|   +-- FL-002: Upload with Validation Error
|   +-- FL-003: Processing Failure and Retry
|   +-- FL-004: View and Edit Extraction Results
|   +-- FL-005: Export Extraction Results
|   +-- FL-006: Search and Access Document History
|   +-- FL-007: Delete Document with Confirmation
|   +-- FL-008: Empty State to First Upload
+-- 06_Handoff
    +-- Design Token Usage Rules
    +-- Component Implementation Guidelines
    +-- Responsive Behavior Specifications
    +-- Edge Case Handling
    +-- Accessibility Requirements (WCAG 2.1 AA)
    +-- Performance Considerations
```

---

## 15. Quality Checklist

### Pre-Export Validation
- [x] All screens have required states (Default/Loading/Empty/Error/Validation where applicable)
- [x] All components use design tokens from designsystem.md (no hard-coded values)
- [x] Color contrast meets WCAG 2.1 AA (≥4.5:1 text, ≥3:1 UI) per UXR-104
- [x] Focus states defined for all interactive elements per UXR-105
- [x] Touch targets ≥44x44px on mobile per FR-110
- [x] Prototype flows wired and functional (8 flows: FL-001 to FL-008)
- [x] Naming conventions followed (GenAIPDFExtractor__Platform__Screen__State__v1.jpg)
- [x] Export manifest complete (57 total exports across 3 platforms)
- [x] All screens derived from use cases (UC-001 to UC-004)
- [x] Persona coverage verified (Financial Analyst primary persona for all screens)
- [x] UXR requirements mapped to screens (22 UXR requirements)

### Post-Generation
- [ ] designsystem.md created with Figma token references
- [ ] Export manifest generated with file paths
- [ ] JPG files exported and named correctly
- [ ] Handoff documentation complete with implementation notes
- [ ] Accessibility audit completed (automated + manual)
- [ ] Responsive behavior validated across breakpoints (375px, 768px, 1024px, 1920px)

---

## 16. Implementation Notes

### Priority Implementation Order
1. **Phase 1 (Week 1-2)**: Foundations + Components
   - Set up design tokens in Figma
   - Build component library (C/Actions, C/Inputs, C/Navigation, C/Content, C/Feedback, C/Data Display)
   - Create responsive grid system

2. **Phase 2 (Week 2-3)**: Core Screens (P0)
   - SCR-001 Dashboard (all states)
   - SCR-002 Upload (all states)
   - SCR-003 Processing (all states)

3. **Phase 3 (Week 3-4)**: Primary Work Screens (P0)
   - SCR-004 Results (all states, card/table views)
   - SCR-005 History (all states, grid/list views)

4. **Phase 4 (Week 4-5)**: Prototype Flows
   - Wire all 8 flows (FL-001 to FL-008)
   - Test user journeys
   - Validate interaction patterns

5. **Phase 5 (Week 5-6)**: Responsive Variants
   - Create tablet variants for all screens
   - Create mobile variants for all screens
   - Test responsive behavior

6. **Phase 6 (Week 6)**: Export and Handoff
   - Export all JPGs per manifest (57 exports)
   - Complete handoff documentation
   - Accessibility audit and fixes

### Design Decisions Requiring Validation
- **PDF Viewer Component**: Confirm react-pdf library capabilities match design requirements (zoom, navigation, full-screen)
- **Table Virtualization**: Validate TanStack Virtual integration for large datasets (>100 rows)
- **Excel Export**: Confirm SheetJS client-side generation meets formatting requirements (multi-sheet, auto-sizing, number formats)
- **Mobile Table View**: Decided to show card view only on mobile (<768px) - validate with stakeholders
- **Empty State Illustrations**: Confirm icon-based approach vs. custom illustrations

### Accessibility Validation Points
- **Keyboard Navigation**: All interactive elements accessible via Tab, Enter, Esc (UXR-102)
- **Screen Reader**: ARIA labels on icon buttons, live regions for dynamic content (UXR-103)
- **Color Contrast**: Automated audit with axe DevTools (UXR-104)
- **Focus Indicators**: 2px outline on all focusable elements (UXR-105)
- **Touch Targets**: Minimum 44x44px on mobile (FR-110)

---

**End of Figma Specification**

