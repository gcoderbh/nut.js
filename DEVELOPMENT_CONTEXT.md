# nut.js Development Context

## 🎯 Project Overview

This document provides comprehensive context for AI agents to continue development on the nut.js project. The project has been successfully integrated with a local `libnut-core` build and cleaned up for minimal, standalone operation.

## 📂 Project Structure

```
/Users/prajuk/Documents/dev/nut.js/
├── CHANGELOG.md
├── CODE_OF_CONDUCT.md
├── package.json                    # Root workspace config
├── pnpm-lock.yaml
├── pnpm-workspace.yaml            # Monorepo workspace configuration
├── README.md                      # Main project documentation
├── typedoc.base.json
├── typedoc.json
├── USER_MANUAL.md                 # Usage guide for other projects
├── QUICK_REFERENCE.md             # Quick reference for developers
├── INTEGRATION_COMPLETE.md        # Integration documentation
├── LOCAL_BUILD_STATUS.md          # Build status documentation
├── MINIMAL_BUILD.md               # Minimal build setup guide
├── DEVELOPMENT_CONTEXT.md         # This file
│
├── core/                          # Core nut.js packages
│   ├── configs/                   # Shared TypeScript configurations
│   │   ├── package.json
│   │   └── tsconfig/
│   │       └── base.json          # Base TypeScript config for workspace
│   │
│   ├── nut.js/                    # Main nut.js package
│   │   ├── index.ts               # Main entry point
│   │   ├── package.json           # Core package configuration
│   │   ├── tsconfig.json
│   │   ├── lib/                   # Core implementation
│   │   └── assets/                # Test images and resources
│   │
│   ├── provider-interfaces/       # Provider interface definitions
│   │   ├── index.ts
│   │   ├── package.json
│   │   └── lib/                   # Interface definitions
│   │
│   └── shared/                    # Shared utilities and types
│       ├── index.ts
│       ├── package.json
│       └── lib/                   # Shared implementation
│
├── providers/                     # Provider implementations
│   ├── clipboardy/                # Clipboard provider
│   │   ├── index.ts
│   │   ├── package.json
│   │   └── lib/
│   │
│   └── libnut/                    # ⭐ Main libnut provider (FOCUS AREA)
│       ├── .gitignore             # Build artifacts exclusion
│       ├── package.json           # Updated for local libnut-core
│       ├── tsconfig.json          # Standalone TypeScript config
│       ├── index.ts               # Provider entry point
│       ├── import_libnut.ts       # Native module import
│       ├── libnut.d.ts            # TypeScript declarations
│       ├── dist/                  # Compiled output (gitignored)
│       ├── node_modules/          # Local libnut-core (gitignored)
│       └── lib/                   # Provider implementation
│           ├── libnut-keyboard.class.ts
│           ├── libnut-mouse.class.ts
│           ├── libnut-screen.class.ts
│           ├── libnut-window.class.ts
│           ├── provider-interfaces.ts  # Standalone interfaces
│           └── shared-types.ts         # Standalone types
│
├── examples/                      # Usage examples
│   ├── README.md
│   ├── assets/                    # Example images
│   ├── jest-test/
│   ├── keyboard-test/
│   ├── mouse-test/
│   ├── screen-test/
│   └── typescript-test/
│
└── e2e/                          # End-to-end tests
    └── window-test/
```

## 🔧 Current State

### ✅ Completed Integration
- **Local libnut-core integration**: Successfully integrated with `../libnut-core`
- **Dependency updates**: All relevant `package.json` files updated to use local build
- **TypeScript fixes**: All compilation errors resolved
- **Code cleanup**: Removed unnecessary files (tests, mocks, configs)
- **Standalone operation**: Provider works independently without workspace dependencies

### 🎯 Key Files Modified

#### 1. `providers/libnut/package.json`
```json
{
  "name": "@nut-tree/libnut",
  "version": "4.2.0",
  "description": "libnut provider for nut.js using local libnut-core build",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "dependencies": {
    "libnut-core": "file:../../../libnut-core"
  }
}
```

#### 2. `providers/libnut/tsconfig.json`
- Configured for standalone compilation
- No workspace dependencies
- ES2020 target with CommonJS modules

#### 3. Provider Classes
All provider classes have been updated with:
- Fixed TypeScript interfaces
- Complete method implementations
- Proper error handling
- Standalone type definitions

### 🛠️ Build System

#### Current Build Process
```bash
# In providers/libnut/
npm install          # Installs local libnut-core
npm run build        # Compiles TypeScript to dist/
npm test            # Runs basic functionality tests
```

#### Dependencies
- **Local libnut-core**: Located at `../../../libnut-core`
- **TypeScript**: For compilation
- **Node.js**: Runtime environment
- **No workspace deps**: Completely standalone

## 🔍 Development Areas

### 🎯 Primary Focus: libnut Provider

#### Key Files to Understand
1. **`providers/libnut/index.ts`** - Main provider entry point
2. **`providers/libnut/import_libnut.ts`** - Native module loading
3. **`providers/libnut/lib/`** - Implementation classes:
   - `libnut-keyboard.class.ts` - Keyboard automation
   - `libnut-mouse.class.ts` - Mouse automation  
   - `libnut-screen.class.ts` - Screen operations
   - `libnut-window.class.ts` - Window management

#### Type Definitions
- **`libnut.d.ts`** - Native module declarations
- **`lib/provider-interfaces.ts`** - Standalone interfaces
- **`lib/shared-types.ts`** - Standalone type definitions

### 🧪 Testing Strategy

#### Current Testing Setup
- **Manual testing**: Using examples in `/examples/` directory
- **Integration testing**: End-to-end tests in `/e2e/`
- **No unit tests**: Removed `.spec.ts` files for minimal setup

#### Testing Commands
```bash
# Test screen functionality
cd examples/screen-test && npm test

# Test mouse functionality  
cd examples/mouse-test && npm test

# Test keyboard functionality
cd examples/keyboard-test && npm test
```

## 💡 Development Guidelines

### 🚀 Getting Started for AI Agents

1. **Understand the current state**:
   - Read `INTEGRATION_COMPLETE.md` for integration details
   - Check `LOCAL_BUILD_STATUS.md` for build verification
   - Review `MINIMAL_BUILD.md` for setup understanding

2. **Key directories to focus on**:
   - `/providers/libnut/` - Main development area
   - `/core/nut.js/` - Core functionality
   - `/examples/` - Testing and validation

3. **Before making changes**:
   - Verify current build works: `cd providers/libnut && npm run build`
   - Test basic functionality: `npm test`
   - Check TypeScript compilation: No errors should exist

### 🔧 Common Development Tasks

#### Adding New Functionality
1. **To keyboard provider**: Edit `providers/libnut/lib/libnut-keyboard.class.ts`
2. **To mouse provider**: Edit `providers/libnut/lib/libnut-mouse.class.ts`
3. **To screen provider**: Edit `providers/libnut/lib/libnut-screen.class.ts`
4. **To window provider**: Edit `providers/libnut/lib/libnut-window.class.ts`

#### Updating Types/Interfaces
1. **Native declarations**: Update `providers/libnut/libnut.d.ts`
2. **Provider interfaces**: Update `providers/libnut/lib/provider-interfaces.ts`
3. **Shared types**: Update `providers/libnut/lib/shared-types.ts`

#### Testing Changes
```bash
# Build the provider
cd providers/libnut
npm run build

# Test with examples
cd ../../examples/screen-test
npm test

# Verify TypeScript compilation
tsc --noEmit
```

### 📋 Code Standards

#### TypeScript Best Practices
- Use strict type checking
- Implement all interface methods
- Handle errors gracefully
- Document public APIs
- Prefer async/await over Promises

#### File Organization
- Keep provider classes focused and single-purpose
- Use clear, descriptive method names
- Group related functionality together
- Maintain separation between interfaces and implementation

## 🐛 Known Issues & Limitations

### ⚠️ Current Limitations
1. **Platform dependencies**: Requires native compilation for each platform
2. **libnut-core dependency**: Must be built separately
3. **No workspace integration**: Provider is standalone only
4. **Limited error handling**: Some edge cases may not be covered

### 🔍 Areas for Improvement
1. **Enhanced error messages**: More descriptive error handling
2. **Performance optimization**: Reduce latency in automation
3. **Additional features**: Implement missing nut.js features
4. **Better testing**: Add automated test suite
5. **Documentation**: Expand inline code documentation

## 🎯 Future Development Directions

### 🚀 Short-term Goals
- [ ] Add more comprehensive error handling
- [ ] Implement missing provider methods
- [ ] Optimize performance for high-frequency operations
- [ ] Add inline documentation

### 🌟 Medium-term Goals
- [ ] Add automated testing suite
- [ ] Implement advanced screen operations
- [ ] Add window management features
- [ ] Create debugging utilities

### 🔮 Long-term Vision
- [ ] Platform-specific optimizations
- [ ] Advanced image recognition integration
- [ ] Machine learning-based automation
- [ ] Cloud-based automation capabilities

## 📚 Resources for AI Agents

### 🔗 Important Documentation
- **nut.js Official Docs**: https://nutjs.dev
- **API Documentation**: https://nut-tree.github.io/apidoc/
- **GitHub Repository**: https://github.com/nut-tree/nut.js
- **libnut-core**: https://github.com/nut-tree/libnut-core

### 🛠️ Development Tools
- **TypeScript**: Primary language
- **Node.js**: Runtime environment
- **pnpm**: Package manager for workspace
- **VS Code**: Recommended editor

### 📞 Support Channels
- **Discord Community**: https://discord.gg/U5csuM4Esp
- **GitHub Issues**: For bug reports and feature requests
- **Documentation**: For API references and tutorials

## 🎉 Quick Start for AI Development

### 1. Environment Setup
```bash
# Navigate to project
cd /Users/prajuk/Documents/dev/nut.js

# Install dependencies
pnpm install

# Build libnut provider
cd providers/libnut
npm run build
```

### 2. Verify Current State
```bash
# Check TypeScript compilation
cd providers/libnut
npx tsc --noEmit

# Run basic test
cd ../../examples/screen-test
npm test
```

### 3. Start Development
```bash
# Focus on provider development
cd providers/libnut

# Make changes to lib/ files
# Test changes with: npm run build && npm test
# Validate with examples in ../../examples/
```

---

## 🤖 AI Agent Notes

### 🎯 Current Priority: libnut Provider Enhancement
- The provider is functional but can be improved
- Focus on error handling, performance, and feature completeness
- All workspace dependencies have been removed for standalone operation
- TypeScript compilation is working correctly

### ⚡ Quick Development Workflow
1. Make changes in `providers/libnut/lib/`
2. Build: `npm run build`
3. Test: Run examples or create simple test scripts
4. Iterate based on results

### 🔧 Key Integration Points
- **Native module**: `import_libnut.ts` handles libnut-core integration
- **Type safety**: All interfaces are properly typed
- **Error handling**: Basic error handling is implemented
- **Configuration**: Provider supports configuration options

**Happy coding! The foundation is solid and ready for enhancement.** 🚀
