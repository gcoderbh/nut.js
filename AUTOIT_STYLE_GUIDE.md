# AutoIt-Style Functions for nut.js

## 📋 Overview

This module provides AutoIt-style functions for nut.js, making it familiar for users coming from AutoIt. All functions are async and return promises.

## 🚀 Quick Start

```javascript
const { MouseClick, MouseMove, Send, Sleep } = require('./autoit-style');

async function example() {
    // Click at coordinates (100, 200)
    await MouseClick("left", 100, 200);
    
    // Type some text
    await Send("Hello World");
    
    // Wait 1 second
    await Sleep(1000);
    
    // Move mouse to new position
    await MouseMove(300, 400, 5);
}
```

## 🖱️ Mouse Functions

### MouseClick(button, x, y, clicks, speed)
Clicks mouse button at specified coordinates.

**Parameters:**
- `button` (string): "left", "right", "middle" (default: "left")
- `x` (number): X coordinate (optional, uses current position if null)
- `y` (number): Y coordinate (optional, uses current position if null)  
- `clicks` (number): Number of clicks (default: 1, use 2 for double-click)
- `speed` (number): Click speed 1-10, where 10 is fastest (default: 10)

**Examples:**
```javascript
// Left click at (100, 200)
await MouseClick("left", 100, 200);

// Right click at current position
await MouseClick("right");

// Double click
await MouseClick("left", 100, 200, 2);

// Slow click
await MouseClick("left", 100, 200, 1, 3);
```

### MouseMove(x, y, speed)
Moves mouse to specified coordinates.

**Parameters:**
- `x` (number): X coordinate
- `y` (number): Y coordinate
- `speed` (number): Movement speed 1-10, where 10 is fastest (default: 10)

**Example:**
```javascript
await MouseMove(500, 300, 5);
```

### MouseGetPos()
Gets current mouse position.

**Returns:** Object with `x` and `y` properties

**Example:**
```javascript
const pos = await MouseGetPos();
console.log(`Mouse at: (${pos.x}, ${pos.y})`);
```

### Convenience Functions

```javascript
// Simplified click functions
await LeftClick(100, 200);    // Left click at coordinates
await RightClick(100, 200);   // Right click at coordinates  
await DoubleClick(100, 200);  // Double click at coordinates

// Click at current position
await LeftClick();
await RightClick();
```

## ⌨️ Keyboard Functions

### Send(text, raw)
Sends text/keystrokes.

**Parameters:**
- `text` (string): Text to send
- `raw` (boolean): If true, send as raw text without processing (default: false)

**Special Keys (when raw=false):**
- `{ENTER}` - Enter key
- `{TAB}` - Tab key
- `{SPACE}` - Space key

**Examples:**
```javascript
// Send text with Enter
await Send("Hello World{ENTER}");

// Send raw text
await Send("Special {characters}", true);

// Send tab and text
await Send("{TAB}Username");
```

## 🖥️ Screen Functions

### GetDesktopWidth()
Gets screen width.

**Returns:** Number (width in pixels)

### GetDesktopHeight()  
Gets screen height.

**Returns:** Number (height in pixels)

**Example:**
```javascript
const width = await GetDesktopWidth();
const height = await GetDesktopHeight();
console.log(`Screen: ${width}x${height}`);
```

## ⏱️ Utility Functions

### Sleep(milliseconds)
Pauses execution for specified time.

**Parameters:**
- `milliseconds` (number): Time to wait in milliseconds

**Example:**
```javascript
await Sleep(1000); // Wait 1 second
await Sleep(500);  // Wait 0.5 seconds
```

## 🔧 Usage Patterns

### Basic Automation Script
```javascript
const { MouseClick, Send, Sleep, MouseGetPos } = require('./autoit-style');

async function automateForm() {
    // Click on username field
    await MouseClick("left", 300, 100);
    await Sleep(100);
    
    // Type username
    await Send("myusername");
    await Sleep(100);
    
    // Tab to password field
    await Send("{TAB}");
    await Sleep(100);
    
    // Type password
    await Send("mypassword");
    await Sleep(100);
    
    // Click submit button
    await MouseClick("left", 400, 200);
}
```

### Mouse Movement Pattern
```javascript
const { MouseMove, Sleep, MouseGetPos } = require('./autoit-style');

async function drawSquare() {
    const start = await MouseGetPos();
    const size = 100;
    
    // Draw square
    await MouseMove(start.x + size, start.y);         // Right
    await Sleep(200);
    await MouseMove(start.x + size, start.y + size);  // Down  
    await Sleep(200);
    await MouseMove(start.x, start.y + size);         // Left
    await Sleep(200);
    await MouseMove(start.x, start.y);                // Up
}
```

### Screen Size Detection
```javascript
const { GetDesktopWidth, GetDesktopHeight, MouseMove } = require('./autoit-style');

async function clickCenter() {
    const width = await GetDesktopWidth();
    const height = await GetDesktopHeight();
    
    // Click center of screen
    await MouseClick("left", width / 2, height / 2);
}
```

## 📝 AutoIt vs nut.js Comparison

| AutoIt Function | nut.js Equivalent | Notes |
|-----------------|-------------------|-------|
| `MouseClick("left", 100, 200)` | `await MouseClick("left", 100, 200)` | Same syntax, but async |
| `MouseMove(100, 200)` | `await MouseMove(100, 200)` | Same syntax, but async |
| `MouseGetPos()` | `await MouseGetPos()` | Returns `{x, y}` object |
| `Send("text")` | `await Send("text")` | Same syntax, but async |
| `Sleep(1000)` | `await Sleep(1000)` | Same syntax, but async |
| `@DesktopWidth` | `await GetDesktopWidth()` | Function instead of macro |
| `@DesktopHeight` | `await GetDesktopHeight()` | Function instead of macro |

## ⚠️ Important Notes

1. **All functions are async** - Use `await` or `.then()`
2. **Coordinates are absolute** - (0,0) is top-left corner
3. **Speed parameter** - 1 = slowest, 10 = fastest
4. **Error handling** - Functions return `true`/`false` for success/failure
5. **macOS permissions** - May require accessibility permissions

## 🚀 Advanced Example

```javascript
const { 
    MouseClick, 
    MouseMove, 
    MouseGetPos, 
    Send, 
    Sleep,
    GetDesktopWidth,
    GetDesktopHeight 
} = require('./autoit-style');

async function complexAutomation() {
    try {
        console.log('Starting automation...');
        
        // Get screen info
        const screenWidth = await GetDesktopWidth();
        const screenHeight = await GetDesktopHeight();
        console.log(`Screen: ${screenWidth}x${screenHeight}`);
        
        // Save current mouse position
        const originalPos = await MouseGetPos();
        
        // Perform automation tasks
        await MouseClick("left", 100, 100);
        await Sleep(500);
        
        await Send("Hello from nut.js AutoIt-style!{ENTER}");
        await Sleep(1000);
        
        // Restore mouse position
        await MouseMove(originalPos.x, originalPos.y);
        
        console.log('Automation completed!');
        
    } catch (error) {
        console.error('Automation failed:', error);
    }
}

complexAutomation();
```

Now you have AutoIt-style functions that work just like the original AutoIt! 🎉
