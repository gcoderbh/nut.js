# nut.js User Manual - Using Local Build in Other Projects

## 📋 Overview

This manual explains how to use your locally built nut.js with the integrated `libnut-core` in other projects. After following this guide, you'll be able to use nut.js in any Node.js project without needing the published npm packages.

## 🏗️ What You Have

Your nut.js setup now includes:
- **Local libnut-core build** at `../libnut-core`
- **Updated libnut provider** that uses the local build
- **Clean, minimal codebase** with all unnecessary files removed
- **Standalone TypeScript compilation** without workspace dependencies

## 🚀 Quick Start Guide

### Method 1: Direct Installation (Recommended)

1. **Navigate to your project directory:**
   ```bash
   cd /path/to/your/project
   ```

2. **Install nut.js from your local build:**
   ```bash
   npm install file:/Users/prajuk/Documents/dev/nut.js/core/nut.js
   ```
   
   Or with yarn:
   ```bash
   yarn add file:/Users/prajuk/Documents/dev/nut.js/core/nut.js
   ```

3. **Use nut.js in your project:**
   ```javascript
   const { mouse, keyboard, screen } = require('@nut-tree/nut-js');
   
   // Your automation code here
   ```

### Method 2: Link Installation (For Development)

1. **Create a global link from nut.js:**
   ```bash
   cd /Users/prajuk/Documents/dev/nut.js/core/nut.js
   npm link
   ```

2. **Link in your project:**
   ```bash
   cd /path/to/your/project
   npm link @nut-tree/nut-js
   ```

3. **Use nut.js normally:**
   ```javascript
   const { mouse, keyboard, screen } = require('@nut-tree/nut-js');
   ```

## 📦 Package.json Configuration

### Basic Configuration

Add nut.js to your project's `package.json`:

```json
{
  "name": "my-automation-project",
  "version": "1.0.0",
  "dependencies": {
    "@nut-tree/nut-js": "file:/Users/prajuk/Documents/dev/nut.js/core/nut.js"
  }
}
```

### With Additional Providers (Optional)

If you need additional providers like template matching:

```json
{
  "name": "my-automation-project",
  "version": "1.0.0",
  "dependencies": {
    "@nut-tree/nut-js": "file:/Users/prajuk/Documents/dev/nut.js/core/nut.js",
    "@nut-tree/template-matcher": "file:/Users/prajuk/Documents/dev/nut.js/providers/template-matcher"
  }
}
```

## 💻 Code Examples

### Basic Mouse Control

```javascript
const { mouse, Point, Button } = require('@nut-tree/nut-js');

async function basicMouseDemo() {
    // Move mouse to specific coordinates
    await mouse.move([new Point(100, 100)]);
    
    // Click left mouse button
    await mouse.click(Button.LEFT);
    
    // Right click
    await mouse.click(Button.RIGHT);
    
    // Drag from one point to another
    await mouse.drag([new Point(100, 100), new Point(200, 200)]);
}

basicMouseDemo();
```

### Keyboard Automation

```javascript
const { keyboard, Key } = require('@nut-tree/nut-js');

async function keyboardDemo() {
    // Type text
    await keyboard.type('Hello, World!');
    
    // Press single keys
    await keyboard.pressKey(Key.Enter);
    
    // Key combinations
    await keyboard.pressKey(Key.LeftControl, Key.C); // Ctrl+C
    await keyboard.pressKey(Key.LeftControl, Key.V); // Ctrl+V
    
    // Press and hold
    await keyboard.pressKey(Key.LeftShift);
    await keyboard.type('UPPERCASE TEXT');
    await keyboard.releaseKey(Key.LeftShift);
}

keyboardDemo();
```

### Screen Operations

```javascript
const { screen, Region } = require('@nut-tree/nut-js');

async function screenDemo() {
    // Get screen size
    const screenSize = await screen.size();
    console.log(`Screen size: ${screenSize.width}x${screenSize.height}`);
    
    // Capture screenshot
    const screenshot = await screen.capture();
    
    // Get pixel color at specific position
    const color = await screen.colorAt(new Point(100, 100));
    console.log(`Color at (100,100): R:${color.R} G:${color.G} B:${color.B}`);
    
    // Highlight a region (for debugging)
    await screen.highlight(new Region(100, 100, 200, 200));
}

screenDemo();
```

### Complete Automation Example

```javascript
const { 
    mouse, 
    keyboard, 
    screen, 
    Point, 
    Button, 
    Key,
    sleep 
} = require('@nut-tree/nut-js');

async function automationExample() {
    try {
        // Wait for user to position windows
        console.log('Starting automation in 3 seconds...');
        await sleep(3000);
        
        // Take a screenshot first
        const screenshot = await screen.capture();
        console.log('Screenshot captured');
        
        // Click on a specific position
        await mouse.move([new Point(500, 300)]);
        await mouse.click(Button.LEFT);
        
        // Type some text
        await keyboard.type('Automated by nut.js');
        
        // Press Enter
        await keyboard.pressKey(Key.Enter);
        
        // Select all text (Ctrl+A)
        await keyboard.pressKey(Key.LeftControl, Key.A);
        
        // Copy (Ctrl+C)
        await keyboard.pressKey(Key.LeftControl, Key.C);
        
        console.log('Automation completed successfully!');
        
    } catch (error) {
        console.error('Automation failed:', error);
    }
}

automationExample();
```

## 🛠️ Advanced Configuration

### Custom Provider Configuration

```javascript
const { mouse, keyboard, screen } = require('@nut-tree/nut-js');

// Configure mouse movement speed
mouse.config.autoDelayMs = 100;
mouse.config.mouseSpeed = 1000;

// Configure keyboard delays
keyboard.config.autoDelayMs = 50;

// Configure screen operations
screen.config.autoHighlight = true;
screen.config.highlightDurationMs = 500;
screen.config.highlightOpacity = 0.7;
```

### Error Handling

```javascript
const { mouse, Point } = require('@nut-tree/nut-js');

async function robustAutomation() {
    try {
        await mouse.move([new Point(100, 100)]);
    } catch (error) {
        if (error.message.includes('coordinates')) {
            console.error('Invalid coordinates provided');
        } else if (error.message.includes('permission')) {
            console.error('Insufficient permissions. Check system settings.');
        } else {
            console.error('Unexpected error:', error);
        }
    }
}
```

## 📁 Project Structure Examples

### Simple Automation Project

```
my-automation-project/
├── package.json
├── index.js
└── automation/
    ├── mouse-automation.js
    ├── keyboard-automation.js
    └── screen-automation.js
```

### TypeScript Project

```
my-ts-automation/
├── package.json
├── tsconfig.json
├── src/
│   ├── index.ts
│   └── automation/
│       ├── mouse.ts
│       ├── keyboard.ts
│       └── screen.ts
└── dist/
```

**tsconfig.json for TypeScript projects:**
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "lib": ["ES2020"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

## 🔧 Troubleshooting

### Common Issues and Solutions

#### 1. Module Not Found Error
```bash
Error: Cannot find module '@nut-tree/nut-js'
```

**Solution:**
- Verify the file path in package.json is correct
- Run `npm install` again
- Check that nut.js was built successfully

#### 2. Permission Errors (macOS)
```bash
##### WARNING! The application running this script is not a trusted process! #####
```

**Solution:**
- Go to System Preferences → Security & Privacy → Privacy
- Add your terminal/IDE to Accessibility and Screen Recording

#### 3. Native Module Loading Issues
```bash
Error: The specified module could not be found
```

**Solution:**
- Ensure libnut-core was built correctly
- Check that all native dependencies are installed
- Rebuild native modules: `npm rebuild`

#### 4. TypeScript Declaration Issues
```bash
Could not find declaration file for module '@nut-tree/nut-js'
```

**Solution:**
- Ensure TypeScript declarations are included in the build
- Add `"skipLibCheck": true` to tsconfig.json temporarily

### Performance Tips

1. **Reduce delays for faster automation:**
   ```javascript
   mouse.config.autoDelayMs = 0;
   keyboard.config.autoDelayMs = 0;
   ```

2. **Use batch operations when possible:**
   ```javascript
   // Instead of multiple single moves
   await mouse.move([point1, point2, point3]);
   ```

3. **Cache screen captures:**
   ```javascript
   const screenshot = await screen.capture();
   // Use screenshot for multiple operations
   ```

## 🚀 Deployment Considerations

### Distributing Your Application

When distributing applications that use your local nut.js build:

1. **Include the entire nut.js directory** in your distribution
2. **Ensure native dependencies** are compatible with target platforms
3. **Test on target systems** before deployment
4. **Document system requirements** for end users

### Docker Considerations

For Docker deployments, you may need to:

```dockerfile
# Install system dependencies
RUN apt-get update && apt-get install -y \
    libxtst6 \
    libxrandr2 \
    libasound2 \
    libpangocairo-1.0-0 \
    libatk1.0-0 \
    libcairo-gobject2 \
    libgtk-3-0 \
    libgdk-pixbuf2.0-0

# Copy your application and nut.js
COPY . /app
COPY path/to/nut.js /app/node_modules/@nut-tree/nut-js
```

## 📞 Support and Resources

### Getting Help

1. **Check the official documentation:** [nutjs.dev](https://nutjs.dev)
2. **Join the Discord community:** [Discord link](https://discord.gg/U5csuM4Esp)
3. **Review API documentation:** [API Docs](https://nut-tree.github.io/apidoc/)
4. **Check GitHub issues:** [nut.js Issues](https://github.com/nut-tree/nut.js/issues)

### Useful Resources

- **Official Website:** https://nutjs.dev
- **GitHub Repository:** https://github.com/nut-tree/nut.js
- **API Documentation:** https://nut-tree.github.io/apidoc/
- **Community Discord:** https://discord.gg/U5csuM4Esp

## 📝 Examples Repository

Create a dedicated examples folder in your project:

```bash
mkdir examples
cd examples
```

Save the code examples from this manual as separate files for easy reference and testing.

---

## 🎉 You're Ready!

You now have everything you need to use nut.js in your own projects. Start with the simple examples and gradually build more complex automation scenarios.

Remember to always test your automation scripts thoroughly and consider the user experience when deploying automated solutions.

Happy automating! 🤖
