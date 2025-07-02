# AI Agent Development Checklist

## 🚀 Quick Setup Verification

Before starting development, verify the current state:

```bash
# 1. Navigate to project
cd /Users/prajuk/Documents/dev/nut.js

# 2. Check workspace structure
ls -la
# Should see: core/, providers/, examples/, e2e/, *.md files

# 3. Verify libnut provider builds
cd providers/libnut
npm run build
# Should complete without errors

# 4. Test basic functionality (NEW: comprehensive test)
cd ../..
node test-examples.js
# Should show: "🎉 ALL TESTS PASSED! nut.js is working correctly."

# 5. Test individual components
cd examples/screen-test && node simple-test.js    # Screen functionality
cd ../mouse-test && node simple-test.js           # Mouse functionality  
cd ../keyboard-test && node simple-test.js        # Keyboard functionality
```

## ✅ Pre-Development Checklist

- [ ] Project structure is understood
- [ ] libnut provider builds successfully
- [ ] TypeScript compilation passes
- [ ] Basic examples work
- [ ] Local libnut-core dependency is present

## 🎯 Development Focus Areas

### 1. Provider Enhancement (High Priority)
- [ ] Improve error handling in provider classes
- [ ] Add missing method implementations
- [ ] Optimize performance for frequent operations
- [ ] Add comprehensive logging

### 2. Type Safety (Medium Priority)
- [ ] Enhance TypeScript declarations
- [ ] Add JSDoc documentation
- [ ] Improve interface definitions
- [ ] Add type guards for runtime safety

### 3. Testing (Medium Priority)
- [ ] Create automated test suite
- [ ] Add integration tests
- [ ] Verify cross-platform compatibility
- [ ] Performance benchmarking

### 4. Documentation (Low Priority)
- [ ] Expand inline code comments
- [ ] Create API documentation
- [ ] Add troubleshooting guides
- [ ] Update examples

## 🔧 Development Workflow

### Standard Development Process
1. **Understand the change**: Read existing code and context
2. **Make targeted changes**: Focus on specific provider classes
3. **Build and test**: `npm run build` + test with examples
4. **Verify types**: Ensure TypeScript compilation passes
5. **Document changes**: Update relevant documentation

### Testing Your Changes
```bash
# Quick test cycle
cd providers/libnut
npm run build

# Test with specific examples
cd ../../examples/mouse-test && npm test
cd ../keyboard-test && npm test
cd ../screen-test && npm test

# Check TypeScript
cd ../../providers/libnut
npx tsc --noEmit
```

## 🚨 Important Constraints

### What NOT to Change
- [ ] **Do not modify workspace configuration** (pnpm-workspace.yaml, root package.json)
- [ ] **Do not re-add workspace dependencies** to libnut provider
- [ ] **Do not break standalone nature** of libnut provider
- [ ] **Do not modify libnut-core path** (../../../libnut-core)

### What to Focus On
- [ ] **Provider implementation** in `providers/libnut/lib/`
- [ ] **Type definitions** in `providers/libnut/lib/`
- [ ] **Error handling** and robustness
- [ ] **Performance optimizations**
- [ ] **Feature completeness**

## 🎯 Common Tasks

### Adding a New Method to Mouse Provider
```bash
# 1. Edit the provider class
vim providers/libnut/lib/libnut-mouse.class.ts

# 2. Update interfaces if needed
vim providers/libnut/lib/provider-interfaces.ts

# 3. Build and test
cd providers/libnut
npm run build
cd ../../examples/mouse-test
npm test
```

### Fixing TypeScript Errors
```bash
# 1. Check for errors
cd providers/libnut
npx tsc --noEmit

# 2. Fix issues in lib/ files
# 3. Rebuild and verify
npm run build
npx tsc --noEmit
```

### Adding New Types
```bash
# 1. Add to shared types
vim providers/libnut/lib/shared-types.ts

# 2. Update native declarations if needed
vim providers/libnut/libnut.d.ts

# 3. Update interfaces
vim providers/libnut/lib/provider-interfaces.ts

# 4. Build and verify
npm run build
```

## 📋 Code Quality Standards

### TypeScript Best Practices
- Use strict typing: `string | number` not `any`
- Handle all Promise rejections
- Document public methods with JSDoc
- Use meaningful variable names
- Prefer async/await over callbacks

### Error Handling Pattern
```typescript
async method(): Promise<ResultType> {
    try {
        // Implementation
        return result;
    } catch (error) {
        throw new Error(`Operation failed: ${error.message}`);
    }
}
```

### Method Naming Convention
- Use descriptive names: `captureScreenRegion()` not `capture()`
- Follow existing patterns: `pressKey()`, `moveMouseTo()`
- Use consistent async patterns: All provider methods are async

## 🔍 Debugging Tips

### Common Issues
1. **Native module not found**: Check libnut-core build
2. **TypeScript errors**: Usually missing interface methods
3. **Runtime errors**: Often permission-related on macOS
4. **Build failures**: Check tsconfig.json configuration

### Debugging Commands
```bash
# Check native module loading
node -e "console.log(require('./providers/libnut/import_libnut.ts'))"

# Verify TypeScript compilation
cd providers/libnut && npx tsc --noEmit --verbose

# Test specific functionality
cd examples/screen-test && node -e "
const { screen } = require('@nut-tree/nut-js');
screen.size().then(console.log).catch(console.error);
"
```

## 📚 Key Files Reference

### Provider Implementation
- `providers/libnut/lib/libnut-mouse.class.ts` - Mouse operations
- `providers/libnut/lib/libnut-keyboard.class.ts` - Keyboard operations
- `providers/libnut/lib/libnut-screen.class.ts` - Screen operations
- `providers/libnut/lib/libnut-window.class.ts` - Window management

### Type Definitions
- `providers/libnut/lib/shared-types.ts` - Common types
- `providers/libnut/lib/provider-interfaces.ts` - Provider interfaces
- `providers/libnut/libnut.d.ts` - Native module declarations

### Configuration
- `providers/libnut/package.json` - Provider package config
- `providers/libnut/tsconfig.json` - TypeScript config
- `providers/libnut/.gitignore` - Git exclusions

## 🎉 Ready to Develop!

All systems are ready for development. The foundation is solid, the integration is complete, and the provider is functional. Focus on enhancement and improvement rather than fundamental changes.

**Good luck with your development!** 🚀
