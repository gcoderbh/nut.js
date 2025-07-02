// Simple mouse test without jest
const path = require('path');

async function simpleMouseTest() {
    console.log('🖱️ Simple Mouse Test Starting...');
    
    try {
        // Import our local libnut provider
        const { DefaultMouseAction } = require('../../providers/libnut/dist');
        const mouseAction = new DefaultMouseAction();
        
        console.log('\n1️⃣ Testing current mouse position...');
        const currentPos = await mouseAction.currentMousePosition();
        console.log(`   Current position: (${currentPos.x}, ${currentPos.y})`);
        
        console.log('\n2️⃣ Testing mouse movement (small relative move)...');
        await mouseAction.setMousePosition({ x: currentPos.x + 10, y: currentPos.y + 10 });
        const newPos = await mouseAction.currentMousePosition();
        console.log(`   New position: (${newPos.x}, ${newPos.y})`);
        
        console.log('\n3️⃣ Moving mouse back to original position...');
        await mouseAction.setMousePosition(currentPos);
        const backPos = await mouseAction.currentMousePosition();
        console.log(`   Back to: (${backPos.x}, ${backPos.y})`);
        
        console.log('\n✅ All mouse tests passed!');
        
    } catch (error) {
        console.error('\n❌ Mouse test failed:', error.message);
        throw error;
    }
}

if (require.main === module) {
    simpleMouseTest()
        .then(() => process.exit(0))
        .catch(() => process.exit(1));
}

module.exports = simpleMouseTest;
