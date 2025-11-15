# Stage 2: Navigation Testing

## Objective
Systematically test ALL navigation elements to ensure they work correctly.

## Your Role
You are a QA testing agent verifying that every clickable navigation element functions properly.

---

## Pre-conditions
- Page is already loaded
- You can interact with links and buttons
- You can observe URL changes and page updates

---

## Test Checklist

### 1. Navigation Element Discovery
- [ ] Find ALL navigation links in the header/menu
- [ ] Find the logo/brand link (usually top-left)
- [ ] Find any footer navigation links
- [ ] Find any sidebar navigation (if present)
- [ ] Find special navigation buttons (theme toggle, language selector, etc.)

### 2. For EACH Navigation Element Found

#### Before Click:
- [ ] Record current URL
- [ ] Record link text or button label
- [ ] Note element type (link vs button)

#### Click Action:
- [ ] Click the element
- [ ] Wait 1-2 seconds for page response

#### After Click:
- [ ] Record new URL
- [ ] Check if URL changed (or hash changed like #/page)
- [ ] Check if page content changed/updated
- [ ] Check if any modal/popup opened
- [ ] Look for console errors that occurred
- [ ] Determine if navigation was successful

#### Success Criteria:
A navigation is SUCCESSFUL if ANY of these occur:
- ✅ URL changed (full URL or hash fragment)
- ✅ Page content visibly updated
- ✅ Modal/dialog opened
- ✅ Theme/appearance changed (for theme toggle)

A navigation FAILED if ALL of these are true:
- ❌ URL stayed exactly the same
- ❌ No visible change to page
- ❌ Console error occurred
- ❌ Nothing happened at all

---

## Navigation Testing Pattern

For each link, follow this exact pattern:

```
1. Note: "Testing link: [Link Text]"
2. Record: URL before = [current URL]
3. Action: Click the link
4. Wait: 1-2 seconds
5. Observe: URL after = [new URL]
6. Check: Did content change? Yes/No
7. Check: Any console errors? Yes/No
8. Conclude: Success = Yes/No
9. Notes: [What happened]
```

---

## Critical Issues to Flag

### 🚨 CRITICAL
- Navigation causes page to crash
- Navigation shows error page (404, 500)
- Navigation causes JavaScript fatal error
- Main navigation completely broken (Home link doesn't work)

### ⚠️ HIGH Priority
- Primary navigation link doesn't work (About, Contact, Products, etc.)
- Logo link doesn't return to home
- Critical user flow broken (can't reach checkout, can't login, etc.)

### ⚡ MEDIUM Priority
- Footer link doesn't work
- Secondary navigation broken
- Link works but console errors appear

### ℹ️ LOW Priority
- Minor visual issue on navigation
- Link works but URL format is odd

---

## Special Cases

### Hash-based Navigation (SPA)
If the app uses hash routing (URLs like `#/page`):
- ✅ URL changes from `/#/` to `/#/about` = SUCCESS
- ✅ Hash changes even if domain stays same = SUCCESS

### Theme Toggle Button
If there's a theme/dark mode toggle:
- ✅ Page appearance changes = SUCCESS
- ❌ Nothing changes = FAILURE

### External Links
If link goes to external domain:
- ✅ Opens new tab/window = SUCCESS
- ⚠️ Leaves current page = Note this

### Dropdown Menus
If navigation has dropdowns:
- Test parent link click
- Test each dropdown item click

---

## Expected Output Format

Return your findings as JSON in this EXACT format:

```json
{
  "totalLinks": 7,
  "testedLinks": 7,
  "results": [
    {
      "linkText": "Home",
      "elementType": "link",
      "clicked": true,
      "success": true,
      "urlBefore": "https://example.com/#/about",
      "urlAfter": "https://example.com/#/",
      "contentChanged": true,
      "consoleErrors": [],
      "notes": "Navigated to home page successfully"
    },
    {
      "linkText": "About",
      "elementType": "link",
      "clicked": true,
      "success": true,
      "urlBefore": "https://example.com/#/",
      "urlAfter": "https://example.com/#/about",
      "contentChanged": true,
      "consoleErrors": [],
      "notes": "Hash navigation worked correctly"
    }
  ],
  "brokenLinks": [],
  "overallSuccess": true,
  "summary": "All 7 navigation elements tested successfully"
}
```

### Field Descriptions:

- **totalLinks**: Total number of navigation elements found
- **testedLinks**: Number of links actually tested (should equal totalLinks)
- **results**: Array of test results for each link
  - **linkText**: The visible text or label
  - **elementType**: "link", "button", or "toggle"
  - **clicked**: Always true (confirms you clicked it)
  - **success**: true if navigation worked, false if broken
  - **urlBefore**: Full URL before clicking
  - **urlAfter**: Full URL after clicking
  - **contentChanged**: Did page content update? true/false
  - **consoleErrors**: Array of any console errors that occurred
  - **notes**: Brief description of what happened
- **brokenLinks**: Array of link texts that failed (for quick reference)
- **overallSuccess**: true if ALL links worked, false if ANY failed
- **summary**: One sentence summary of results

---

## Testing Guidelines

### Systematic Approach
1. Start from top of page
2. Work through each navigation element in order
3. Test EVERY element (don't skip any)
4. Return to a known page between tests if needed

### Accurate Recording
- Copy exact link text (including capitalization)
- Copy full URLs (don't abbreviate)
- Note exact console error messages
- Be precise about what changed

### Thorough Coverage
- Test all visible navigation
- Test dropdown menus if present
- Test mobile menu if page is responsive
- Test footer links
- Test logo link

### Error Handling
- If a link opens a modal, close it before continuing
- If a link navigates away, navigate back to test page
- If a link causes an error, note it and continue testing others

---

## Example Scenarios

### ✅ Perfect Navigation (Success)
```json
{
  "totalLinks": 5,
  "testedLinks": 5,
  "results": [
    {"linkText": "Home", "success": true, "notes": "Works perfectly"},
    {"linkText": "About", "success": true, "notes": "Works perfectly"},
    {"linkText": "Services", "success": true, "notes": "Works perfectly"},
    {"linkText": "Contact", "success": true, "notes": "Works perfectly"},
    {"linkText": "Toggle theme", "success": true, "notes": "Theme changed"}
  ],
  "brokenLinks": [],
  "overallSuccess": true,
  "summary": "All navigation working perfectly"
}
```

### ❌ Broken Link (Failure)
```json
{
  "totalLinks": 5,
  "testedLinks": 5,
  "results": [
    {"linkText": "Home", "success": true, "notes": "Works"},
    {
      "linkText": "Broken Link",
      "success": false,
      "urlBefore": "https://example.com/",
      "urlAfter": "https://example.com/",
      "contentChanged": false,
      "consoleErrors": ["404 Not Found"],
      "notes": "Link doesn't work - no URL change, no content change"
    }
  ],
  "brokenLinks": ["Broken Link"],
  "overallSuccess": false,
  "summary": "1 out of 5 links broken"
}
```

---

## Navigation Testing Matrix

| Link | Click | URL Change | Content Change | Result |
|------|-------|------------|----------------|--------|
| Home | ✅ | ✅ #/ | ✅ | ✅ PASS |
| About | ✅ | ✅ #/about | ✅ | ✅ PASS |
| Agent | ✅ | ✅ #/agent | ✅ | ✅ PASS |
| Broken | ✅ | ❌ Same | ❌ No | ❌ FAIL |

---

## Post-Testing Actions

After testing all navigation:
- [ ] Return to the home page
- [ ] Verify you can still navigate normally
- [ ] Confirm browser is in a stable state

---

## Time Estimate
Expected completion: 1-2 minutes (depends on number of links)

## Success Criteria
- ALL navigation elements tested (100% coverage)
- Each test recorded with full details
- Broken links clearly identified
- Valid JSON output returned
- Clear summary of pass/fail status
