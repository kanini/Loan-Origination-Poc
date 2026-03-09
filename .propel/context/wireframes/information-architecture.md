# Information Architecture - GenAI PDF Extractor

## 1. Wireframe Specification

**Fidelity Level**: High
**Screen Type**: Responsive Web (Desktop ≥1024px, Tablet 768px-1023px, Mobile <768px)
**Viewport**: 1440x1024px (Desktop), 768x1024px (Tablet), 375x844px (Mobile)

## 2. System Overview

GenAI PDF Extractor is a modern web application that enables financial analysts to upload PDF loan documents, extract structured entity data using AI (OpenAI GPT or Google Gemini), review and edit extraction results, and export data in multiple formats. The application features a multi-page workflow with intuitive navigation, responsive layouts, and WCAG 2.1 AA accessibility compliance.

**Key Functionalities:**
- Dashboard with recent activity and statistics
- Drag-and-drop PDF upload with model selection
- Real-time processing status tracking
- Structured entity display with card/table views
- Side-by-side PDF viewer
- Multi-format export (JSON, CSV, Excel, PDF)
- Searchable document history with filtering

## 3. Wireframe References

### Generated Wireframes

**HTML Wireframes**:
| Screen/Feature | File Path | Description | Fidelity | Date Created |
|---------------|-----------|-------------|----------|--------------|
| Dashboard/Home | ./Hi-Fi/wireframe-SCR-001-dashboard.html | Landing page with recent extractions and statistics | High | 2026-03-09 |
| Document Upload | ./Hi-Fi/wireframe-SCR-002-upload.html | Step-by-step upload workflow with drag-and-drop | High | 2026-03-09 |
| Processing Status | ./Hi-Fi/wireframe-SCR-003-processing.html | Loading state during LLM processing | High | 2026-03-09 |
| Results Display | ./Hi-Fi/wireframe-SCR-004-results.html | Entity display with card/table views and PDF viewer | High | 2026-03-09 |
| Document History | ./Hi-Fi/wireframe-SCR-005-history.html | Searchable document library with filters | High | 2026-03-09 |

### Component Inventory
**Reference**: See [Component Inventory](./component-inventory.md) for detailed component documentation including:
- Complete component specifications
- Component states and variants
- Responsive behavior details
- Reusability analysis
- Implementation priorities

## 4. User Personas & Flows

### Persona 1: Financial Analyst (Primary)
- **Role**: Internal user processing loan documentation
- **Goals**: Upload PDFs, extract entity data, review/edit results, export for analysis
- **Key Screens**: All screens (SCR-001 through SCR-005)
- **Primary Flow**: Dashboard → Upload → Processing → Results → Export
- **Wireframe References**: 
  - Entry: wireframe-SCR-001-dashboard.html
  - Upload: wireframe-SCR-002-upload.html
  - Processing: wireframe-SCR-003-processing.html
  - Results: wireframe-SCR-004-results.html
  - History: wireframe-SCR-005-history.html
- **Decision Points**: 
  - Model selection (OpenAI vs Gemini)
  - View toggle (Card vs Table)
  - Export format selection (JSON/CSV/Excel/PDF)

### Persona 2: QA Engineer (Secondary)
- **Role**: Testing and validation
- **Goals**: Test functionality, validate accessibility, verify extraction accuracy
- **Key Screens**: All screens for comprehensive testing
- **Primary Flow**: Same as Financial Analyst
- **Wireframe References**: All wireframe files

### User Flow Diagrams
- **Primary Flow**: Document Processing - Dashboard (SCR-001) → Upload (SCR-002) → Processing (SCR-003) → Results (SCR-004) → Export
- **Secondary Flow**: Document Retrieval - Dashboard (SCR-001) → History (SCR-005) → Results (SCR-004)
- **Tertiary Flow**: Quick Upload - Any Page → Upload (SCR-002) via header CTA

## 5. Screen Hierarchy

### Level 1: Main Navigation (P0 - Critical)

- **SCR-001: Dashboard/Home** (P0 - Critical) - [Wireframe: wireframe-SCR-001-dashboard.html]
  - Description: Landing page with welcome message, upload CTA, recent extractions (5-10 documents), and quick statistics
  - User Entry Point: Yes (primary landing page)
  - Key Components: Header, StatCard (3), DocumentCard (5-10), Button (Primary CTA), EmptyState
  - States: Default, Loading, Empty, Error

- **SCR-002: Document Upload** (P0 - Critical) - [Wireframe: wireframe-SCR-002-upload.html]
  - Description: Step-by-step guided upload with drag-and-drop zone, model selection, and file preview
  - Parent Screen: Dashboard (SCR-001)
  - Key Components: Header, Breadcrumb, DropZone, FilePreview, RadioGroup (model selection), Button, ProgressBar, StepIndicator
  - States: Default, Loading, Error, Validation, Success

- **SCR-004: Results/Output Display** (P0 - Critical) - [Wireframe: wireframe-SCR-004-results.html]
  - Description: Primary work screen with entity display (card/table views), PDF viewer, and export options
  - Parent Screen: Processing (SCR-003) or History (SCR-005)
  - Key Components: Header, Breadcrumb, Card (entity categories), Table (TanStack Table), Toggle (view switch), PDFViewer, Dropdown (export), SearchInput, Badge
  - States: Default, Loading, Empty, Error

- **SCR-005: Document History** (P0 - Critical) - [Wireframe: wireframe-SCR-005-history.html]
  - Description: Searchable, filterable document library with grid/table view toggle
  - Parent Screen: Dashboard (SCR-001)
  - Key Components: Header, SearchInput, FilterDropdown (3), DocumentCard (grid), Table (list view), Pagination, Toggle (view switch)
  - States: Default, Loading, Empty, Error

### Level 2: Intermediate States (P0 - Critical)

- **SCR-003: Processing Status** (P0 - Critical) - [Wireframe: wireframe-SCR-003-processing.html]
  - Description: Loading state with spinner during LLM processing
  - Parent Screen: Upload (SCR-002)
  - Key Components: Header, Breadcrumb, Spinner, StatusMessage, Button (error state only)
  - States: Loading, Success, Error

### Screen Priority Legend
- **P0**: Critical path screens (must-have for MVP)
- **P1**: High-priority screens (core functionality)
- **P2**: Medium-priority screens (important features)
- **P3**: Low-priority screens (nice-to-have)

### Modal/Dialog/Overlay Inventory

| Modal/Dialog Name | Type | Trigger Context | Parent Screen | Wireframe Reference | Priority |
|------------------|------|----------------|---------------|-------------------|----------|
| Delete Confirmation | Dialog | Click delete icon on document | SCR-005 (History), SCR-004 (Results) | Inline in wireframe-SCR-005-history.html | P0 |
| Export Options Menu | Dropdown | Click "Export" button | SCR-004 (Results) | Inline in wireframe-SCR-004-results.html | P0 |
| File Validation Error | Toast | Invalid file upload | SCR-002 (Upload) | Inline in wireframe-SCR-002-upload.html | P0 |
| Success Notification | Toast | Successful action completion | All screens | Inline in all wireframes | P0 |
| Error Notification | Toast | Action failure | All screens | Inline in all wireframes | P0 |

**Modal Behavior Notes:**
- **Responsive Behavior:** Modals are centered overlays on desktop; full-screen on mobile (<768px)
- **Trigger Actions:** 
  - Delete Confirmation: Click trash icon on document card/row
  - Export Options: Click "Export" button in results header
  - Toasts: Automatic on success/error events
- **Dismissal Actions:** 
  - Dialogs: Close button (X), Cancel button, ESC key
  - Toasts: Auto-dismiss after 5 seconds, manual close button
  - Dropdowns: Click outside, select option, ESC key
- **Focus Management:** Tab trap within modal, return focus to trigger element on close
- **Accessibility:** 
  - role="dialog" for modals
  - aria-labelledby for dialog titles
  - aria-describedby for dialog content
  - aria-live="polite" for toast notifications

## 6. Navigation Architecture

```
GenAI PDF Extractor
+-- Dashboard (Home) [wireframe-SCR-001-dashboard.html]
|   +-- Recent Extractions (5-10 cards)
|   |   +-- Click card → Results (SCR-004)
|   +-- Quick Statistics (3 stat cards)
|   +-- Upload CTA → Upload (SCR-002)
|   +-- View All → History (SCR-005)
|
+-- Upload Document [wireframe-SCR-002-upload.html]
|   +-- Drag-and-Drop Zone
|   +-- Model Selection (OpenAI/Gemini)
|   +-- Extract Entities → Processing (SCR-003)
|
+-- Processing Status [wireframe-SCR-003-processing.html]
|   +-- Success → Results (SCR-004)
|   +-- Error → Retry (SCR-002) or Cancel (SCR-001)
|
+-- Results/Output Display [wireframe-SCR-004-results.html]
|   +-- Entity Display (Card/Table View)
|   +-- PDF Viewer
|   +-- Export Options (JSON/CSV/Excel/PDF)
|   +-- Process Another → Upload (SCR-002)
|
+-- Document History [wireframe-SCR-005-history.html]
    +-- Search & Filter
    +-- Document Grid/List (Grid/Table View)
    +-- Click document → Results (SCR-004)
    +-- Upload New → Upload (SCR-002)
```

### Navigation Patterns

| Pattern | Type | Platform Behavior | Wireframe Reference |
|---------|------|-------------------|-------------------|
| Primary Nav | Fixed Top Header | Desktop: Full menu (Dashboard, Upload, History) / Mobile: Hamburger menu | All wireframes |
| Secondary Nav | Breadcrumbs | Below header showing hierarchy (e.g., "Home > Upload Document > Processing") | SCR-002, SCR-003, SCR-004 |
| Utility Nav | User Profile Icon | Top-right corner (Settings, Profile - Phase 2) | All wireframes |
| Quick Actions | Floating CTAs | "Upload New Document" button accessible from all pages | All wireframes |

**Navigation Consistency:**
- Header component identical across all screens
- Active page highlighted in navigation (Primary Blue #3B82F6, 2px bottom border)
- Logo always links to Dashboard (SCR-001)
- Maximum 2 clicks to any major section from any page

## 7. Interaction Patterns

### Pattern 1: Document Upload Flow
- **Trigger**: User clicks "Upload New Document" button
- **Flow**: 
  1. Navigate to Upload page (SCR-002)
  2. Drag file or click to browse
  3. System validates file (type, size)
  4. Display file preview
  5. Select LLM model (OpenAI/Gemini)
  6. Click "Extract Entities"
  7. Navigate to Processing page (SCR-003)
  8. Auto-redirect to Results (SCR-004) on success
- **Screens Involved**: 
  - SCR-001 (Dashboard) - wireframe-SCR-001-dashboard.html
  - SCR-002 (Upload) - wireframe-SCR-002-upload.html
  - SCR-003 (Processing) - wireframe-SCR-003-processing.html
  - SCR-004 (Results) - wireframe-SCR-004-results.html
- **Feedback**: 
  - File validation errors (inline red border + message)
  - Upload progress bar (0-100%)
  - Success toast on completion
- **Components Used**: DropZone, FilePreview, RadioGroup, Button, ProgressBar, Toast

### Pattern 2: View Toggle (Card ↔ Table)
- **Trigger**: User clicks toggle switch in Results or History page
- **Flow**:
  1. User clicks "Card View" or "Table View" toggle
  2. System preserves data and scroll position
  3. System re-renders content in selected view
  4. Toggle state persists in session
- **Screens Involved**:
  - SCR-004 (Results) - wireframe-SCR-004-results.html
  - SCR-005 (History) - wireframe-SCR-005-history.html
- **Feedback**: Instant view switch (no loading state)
- **Components Used**: Toggle, Card, Table

### Pattern 3: Export Data
- **Trigger**: User clicks "Export" button in Results page
- **Flow**:
  1. Click "Export" button
  2. Dropdown menu appears with 4 options (JSON/CSV/Excel/PDF)
  3. Select format
  4. System generates file client-side
  5. Browser downloads file
  6. Success toast appears
- **Screens Involved**: SCR-004 (Results) - wireframe-SCR-004-results.html
- **Feedback**: 
  - Loading spinner on button during generation
  - Success toast: "Excel file downloaded successfully"
- **Components Used**: Dropdown, Button, Toast

### Pattern 4: Search and Filter
- **Trigger**: User types in search bar or selects filter options
- **Flow**:
  1. User enters search term or selects filter
  2. System filters results in real-time
  3. Results update dynamically
  4. Clear filters button appears when filters active
- **Screens Involved**: 
  - SCR-004 (Results) - Table quick-search
  - SCR-005 (History) - Global search + filters
- **Feedback**: Instant filtering (no loading state), result count update
- **Components Used**: SearchInput, FilterDropdown, Button (clear filters)

## 8. Error Handling

### Error Scenario 1: File Upload Validation Error
- **Trigger**: User uploads invalid file (wrong type or >10MB)
- **Error Screen/State**: SCR-002 (Upload) - Error state - wireframe-SCR-002-upload.html
- **User Action**: 
  - Red border on drop zone
  - Inline error message: "File type not supported. Please upload a PDF file" OR "File size exceeds 10MB limit"
  - File selection cleared
- **Recovery Flow**: User selects different file → validation passes → continue upload

### Error Scenario 2: LLM Processing Failure
- **Trigger**: LLM API timeout, service unavailable, or API key invalid
- **Error Screen/State**: SCR-003 (Processing) - Error state - wireframe-SCR-003-processing.html
- **User Action**:
  - Error icon replaces spinner
  - Message: "Processing failed. Please try again or select a different model."
  - Three buttons: Retry, Change Model, Cancel
- **Recovery Flow**: 
  - Retry → Re-initiate processing with same parameters
  - Change Model → Return to SCR-002 with file preserved
  - Cancel → Return to SCR-001 (Dashboard)

### Error Scenario 3: Failed to Load Dashboard Data
- **Trigger**: API failure when fetching recent documents or statistics
- **Error Screen/State**: SCR-001 (Dashboard) - Error state - wireframe-SCR-001-dashboard.html
- **User Action**:
  - Error icon displayed
  - Message: "Failed to load dashboard. Please refresh the page or try again later."
  - Refresh button
- **Recovery Flow**: Click Refresh → Retry API call → Load dashboard data

### Error Scenario 4: PDF Viewer Load Failure
- **Trigger**: PDF file fails to load in viewer
- **Error Screen/State**: SCR-004 (Results) - PDF Viewer Error - wireframe-SCR-004-results.html
- **User Action**:
  - Error message in PDF panel: "PDF preview unavailable. Download file to view."
  - Download PDF button
- **Recovery Flow**: Click Download → Browser downloads PDF → User opens locally

### Error Scenario 5: Empty State (No Documents)
- **Trigger**: User has no processed documents
- **Error Screen/State**: 
  - SCR-001 (Dashboard) - Empty state
  - SCR-005 (History) - Empty state
- **User Action**:
  - Empty state illustration (document icon)
  - Heading: "No documents processed yet"
  - Description: "Upload your first PDF document to extract entity data and get started."
  - CTA: "Upload Your First Document" button
- **Recovery Flow**: Click CTA → Navigate to SCR-002 (Upload)

## 9. Responsive Strategy

| Breakpoint | Width | Layout Changes | Navigation Changes | Component Adaptations |
|-----------|-------|----------------|-------------------|---------------------|
| Mobile | <768px | Single-column stacked layout | Hamburger menu, full-screen modals | Card view only (no table), stacked forms, full-width buttons |
| Tablet | 768px-1023px | 2-column grid, tabbed interface | Collapsed navigation | Adaptive tables (horizontal scroll), 2-column cards |
| Desktop | ≥1024px | Multi-column (3-col grid), side-by-side views | Expanded navigation menu | Full tables, side-by-side PDF viewer, multi-column grids |

### Responsive Wireframe Variants
- **Mobile variants**: All wireframes include mobile breakpoint annotations
- **Tablet variants**: All wireframes include tablet breakpoint annotations
- **Desktop variants**: All wireframes default to desktop (1440px) with responsive notes

**Key Responsive Behaviors:**
- **Dashboard (SCR-001)**: 
  - Desktop: 3-column grid (2 cols recent + 1 col stats)
  - Tablet: 2-column grid
  - Mobile: Stacked single-column
- **Upload (SCR-002)**:
  - Desktop/Tablet: Centered form (max-width 800px)
  - Mobile: Full-width, stacked model cards
- **Results (SCR-004)**:
  - Desktop: Side-by-side (60% entities + 40% PDF)
  - Tablet: Tabbed interface (Entities tab | PDF tab)
  - Mobile: Stacked (entities → collapsible PDF accordion)
- **History (SCR-005)**:
  - Desktop: 3-4 column grid or full-width table
  - Tablet: 2-column grid or full-width table
  - Mobile: Single-column cards only (no table view)

## 10. Accessibility

### WCAG Compliance
- **Target Level**: WCAG 2.1 Level AA
- **Color Contrast**: 
  - Normal text: ≥4.5:1 (gray-600 #4B5563 on white)
  - Large text: ≥3:1 (gray-500 #6B7280 on white)
  - UI components: ≥3:1 (primary-blue-500 #3B82F6 on white)
- **Keyboard Navigation**: All interactive elements accessible via Tab, Enter, Esc keys
- **Screen Reader Support**: 
  - Semantic HTML (header, nav, main, footer)
  - ARIA labels for icon-only buttons
  - ARIA live regions for dynamic content (toasts, errors)

### Accessibility Considerations by Screen

| Screen | Key Accessibility Features | Wireframe Notes |
|--------|---------------------------|----------------|
| SCR-001 (Dashboard) | Skip to main content link, heading hierarchy (H1 > H2 > H3), card keyboard navigation | Focus order: Logo → Nav → Skip link → Upload CTA → Recent cards → Stats |
| SCR-002 (Upload) | Form labels, ARIA labels for drag-and-drop, error announcements via aria-live | Focus order: Breadcrumb → Drop zone → Model selection → Extract button |
| SCR-003 (Processing) | Loading announcement, status updates via aria-live="polite" | Focus on main content, no interactive elements during loading |
| SCR-004 (Results) | Table headers with scope, sortable column announcements, PDF viewer keyboard controls | Focus order: Breadcrumb → View toggle → Entity cards/tables → PDF controls → Export |
| SCR-005 (History) | Search label, filter labels, pagination keyboard navigation | Focus order: Search → Filters → View toggle → Document cards/table → Pagination |

### Focus Order
- **Global**: Logo → Primary Nav → Skip to Main → Main Content → Footer
- **Forms**: Top to bottom, left to right
- **Modals**: Trap focus within modal, return to trigger on close
- **Tables**: Row-by-row navigation with arrow keys (optional enhancement)

## 11. Content Strategy

### Content Hierarchy
- **H1**: Page titles (Dashboard, Upload Document, Document History) - 36px/700, gray-900
- **H2**: Section headings (Recent Extractions, Processing your document...) - 30px/600, gray-800
- **H3**: Subsection headings (Choose LLM Model, Quick Statistics) - 24px/600, gray-700
- **H4**: Card titles, table headers - 20px/600, gray-700
- **Body Text**: Form labels, descriptions, entity values - 16px/400, gray-600
- **Small**: Metadata, helper text - 14px/400, gray-500
- **Caption**: Timestamps, fine print - 12px/400, gray-500

### Placeholder Content in Wireframes
- **Lorem Ipsum**: Not used (realistic content preferred)
- **Realistic Text**: 
  - Document names: "1003-URLA-Lender-Loan-Information.pdf"
  - Entity labels: "Lender Name", "Loan Amount", "Borrower Name"
  - Dates: "Mar 9, 2026"
  - Status: "Success", "Failed", "Processing"
- **Image Placeholders**: PDF thumbnails, document icons, empty state illustrations

### Content Types by Screen

| Screen | Content Types | Wireframe Reference |
|--------|--------------|-------------------|
| SCR-001 (Dashboard) | Text (headings, labels), Cards (document previews), Statistics (numbers, percentages) | wireframe-SCR-001-dashboard.html |
| SCR-002 (Upload) | Text (instructions, labels), Forms (file input, radio buttons), Icons (upload, PDF) | wireframe-SCR-002-upload.html |
| SCR-003 (Processing) | Text (status messages), Icons (spinner, success/error), Metadata (filename, model) | wireframe-SCR-003-processing.html |
| SCR-004 (Results) | Text (entity labels/values), Tables (structured data), PDF (embedded viewer), Icons (edit, export) | wireframe-SCR-004-results.html |
| SCR-005 (History) | Text (search, filters), Cards/Tables (document list), Metadata (dates, status), Icons (filter, search) | wireframe-SCR-005-history.html |

---

**Document Version**: 1.0  
**Last Updated**: March 9, 2026  
**Status**: Complete
