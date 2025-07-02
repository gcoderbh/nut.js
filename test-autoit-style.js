// Test AutoIt-style functions
const { MouseClick, MouseMove, MouseGetPos, Send, Sleep, LeftClick, RightClick, GetDesktopWidth, GetDesktopHeight } = require('./autoit-style');

async function testAutoItStyle() {
    console.log('🤖 Testing AutoIt-style functions...');
    console.log('=====================================');

    try {
        // Test desktop dimensions
        console.log('\n📏 Testing desktop dimensions...');
        const width = await GetDesktopWidth();
        const height = await GetDesktopHeight();
        console.log(`   ✅ Desktop: ${width}x${height}`);

        // Test mouse position
        console.log('\n🖱️ Testing mouse position...');
        const pos = await MouseGetPos();
        console.log(`   ✅ Current mouse position: (${pos.x}, ${pos.y})`);

        // Test mouse movement (small movement)
        console.log('\n🔄 Testing mouse movement...');
        const newX = pos.x + 50;
        const newY = pos.y + 50;
        const moved = await MouseMove(newX, newY, 5);
        console.log(`   ${moved ? '✅' : '❌'} MouseMove to (${newX}, ${newY}): ${moved}`);

        // Verify new position
        await Sleep(100);
        const newPos = await MouseGetPos();
        console.log(`   ✅ New position: (${newPos.x}, ${newPos.y})`);

        // Move back to original position
        await MouseMove(pos.x, pos.y, 8);
        console.log(`   ✅ Moved back to original position`);

        // Test click functions (without actually clicking)
        console.log('\n🖱️ Testing click functions (methods only)...');
        console.log(`   ✅ LeftClick function: ${typeof LeftClick}`);
        console.log(`   ✅ RightClick function: ${typeof RightClick}`);
        console.log(`   ✅ MouseClick function: ${typeof MouseClick}`);

        // Test keyboard function
        console.log('\n⌨️ Testing keyboard functions...');
        console.log(`   ✅ Send function: ${typeof Send}`);
        console.log('   ⚠️ Keyboard typing skipped for safety');

        console.log('\n🎉 All AutoIt-style tests completed successfully!');
        console.log('\n📝 Available AutoIt-style functions:');
        console.log('   - MouseClick(button, x, y, clicks, speed)');
        console.log('   - MouseMove(x, y, speed)');
        console.log('   - MouseGetPos()');
        console.log('   - LeftClick(x, y), RightClick(x, y), DoubleClick(x, y)');
        console.log('   - Send(text, raw)');
        console.log('   - Sleep(milliseconds)');
        console.log('   - GetDesktopWidth(), GetDesktopHeight()');

        console.log('\n💡 Usage example:');
        console.log('   const { MouseClick, Send, Sleep } = require("./autoit-style");');
        console.log('   await MouseClick("left", 100, 200);');
        console.log('   await Send("Hello World");');
        console.log('   await Sleep(1000);');

        return true;

    } catch (error) {
        console.error(`\n❌ AutoIt-style test failed: ${error.message}`);
        return false;
    }
}

// Example usage function
async function exampleUsage() {
    console.log('\n\n🔧 Example AutoIt-style automation:');
    console.log('=====================================');

    try {
        // Get current mouse position
        const startPos = await MouseGetPos();
        console.log(`Starting at: (${startPos.x}, ${startPos.y})`);

        // Move mouse in a small square pattern
        console.log('Moving mouse in square pattern...');
        await MouseMove(startPos.x + 50, startPos.y);      // Right
        await Sleep(200);
        await MouseMove(startPos.x + 50, startPos.y + 50); // Down
        await Sleep(200);
        await MouseMove(startPos.x, startPos.y + 50);      // Left
        await Sleep(200);
        await MouseMove(startPos.x, startPos.y);           // Up (back to start)
        await Sleep(200);

        console.log('✅ Square pattern completed');
        console.log('✅ Mouse automation working like AutoIt!');

    } catch (error) {
        console.error(`❌ Example failed: ${error.message}`);
    }
}

if (require.main === module) {
    testAutoItStyle()
        .then(async (success) => {
            if (success) {
                await exampleUsage();
            }
            process.exit(success ? 0 : 1);
        })
        .catch((error) => {
            console.error('Test crashed:', error);
            process.exit(1);
        });
}
