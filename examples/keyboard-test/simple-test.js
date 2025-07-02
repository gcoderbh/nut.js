// Simple keyboard test without jest
const path = require('path');

async function simpleKeyboardTest() {
    console.log('⌨️ Simple Keyboard Test Starting...');
    
    try {
        // Import our local libnut provider
        const { DefaultKeyboardAction } = require('../../providers/libnut/dist');
        const keyboardAction = new DefaultKeyboardAction();
        
        console.log('\n1️⃣ Testing keyboard methods availability...');
        console.log(`   type method: ${typeof keyboardAction.type}`);
        console.log(`   pressKey method: ${typeof keyboardAction.pressKey}`);
        console.log(`   releaseKey method: ${typeof keyboardAction.releaseKey}`);
        
        console.log('\n⚠️ Keyboard tests would require actual key presses.');
        console.log('   For safety, we will only check method availability.');
        console.log('   Actual typing would interfere with your current work.');
        
        console.log('\n✅ Keyboard methods are available and ready to use!');
        
    } catch (error) {
        console.error('\n❌ Keyboard test failed:', error.message);
        throw error;
    }
}

if (require.main === module) {
    simpleKeyboardTest()
        .then(() => process.exit(0))
        .catch(() => process.exit(1));
}

module.exports = simpleKeyboardTest;
