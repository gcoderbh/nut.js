# nut.js Quick Reference Guide

## 🚀 Installation Commands

```bash
# Method 1: Direct installation in your project
npm install file:/Users/prajuk/Documents/dev/nut.js/core/nut.js

# Method 2: Create global link
cd /Users/prajuk/Documents/dev/nut.js/core/nut.js
npm link

# Then in your project:
npm link @nut-tree/nut-js
```

## 📦 Basic Import

```javascript
const { 
    mouse, 
    keyboard, 
    screen, 
    Point, 
    Button, 
    Key, 
    Region,
    sleep 
} = require('@nut-tree/nut-js');
```

## 🖱️ Mouse Operations

```javascript
// Move mouse
await mouse.move([new Point(x, y)]);

// Click
await mouse.click(Button.LEFT);
await mouse.click(Button.RIGHT);
await mouse.click(Button.MIDDLE);

// Double click
await mouse.doubleClick(Button.LEFT);

// Drag
await mouse.drag([new Point(startX, startY), new Point(endX, endY)]);

// Scroll
await mouse.scroll([new Point(x, y)], scrollAmount);
```

## ⌨️ Keyboard Operations

```javascript
// Type text
await keyboard.type('Hello World');

// Press single key
await keyboard.pressKey(Key.Enter);
await keyboard.pressKey(Key.Escape);
await keyboard.pressKey(Key.Tab);

// Key combinations
await keyboard.pressKey(Key.LeftControl, Key.C); // Ctrl+C
await keyboard.pressKey(Key.LeftControl, Key.V); // Ctrl+V
await keyboard.pressKey(Key.LeftAlt, Key.Tab);   // Alt+Tab

// Hold and release
await keyboard.pressKey(Key.LeftShift);
await keyboard.type('UPPERCASE');
await keyboard.releaseKey(Key.LeftShift);
```

## 🖥️ Screen Operations

```javascript
// Get screen size
const size = await screen.size();

// Capture screenshot
const image = await screen.capture();

// Get pixel color
const color = await screen.colorAt(new Point(x, y));

// Highlight region (for debugging)
await screen.highlight(new Region(x, y, width, height));
```

## 🏗️ Common Patterns

### Basic Automation Template

```javascript
const { mouse, keyboard, screen, Point, Button, Key, sleep } = require('@nut-tree/nut-js');

async function automateTask() {
    try {
        console.log('Starting automation...');
        
        // Wait before starting
        await sleep(2000);
        
        // Your automation steps here
        await mouse.move([new Point(100, 100)]);
        await mouse.click(Button.LEFT);
        await keyboard.type('Your text here');
        
        console.log('Automation completed!');
    } catch (error) {
        console.error('Automation failed:', error);
    }
}

automateTask();
```

### Configuration Setup

```javascript
// Configure delays and speeds
mouse.config.autoDelayMs = 100;
mouse.config.mouseSpeed = 1000;
keyboard.config.autoDelayMs = 50;

// Screen highlighting for debugging
screen.config.autoHighlight = true;
screen.config.highlightDurationMs = 500;
```

## 🐛 Quick Debugging

```javascript
// Add highlights to see where you're clicking
screen.config.autoHighlight = true;

// Add delays to see automation steps
await sleep(1000); // 1 second pause

// Log coordinates
console.log(`Clicking at: ${point.x}, ${point.y}`);

// Capture screenshot for verification
const screenshot = await screen.capture();
console.log('Screenshot saved');
```

## 🔧 Error Handling

```javascript
async function safeAutomation() {
    try {
        await mouse.move([new Point(100, 100)]);
        await mouse.click(Button.LEFT);
    } catch (error) {
        if (error.message.includes('permission')) {
            console.error('Need accessibility permissions');
        } else {
            console.error('Unexpected error:', error);
        }
    }
}
```

## 📝 Package.json Template

```json
{
  "name": "my-automation-project",
  "version": "1.0.0",
  "description": "Automation project using nut.js",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "test": "node test.js"
  },
  "dependencies": {
    "@nut-tree/nut-js": "file:/Users/prajuk/Documents/dev/nut.js/core/nut.js"
  }
}
```

## 🎯 Common Use Cases

### Form Filling
```javascript
await mouse.move([new Point(inputX, inputY)]);
await mouse.click(Button.LEFT);
await keyboard.type('user@example.com');
await keyboard.pressKey(Key.Tab);
await keyboard.type('password123');
await keyboard.pressKey(Key.Enter);
```

### Window Management
```javascript
// Alt+Tab to switch windows
await keyboard.pressKey(Key.LeftAlt, Key.Tab);
await sleep(500);

// Minimize window
await keyboard.pressKey(Key.LeftSuper, Key.M);
```

### Text Selection and Copy
```javascript
// Triple click to select line
await mouse.click(Button.LEFT);
await mouse.click(Button.LEFT);
await mouse.click(Button.LEFT);

// Or select all
await keyboard.pressKey(Key.LeftControl, Key.A);

// Copy
await keyboard.pressKey(Key.LeftControl, Key.C);
```

---

**Need more help?** Check the full USER_MANUAL.md for detailed explanations and advanced examples!
