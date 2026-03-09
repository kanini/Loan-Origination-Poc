# Navigation Map - GenAI PDF Extractor

## Navigation Architecture

### Primary Navigation (Fixed Header)
**Location**: Top of all pages  
**Type**: Horizontal menu bar  
**Persistence**: Fixed position, visible on all screens

| Menu Item | Target Screen | Active State Indicator | Keyboard Shortcut |
|-----------|--------------|----------------------|------------------|
| Dashboard | SCR-001 | Blue underline (2px) | Alt+D |
| Upload | SCR-002 | Blue underline (2px) | Alt+U |
| History | SCR-005 | Blue underline (2px) | Alt+H |

**Responsive Behavior**:
- Desktop (≥1024px): Full horizontal menu
- Tablet (768px-1023px): Full horizontal menu
- Mobile (<768px): Hamburger menu → Drawer

### Secondary Navigation (Breadcrumbs)
**Location**: Below header  
**Type**: Hierarchical trail  
**Screens**: SCR-002, SCR-003, SCR-004

| Screen | Breadcrumb Trail | Clickable Items |
|--------|-----------------|----------------|
| SCR-002 (Upload) | Home > Upload Document | Home |
| SCR-003 (Processing) | Home > Upload Document > Processing | Home, Upload Document |
| SCR-004 (Results) | Home > Results > [Document Name] | Home |

### Quick Actions (Global CTAs)
**Location**: Various positions per screen  
**Type**: Prominent action buttons

| Action | Available On | Target Screen | Button Style |
|--------|-------------|--------------|-------------|
| Upload New Document | SCR-001, SCR-004, SCR-005 | SCR-002 | Primary Button |
| View All Documents | SCR-001 | SCR-005 | Secondary Button |
| Process Another | SCR-004 | SCR-002 | Secondary Button |

## Screen-to-Screen Navigation Flow

### Flow 1: Primary Document Processing
```
SCR-001 (Dashboard)
    ↓ Click "Upload New Document"
SCR-002 (Upload)
    ↓ Click "Extract Entities"
SCR-003 (Processing)
    ↓ Auto-redirect on success
SCR-004 (Results)
    ↓ Click "Export" → Download file
    ↓ Click "Process Another"
SCR-002 (Upload)
```

### Flow 2: Document Retrieval
```
SCR-001 (Dashboard)
    ↓ Click "View All" or nav "History"
SCR-005 (History)
    ↓ Click document card
SCR-004 (Results)
    ↓ Click breadcrumb "Home"
SCR-001 (Dashboard)
```

### Flow 3: Quick Upload from Any Page
```
Any Screen
    ↓ Click "Upload" in header
SCR-002 (Upload)
    ↓ Follow Flow 1
```

### Flow 4: Error Recovery
```
SCR-003 (Processing) - Error State
    ↓ Click "Retry"
SCR-003 (Processing) - Retry
    OR
    ↓ Click "Change Model"
SCR-002 (Upload) - File preserved
    OR
    ↓ Click "Cancel"
SCR-001 (Dashboard)
```

## Navigation Matrix

| From Screen | To Screen | Trigger | Navigation Type | Back Button Behavior |
|------------|-----------|---------|----------------|---------------------|
| SCR-001 | SCR-002 | Click "Upload New Document" | Forward | Return to SCR-001 |
| SCR-001 | SCR-005 | Click "View All" or nav "History" | Forward | Return to SCR-001 |
| SCR-001 | SCR-004 | Click recent document card | Forward | Return to SCR-001 |
| SCR-002 | SCR-003 | Click "Extract Entities" | Forward | Return to SCR-002 |
| SCR-002 | SCR-001 | Click "Cancel" or breadcrumb "Home" | Back | N/A |
| SCR-003 | SCR-004 | Auto-redirect on success | Forward | Return to SCR-003 |
| SCR-003 | SCR-002 | Click "Change Model" | Back | N/A |
| SCR-003 | SCR-001 | Click "Cancel" | Back | N/A |
| SCR-004 | SCR-002 | Click "Process Another" | Forward | Return to SCR-004 |
| SCR-004 | SCR-001 | Click breadcrumb "Home" | Back | N/A |
| SCR-005 | SCR-004 | Click document card/row | Forward | Return to SCR-005 |
| SCR-005 | SCR-002 | Click "Upload New" | Forward | Return to SCR-005 |
| SCR-005 | SCR-001 | Click nav "Dashboard" | Back | N/A |

## Cross-Screen Navigation Patterns

### Pattern 1: Logo Click
**Behavior**: Always returns to Dashboard (SCR-001)  
**Available**: All screens  
**Implementation**: `<a href="/">` on logo

### Pattern 2: Active Page Highlighting
**Behavior**: Current page highlighted in primary navigation  
**Visual**: Primary Blue (#3B82F6) text color + 2px bottom border  
**Available**: All screens with primary nav

### Pattern 3: Breadcrumb Navigation
**Behavior**: Click any breadcrumb item to navigate to that level  
**Visual**: Clickable items underlined on hover  
**Available**: SCR-002, SCR-003, SCR-004

### Pattern 4: Card Click Navigation
**Behavior**: Entire card clickable, navigates to detail view  
**Visual**: Hover shadow lift, cursor pointer  
**Available**: SCR-001 (recent documents), SCR-005 (document grid)

### Pattern 5: Modal Overlay Navigation
**Behavior**: Modal opens over current page, closes return to same page  
**Visual**: Backdrop overlay, centered modal  
**Available**: SCR-005 (delete confirmation)

## Navigation Accessibility

### Keyboard Navigation
| Action | Keyboard Shortcut | Description |
|--------|------------------|-------------|
| Navigate menu items | Tab | Move focus through navigation |
| Activate link | Enter | Navigate to target screen |
| Skip to main content | Tab (first item) | Bypass navigation |
| Close modal | Esc | Dismiss modal, return focus |
| Navigate breadcrumbs | Tab | Move through breadcrumb items |

### Screen Reader Announcements
| Event | Announcement |
|-------|-------------|
| Page load | "Dashboard page loaded" / "Upload page loaded" etc. |
| Navigation change | "Navigated to [Page Name]" |
| Modal open | "Delete confirmation dialog opened" |
| Modal close | "Dialog closed, focus returned to [trigger element]" |

### Focus Management
| Scenario | Focus Behavior |
|----------|---------------|
| Page load | Focus on skip link (first tab stop) |
| Modal open | Focus on modal title or first interactive element |
| Modal close | Return focus to trigger element |
| Form submission | Focus on first error or success message |

## Deep Linking Support

### URL Structure
| Screen | URL Pattern | Example |
|--------|------------|---------|
| Dashboard | `/` or `/dashboard` | `https://app.example.com/` |
| Upload | `/upload` | `https://app.example.com/upload` |
| Processing | `/processing/:documentId` | `https://app.example.com/processing/abc123` |
| Results | `/results/:documentId` | `https://app.example.com/results/abc123` |
| History | `/history` | `https://app.example.com/history` |

### Query Parameters
| Parameter | Usage | Example |
|-----------|-------|---------|
| `?view=table` | Set default view mode | `/results/abc123?view=table` |
| `?filter=success` | Pre-filter history | `/history?filter=success` |
| `?search=loan` | Pre-populate search | `/history?search=loan` |

## Navigation State Persistence

### Session Storage
| Key | Value | Purpose |
|-----|-------|---------|
| `viewMode` | `card` or `table` | Remember user's view preference |
| `lastVisitedDocument` | Document ID | Quick return to last viewed document |
| `historyFilters` | JSON object | Persist filter selections |

### Browser History
| Action | History Entry | Back Button Behavior |
|--------|--------------|---------------------|
| Navigate to new screen | New entry | Return to previous screen |
| Toggle view mode | No new entry | Same screen, different view |
| Apply filters | No new entry | Same screen, filtered |
| Open modal | No new entry | Close modal, stay on screen |

## Navigation Error Handling

### Scenario 1: Invalid Document ID
**URL**: `/results/invalid-id`  
**Behavior**: Redirect to Dashboard with error toast  
**Message**: "Document not found. Redirecting to dashboard..."

### Scenario 2: Unauthorized Access
**URL**: Any protected route  
**Behavior**: Redirect to login (Phase 2) or Dashboard  
**Message**: "Please log in to continue"

### Scenario 3: Network Error During Navigation
**Behavior**: Show error state on target screen  
**Recovery**: Retry button or back navigation

## Mobile Navigation Specifics

### Hamburger Menu
**Trigger**: Click hamburger icon (top-right)  
**Behavior**: Slide-in drawer from right  
**Contents**: 
- Dashboard link
- Upload link
- History link
- Close button (X)

**Dismissal**:
- Click close button
- Click outside drawer (backdrop)
- Press ESC key
- Navigate to any page

### Touch Gestures
| Gesture | Action | Screens |
|---------|--------|---------|
| Swipe left | Next page (if applicable) | SCR-004 (PDF pages) |
| Swipe right | Previous page (if applicable) | SCR-004 (PDF pages) |
| Pull to refresh | Reload data | SCR-001, SCR-005 |

## Navigation Performance

### Page Transitions
**Duration**: 300ms fade-in  
**Easing**: ease-out  
**Loading States**: Skeleton screens during data fetch

### Prefetching
| Scenario | Prefetch Target | Trigger |
|----------|----------------|---------|
| Hover on document card | Document details | 200ms hover delay |
| Dashboard load | Recent documents data | On mount |
| History load | Document thumbnails | On mount |

---

**Document Version**: 1.0  
**Last Updated**: March 9, 2026  
**Status**: Complete
