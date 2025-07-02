// Simple screen test without jest
const path = require('path');

async function simpleScreenTest() {
    console.log('🖥️ Simple Screen Test Starting...');
    
    try {
        // Import our local libnut provider
        const { DefaultScreenAction } = require('../../providers/libnut/dist');
        const screenAction = new DefaultScreenAction();
        
        console.log('\n1️⃣ Testing screen dimensions...');
        const size = await screenAction.screenSize();
        console.log(`   Screen size: ${size.width}x${size.height}`);
        
        console.log('\n2️⃣ Testing screen width and height...');
        const width = await screenAction.screenWidth();
        const height = await screenAction.screenHeight();
        console.log(`   Width: ${width}, Height: ${height}`);
        
        console.log('\n3️⃣ Testing screenshot capture...');
        const screenshot = await screenAction.grabScreen();
        console.log(`   Screenshot captured: ${screenshot.width}x${screenshot.height} pixels`);
        
        console.log('\n✅ All screen tests passed!');
        
    } catch (error) {
        console.error('\n❌ Screen test failed:', error.message);
        throw error;
    }
}

if (require.main === module) {
    simpleScreenTest()
        .then(() => process.exit(0))
        .catch(() => process.exit(1));
}

module.exports = simpleScreenTest;
