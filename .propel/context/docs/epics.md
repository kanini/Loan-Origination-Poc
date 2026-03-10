# Epic Decomposition - GenAI PDF Extractor UI/UX Enhancement

**Project:** GenAI PDF Extractor - UI/UX Modernization  
**Version:** 2.0  
**Date:** March 10, 2026  
**Status:** APPROVED

---

## Epic Summary Table

| Epic ID | Epic Title | Mapped Requirement IDs |
|---------|------------|------------------------|
| EP-001 | Frontend Foundation & Design System | TR-001, TR-003, TR-004, TR-005, TR-006, TR-013, NFR-013, NFR-014, NFR-016, NFR-017, FR-079, FR-080, FR-081, FR-082, FR-083, FR-084, FR-085, FR-086, FR-087, FR-088, FR-089, FR-090, FR-091, FR-092, FR-093, FR-094, FR-095, FR-096, FR-097, FR-098, FR-099, FR-100, UXR-301, UXR-302, UXR-303, UXR-401, UXR-403, UXR-404, UXR-501, UXR-502 |
| EP-002 | Navigation & Application Architecture | FR-001, FR-002, FR-003, FR-004, FR-005, FR-006, FR-007, FR-008, FR-009, FR-010, FR-011, FR-012, FR-111, FR-112, FR-113, FR-114, FR-115, FR-116, TR-002, TR-007, TR-015, TR-016, TR-017, TR-018, NFR-006, NFR-011, NFR-012, DR-007, DR-010, DR-012, UXR-001, UXR-002, UXR-003, UXR-201, UXR-202, UXR-203, UXR-503 |
| EP-003 | Document Upload & Multi-Document Processing | FR-013, FR-014, FR-015, FR-016, FR-017, FR-018, FR-019, FR-020, FR-021, FR-022, FR-023, FR-024, FR-025, FR-026, FR-127, FR-128, FR-129, FR-130, FR-131, FR-132, TR-011, DR-009, UXR-402, UXR-501 |
| EP-004 | Results Display & Entity Management | FR-032, FR-033, FR-034, FR-035, FR-036, FR-037, FR-038, FR-039, FR-040, FR-041, FR-042, FR-043, FR-044, FR-045, FR-046, FR-047, FR-048, FR-049, FR-050, FR-051, FR-052, FR-053, FR-069, FR-070, FR-071, FR-072, FR-073, FR-074, FR-075, FR-076, FR-077, FR-078, TR-008, TR-009, TR-012, DR-004, DR-006, DR-008, DR-013, DR-014, DR-015, NFR-019, UXR-402, UXR-503, UXR-504 |
| EP-005 | AI Chatbot & Export Functionality | FR-054, FR-055, FR-056, FR-057, FR-058, FR-059, FR-060, FR-061, FR-062, FR-063, FR-064, FR-065, FR-066, FR-067, FR-068, FR-117, FR-118, FR-119, FR-120, FR-121, FR-122, FR-123, FR-124, FR-125, FR-126, TR-010, NFR-015, DR-011 |
| EP-006 | Accessibility, Performance & Quality Standards | FR-101, FR-102, FR-103, FR-104, FR-105, FR-106, FR-107, FR-108, FR-109, FR-110, TR-019, TR-020, NFR-001, NFR-002, NFR-003, NFR-004, NFR-005, NFR-007, NFR-008, NFR-010, NFR-016, NFR-017, NFR-018, UXR-101, UXR-102, UXR-103, UXR-104, UXR-105 |
| EP-007 | Testing & Quality Assurance | NFR-009, NFR-020, TR-020 |

**Notes:**
1. This is a brown-field project enhancing existing Django application with modern React frontend
2. No EP-TECH epic required as project scaffolding already exists
3. No EP-DATA epic required as database schema remains unchanged (NFR-011)
4. All requirements mapped to exactly one epic (no orphaned requirements)
5. Consolidated from 15+ epics into 7 strategic epics for streamlined delivery
6. Epics ordered by dependency and business value priority

---

## Epic Descriptions

### EP-001: Frontend Foundation & Design System

**Business Value:** Establishes the foundational architecture and design system that enables all subsequent UI/UX development. Ensures consistency, maintainability, and scalability across the entire application. Includes interaction design patterns, animations, and error handling components to deliver a polished, professional user experience.

**Description:** Set up React + TypeScript + Vite frontend project with comprehensive design system implementation. Create reusable component library based on shadcn/ui with TailwindCSS for styling. Define color palette, typography hierarchy, spacing system, elevation shadows, and all visual design standards. Implement interaction design patterns with Framer Motion for animations, micro-interactions, and comprehensive error handling system with inline validation, toast notifications, and user feedback mechanisms.

**UI Impact:** Yes

**Screen References:** All screens (SCR-001 through SCR-005) - Foundation for entire UI

**Key Deliverables:**
- React 18+ project with TypeScript and Vite build tooling
- TailwindCSS configuration with custom design system tokens
- shadcn/ui component library installation and configuration
- Color palette implementation (Primary Blue #3B82F6, Secondary Indigo #6366F1, Success Green #10B981, Warning Amber #F59E0B, Error Red #EF4444, Neutral Gray scale) with WCAG 2.1 AA contrast compliance
- Typography scale configuration (H1 36px/700, H2 30px/600, H3 24px/600, H4 20px/600, Body 16px/400, Small 14px/400, Caption 12px/400 with Inter and Fira Code fonts)
- Spacing system based on 4px/8px grid (0, 4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px, 96px)
- Elevation shadow definitions (4 levels for cards, dropdowns, modals, sticky headers)
- Reusable component library: Buttons (primary, secondary, tertiary, danger), Form inputs (text, file upload, select, checkbox, radio), Cards, Tables, Modals/Dialogs, Toast notifications, Loading indicators, Navigation components, Icons
- Framer Motion integration for animations and micro-interactions
- Button hover effect (scale 1.02, 150ms transition)
- Card hover effect (shadow lift, 200ms transition)
- Page transitions (fade-in, 300ms duration)
- Toast notification system (slide in from top-right, auto-dismiss after 5 seconds)
- Skeleton screens and loading spinners matching final content layout
- Shake animation for form validation errors
- Empty states with illustrative icons, clear headings, descriptive text, and primary action buttons
- Inline validation errors with red border and error messages
- Success/error toast notifications with icons
- Detailed error messages with suggested corrective actions
- Confirmation dialogs for destructive actions
- ARIA live regions for screen reader announcements
- prefers-reduced-motion support for all animations

**Dependent EPICs:** None (foundational epic)

---

### EP-002: Navigation & Application Architecture

**Business Value:** Provides intuitive navigation structure enabling users to access any feature within 2 clicks, while establishing backend API integration, responsive layouts, and state management infrastructure. Reduces time-to-task by 40% through streamlined information architecture and ensures seamless cross-device compatibility supporting 30% of users on tablets.

**Description:** Implement comprehensive navigation system with fixed top navigation bar, breadcrumb navigation, and responsive mobile navigation. Create React Router configuration with lazy-loaded routes for Dashboard, Upload, Processing, Results, and History pages. Build dashboard landing page with welcome message, prominent "Upload New Document" CTA, recent extractions widget, and quick statistics. Implement Django REST Framework API layer with React Query for server state management. Configure responsive layouts across desktop (≥1024px), tablet (768px-1023px), and mobile (<768px) breakpoints.

**UI Impact:** Yes

**Screen References:** All screens (SCR-001, SCR-002, SCR-003, SCR-004, SCR-005)

**Key Deliverables:**
- Fixed top navigation bar with application logo, main menu items (Dashboard, Upload, History), user profile icon
- Active page highlighting with visual indicator (color change, underline, or background)
- Breadcrumb navigation component showing current page hierarchy
- Responsive mobile navigation with hamburger menu (<768px)
- React Router v6 configuration with lazy-loaded route components
- Deep linking support for bookmarking specific pages
- Navigation within 2 clicks from any page validation
- Dashboard page component with welcome message and user context
- Prominent "Upload New Document" call-to-action button
- Recent extractions widget displaying last 5-10 documents with thumbnails, filenames, upload dates, status badges
- Quick statistics section: Total documents processed, Success rate percentage, Recent activity count
- Quick action links to Upload, History, and Settings
- React Query integration for fetching dashboard data from `/api/documents/recent/` endpoint
- Loading skeleton screens matching final layout
- Empty state with "Upload Your First Document" CTA when no documents exist
- Responsive layouts: Desktop (≥1024px) multi-column with 3-column grid, Tablet (768px-1023px) adaptive 2-column, Mobile (<768px) single-column stacked
- Touch-optimized controls with minimum 44x44px target size on mobile
- Images and PDFs scale appropriately for different screen sizes
- Hamburger menu on mobile, full menu on desktop
- All text readable without horizontal scrolling on mobile
- Django REST Framework ModelViewSet and Serializers for Document and ExtractionResult models
- API endpoints: `/api/documents/`, `/api/documents/recent/`, `/api/extract/`, `/api/documents/{id}/`, `/api/documents/{id}/delete/`, `/api/chat/`
- JSON serialization of extraction results following DRF conventions
- React Query configuration with staleTime, cacheTime, refetchOnWindowFocus
- Optimistic updates for inline editing and delete operations
- Django CORS Headers configuration for cross-origin requests from React dev server (localhost:5173)
- CSRF token handling using DRF's CSRF cookie mechanism
- WhiteNoise middleware for serving React production build
- Vite proxy configuration forwarding `/api/*` requests to Django backend during development
- Browser localStorage for caching user preferences (view mode, filter state, sort order)
- Referential integrity between uploaded documents and extraction results with foreign key relationships
- Backward compatibility with existing Django 4.2.16 backend
- Maintain existing OpenAI GPT and Gemini API integrations without modification

**Dependent EPICs:** EP-001

---

### EP-003: Document Upload & Multi-Document Processing

**Business Value:** Streamlines document upload process with unified multi-file drop zone supporting dual-document processing (loan applications and tax return forms), reducing upload time by 50% and minimizing user errors through inline validation. Enables batch processing workflow that reduces multi-document processing time by 60%.

**Description:** Implement unified multi-file document upload workflow with a single drag-and-drop zone (no section headings), file list management, LLM model selection, and file validation. Support up to 10 files per upload session with automatic duplicate detection. First file maps as loan_file, second as tax_file for backend dual-document processing. Create processing status page with loading spinner, status messages, and automatic redirect to results upon completion. Implement dual-document detection and tab-based results navigation.

**UI Impact:** Yes

**Screen References:** SCR-002 (Document Upload), SCR-003 (Processing Status)

**Key Deliverables:**
- Single unified drag-and-drop zone (no separate sections) using native file input with visual feedback (dashed border highlight on drag-over)
- Click-to-browse file selection fallback (multi-file support)
- File validation for type (PDF only), size (≤10MB per file), and duplicate filename detection with immediate feedback
- Inline error messages: "File type not supported. Please upload a PDF file", "File size exceeds 10MB limit", or "File already added"
- File list below drop zone showing each uploaded file with PDF icon, filename, file size, and individual remove button (X icon)
- Support for up to 10 files per upload session (MAX_FILES = 10)
- LLM model selection UI with radio buttons/cards for OpenAI GPT and Gemini with descriptions
- "Extract Entities" button disabled until at least one file and model selected
- Automatic mapping: files[0] → loan_file, files[1] → tax_file for backend `/api/extract/` endpoint compatibility
- Redirect to processing status page after successful upload
- Centered form container (max-width: 640px)
- Processing status page with large animated loading spinner
- Status message: "Processing your document..." with filename and selected model display
- Dual-document detection (isDualUpload flag) with appropriate progress messaging for multi-document extraction
- Estimated time remaining indicator ("This may take 10-30 seconds")
- Automatic redirect to results page upon successful completion (2-second delay with success icon)
- Error state with error icon, detailed error message, and recovery options (Retry, Change Model, Cancel buttons)
- Page transitions <300ms per NFR-013
- Breadcrumb navigation: "Home > Upload Document > Processing"

**Dependent EPICs:** EP-001, EP-002

---

### EP-004: Results Display & Entity Management

**Business Value:** Core work screen enabling efficient review and editing of extracted entity data, reducing data verification time by 40% through structured visualization, inline editing capabilities, dual-document support, and AI chatbot Q&A.

**Description:** Build comprehensive results display page with card-based and table-based entity visualization, PDF viewer integration, dual-document tab navigation, nested object rendering, and inline editing functionality. Integrate AI chatbot overlay for contextual Q&A. Implement TanStack Table v8 for sortable, filterable tables with virtualization for large datasets. Use react-pdf for PDF rendering with zoom and navigation controls.

**UI Impact:** Yes

**Screen References:** SCR-004 (Results/Output Display)

**Key Deliverables:**
- Document information header with filename, upload date, model used, processing time, and action buttons (Edit, Export, Delete)
- **Dual-document tab navigation**: Tab bar for switching between "Loan Application" and "Tax Return Form" when both documents are processed
- Entity display organized by categories — **Loan**: Lender Information, Borrower Details, Loan Terms, Location Data, Person Information; **Tax Return**: Taxpayer Information, Filing Information, Income Details, Deductions, Tax Calculations, Refund or Amount Due
- **Nested object rendering**: Grouped sub-sections with numbered labels (e.g., "Taxpayer 1", "Taxpayer 2") with structured field-value pairs instead of flattened inline text
- Card View (default): Each category in separate card with field label + value pairs, nested sub-sections, confidence scores, click-to-edit inline editing
- Table View: Each category as dedicated table with columns (Field Name, Extracted Value), sortable columns, quick-search filter, sticky headers, row striping
- Toggle switch for Card View ↔ Table View with state persistence in localStorage
- TanStack Table v8 configuration with sorting, filtering, inline editing capabilities
- TanStack Virtual for virtualization when entity count >100 rows (NFR-019)
- Click-to-edit pattern with validation and optimistic updates via React Query
- Visual placeholder "--" for empty or null fields with muted styling
- Confidence score badges when available from LLM response
- PDF viewer panel using react-pdf with zoom controls (Zoom In, Zoom Out, Fit to Width, Fit to Page)
- PDF page navigation (Previous, Next, Page X of Y) and full-screen option
- Side-by-side layout (desktop 60% entities / 40% PDF), tabbed interface (tablet/mobile)
- Responsive tables with horizontal scrolling on mobile, full-width on desktop
- Accessible table markup with `<thead>`, `<tbody>`, `<th scope>` attributes and ARIA labels
- "Copy Row" action to copy field label and value to clipboard
- "Process Another Document" quick action button
- Document history page with grid view (cards) and list view (table) toggle
- Search input with debounced search (300ms) filtering by filename
- Filter dropdowns: Date Range, Status, Model
- Sorting by upload date, filename, status (ascending/descending)
- Document cards/rows showing: Thumbnail, Filename, Upload date, Status badge, Model badge, Actions (View, Delete)
- Pagination with page numbers, Previous/Next buttons, items-per-page selector (10, 25, 50, 100)
- Click document card/row to navigate to Results page for that document
- Delete functionality with confirmation dialog
- Soft delete implementation maintaining audit history (DR-013)
- Empty states for no documents and no search results with helpful guidance
- "Clear Filters" button to reset all filters to default

**Dependent EPICs:** EP-001, EP-002, EP-003

---

### EP-005: AI Chatbot & Export Functionality

**Business Value:** Enhances user productivity by enabling contextual Q&A about extracted document data directly on the Results page, reducing manual data entry by 80% through multi-format export capabilities. Improves data comprehension by 30% through AI-assisted document analysis.

**Description:** Implement AI-powered chatbot overlay on the Results page using Azure OpenAI as the primary LLM service with Google Gemini as automatic fallback. Provide context-aware answers based on extracted document data with dual-document awareness. Implement comprehensive client-side export functionality supporting JSON (implemented), CSV, Excel (.xlsx with multi-sheet workbooks), and PDF report formats. Excel export includes formatted headers, auto-sized columns, number formatting, and metadata overview worksheet.

**UI Impact:** Yes

**Screen References:** SCR-004 (Results/Output Display)

**Key Deliverables:**
- Floating Action Button (FAB) at bottom-right of Results page to toggle chatbot overlay
- Chatbot overlay window (380×520px) with header, scrollable message area, and input field
- Header title: "Dual Document Assistant" (both docs) or "Document Assistant" (single doc)
- POST endpoint integration with `/api/chat/` sending user message, conversation history, and extraction context
- Azure OpenAI as primary chatbot service with automatic fallback to Google Gemini (gemini-2.5-flash)
- Markdown rendering of AI responses using ReactMarkdown
- Conversation history management: rolling window of last 10 messages for context continuity
- Multiline input support via Shift+Enter; Enter to send
- Typing indicator (animated dots) while waiting for AI response
- Auto-focus on input field when chatbot opens
- Dual-document context: chatbot includes both loan and tax extraction data when available
- Close button in header; clicking FAB again also closes overlay
- Conversation history preserved in client-side state for session duration (not persisted)
- Export dropdown button with options: Download as JSON (implemented), Download as CSV (planned), Download as Excel (planned), Generate PDF Report (planned)
- JSON export with download trigger using Blob API (implemented)
- CSV export with flattened entity data using custom serialization
- Excel export using SheetJS (xlsx library) with client-side generation (no server round-trip)
- Multi-sheet Excel workbook: Overview worksheet + separate worksheets for each entity category (Lender, Borrower, Loan Terms, Location, Person, Tax entities)
- Formatted Excel headers: Bold font, blue background (#3B82F6), white text, frozen pane
- Auto-sized columns to fit content width
- Number formatting: Currency as `$#,##0.00`, Percentages as `0.00%`
- Excel filename pattern: `{document_name}_entities_{YYYY-MM-DD}.xlsx`
- Loading spinner on export button during file generation
- Success toast notification: "Excel file downloaded successfully"
- Edge case handling: Empty categories produce empty sheet with headers only, special characters properly escaped
- Keyboard accessible export button with ARIA label "Export extraction results to Excel spreadsheet"
- PDF report generation with formatted entity data and document reference

**Dependent EPICs:** EP-001, EP-002, EP-004

---

### EP-006: Accessibility, Performance & Quality Standards
**Business Value:** Ensures legal compliance with WCAG 2.1 Level AA standards, achieves target performance metrics (FCP <2s, TTI <5s, Page load <3s) improving user experience by 35%, and expands user base to include users with disabilities while reducing accessibility-related legal risks.

**Description:** Implement comprehensive accessibility features including full keyboard navigation, screen reader compatibility, ARIA labels, semantic HTML structure, color contrast compliance, focus indicators, and skip navigation links. Conduct automated and manual accessibility testing to achieve ≥95 Lighthouse accessibility score. Implement performance optimization strategy including code splitting, lazy loading for heavy components, bundle size optimization, and performance monitoring with Lighthouse CI.

**UI Impact:** Yes (accessibility features), No (performance optimizations are transparent)

**Screen References:** All screens (SCR-001 through SCR-005)

**Key Deliverables:**
- Full keyboard navigation with Tab, Enter, Esc key support for all interactive elements
- Visible focus indicators (2px outline) on all focusable elements
- ARIA labels for icon-only buttons (e.g., aria-label="Upload document")
- Semantic HTML structure with proper heading hierarchy (h1 > h2 > h3 > h4), landmarks (header, nav, main, footer), and lists
- Alt text for all images and decorative icons (alt="" for decorative)
- Color not used as sole indicator of information (combined with icons, text, or patterns)
- Form labels properly associated with inputs using `<label for="">` or aria-labelledby
- ARIA live regions for announcing error messages and dynamic content to screen readers
- Skip navigation link for keyboard users to bypass repetitive content
- Minimum touch target size 44x44px for all interactive elements on mobile
- Color contrast ratios ≥4.5:1 for normal text, ≥3:1 for large text (all combinations validated)
- Automated accessibility testing with axe DevTools and Lighthouse in CI pipeline
- Manual screen reader testing with NVDA, JAWS, VoiceOver
- Lighthouse accessibility score ≥95
- Route-based code splitting with React.lazy() for Dashboard, Upload, Processing, Results, History pages
- Dynamic imports for heavy components: PDF viewer (react-pdf), TanStack Table, Excel export (SheetJS)
- Suspense boundaries with skeleton screens for lazy-loaded components
- Vite build configuration with chunk size analysis and optimization
- Initial JavaScript bundle size <300KB gzipped (NFR-016)
- Tree-shaking and minification for production builds
- Image optimization with compression and WebP format
- React.memo() for expensive components to prevent unnecessary re-renders
- useCallback and useMemo for performance-critical functions and computed values
- React Query configuration with appropriate staleTime and cacheTime for reduced API calls
- Lighthouse CI configuration in development pipeline with performance budgets: FCP <2s, TTI <5s, CLS <0.1, Accessibility ≥95
- Testing on 3G throttled connection (1.6 Mbps, 300ms RTT) to validate performance targets
- Performance monitoring with React DevTools profiler
- Virtualization for tables with >100 rows using TanStack Virtual (NFR-019)
- PDF file handling up to 10MB without client-side memory overflow (NFR-010)
- Support for 50 concurrent users without performance degradation (NFR-005)

**Dependent EPICs:** EP-001, EP-002

---

### EP-007: Testing & Quality Assurance

**Business Value:** Ensures high-quality, bug-free release reducing post-launch defects by 70% and minimizing support tickets through comprehensive testing coverage.

**Description:** Implement comprehensive testing strategy including unit tests with Vitest and React Testing Library, integration tests for API interactions, E2E tests with Playwright covering critical user flows, cross-browser compatibility testing, accessibility testing, and usability testing with end users.

**UI Impact:** No (testing infrastructure)

**Screen References:** N/A (tests all screens)

**Key Deliverables:**
- Unit tests for React components using Vitest and React Testing Library
- Integration tests for API interactions with mocked responses
- E2E tests with Playwright covering critical user flows: Upload → Process → View Results → Export → History
- Cross-browser compatibility testing on Chrome, Firefox, Safari, Edge (latest 2 versions) per NFR-009
- Automated accessibility testing with axe DevTools and Lighthouse
- Manual screen reader testing with NVDA, JAWS, VoiceOver
- Responsive layout testing on physical devices: iPhone 13 (375px), iPad Pro (1024px), Desktop (1920px)
- Load testing with 50 concurrent users to validate NFR-005
- Usability testing with 3-5 financial analysts for feedback
- Performance validation: Page load <3s, TTI <5s, FCP <2s, CLS <0.1
- Lighthouse CI automated testing in development pipeline
- Bug tracking and regression testing
- Staging environment smoke testing before production deployment
- Test coverage reports and quality metrics
- Timeline compliance: Complete within 6-8 weeks (NFR-020)

**Dependent EPICs:** EP-001, EP-002, EP-003, EP-004, EP-005, EP-006

---

## Backlog Refinement Requirements

**No [UNCLEAR] requirements identified.** All requirements from BRD_UI_UX_Enhancement.md, spec.md, design.md, and figma_spec.md are clear and actionable.

---

## Requirements Traceability Matrix

### Functional Requirements (FR-001 to FR-132)
- **FR-001 to FR-012:** EP-002 (Navigation & Application Architecture)
- **FR-013 to FR-026, FR-127 to FR-132:** EP-003 (Document Upload & Multi-Document Processing)
- **FR-032 to FR-078:** EP-004 (Results Display & Entity Management)
- **FR-054 to FR-068, FR-117 to FR-126:** EP-005 (AI Chatbot & Export Functionality)
- **FR-079 to FR-100:** EP-001 (Frontend Foundation & Design System)
- **FR-101 to FR-116:** EP-006 (Accessibility, Performance & Quality Standards)

### Non-Functional Requirements (NFR-001 to NFR-020)
- **NFR-001 to NFR-010, NFR-016 to NFR-019:** EP-006 (Accessibility, Performance & Quality Standards)
- **NFR-006, NFR-011, NFR-012:** EP-002 (Navigation & Application Architecture)
- **NFR-013, NFR-014:** EP-001 (Frontend Foundation & Design System)
- **NFR-015:** EP-005 (AI Chatbot & Export Functionality)
- **NFR-009, NFR-020:** EP-007 (Testing & Quality Assurance)

### Technical Requirements (TR-001 to TR-020)
- **TR-001, TR-003, TR-004, TR-005, TR-006, TR-010, TR-013:** EP-001 (Frontend Foundation & Design System)
- **TR-002, TR-007, TR-015, TR-016, TR-017, TR-018:** EP-002 (Navigation & Application Architecture)
- **TR-011:** EP-003 (Document Upload & Multi-Document Processing)
- **TR-008, TR-009, TR-012:** EP-004 (Results Display & Entity Management)
- **TR-019, TR-020:** EP-006 (Accessibility, Performance & Quality Standards), EP-007 (Testing & Quality Assurance)

### Data Requirements (DR-001 to DR-015)
- **DR-007, DR-010, DR-012:** EP-002 (Navigation & Application Architecture)
- **DR-009:** EP-003 (Document Upload & Multi-Document Processing)
- **DR-004, DR-006, DR-008, DR-013, DR-014, DR-015:** EP-004 (Results Display & Entity Management)
- **DR-011:** EP-005 (AI Chatbot & Export Functionality)

### UX Requirements (UXR-001 to UXR-504)
- **UXR-001, UXR-002, UXR-003, UXR-201, UXR-202, UXR-203, UXR-503:** EP-002 (Navigation & Application Architecture)
- **UXR-402, UXR-501:** EP-003 (Document Upload & Multi-Document Processing)
- **UXR-402, UXR-503, UXR-504:** EP-004 (Results Display & Entity Management)
- **UXR-301, UXR-302, UXR-303, UXR-401, UXR-403, UXR-404, UXR-501, UXR-502:** EP-001 (Frontend Foundation & Design System)
- **UXR-101 to UXR-105:** EP-006 (Accessibility, Performance & Quality Standards)

---

## Epic Dependency Graph

```
EP-001 (Frontend Foundation & Design System)
  ├─> EP-002 (Navigation & Application Architecture)
  │     └─> EP-003 (Document Upload & Multi-Document Processing)
  │           └─> EP-004 (Results Display & Entity Management)
  │                 └─> EP-005 (AI Chatbot & Export Functionality)
  └─> EP-006 (Accessibility, Performance & Quality Standards)
        └─> EP-007 (Testing & Quality Assurance)
```

**Critical Path:** EP-001 → EP-002 → EP-003 → EP-004 → EP-005 → EP-007

---

## Implementation Sequence Recommendation

**Phase 1 - Foundation (Week 1-2):**
1. EP-001: Frontend Foundation & Design System

**Phase 2 - Core Architecture (Week 2-3):**
2. EP-002: Navigation & Application Architecture

**Phase 3 - Upload & Processing (Week 3-4):**
3. EP-003: Document Upload & Multi-Document Processing

**Phase 4 - Results & History (Week 4-6):**
4. EP-004: Results Display & Entity Management

**Phase 5 - Advanced Features (Week 6-7):**
5. EP-005: AI Chatbot & Export Functionality

**Phase 6 - Quality & Performance (Week 7):**
6. EP-006: Accessibility, Performance & Quality Standards

**Phase 7 - Testing & QA (Week 7-8):**
7. EP-007: Testing & Quality Assurance

---

**Total Epics:** 7  
**Total Requirements Mapped:** 132 FR + 20 NFR + 20 TR + 15 DR + 17 UXR = 204 requirements  
**Zero Orphaned Requirements:** ✓ All requirements mapped to exactly one epic  
**Brown-field Project:** ✓ Existing Django application with functional backend  
**No EP-TECH Required:** ✓ Project scaffolding already exists  
**No EP-DATA Required:** ✓ Database schema unchanged per NFR-011

---

*End of Epic Decomposition Document*
