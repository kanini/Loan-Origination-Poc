# Design Modelling

## UML Models Overview

This document provides comprehensive visual models representing the GenAI PDF Extractor system architecture and behavior. The diagrams are derived from functional requirements in `spec.md` and architectural decisions in `design.md`. These models serve multiple purposes:

- **System Context Diagram**: Illustrates the system boundary and external interactions with users and LLM services
- **Component Architecture Diagram**: Details the hybrid React + Django architecture with presentation, business, and data layers
- **Deployment Architecture Diagram**: Shows the deployment topology for the web application
- **Data Flow Diagram**: Traces data movement from PDF upload through LLM processing to result display
- **Logical Data Model (ERD)**: Defines database entities and relationships for document management and extraction results
- **Use Case Sequence Diagrams**: Provides detailed interaction flows for each use case (UC-001 through UC-004)

These diagrams align with the modernization goals: transforming a minimal single-page Django application into a professional multi-page React SPA with enhanced UI/UX while maintaining backward compatibility with existing backend infrastructure.

---

## Architectural Views

### System Context Diagram

```plantuml
@startuml System Context
!define RECTANGLE class

skinparam rectangle {
    BackgroundColor<<external>> LightBlue
    BackgroundColor<<system>> LightGreen
    BorderColor Black
}

rectangle "Financial Analyst" as FA <<external>>
rectangle "System Administrator" as SA <<external>>
rectangle "QA Engineer" as QA <<external>>

rectangle "GenAI PDF Extractor\nSystem" as System <<system>> {
    rectangle "React SPA\n(Presentation Layer)" as Frontend
    rectangle "Django Backend\n(Business Logic)" as Backend
    rectangle "SQLite Database\n(Data Persistence)" as DB
}

rectangle "OpenAI GPT API\n(gpt-3.5-turbo)" as OpenAI <<external>>
rectangle "Google Gemini API\n(2.5-flash)" as Gemini <<external>>
rectangle "Browser Storage\n(localStorage)" as Browser <<external>>

FA -down-> Frontend : Upload PDF,\nView Results,\nExport Data
SA -down-> Backend : Configure Settings,\nMonitor Performance
QA -down-> Frontend : Test Features,\nValidate Accessibility

Frontend -down-> Backend : API Requests\n(REST/JSON)
Backend -down-> DB : Store/Retrieve\nDocuments & Results
Backend -right-> OpenAI : Extract Entities\n(Text → JSON)
Backend -right-> Gemini : Extract Entities\n(Text → JSON)
Frontend -up-> Browser : Cache Preferences,\nSession Data

note right of System
  **System Boundary:**
  - React SPA handles all UI rendering
  - Django manages file storage, 
    LLM integration, data persistence
  - Hybrid architecture maintains
    backward compatibility
end note

@enduml
```

---

### Component Architecture Diagram

```mermaid
flowchart LR
    subgraph Frontend["Presentation Layer (React SPA)"]
        direction TB
        Router["React Router\n(Client-Side Routing)"]
        Dashboard["Dashboard\nComponent"]
        Upload["Upload Workflow\nComponent"]
        Results["Results Display\nComponent"]
        History["Document History\nComponent"]
        
        Router --> Dashboard
        Router --> Upload
        Router --> Results
        Router --> History
        
        subgraph UIComponents["Shared UI Components"]
            Navigation["Navigation Bar"]
            FileUpload["Drag-Drop Upload\n(react-dropzone)"]
            PDFViewer["PDF Viewer\n(react-pdf)"]
            DataTable["Data Table\n(TanStack Table)"]
            ExportModule["Export Module\n(SheetJS)"]
        end
        
        subgraph StateManagement["State Management"]
            ReactQuery["React Query\n(Server State)"]
            LocalStorage["localStorage\n(User Preferences)"]
        end
        
        Dashboard --> UIComponents
        Upload --> UIComponents
        Results --> UIComponents
        History --> UIComponents
        
        UIComponents --> StateManagement
    end
    
    subgraph Backend["Business Layer (Django)"]
        direction TB
        DRF["Django REST Framework\n(API Layer)"]
        
        subgraph Views["ViewSets"]
            DocumentView["DocumentViewSet"]
            ExtractionView["ExtractionResultViewSet"]
        end
        
        subgraph Services["Business Logic"]
            PDFProcessor["PDF Text Extractor"]
            LLMIntegrator["LLM Integration Service"]
            OpenAIBackend["OpenAI Backend"]
            GeminiBackend["Gemini Backend"]
        end
        
        DRF --> Views
        Views --> Services
        LLMIntegrator --> OpenAIBackend
        LLMIntegrator --> GeminiBackend
    end
    
    subgraph Data["Data Layer"]
        direction TB
        ORM["Django ORM"]
        
        subgraph Models["Data Models"]
            Document["Document Model"]
            ExtractionResult["ExtractionResult Model"]
            EntityEdit["EntityEdit Model"]
            UserPreference["UserPreference Model"]
        end
        
        FileStorage["File Storage\n(media/uploads/)"]
        Database["SQLite Database"]
        
        ORM --> Models
        Models --> Database
        Document --> FileStorage
    end
    
    Frontend -->|"HTTP/REST\n(JSON)"| Backend
    Backend --> Data
    
    subgraph External["External Services"]
        OpenAI["OpenAI API\n(GPT-3.5-turbo)"]
        Gemini["Google Gemini API\n(2.5-flash)"]
    end
    
    OpenAIBackend -->|"API Request\n(Text)"| OpenAI
    GeminiBackend -->|"API Request\n(Text)"| Gemini
    OpenAI -->|"JSON Response\n(Entities)"| OpenAIBackend
    Gemini -->|"JSON Response\n(Entities)"| GeminiBackend
    
    classDef frontendStyle fill:#E3F2FD,stroke:#1976D2,stroke-width:2px
    classDef backendStyle fill:#E8F5E9,stroke:#388E3C,stroke-width:2px
    classDef dataStyle fill:#FFF3E0,stroke:#F57C00,stroke-width:2px
    classDef externalStyle fill:#F3E5F5,stroke:#7B1FA2,stroke-width:2px
    
    class Frontend,Router,Dashboard,Upload,Results,History,UIComponents,StateManagement frontendStyle
    class Backend,DRF,Views,Services backendStyle
    class Data,ORM,Models,FileStorage,Database dataStyle
    class External,OpenAI,Gemini externalStyle
```

---

### Deployment Architecture Diagram

```plantuml
@startuml Deployment Architecture
!define RECTANGLE node

skinparam node {
    BackgroundColor LightYellow
    BorderColor Black
}

skinparam component {
    BackgroundColor LightBlue
    BorderColor Black
}

actor "Financial Analyst" as User
actor "System Admin" as Admin

node "Client Browser" as Browser {
    component "React SPA\n(JavaScript Bundle)" as ReactApp
    component "PDF.js Worker" as PDFWorker
    component "localStorage" as LocalCache
}

node "Web Server\n(Django + WhiteNoise)" as WebServer {
    component "Django Application\n(Python 3.11+)" as Django
    component "Static File Server\n(WhiteNoise)" as WhiteNoise
    component "WSGI Server\n(Gunicorn/uWSGI)" as WSGI
    
    WSGI --> Django
    WhiteNoise --> Django
}

node "File System" as FileSystem {
    database "SQLite Database\n(db.sqlite3)" as DB
    folder "Media Storage\n(media/uploads/)" as MediaFolder
    folder "Static Files\n(React Build)" as StaticFolder
}

cloud "External APIs" as ExternalAPIs {
    component "OpenAI API\n(gpt-3.5-turbo)" as OpenAI
    component "Google Gemini API\n(2.5-flash)" as Gemini
}

User --> Browser : HTTPS
Admin --> Browser : HTTPS

Browser --> WebServer : "HTTP/HTTPS\nREST API Calls\n(/api/*)"
Browser --> WebServer : "Static Asset Requests\n(*.js, *.css)"

ReactApp ..> PDFWorker : "PDF Rendering"
ReactApp ..> LocalCache : "Cache Preferences"

WebServer --> FileSystem : "Read/Write"
Django --> DB : "ORM Queries"
Django --> MediaFolder : "Store PDFs"
WhiteNoise --> StaticFolder : "Serve React Build"

Django --> ExternalAPIs : "HTTPS API Calls"
OpenAI --> Django : "JSON Response"
Gemini --> Django : "JSON Response"

note right of WebServer
  **Deployment Configuration:**
  - Single server deployment
  - Django serves both API and static files
  - WhiteNoise for efficient static serving
  - No separate Node.js server required
  - Suitable for 50 concurrent users
end note

note bottom of FileSystem
  **Storage:**
  - SQLite for development/small-scale
  - Migration path to PostgreSQL documented
  - File-based media storage
end note

@enduml
```

---

### Data Flow Diagram

```plantuml
@startuml Data Flow
!define RECTANGLE rectangle

skinparam rectangle {
    BackgroundColor<<process>> LightGreen
    BackgroundColor<<datastore>> LightYellow
    BackgroundColor<<external>> LightBlue
    BorderColor Black
}

rectangle "Financial Analyst" as User <<external>>

rectangle "1.0\nUpload PDF\nDocument" as P1 <<process>>
rectangle "2.0\nValidate File" as P2 <<process>>
rectangle "3.0\nExtract Text\nfrom PDF" as P3 <<process>>
rectangle "4.0\nProcess with\nLLM" as P4 <<process>>
rectangle "5.0\nStore Extraction\nResults" as P5 <<process>>
rectangle "6.0\nDisplay & Edit\nEntities" as P6 <<process>>
rectangle "7.0\nExport Data" as P7 <<process>>

database "D1\nDocument\nMetadata" as D1 <<datastore>>
database "D2\nExtraction\nResults" as D2 <<datastore>>
database "D3\nPDF Files\n(media/uploads/)" as D3 <<datastore>>
database "D4\nUser\nPreferences" as D4 <<datastore>>

rectangle "OpenAI/Gemini\nAPI" as LLM <<external>>

User -down-> P1 : "PDF File +\nModel Selection"
P1 -down-> P2 : "File Object"
P2 -down-> P3 : "Validated PDF"
P2 -right-> D1 : "Store Metadata\n(filename, size, status)"
P3 -down-> P4 : "Extracted Text"
P3 -right-> D3 : "Store PDF File"
P4 -right-> LLM : "Text Input"
LLM -down-> P4 : "JSON Entities"
P4 -down-> P5 : "Structured Entities"
P5 -down-> D2 : "Store Extraction Data"
P5 -down-> P6 : "Entity Data"
D2 -up-> P6 : "Retrieve Results"
D3 -up-> P6 : "Retrieve PDF"
D4 -up-> P6 : "User Preferences\n(view mode, filters)"
P6 -down-> User : "Display Results\n(Card/Table View)"
User -down-> P6 : "Edit Entity Values"
P6 -right-> D2 : "Update Entity\n(audit trail)"
User -down-> P7 : "Export Request\n(JSON/CSV/Excel)"
P7 -up-> D2 : "Retrieve Entity Data"
P7 -down-> User : "Downloaded File"

note right of P2
  **Validation Rules:**
  - File type: PDF only
  - Max size: 10MB
  - Required: Model selection
end note

note right of P4
  **LLM Processing:**
  - OpenAI: gpt-3.5-turbo
  - Gemini: 2.5-flash
  - Returns structured JSON
  - Categories: Lender, Borrower,
    Loan Terms, Location, Person
end note

note right of P7
  **Export Formats:**
  - JSON: Raw extraction data
  - CSV: Flattened entities
  - Excel: Multi-sheet workbook
  - PDF: Formatted report
end note

@enduml
```

---

### Logical Data Model (ERD)

```mermaid
erDiagram
    User ||--o{ Document : "uploads"
    User ||--o{ UserPreference : "has"
    Document ||--|| ExtractionResult : "has"
    ExtractionResult ||--o{ EntityEdit : "tracks"
    
    User {
        UUID id PK
        string username
        string email
        datetime created_at
        datetime last_login
    }
    
    Document {
        UUID id PK
        UUID user_id FK
        string filename
        string file_path
        datetime upload_timestamp
        integer file_size
        enum status "Processing|Success|Failed"
        enum selected_model "OpenAI|Gemini"
        integer processing_time_ms
        datetime created_at
        datetime updated_at
    }
    
    ExtractionResult {
        UUID id PK
        UUID document_id FK
        JSON extraction_data
        JSON confidence_scores
        datetime created_at
        datetime updated_at
    }
    
    EntityEdit {
        UUID id PK
        UUID extraction_result_id FK
        UUID edited_by FK
        string field_name
        string old_value
        string new_value
        datetime edited_at
    }
    
    UserPreference {
        UUID id PK
        UUID user_id FK
        string preference_key
        JSON preference_value
        datetime updated_at
    }
```

**Entity Descriptions:**

- **User**: Represents authenticated users (financial analysts, admins, QA engineers) with login credentials
- **Document**: Stores metadata for uploaded PDF files including processing status and selected LLM model
- **ExtractionResult**: Contains AI-extracted entity data in JSON format with optional confidence scores
- **EntityEdit**: Audit trail for manual corrections made to extracted entity values
- **UserPreference**: Caches user-specific settings (view mode, filter state, sort order) for session persistence

**Key Relationships:**

- One User uploads many Documents (1:N)
- One Document has exactly one ExtractionResult (1:1)
- One ExtractionResult can have many EntityEdits for audit tracking (1:N)
- One User has many UserPreferences for different settings (1:N)
- EntityEdit references User via edited_by for accountability (N:1)

---

## Use Case Sequence Diagrams

> **Note**: Each sequence diagram details the dynamic message flow and timing for its corresponding use case defined in `spec.md`. These diagrams complement the static use case diagrams in spec.md by showing the temporal sequence of interactions.

### UC-001: Upload and Process PDF Document

**Source**: [spec.md#UC-001](../spec.md#UC-001)

```mermaid
sequenceDiagram
    participant FA as Financial Analyst
    participant UI as React SPA
    participant Router as React Router
    participant Upload as Upload Component
    participant Query as React Query
    participant API as Django REST API
    participant Backend as Django Backend
    participant PDF as PDF Processor
    participant LLM as LLM Service (OpenAI/Gemini)
    participant DB as SQLite Database
    participant Storage as File Storage

    Note over FA,Storage: UC-001 - Upload and Process PDF Document

    FA->>UI: Navigate to Dashboard
    UI->>Router: Route to /dashboard
    Router->>UI: Render Dashboard
    FA->>UI: Click "Upload New Document"
    UI->>Router: Navigate to /upload
    Router->>Upload: Render Upload Page
    Upload-->>FA: Display drag-drop zone + model selection

    FA->>Upload: Drag PDF file or click to browse
    Upload->>Upload: Validate file (type=PDF, size≤10MB)
    
    alt File validation fails
        Upload-->>FA: Display error: "Invalid file type/size"
        FA->>Upload: Select different file
    end

    Upload-->>FA: Show file preview (filename, size, thumbnail)
    FA->>Upload: Select LLM model (OpenAI/Gemini)
    Upload->>Upload: Enable "Extract Entities" button
    FA->>Upload: Click "Extract Entities"
    
    Upload->>Router: Navigate to /processing
    Upload->>Query: Upload file + model selection
    Query->>API: POST /api/documents/upload/ (multipart/form-data)
    API->>Backend: Handle upload request
    Backend->>Storage: Save PDF to media/uploads/
    Storage-->>Backend: File path
    Backend->>DB: INSERT Document (filename, status=Processing, model)
    DB-->>Backend: Document ID
    API-->>Query: 202 Accepted {document_id, status: "Processing"}
    Query-->>Upload: Upload successful
    
    Note over Upload: Display Processing Status Page with spinner

    Backend->>PDF: Extract text from PDF
    PDF-->>Backend: Extracted text
    Backend->>LLM: Send text + extraction prompt
    
    alt LLM API fails
        LLM-->>Backend: Error (timeout/unavailable)
        Backend->>DB: UPDATE Document status=Failed
        Backend-->>API: 500 Error
        API-->>Query: Error response
        Query-->>Upload: Display error + Retry option
        FA->>Upload: Click "Retry" or "Change Model"
    else LLM API succeeds
        LLM-->>Backend: JSON entities (Lender, Borrower, Loan, Location, Person)
        Backend->>DB: INSERT ExtractionResult (extraction_data, confidence_scores)
        Backend->>DB: UPDATE Document (status=Success, processing_time)
        DB-->>Backend: Success
        Backend-->>API: 200 OK {extraction_result_id}
    end

    Query->>API: GET /api/documents/{id}/status/ (polling)
    API-->>Query: {status: "Success", result_id}
    Query->>Router: Navigate to /results/{document_id}
    Router->>UI: Render Results Page
    UI-->>FA: Display extracted entities in card view
```

---

### UC-002: View and Edit Extraction Results

**Source**: [spec.md#UC-002](../spec.md#UC-002)

```mermaid
sequenceDiagram
    participant FA as Financial Analyst
    participant UI as Results Component
    participant Table as TanStack Table
    participant PDF as PDF Viewer
    participant Query as React Query
    participant API as Django REST API
    participant DB as SQLite Database
    participant Storage as File Storage

    Note over FA,Storage: UC-002 - View and Edit Extraction Results

    FA->>UI: Navigate to Results page
    UI->>Query: Fetch extraction results
    Query->>API: GET /api/extraction-results/{id}/
    API->>DB: SELECT ExtractionResult WHERE id=?
    DB-->>API: Extraction data (JSON)
    API-->>Query: 200 OK {extraction_data, confidence_scores}
    Query-->>UI: Cache and return data
    
    UI->>UI: Organize entities by category (Lender, Borrower, Loan, Location, Person)
    UI-->>FA: Display Card View (default)
    
    par Fetch PDF in parallel
        UI->>Query: Fetch original PDF
        Query->>API: GET /api/documents/{id}/pdf/
        API->>Storage: Read PDF file
        Storage-->>API: PDF binary
        API-->>Query: 200 OK (PDF blob)
        Query->>PDF: Render PDF
        PDF-->>FA: Display PDF in side-by-side viewer
    end

    FA->>UI: Review entities and compare with PDF
    FA->>UI: Identify incorrect field value
    FA->>UI: Click field to edit
    UI->>UI: Activate inline editing mode
    UI-->>FA: Show editable input with current value
    FA->>UI: Enter corrected value
    FA->>UI: Press Enter or click outside
    
    UI->>UI: Validate new value (format, required)
    
    alt Validation fails
        UI-->>FA: Display inline error: "Invalid format"
        FA->>UI: Correct value again
    else Validation succeeds
        UI->>Query: Update field (optimistic update)
        Query->>UI: Update local cache immediately
        UI-->>FA: Show updated value
        Query->>API: PATCH /api/extraction-results/{id}/
        API->>DB: UPDATE ExtractionResult SET extraction_data=?
        API->>DB: INSERT EntityEdit (field_name, old_value, new_value, edited_by, timestamp)
        DB-->>API: Success
        API-->>Query: 200 OK {updated_data}
        Query-->>UI: Confirm update
        UI-->>FA: Display success toast: "Field updated successfully"
    end

    FA->>UI: Toggle to Table View
    UI->>Table: Render entities as tables
    Table-->>FA: Display sortable tables with Field Name | Extracted Value
    FA->>Table: Use quick-search filter
    Table->>Table: Filter rows by search term
    Table-->>FA: Show filtered results
    
    FA->>Table: Click column header to sort
    Table->>Table: Sort by Field Name or Value
    Table-->>FA: Display sorted table
    
    FA->>UI: Toggle back to Card View
    UI->>UI: Preserve data and edit state
    UI-->>FA: Display Card View with updated data
```

---

### UC-003: Export Extraction Results

**Source**: [spec.md#UC-003](../spec.md#UC-003)

```mermaid
sequenceDiagram
    participant FA as Financial Analyst
    participant UI as Results Component
    participant Export as Export Module
    participant SheetJS as SheetJS Library
    participant Browser as Browser Download API
    participant Query as React Query

    Note over FA,Query: UC-003 - Export Extraction Results

    FA->>UI: Review extraction results
    FA->>UI: Click "Export to Excel" button
    UI->>Export: Trigger Excel export
    Export->>Export: Disable button + show loading spinner
    Export->>Query: Get current extraction data from cache
    Query-->>Export: Return entity data (all categories)
    
    Export->>SheetJS: Create new workbook
    SheetJS-->>Export: Workbook object
    
    Export->>Export: Collect document metadata (filename, model, date, total entities)
    Export->>SheetJS: Create "Overview" worksheet
    SheetJS->>SheetJS: Add metadata rows
    SheetJS-->>Export: Overview sheet created
    
    loop For each entity category (Lender, Borrower, Loan Terms, Location, Person)
        Export->>Export: Extract category entities
        
        alt Category has data
            Export->>SheetJS: Create worksheet with category name
            SheetJS->>SheetJS: Add header row ["Field Name", "Extracted Value"]
            SheetJS->>SheetJS: Apply header formatting (bold, blue bg #3B82F6, white text)
            SheetJS->>SheetJS: Freeze header pane
            
            loop For each entity field
                Export->>SheetJS: Add data row [field_name, value]
                
                alt Value is currency
                    SheetJS->>SheetJS: Apply number format: $#,##0.00
                else Value is percentage
                    SheetJS->>SheetJS: Apply number format: 0.00%
                end
            end
            
            SheetJS->>SheetJS: Auto-size columns to fit content
            SheetJS-->>Export: Worksheet created
        else Category is empty
            Export->>SheetJS: Create empty worksheet with headers only
            SheetJS-->>Export: Empty worksheet created
        end
    end
    
    Export->>Export: Generate filename: {document_name}_entities_{YYYY-MM-DD}.xlsx
    Export->>SheetJS: Write workbook to binary
    SheetJS-->>Export: Excel file blob
    
    Export->>Browser: Trigger download (Blob API)
    Browser-->>FA: Download Excel file to default directory
    
    Export->>Export: Re-enable export button
    Export->>UI: Show success toast
    UI-->>FA: Display notification: "Excel file downloaded successfully"
    
    FA->>Browser: Open downloaded file
    Browser-->>FA: Display Excel workbook with multiple sheets
    FA->>FA: Verify data structure and formatting

    Note over FA,Export: Alternative Export Formats

    alt User selects JSON export
        FA->>UI: Click "Download as JSON"
        UI->>Export: Trigger JSON export
        Export->>Query: Get extraction data
        Query-->>Export: Entity data
        Export->>Export: Serialize to JSON
        Export->>Browser: Download .json file
        Browser-->>FA: JSON file downloaded
    else User selects CSV export
        FA->>UI: Click "Download as CSV"
        UI->>Export: Trigger CSV export
        Export->>Query: Get extraction data
        Query-->>Export: Entity data
        Export->>Export: Flatten entities to CSV format
        Export->>Browser: Download .csv file
        Browser-->>FA: CSV file downloaded
    else User selects PDF Report
        FA->>UI: Click "Generate PDF Report"
        UI->>Export: Trigger PDF export
        Export->>Export: Generate formatted PDF document
        Export->>Browser: Download .pdf file
        Browser-->>FA: PDF report downloaded
    end
```

---

### UC-004: Search and View Document History

**Source**: [spec.md#UC-004](../spec.md#UC-004)

```mermaid
sequenceDiagram
    participant FA as Financial Analyst
    participant UI as History Component
    participant Table as TanStack Table
    participant Query as React Query
    participant API as Django REST API
    participant DB as SQLite Database

    Note over FA,DB: UC-004 - Search and View Document History

    FA->>UI: Click "History" in navigation
    UI->>Query: Fetch document list
    Query->>API: GET /api/documents/?page=1&limit=20
    API->>DB: SELECT * FROM Document ORDER BY upload_timestamp DESC LIMIT 20
    DB-->>API: Document records
    API-->>Query: 200 OK {documents[], total_count, page_info}
    Query-->>UI: Cache and return data
    
    UI->>UI: Render grid view (default) with document cards
    UI-->>FA: Display documents (thumbnail, filename, date, status, model)
    
    FA->>UI: Enter search term "loan_application" in search bar
    UI->>UI: Debounce search input (300ms)
    UI->>Query: Fetch filtered documents
    Query->>API: GET /api/documents/?search=loan_application&page=1
    API->>DB: SELECT * WHERE filename LIKE '%loan_application%'
    DB-->>API: Filtered documents
    API-->>Query: 200 OK {filtered_documents[]}
    Query-->>UI: Update data
    UI-->>FA: Display filtered document list
    
    FA->>UI: Apply filter: Status="Success", Date Range="Last 7 days"
    UI->>Query: Fetch with combined filters
    Query->>API: GET /api/documents/?search=loan_application&status=Success&date_from={7_days_ago}&date_to={today}
    API->>DB: SELECT * WHERE filename LIKE '%loan_application%' AND status='Success' AND upload_timestamp BETWEEN ? AND ?
    DB-->>API: Refined results
    API-->>Query: 200 OK {documents[]}
    Query-->>UI: Update data
    UI-->>FA: Display refined document list
    
    FA->>UI: Click sort by "Upload Date" (descending)
    UI->>Table: Sort documents by upload_timestamp DESC
    Table->>Table: Reorder document list
    Table-->>FA: Display sorted documents (most recent first)
    
    FA->>UI: Click on specific document card
    UI->>Query: Get document details
    Query->>API: GET /api/documents/{id}/
    API->>DB: SELECT * FROM Document WHERE id=?
    DB-->>API: Document details
    API-->>Query: 200 OK {document}
    Query->>UI: Navigate to Results page
    UI-->>FA: Redirect to /results/{document_id}
    FA->>FA: Review extraction results from previous processing

    Note over FA,DB: Alternative Flows

    alt No documents exist
        Query->>API: GET /api/documents/
        API->>DB: SELECT COUNT(*) FROM Document
        DB-->>API: count=0
        API-->>Query: 200 OK {documents: [], total_count: 0}
        Query-->>UI: Empty result
        UI-->>FA: Display empty state: "No documents processed yet" + "Upload Your First Document" button
    else Search returns no results
        Query->>API: GET /api/documents/?search=nonexistent
        API->>DB: SELECT * WHERE filename LIKE '%nonexistent%'
        DB-->>API: Empty result
        API-->>Query: 200 OK {documents: []}
        UI-->>FA: Display: "No documents found matching 'nonexistent'" + suggestion to clear filters
    else User deletes document
        FA->>UI: Click delete icon on document
        UI-->>FA: Show confirmation dialog: "Are you sure? This cannot be undone."
        FA->>UI: Click "Confirm"
        UI->>Query: Delete document (optimistic update)
        Query->>UI: Remove from local cache
        UI-->>FA: Remove document from list immediately
        Query->>API: DELETE /api/documents/{id}/
        API->>DB: UPDATE Document SET deleted_at=NOW() (soft delete)
        API->>DB: UPDATE ExtractionResult SET deleted_at=NOW()
        DB-->>API: Success
        API-->>Query: 204 No Content
        Query-->>UI: Confirm deletion
        UI-->>FA: Display success toast: "Document deleted"
    else User toggles to List View
        FA->>UI: Click "List View" toggle
        UI->>Table: Switch from grid cards to table layout
        Table-->>FA: Display documents in tabular format (columns: Filename, Date, Status, Model, Actions)
    end
```

---

## Diagram Summary

| Diagram Type | Purpose | Key Insights |
|--------------|---------|--------------|
| **System Context** | Shows system boundary and external actors | Hybrid architecture with React frontend, Django backend, and external LLM APIs (OpenAI/Gemini) |
| **Component Architecture** | Details internal component structure | Clear separation: Presentation (React), Business (Django), Data (SQLite) layers with shared UI components and state management |
| **Deployment** | Illustrates deployment topology | Single-server deployment with Django serving both APIs and static files via WhiteNoise; no separate Node.js server required |
| **Data Flow** | Traces data movement through system | 7-step process: Upload → Validate → Extract Text → LLM Processing → Store → Display/Edit → Export |
| **ERD** | Defines database schema | 5 core entities: User, Document, ExtractionResult, EntityEdit, UserPreference with clear relationships and audit trail |
| **UC-001 Sequence** | Upload and process workflow | Multi-step async flow with validation, LLM integration, error handling, and status polling |
| **UC-002 Sequence** | View and edit results | Parallel PDF loading, inline editing with optimistic updates, view toggling (Card/Table), and real-time validation |
| **UC-003 Sequence** | Export functionality | Client-side Excel generation with SheetJS, multi-sheet workbooks, formatting, and alternative export formats (JSON/CSV/PDF) |
| **UC-004 Sequence** | Document history management | Advanced filtering, search, sorting, pagination, soft delete with confirmation, and empty state handling |

---

## Alignment with Requirements

These models directly support the following requirements from `spec.md` and `design.md`:

**Functional Requirements Coverage:**
- FR-001 to FR-006: Navigation architecture reflected in Component Diagram
- FR-013 to FR-023: Upload workflow detailed in UC-001 Sequence Diagram
- FR-032 to FR-053: Results display and editing shown in UC-002 Sequence Diagram
- FR-054 to FR-068: Export functionality illustrated in UC-003 Sequence Diagram
- FR-069 to FR-078: Document history captured in UC-004 Sequence Diagram

**Non-Functional Requirements Coverage:**
- NFR-011: Backward compatibility maintained through hybrid architecture (System Context, Component Diagrams)
- NFR-001 to NFR-004: Performance optimization through code splitting and lazy loading (Component Diagram)
- NFR-007, NFR-008, NFR-018: Accessibility through shadcn/ui components (Component Diagram)
- NFR-015: Client-side Excel export without server round-trip (UC-003 Sequence Diagram)

**Data Requirements Coverage:**
- DR-001 to DR-015: All data entities, relationships, and storage patterns defined in ERD and Data Flow Diagram
- DR-004: Inline editing with validation shown in UC-002 Sequence Diagram
- DR-005: Audit trail (EntityEdit) modeled in ERD
- DR-011: Multi-format export detailed in UC-003 Sequence Diagram

**Technical Requirements Coverage:**
- TR-001: Hybrid architecture (Django REST + React SPA) shown in all architectural views
- TR-003: React Router with lazy loading illustrated in Component Diagram
- TR-007: React Query for state management depicted in sequence diagrams
- TR-010: SheetJS for Excel export detailed in UC-003 Sequence Diagram
