# Architecture Design

## Project Overview

GenAI PDF Extractor UI/UX Modernization transforms a minimal single-page Django application into a modern, professional, multi-page web application with industry-standard UI/UX design. The project targets financial analysts processing loan documentation, providing intuitive navigation, responsive layouts, enhanced data visualization, and improved user workflows while maintaining the existing Django backend and LLM integration capabilities (OpenAI GPT and Google Gemini).

**Target Users**: Financial analysts processing 5-20 loan documents per day  
**High-Level Capabilities**: PDF upload with drag-and-drop, AI-powered entity extraction, structured data visualization (card/table views), multi-format export (JSON/CSV/Excel/PDF), document history management, and responsive design across desktop/tablet/mobile devices

## Architecture Goals

- **Goal 1**: Achieve 40% productivity improvement by reducing document processing time from ~5 minutes to <3 minutes through enhanced UI/UX workflows
- **Goal 2**: Deliver enterprise-grade user experience with WCAG 2.1 Level AA accessibility compliance, enabling broader user adoption and legal compliance
- **Goal 3**: Maintain full backward compatibility with existing Django backend, LLM integrations, and data models without database schema changes
- **Goal 4**: Implement hybrid architecture (Django REST Framework APIs + React SPA) that enables future commercialization and external deployment
- **Goal 5**: Meet strict performance budgets: Page load <3s, TTI <5s, FCP <2s, CLS <0.1 on 3G connections

## Non-Functional Requirements

- NFR-001: System MUST achieve First Contentful Paint (FCP) < 2 seconds on 3G network connection (1.6 Mbps, 300ms RTT)
- NFR-002: System MUST achieve Time to Interactive (TTI) < 5 seconds on 3G network connection
- NFR-003: System MUST achieve initial page load time < 3 seconds on 3G network connection
- NFR-004: System MUST maintain Cumulative Layout Shift (CLS) < 0.1 to prevent visual instability during page load
- NFR-005: System MUST support concurrent usage by up to 50 financial analysts without performance degradation
- NFR-006: System MUST render responsive layouts correctly on desktop (≥1024px), tablet (768px-1023px), and mobile (<768px) viewports
- NFR-007: System MUST achieve WCAG 2.1 Level AA accessibility compliance with minimum contrast ratios of 4.5:1 for normal text and 3:1 for large text
- NFR-008: System MUST support keyboard navigation for all interactive elements with visible focus indicators (2px outline)
- NFR-009: System MUST be compatible with latest 2 versions of Chrome, Firefox, Safari, and Edge browsers
- NFR-010: System MUST handle PDF files up to 10MB without client-side memory overflow or browser crashes
- NFR-011: System MUST maintain backward compatibility with existing Django 4.2.16 backend and SQLite database
- NFR-012: System MUST preserve existing OpenAI GPT-3.5-turbo and Google Gemini 2.5-flash API integrations without modification
- NFR-013: System MUST complete page transitions within 300ms to maintain perceived responsiveness
- NFR-014: System MUST implement proper error handling with user-friendly error messages and recovery options
- NFR-015: System MUST support client-side Excel export generation without server round-trip to reduce latency
- NFR-016: System MUST implement code splitting to keep initial JavaScript bundle size < 300KB (gzipped)
- NFR-017: System MUST use lazy loading for heavy components (PDF viewer, table library) to improve initial load time
- NFR-018: System MUST provide screen reader compatibility with proper ARIA labels and semantic HTML structure
- NFR-019: System MUST implement virtualization for tables with >100 rows to maintain smooth scrolling performance
- NFR-020: System MUST complete within 6-8 week timeline with limited team resources (1 UI/UX Designer 50%, 2 Frontend Developers 100%, 1 Backend Developer 25%, 1 QA Engineer 50%)

## Data Requirements

- DR-001: System MUST persist uploaded PDF files in `media/uploads/` directory with original filenames
- DR-002: System MUST store extraction results in database with metadata including filename, upload timestamp, selected model (OpenAI/Gemini), processing status, and processing time
- DR-003: System MUST maintain data integrity for extracted entities organized by categories: Lender Information, Borrower Details, Loan Terms, Location Data, Person Information
- DR-004: System MUST support inline editing of extracted entity values with validation and persistence to database
- DR-005: System MUST create audit trail for user edits recording timestamp, field name, old value, new value, and user identifier
- DR-006: System MUST retain document history with searchable and filterable metadata for all processed documents
- DR-007: System MUST support JSON serialization of extraction results for API responses following Django REST Framework conventions
- DR-008: System MUST handle nested JSON objects by flattening to dot-notation or expandable structures for table display
- DR-009: System MUST validate uploaded files for type (PDF only) and size (≤10MB) before processing
- DR-010: System MUST cache user preferences (view mode, filter state, sort order) in browser localStorage for session persistence
- DR-011: System MUST support data export in multiple formats (JSON, CSV, Excel .xlsx, PDF) without data loss or corruption
- DR-012: System MUST maintain referential integrity between uploaded documents and extraction results with proper foreign key relationships
- DR-013: System MUST implement soft delete for documents to enable recovery and maintain audit history
- DR-014: System MUST store confidence scores for extracted fields when available from LLM responses
- DR-015: System MUST handle empty or null field values with appropriate placeholders ("--") in UI display

### Domain Entities

- **Document**: Represents uploaded PDF file with attributes: id (UUID), filename (string), file_path (string), upload_timestamp (datetime), user_id (foreign key), file_size (integer bytes), status (enum: Processing/Success/Failed), selected_model (enum: OpenAI/Gemini), processing_time (integer milliseconds)

- **ExtractionResult**: Represents AI-extracted entity data with attributes: id (UUID), document_id (foreign key), extraction_data (JSON), created_at (datetime), updated_at (datetime), confidence_scores (JSON optional). Relationships: One-to-One with Document

- **EntityEdit**: Represents audit trail for manual corrections with attributes: id (UUID), extraction_result_id (foreign key), field_name (string), old_value (string), new_value (string), edited_by (user_id), edited_at (datetime). Relationships: Many-to-One with ExtractionResult

- **UserPreference**: Represents cached user settings with attributes: id (UUID), user_id (foreign key), preference_key (string), preference_value (JSON), updated_at (datetime). Relationships: Many-to-One with User

## AI Consideration

**Status:** Not applicable

**Rationale:** No `[AI-CANDIDATE]` or `[HYBRID]` tags present in spec.md. All functional requirements are marked as `[DETERMINISTIC]`. The project leverages existing AI capabilities (OpenAI GPT and Google Gemini) for entity extraction, but the UI/UX modernization itself follows deterministic architecture patterns. The AI integration is already implemented in the backend and remains unchanged.

## Architecture and Design Decisions

- **Decision 1: Hybrid Architecture (Django REST Framework + React SPA)**: Selected hybrid approach over full Django templates or full decoupled SPA. Django serves RESTful APIs while React handles all UI rendering. Justifies NFR-011 (backward compatibility), enables future commercialization, and provides clear separation of concerns. Django continues managing authentication, file storage, LLM integration, and data persistence.

- **Decision 2: Client-Side Excel Export with SheetJS**: Implement Excel generation in browser using SheetJS library rather than server-side generation. Reduces server load, eliminates network round-trip latency (NFR-015), enables offline export capability, and provides immediate user feedback. Trade-off: Increases client bundle size by ~100KB but acceptable within NFR-016 budget.

- **Decision 3: Component-Based Design System with shadcn/ui**: Use shadcn/ui copy-paste components over traditional component libraries (Material-UI, Ant Design). Provides full code ownership, eliminates dependency bloat, ensures WCAG 2.1 AA accessibility (NFR-007), and enables unlimited customization. Built on Radix UI primitives for robust accessibility foundation.

- **Decision 4: TanStack Table v8 with Virtualization**: Selected TanStack Table over AG Grid or React Table v7 for data tables. Provides headless architecture for full styling control, built-in virtualization support (NFR-019), excellent TypeScript support, and active maintenance. Pair with TanStack Virtual for rendering optimization on large datasets (>100 rows).

- **Decision 5: Code Splitting and Lazy Loading Strategy**: Implement route-based code splitting with React.lazy() and dynamic imports for heavy components (PDF viewer, table library, Excel export). Meets NFR-016 (bundle size <300KB gzipped) and NFR-017 (lazy loading). Use Suspense boundaries with skeleton screens for loading states.

- **Decision 6: Django REST Framework for API Layer**: Use DRF ModelViewSet and Serializers for API endpoints over custom Django views. Provides standardized JSON responses, built-in validation, automatic API documentation, and proven integration patterns with React SPAs. Maintains NFR-011 (backward compatibility) while enabling clean API contracts.

- **Decision 7: Vite Build Tool over Create React App**: Select Vite for faster development server (HMR <50ms), optimized production builds with Rollup, and better tree-shaking. CRA is deprecated and slower. Vite meets NFR-001, NFR-002, NFR-003 performance requirements through efficient bundling and code splitting.

- **Decision 8: React Query (TanStack Query) for Server State**: Implement React Query for API data fetching, caching, and synchronization over Redux or Context API. Provides automatic background refetching, optimistic updates, request deduplication, and built-in loading/error states. Reduces boilerplate and improves UX responsiveness (NFR-013).

- **Decision 9: Framer Motion for Animations**: Use Framer Motion for page transitions and micro-interactions over CSS animations or React Spring. Provides declarative API, accessibility-aware animations (respects prefers-reduced-motion), and excellent performance. Supports NFR-013 (transitions <300ms) with hardware-accelerated transforms.

- **Decision 10: SQLite Database Retention**: Maintain existing SQLite database for development and small-scale deployment per NFR-011 (backward compatibility). Document migration path to PostgreSQL for production scaling if concurrent users exceed 50 (NFR-005). SQLite sufficient for current internal deployment with 50 analysts.

## Technology Stack

| Layer | Technology | Version | Justification (NFR/DR/AIR) |
|-------|------------|---------|----------------------------|
| Frontend | React | 18.3+ | NFR-001, NFR-002, NFR-003: Concurrent rendering features (useTransition, useDeferredValue) improve responsiveness. Virtual DOM minimizes re-renders for performance. |
| Frontend | TypeScript | 5.3+ | NFR-014: Type safety reduces runtime errors. Improves developer experience and code maintainability. |
| Frontend | Vite | 5.0+ | NFR-001, NFR-002, NFR-016: Fast HMR, optimized production builds, efficient code splitting. Replaces deprecated CRA. |
| Frontend | TailwindCSS | 3.4+ | NFR-006, NFR-007: Utility-first CSS enables responsive design and consistent design system. Purges unused styles for small bundle size. |
| Frontend | shadcn/ui | Latest | NFR-007, NFR-008, NFR-018: Pre-built accessible components (Radix UI primitives). WCAG 2.1 AA compliant with ARIA labels and keyboard navigation. |
| Frontend | Lucide React | Latest | NFR-007: Consistent iconography with accessibility support. Tree-shakeable for minimal bundle impact. |
| Frontend | React Query (TanStack Query) | 5.0+ | NFR-013, NFR-014: Server state management with caching, background refetching, optimistic updates. Reduces API calls and improves UX. |
| Frontend | React Hook Form | 7.50+ | NFR-014: Performant form handling with minimal re-renders. Built-in validation with Zod schema integration. |
| Frontend | Zod | 3.22+ | NFR-014, DR-009: Schema validation for form inputs and API responses. Type-safe validation with TypeScript inference. |
| Frontend | react-pdf / PDF.js | 7.7+ / 4.0+ | NFR-010, NFR-017: Client-side PDF rendering with zoom and navigation. Lazy loaded to reduce initial bundle size. |
| Frontend | react-dropzone | 14.2+ | DR-009: Drag-and-drop file upload with validation. Accessible file input with keyboard support. |
| Frontend | Framer Motion | 11.0+ | NFR-013: Declarative animations with accessibility support (prefers-reduced-motion). Hardware-accelerated for smooth transitions <300ms. |
| Frontend | TanStack Table (React Table v8) | 8.11+ | NFR-019, DR-008: Headless table library with virtualization support. Sortable, filterable, editable tables with TypeScript support. |
| Frontend | TanStack Virtual | 3.0+ | NFR-019: Virtualization for large datasets (>100 rows). Maintains 60fps scrolling with thousands of rows. |
| Frontend | SheetJS (xlsx) | 0.18+ | NFR-015, DR-011: Client-side Excel export with multi-sheet workbooks, formatting, auto-sizing. No server round-trip required. |
| Backend | Django | 4.2.16 | NFR-011: Existing version maintained for backward compatibility. Stable LTS release with security updates. |
| Backend | Django REST Framework | 3.14+ | NFR-012, DR-007: RESTful API framework with serializers, viewsets, authentication. Industry standard for Django + React integration. |
| Backend | Python | 3.11+ | NFR-011: Compatible with existing codebase. Modern Python features with performance improvements. |
| Database | SQLite | 3.x | NFR-011, DR-001, DR-002: Existing database maintained for backward compatibility. Sufficient for 50 concurrent users. |
| AI/ML | OpenAI API | GPT-3.5-turbo | NFR-012: Existing integration maintained. Fast entity extraction for standard documents. |
| AI/ML | Google Gemini API | 2.5-flash | NFR-012: Existing integration maintained. Advanced processing for complex layouts. |
| Testing | Vitest | 1.2+ | NFR-009: Fast unit testing for React components. Vite-native test runner with Jest-compatible API. |
| Testing | React Testing Library | 14.1+ | NFR-007, NFR-018: Accessibility-focused testing. Encourages testing user interactions over implementation details. |
| Testing | Playwright | 1.40+ | NFR-009: E2E testing across Chrome, Firefox, Safari, Edge. Automated accessibility testing with axe-core integration. |
| Infrastructure | Node.js | 20 LTS | NFR-020: Required for Vite build tooling and development server. LTS version for stability. |
| Infrastructure | npm / pnpm | 10+ / 8+ | NFR-016: Package management with efficient dependency resolution. pnpm preferred for disk space efficiency. |
| Security | CORS Middleware | Django CORS Headers 4.3+ | NFR-011: Enable cross-origin requests from React dev server to Django API. Production configuration for same-origin. |
| Security | CSRF Protection | Django built-in | NFR-014: CSRF token validation for state-changing API requests. DRF integration with token headers. |
| Deployment | Static File Serving | WhiteNoise 6.6+ | NFR-003: Efficient static file serving from Django. Compression and caching headers for production. |
| Monitoring | React DevTools | Latest | NFR-001, NFR-002: Component profiling and performance monitoring during development. |
| Monitoring | Lighthouse CI | Latest | NFR-001, NFR-002, NFR-003, NFR-004: Automated performance budgets and accessibility testing in CI pipeline. |
| Documentation | Storybook | 7.6+ | NFR-020: Component documentation and visual testing. Accelerates development with isolated component development. |

### Alternative Technology Options

- **Alternative 1: Next.js App Router instead of Vite + React**: Considered Next.js for server-side rendering and built-in routing. Rejected because: (1) Requires Node.js server deployment alongside Django, increasing infrastructure complexity, (2) SSR not required for internal tool with authenticated users, (3) Hybrid Django + Next.js architecture adds unnecessary complexity, (4) Vite provides sufficient performance optimization with simpler deployment model.

- **Alternative 2: AG Grid instead of TanStack Table**: Evaluated AG Grid Enterprise for advanced table features (pivoting, grouping, Excel export). Rejected because: (1) Enterprise license cost conflicts with NFR-020 (no budget for premium libraries), (2) Bundle size impact (~200KB) threatens NFR-016, (3) TanStack Table provides sufficient features with headless architecture for full styling control, (4) Community version lacks required features.

- **Alternative 3: Material-UI (MUI) instead of shadcn/ui**: Considered MUI for comprehensive component library. Rejected because: (1) Large bundle size (~300KB) violates NFR-016, (2) Opinionated styling difficult to customize to match design system, (3) Accessibility issues in some components require workarounds, (4) shadcn/ui provides code ownership and unlimited customization without dependency bloat.

- **Alternative 4: PostgreSQL instead of SQLite**: Evaluated PostgreSQL for production-grade database. Deferred to Phase 2 because: (1) NFR-011 requires backward compatibility with existing SQLite, (2) SQLite sufficient for 50 concurrent users (NFR-005), (3) Migration path documented but not required for initial deployment, (4) Internal deployment reduces need for advanced PostgreSQL features (replication, connection pooling).

- **Alternative 5: Server-Side Excel Export instead of SheetJS**: Considered Python libraries (openpyxl, xlsxwriter) for server-side Excel generation. Rejected because: (1) Requires network round-trip increasing latency, (2) Increases server load and memory usage, (3) SheetJS enables offline export capability, (4) Client-side generation provides immediate feedback (NFR-013), (5) Bundle size impact (~100KB) acceptable within NFR-016 budget.

### Technology Decision

| Metric (from NFR/DR/AIR) | React + Vite + DRF | Next.js + DRF | Vue.js + Vite + DRF | Rationale |
|--------------------------|-------------------|---------------|---------------------|-----------|
| NFR-001 (FCP <2s) | 9/10 | 10/10 | 9/10 | React + Vite wins: Vite's optimized bundling achieves FCP <2s. Next.js SSR provides marginal improvement but adds complexity. |
| NFR-011 (Backward Compat) | 10/10 | 7/10 | 10/10 | React + Vite wins: Clean API integration with DRF. Next.js requires Node.js server complicating deployment. |
| NFR-016 (Bundle <300KB) | 9/10 | 6/10 | 10/10 | React + Vite wins: Code splitting and tree-shaking achieve <300KB. Next.js framework overhead increases bundle size. |
| NFR-020 (Team Skills) | 10/10 | 8/10 | 7/10 | React + Vite wins: Team proficient in React. Next.js learning curve. Vue.js requires reskilling. |
| DR-007 (DRF Integration) | 10/10 | 9/10 | 10/10 | React + Vite wins: Proven integration patterns with DRF. Extensive community examples and documentation. |
| **Total Score** | **48/50** | **40/50** | **46/50** | **React + Vite + DRF selected** for optimal balance of performance, compatibility, and team expertise. |

## Technical Requirements

- TR-001: System MUST implement hybrid architecture with Django serving RESTful APIs at `/api/*` endpoints and React SPA handling all UI rendering (justified by NFR-011, NFR-012)
- TR-002: System MUST use Django REST Framework ModelViewSet with Serializers for API layer providing standardized JSON responses (justified by DR-007, NFR-014)
- TR-003: System MUST implement React Router v6 for client-side routing with lazy-loaded route components using React.lazy() (justified by NFR-016, NFR-017)
- TR-004: System MUST use Vite build tool with code splitting configuration to generate chunks <100KB per route (justified by NFR-016, NFR-001)
- TR-005: System MUST implement TailwindCSS with custom design system configuration defining color palette, typography scale, and spacing system (justified by NFR-006, NFR-007)
- TR-006: System MUST use shadcn/ui components built on Radix UI primitives for all interactive elements (buttons, forms, modals, dropdowns) (justified by NFR-007, NFR-008, NFR-018)
- TR-007: System MUST implement React Query with staleTime, cacheTime, and refetchOnWindowFocus configuration for API data management (justified by NFR-013, NFR-014)
- TR-008: System MUST use TanStack Table v8 with column definitions, sorting, filtering, and inline editing capabilities (justified by NFR-019, DR-004, DR-008)
- TR-009: System MUST implement TanStack Virtual for table virtualization when row count exceeds 100 items (justified by NFR-019)
- TR-010: System MUST use SheetJS library for client-side Excel export with multi-sheet workbook generation, header formatting, and auto-sizing (justified by NFR-015, DR-011)
- TR-011: System MUST implement react-dropzone for drag-and-drop file upload with file type and size validation (justified by DR-009, NFR-014)
- TR-012: System MUST use react-pdf or PDF.js for client-side PDF rendering with zoom controls and page navigation (justified by NFR-010, NFR-017)
- TR-013: System MUST implement Framer Motion for page transitions (<300ms) and micro-interactions with prefers-reduced-motion support (justified by NFR-013, NFR-007)
- TR-014: System MUST use React Hook Form with Zod schema validation for all form inputs (justified by NFR-014, DR-009)
- TR-015: System MUST implement responsive breakpoints at 768px (tablet) and 1024px (desktop) using TailwindCSS responsive utilities (justified by NFR-006)
- TR-016: System MUST configure Django CORS Headers to allow cross-origin requests from React dev server (localhost:5173) during development (justified by NFR-011)
- TR-017: System MUST implement CSRF token handling in React using Django REST Framework's CSRF cookie mechanism (justified by NFR-014)
- TR-018: System MUST use WhiteNoise middleware for serving React production build from Django static files (justified by NFR-003, NFR-011)
- TR-019: System MUST implement semantic HTML structure with proper heading hierarchy (h1-h6), landmarks (header, nav, main, footer), and ARIA labels (justified by NFR-018, NFR-007)
- TR-020: System MUST configure Lighthouse CI in development pipeline with performance budgets: FCP <2s, TTI <5s, CLS <0.1, Accessibility score ≥95 (justified by NFR-001, NFR-002, NFR-003, NFR-004, NFR-007)

## Technical Constraints & Assumptions

**Constraints:**
- Must integrate with existing Django 4.2.16 backend without major refactoring of models, views, or business logic
- Must maintain compatibility with current OpenAI GPT-3.5-turbo and Google Gemini 2.5-flash API integrations
- Cannot introduce breaking changes to existing SQLite database schema or data models
- Must work within current hosting infrastructure limitations (no new cloud services or Node.js server deployment)
- Must complete within 6-8 week timeline with limited team: 1 UI/UX Designer (50%), 2 Frontend Developers (100%), 1 Backend Developer (25%), 1 QA Engineer (50%)
- No budget for premium UI component libraries (AG Grid Enterprise, MUI Pro) or third-party services
- Must use open-source libraries and frameworks only
- Must support modern browsers only: Chrome, Firefox, Safari, Edge (latest 2 versions) - no IE11 support required
- Primary access via desktop (70%) and tablet (30%), limited mobile usage expected
- Maximum PDF file size: 10MB (existing backend constraint)
- No backend architecture changes or database migrations allowed in Phase 1
- No authentication/authorization system implementation (deferred to Phase 2)
- No multi-language support (English only)
- No mobile native app development
- No advanced analytics or reporting features beyond basic statistics
- No batch processing capabilities

**Assumptions:**
- Primary users are internal financial analysts familiar with loan documentation and comfortable with web applications
- Users have stable internet connection (minimum 3G speed: 1.6 Mbps, 300ms RTT)
- Average user processes 5-20 documents per day with typical PDF size 1-5 MB
- Users have modern web browsers (Chrome 120+, Firefox 120+, Safari 17+, Edge 120+)
- Internal deployment only (no public-facing requirements in Phase 1)
- Current Django backend and LLM integrations are stable and performant
- OpenAI and Gemini APIs will maintain current response times (<30 seconds) and availability (99.9% uptime)
- Hosting infrastructure can support increased frontend asset size (~500KB total including React bundle, vendor chunks, and assets)
- Database can handle additional metadata storage (user preferences, audit trail) without performance degradation
- UI/UX designer available for creating high-fidelity mockups and design system documentation
- Frontend developers proficient in React, TypeScript, and modern JavaScript (ES2020+)
- Design approval process will not cause significant delays (<1 week per iteration)
- Staging environment available for integration testing before production deployment
- Extracted entity data structure remains consistent (Lender, Borrower, Loan Terms, Location, Person categories)
- Sample PDF documents and expected outputs available for testing and validation
- Access to 3-5 end users for usability testing and feedback during development
- User adoption barriers are primarily UI/UX related, not functional capability gaps
- Improved UI/UX will directly correlate with increased productivity (40% reduction in task time) and user satisfaction (≥8.0/10)
- Organization supports modernization initiative and will allocate necessary resources for deployment and training
- Success metrics (user satisfaction ≥8.0, task time <3 min, adoption ≥80% within 8 weeks) are achievable with proposed enhancements

## Development Workflow

1. **Environment Setup & Project Scaffolding (Week 1)**
   - Install Node.js 20 LTS, pnpm 8+, Python 3.11+
   - Create React project with Vite: `pnpm create vite@latest frontend --template react-ts`
   - Install core dependencies: React Router, TailwindCSS, shadcn/ui, React Query, React Hook Form, Zod
   - Configure TailwindCSS with custom design system (colors, typography, spacing)
   - Initialize shadcn/ui: `npx shadcn@latest init`
   - Set up Django CORS Headers and configure ALLOWED_ORIGINS for React dev server
   - Create Django REST Framework serializers and viewsets for Document and ExtractionResult models
   - Configure Vite proxy to forward `/api/*` requests to Django backend during development

2. **Design System Implementation (Week 1-2)**
   - Define color palette: Primary Blue (#3B82F6), Secondary Indigo (#6366F1), Success Green (#10B981), Warning Amber (#F59E0B), Error Red (#EF4444), Neutral Gray scale
   - Configure typography scale: H1 (36px/700), H2 (30px/600), H3 (24px/600), H4 (20px/600), Body (16px/400), Small (14px/400), Caption (12px/400)
   - Set up spacing system based on 4px/8px grid: 0, 4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px, 96px
   - Define elevation shadows at four levels for cards, dropdowns, modals, sticky headers
   - Install shadcn/ui components: Button, Card, Table, Form, Input, Select, Dialog, Toast, Dropdown, Tabs
   - Create reusable component library with Storybook documentation
   - Implement responsive breakpoints and test layouts on 375px (mobile), 768px (tablet), 1920px (desktop)

3. **Core Feature Development - Navigation & Dashboard (Week 2-3)**
   - Implement React Router with lazy-loaded routes: Dashboard, Upload, Results, History
   - Create top navigation bar with logo, menu items, user profile icon
   - Implement breadcrumb navigation component
   - Build responsive mobile navigation with hamburger menu (<768px)
   - Develop Dashboard page with welcome message, recent extractions (last 10), quick statistics, and "Upload New Document" CTA
   - Integrate React Query for fetching dashboard data from `/api/documents/recent/` endpoint
   - Implement loading skeletons and error states for async data fetching

4. **Core Feature Development - Upload Workflow (Week 3-4)**
   - Implement drag-and-drop upload zone using react-dropzone with file type (PDF) and size (≤10MB) validation
   - Create file preview component showing filename, size, thumbnail
   - Build LLM model selection UI with radio buttons for OpenAI and Gemini
   - Implement upload progress bar with percentage indicator
   - Create step-by-step progress indicator: Step 1 (Select File) → Step 2 (Choose Model) → Step 3 (Confirm)
   - Integrate React Hook Form with Zod validation for upload form
   - Connect to Django API endpoint `/api/documents/upload/` with multipart/form-data
   - Implement processing status page with loading spinner and auto-redirect to results on completion

5. **Core Feature Development - Results Display (Week 4-5)**
   - Build card-based entity display organized by categories: Lender, Borrower, Loan Terms, Location, Person
   - Implement toggle switch for Card View ↔ Table View with state persistence in localStorage
   - Create TanStack Table configuration with sortable columns, filterable rows, inline editing
   - Implement TanStack Virtual for virtualization when entity count >100
   - Build PDF viewer component using react-pdf with zoom controls, page navigation, full-screen mode
   - Create side-by-side layout (desktop) and tabbed interface (mobile/tablet) for PDF + entities
   - Implement inline editing with click-to-edit pattern, validation, and optimistic updates via React Query
   - Add quick-search filter input for tables with debounced search
   - Display confidence scores for extracted fields when available

6. **Core Feature Development - Export Functionality (Week 5)**
   - Implement JSON export with download trigger using Blob API
   - Implement CSV export with flattened entity data using custom serialization
   - Build Excel export using SheetJS with multi-sheet workbook generation
   - Create "Overview" worksheet with document metadata
   - Generate separate worksheets for each entity category with formatted headers (bold, blue background, white text, frozen pane)
   - Apply auto-sizing to columns and number formatting for currency ($#,##0.00) and percentages (0.00%)
   - Implement filename pattern: `{document_name}_entities_{YYYY-MM-DD}.xlsx`
   - Add loading spinner on export button during file generation
   - Display success toast notification on export completion

7. **Core Feature Development - Document History (Week 6)**
   - Build document history page with grid view (cards) and list view (table) toggle
   - Implement search functionality filtering by filename with debounced input
   - Create filter dropdown for date range, status (Success/Failed/Processing), model (OpenAI/Gemini)
   - Add sorting by upload date, filename, status (ascending/descending)
   - Implement pagination with page numbers, Previous/Next buttons, items-per-page selector
   - Build delete functionality with confirmation dialog and optimistic UI updates
   - Display empty state with "Upload Your First Document" CTA when no documents exist
   - Integrate React Query for data fetching from `/api/documents/` endpoint with pagination and filters

8. **Accessibility & Responsive Design (Week 6-7)**
   - Implement keyboard navigation for all interactive elements (Tab, Enter, Esc)
   - Add visible focus indicators (2px outline) on all focusable elements
   - Ensure ARIA labels for icon-only buttons (e.g., aria-label="Upload document")
   - Use semantic HTML with proper heading hierarchy and landmarks (header, nav, main, footer)
   - Add alt text for images and decorative icons (alt="" for decorative)
   - Implement skip navigation link for keyboard users
   - Ensure minimum touch target size 44x44px for mobile interactive elements
   - Test with screen readers (NVDA, JAWS, VoiceOver) and fix accessibility issues
   - Run automated accessibility tests with axe DevTools and Lighthouse
   - Validate color contrast ratios meet WCAG 2.1 AA standards (4.5:1 normal, 3:1 large text)

9. **Performance Optimization (Week 7)**
   - Implement code splitting with React.lazy() for routes and heavy components (PDF viewer, TanStack Table, Excel export)
   - Configure Vite build with chunk size analysis and optimization
   - Add Suspense boundaries with skeleton screens for lazy-loaded components
   - Optimize images with compression and WebP format
   - Implement React.memo() for expensive components to prevent unnecessary re-renders
   - Use useCallback and useMemo for performance-critical functions and computed values
   - Configure React Query with appropriate staleTime and cacheTime for reduced API calls
   - Run Lighthouse CI and optimize to meet performance budgets: FCP <2s, TTI <5s, CLS <0.1
   - Test on 3G throttled connection and optimize bundle size to <300KB gzipped

10. **Testing & Quality Assurance (Week 7-8)**
    - Write unit tests for React components using Vitest and React Testing Library
    - Implement integration tests for API interactions with mocked responses
    - Create E2E tests with Playwright covering critical user flows: upload → process → view results → export → history
    - Test cross-browser compatibility on Chrome, Firefox, Safari, Edge (latest 2 versions)
    - Perform accessibility testing with automated tools (axe, Lighthouse) and manual screen reader testing
    - Conduct usability testing with 3-5 financial analysts and gather feedback
    - Perform load testing with 50 concurrent users to validate NFR-005
    - Test responsive layouts on physical devices: iPhone 13 (375px), iPad Pro (1024px), Desktop (1920px)
    - Fix bugs and regressions identified during testing
    - Prepare production build and deployment documentation

11. **Deployment & Launch (Week 8)**
    - Build React production bundle: `pnpm build`
    - Configure Django to serve React static files using WhiteNoise
    - Update Django settings: STATIC_ROOT, STATICFILES_DIRS, WHITENOISE_ROOT
    - Configure Django URL routing to serve React SPA for all non-API routes
    - Deploy to staging environment and perform smoke testing
    - Conduct final accessibility audit and performance validation
    - Create user documentation and training materials
    - Deploy to production environment
    - Monitor error logs and performance metrics post-launch
    - Gather user feedback and plan Phase 2 enhancements
