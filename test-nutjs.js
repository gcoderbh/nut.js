const { screen, mouse, Point } = require('@nut-tree/nut-js');

async function testBasicFunctionality() {
    console.log('🚀 Testing nut.js basic functionality...');
    
    try {
        // Test 1: Get screen size
        console.log('\n📏 Testing screen size...');
        const screenSize = await screen.size();
        console.log(`✅ Screen size: ${screenSize.width}x${screenSize.height}`);
        
        // Test 2: Get current mouse position
        console.log('\n🖱️ Testing mouse position...');
        const mousePos = await mouse.getPosition();
        console.log(`✅ Current mouse position: (${mousePos.x}, ${mousePos.y})`);
        
        // Test 3: Get pixel color at a position
        console.log('\n🎨 Testing pixel color...');
        const color = await screen.colorAt(new Point(100, 100));
        console.log(`✅ Color at (100,100): R:${color.R} G:${color.G} B:${color.B} A:${color.A}`);
        
        console.log('\n🎉 All basic tests passed! nut.js is working correctly.');
        
    } catch (error) {
        console.error('\n❌ Test failed:', error.message);
        console.error('Full error:', error);
        process.exit(1);
    }
}

testBasicFunctionality();
