// AutoIt-style wrapper for nut.js
// Provides familiar AutoIt functions like MouseClick, Send, etc.

const { DefaultMouseAction, DefaultKeyboardAction, DefaultScreenAction } = require('./providers/libnut/dist');
const { Point, Button, Key } = require('./providers/libnut/dist/lib/shared-types');

class AutoItStyle {
    constructor() {
        this.mouse = new DefaultMouseAction();
        this.keyboard = new DefaultKeyboardAction();
        this.screen = new DefaultScreenAction();
    }

    // AutoIt MouseClick equivalent
    // MouseClick(button, x, y, clicks, speed)
    async MouseClick(button = "left", x = null, y = null, clicks = 1, speed = 10) {
        try {
            // Move to position if specified
            if (x !== null && y !== null) {
                await this.mouse.setMousePosition(new Point(x, y));
                // Add delay based on speed (lower = faster)
                await this.Sleep(Math.max(1, 11 - speed) * 10);
            }

            // Convert button string to Button enum
            let btn;
            switch (button.toLowerCase()) {
                case "left":
                case "primary":
                    btn = Button.LEFT;
                    break;
                case "right":
                case "secondary":
                    btn = Button.RIGHT;
                    break;
                case "middle":
                case "wheel":
                    btn = Button.MIDDLE;
                    break;
                default:
                    btn = Button.LEFT;
            }

            // Perform clicks
            for (let i = 0; i < clicks; i++) {
                if (clicks === 2 && i === 0) {
                    // Double click
                    await this.mouse.doubleClick(btn);
                    break;
                } else {
                    await this.mouse.click(btn);
                    if (i < clicks - 1) {
                        await this.Sleep(50); // Delay between clicks
                    }
                }
            }

            return true;
        } catch (error) {
            console.error(`MouseClick failed: ${error.message}`);
            return false;
        }
    }

    // AutoIt MouseMove equivalent
    async MouseMove(x, y, speed = 10) {
        try {
            // Add delay based on speed
            const delay = Math.max(1, 11 - speed) * 10;
            this.mouse.setMouseDelay(delay);
            
            await this.mouse.setMousePosition(new Point(x, y));
            return true;
        } catch (error) {
            console.error(`MouseMove failed: ${error.message}`);
            return false;
        }
    }

    // AutoIt MouseGetPos equivalent
    async MouseGetPos() {
        try {
            const pos = await this.mouse.currentMousePosition();
            return { x: pos.x, y: pos.y };
        } catch (error) {
            console.error(`MouseGetPos failed: ${error.message}`);
            return { x: -1, y: -1 };
        }
    }

    // AutoIt Send equivalent (simplified)
    async Send(text, raw = false) {
        try {
            if (raw) {
                // Send as raw text
                await this.keyboard.type(text);
            } else {
                // Process special keys (basic implementation)
                // You can extend this to handle {ENTER}, {TAB}, etc.
                const processed = text
                    .replace(/{ENTER}/g, '\n')
                    .replace(/{TAB}/g, '\t')
                    .replace(/{SPACE}/g, ' ');
                
                await this.keyboard.type(processed);
            }
            return true;
        } catch (error) {
            console.error(`Send failed: ${error.message}`);
            return false;
        }
    }

    // AutoIt Sleep equivalent
    async Sleep(milliseconds) {
        return new Promise(resolve => setTimeout(resolve, milliseconds));
    }

    // AutoIt PixelGetColor equivalent
    async PixelGetColor(x, y) {
        try {
            // Note: This would need to be implemented in the screen provider
            // For now, we'll capture screen and extract pixel
            const screenshot = await this.screen.grabScreen();
            // This is a simplified version - full implementation would need pixel extraction
            console.log(`Would get pixel color at (${x}, ${y})`);
            return 0x000000; // Placeholder
        } catch (error) {
            console.error(`PixelGetColor failed: ${error.message}`);
            return -1;
        }
    }

    // AutoIt WinGetTitle equivalent (simplified)
    async WinGetTitle() {
        try {
            // This would need window provider implementation
            console.log('WinGetTitle - not fully implemented yet');
            return "";
        } catch (error) {
            console.error(`WinGetTitle failed: ${error.message}`);
            return "";
        }
    }

    // Convenience methods
    async LeftClick(x = null, y = null) {
        return await this.MouseClick("left", x, y, 1);
    }

    async RightClick(x = null, y = null) {
        return await this.MouseClick("right", x, y, 1);
    }

    async DoubleClick(x = null, y = null) {
        return await this.MouseClick("left", x, y, 2);
    }

    // Get screen dimensions (like @DesktopWidth, @DesktopHeight)
    async GetDesktopWidth() {
        try {
            return await this.screen.screenWidth();
        } catch (error) {
            return -1;
        }
    }

    async GetDesktopHeight() {
        try {
            return await this.screen.screenHeight();
        } catch (error) {
            return -1;
        }
    }
}

// Create singleton instance
const autoit = new AutoItStyle();

// Export both class and instance
module.exports = {
    AutoItStyle,
    autoit,
    
    // Direct function exports (AutoIt style)
    MouseClick: autoit.MouseClick.bind(autoit),
    MouseMove: autoit.MouseMove.bind(autoit),
    MouseGetPos: autoit.MouseGetPos.bind(autoit),
    Send: autoit.Send.bind(autoit),
    Sleep: autoit.Sleep.bind(autoit),
    LeftClick: autoit.LeftClick.bind(autoit),
    RightClick: autoit.RightClick.bind(autoit),
    DoubleClick: autoit.DoubleClick.bind(autoit),
    PixelGetColor: autoit.PixelGetColor.bind(autoit),
    WinGetTitle: autoit.WinGetTitle.bind(autoit),
    GetDesktopWidth: autoit.GetDesktopWidth.bind(autoit),
    GetDesktopHeight: autoit.GetDesktopHeight.bind(autoit)
};
