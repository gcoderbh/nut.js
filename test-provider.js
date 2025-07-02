// Test libnut provider directly
const path = require('path');

async function testLibnutProvider() {
    console.log('🚀 Testing libnut provider directly...');
    
    try {
        // Import the compiled provider
        const providerPath = path.join(__dirname, 'providers/libnut/dist');
        console.log(`📁 Looking for provider at: ${providerPath}`);
        
        // Check if dist exists
        const fs = require('fs');
        if (!fs.existsSync(providerPath)) {
            console.log('⚠️ dist directory not found, building provider...');
            const { execSync } = require('child_process');
            execSync('npm run build', { 
                cwd: path.join(__dirname, 'providers/libnut'),
                stdio: 'inherit' 
            });
        }
        
        const { DefaultScreenAction, DefaultMouseAction } = require('./providers/libnut/dist');
        
        console.log('✅ Provider imported successfully');
        
        // Test screen functionality
        const screenAction = new DefaultScreenAction();
        console.log('\n📏 Testing screen size...');
        const size = await screenAction.screenSize();
        console.log(`✅ Screen size: ${size.width}x${size.height}`);
        
        // Test mouse functionality  
        const mouseAction = new DefaultMouseAction();
        console.log('\n🖱️ Testing mouse position...');
        const position = await mouseAction.currentMousePosition();
        console.log(`✅ Mouse position: (${position.x}, ${position.y})`);
        
        console.log('\n🎉 libnut provider is working correctly!');
        
    } catch (error) {
        console.error('\n❌ Provider test failed:', error.message);
        console.error('Full error:', error);
        process.exit(1);
    }
}

testLibnutProvider();
