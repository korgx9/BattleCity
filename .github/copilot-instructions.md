# Battle City AI Coding Instructions

## Architecture Overview

This is a JavaScript/HTML5 remake of the Famicom "Battle City" game, built with **Test-Driven Development (TDD)** using Jasmine. The codebase follows classical OOP patterns with prototypal inheritance.

### Core Design Patterns

**Event-Driven Architecture**: Central `EventManager` coordinates all component communication. Subscribers register for specific events (e.g., `Sprite.Event.MOVED`, `Bullet.Event.DESTROYED`, `Tank.Event.SHOOT`) and get notified via a `notify(event)` method.

**Inheritance via `Function.subclass()`**: Custom implementation in [src/Utils.js](src/Utils.js#L1) replaces ES6 class syntax. Example: `Tank.subclass(Sprite)` creates inheritance chain.

**Factory Pattern**: Creation delegated to specialized factories ([BulletFactory](src/BulletFactory.js), [EnemyFactory](src/EnemyFactory.js), [PlayerTankFactory](src/PlayerTankFactory.js), etc.). Factories subscribe to relevant events and create objects in response.

**Scene Management**: Game divided into scenes (GameScene, MainMenuScene, ConstructionScene, etc.) managed by `SceneManager`. Changing scenes clears ALL EventManager subscribers via `removeAllSubscribers()` to prevent memory leaks.

### Key Component Responsibilities

- **Sprite** ([src/Sprite.js](src/Sprite.js)): Base for all moving entities. Manages direction, speed, movement frequency, z-ordering. Fires `MOVED`, `CREATED`, `DESTROYED` events.
- **Tank** ([src/Tank.js](src/Tank.js)): Player and enemy tanks. State machines handle appearing/invincible/normal states. Manages hitpoints, upgrades, bullet limits.
- **Bullet** ([src/Bullet.js](src/Bullet.js)): Created by `BulletFactory` in response to `Tank.Event.SHOOT`. Different types and speeds.
- **Wall** ([src/Wall.js](src/Wall.js)): Base for `BrickWall` and `SteelWall`. Handle collision and destruction.
- **SpriteContainer** ([src/SpriteContainer.js](src/SpriteContainer.js)): Repository maintaining all active sprites, sorted by z-index. Auto-subscribes to sprite lifecycle events.
- **EventManager** ([src/EventManager.js](src/EventManager.js)): Publish-subscribe hub. Single source of truth for inter-component communication.
- **Updater** ([src/Updater.js](src/Updater.js)): Calls `update()` on all sprites each frame.
- **Painter** ([src/Painter.js](src/Painter.js)): Calls `draw(ctx)` on all sprites for rendering.

### Game Loop & Script Sequencing

The main update cycle: Scene → Script → Level → Updater → SpriteControllers → Painter.

**Script** ([src/Script.js](src/Script.js)): Queues sequential actions with blocking semantics. Used for cutscenes (curtain falls, stage message displays, etc.). Actions call `actionCompleted()` when ready to proceed.

**Delay** ([src/Delay.js](src/Delay.js)): Blocks script for N frames. Example in GameScene: `new Delay(script, 60)`.

## Testing Conventions

- **File Naming**: Specs in `spec/` match source files: `Sprite.js` ↔ `SpriteSpec.js`
- **Jasmine Setup**: Use `beforeEach()` to instantiate mocks (EventManager, etc.)
- **Event Testing**: Spy on `eventManager.fireEvent()` to verify correct events fired with expected payloads
- **Frequency-Based Movement**: Test `moveFrequency` with repeated `move()` calls (see [spec/SpriteSpec.js](spec/SpriteSpec.js#L31-L40))
- **Run Tests**: Open [SpecRunner.html](SpecRunner.html) in browser or use Jasmine CLI

## Project-Specific Patterns

**Avoid Direct Dependencies**: Use EventManager to decouple. Example: Tank doesn't call BulletFactory directly; it fires `Tank.Event.SHOOT` which BulletFactory listens to.

**Sprite.Direction Constants**: Always use `Sprite.Direction.{RIGHT, LEFT, UP, DOWN}` strings (not magic numbers).

**Position Helpers**: Use `Rect` methods: `getLeft()`, `getRight()`, `getTop()`, `getBottom()`, `getWidth()`, `getHeight()`, `setXY()`.

**Global Constants**: Located in [src/Globals.js](src/Globals.js) — use `Globals.UNIT_SIZE`, `Globals.TILE_SIZE`.

**Array Utilities** ([src/Utils.js](src/Utils.js)): `arrayContains(arr, obj)`, `arrayRemove(arr, obj)`, `arrayRandomElement(arr)`.

## Common Tasks

**Adding a New Sprite Type**:
1. Extend `Sprite` or `Tank`
2. Define `Type` constants
3. Create a Factory that subscribes to trigger events
4. Add sprite/factory to script load order in [BattleCity.html](BattleCity.html)

**Handling Collisions**:
1. Sprite subscribes to `CollisionDetector.Event.COLLISION`
2. Override `notify()` to process collision data
3. Adjust position or fire destruction event

**New Game State/Scene**:
1. Create scene class extending base scene
2. Implement `update()` and `draw(ctx)` methods
3. Add transition method in `SceneManager`
4. Use `Script` for sequencing complex flows

## File Load Order Matters

The HTML file ([BattleCity.html](BattleCity.html)) defines strict script inclusion order. Base classes must load before subclasses. Factories before their dependent components. When adding files, insert at the appropriate position to maintain dependency order.

## Developer Workflows

- **Running the Game**: Open [BattleCity.html](BattleCity.html) in a web browser.
- **Running Tests**: Open [SpecRunner.html](SpecRunner.html) in a web browser to execute Jasmine test suite.
- **No Build Process**: Pure client-side JavaScript; no compilation, bundling, or package managers required.
- **Debugging**: Use browser developer tools; game runs at ~60 FPS with requestAnimationFrame.
