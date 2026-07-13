---
name: mobile-design
description: Mobile-first design thinking and decision-making for iOS and Android apps. Touch interaction, performance patterns, platform conventions. Use when building React Native, Expo, Flutter, or native mobile apps. DO NOT USE FOR web apps or backend APIs.
---

# Mobile Design

> **Philosophy:** Touch-first. Battery-conscious. Platform-respectful. Offline-capable.
> **Core Principle:** Mobile is NOT a small desktop. Think mobile constraints, ask platform and framework choices.

## Overview

Mobile applications operate under severe constraints: limited screen real estate, imprecise touch inputs, variable network connectivity, and restricted battery/memory resources. This skill guides the agent to design and implement mobile applications (React Native, Expo, Flutter, native iOS/Android) that feel native, work offline, and respect platform-specific conventions while avoiding common performance and security pitfalls.

## When to Use

- When building or modifying cross-platform mobile apps (React Native + Expo, Flutter)
- When developing native iOS (SwiftUI) or Android (Kotlin + Jetpack Compose) views
- When designing touch interactions, gesture navigation, or mobile layouts
- When optimizing mobile app performance (scroll lag, image size, state reconstruction)
- When configuring mobile local storage, offline syncing, or push notification logic

**When NOT to Use:**

- For traditional web applications (use `frontend-ui-engineering` instead)
- For backend APIs or database design (use `api-and-interface-design` or `database-design`)
- For generic CLI scripts or DevOps tooling (use `ci-cd-and-automation`)

## Process

### Phase 1: Context Verification & Decision Matrix
Before writing any code, you must identify the environment by executing these steps:
1. **Identify Platform Target:** Confirm if the target is iOS, Android, or both.
2. **Identify Framework & State Management:** Determine if it is React Native/Expo (Zustand, Redux) or Flutter (BLoC, Riverpod).
3. **Select Storage/Offline Strategy:** Select either secure storage (SecureStore/Keychain) or standard cache (AsyncStorage/SQLite).
4. **Reference Platform Guides:** If target is iOS, read [platform-ios.md](references/platform-ios.md) first; if Android, read [platform-android.md](references/platform-android.md) first.

### Phase 2: Design and Touch Layout (Fitts' Law)
Ensure touch targets are designed for human fingers:
- **Min Size:** Minimum 44pt × 44pt (iOS) / 48dp × 48dp (Android) or 48px.
- **Spacing:** Minimum 8-12px gap between touchable elements to prevent accidental taps.
- **Thumb Zone CTAs:** Position primary interactive buttons (e.g., Checkout, Save) in the bottom third of the screen.
- See [touch-psychology.md](references/touch-psychology.md) and [mobile-typography.md](references/mobile-typography.md).

### Phase 3: Performance Optimization (60fps Target)
Prevent UI rendering lag (jank):
- **List Views:** Never use `ScrollView` for dynamically loaded list data. Always use `FlatList`/`FlashList` (React Native) or `ListView.builder` (Flutter).
- **Memoize:** Wrap list item components in `React.memo` (React Native) or use `const` constructors (Flutter).
- **Callback Refs:** In React Native, define `renderItem` using `useCallback` or as a static module function.
- **Animations:** Use GPU-accelerated properties (`transform`, `opacity`) and set `useNativeDriver: true` where applicable.
- See [mobile-performance.md](references/mobile-performance.md).

### Phase 4: Offline Resilience & Security
- **Security:** Do NOT store access tokens, passwords, or PII in plaintext stores like `AsyncStorage`. Always use `SecureStore`, `Keychain`, or `EncryptedSharedPreferences`.
- **Offline Sync:** Cache remote requests locally. Display clear offline indicator banners and gracefully disable network-reliant actions.
- See [mobile-backend.md](references/mobile-backend.md).

### Phase 5: Verification & Build
1. Run local UX audit script:
   ```bash
   python skills/mobile-design/scripts/mobile_audit.py .
   ```
2. Verify native builds compile cleanly (e.g., `npx expo run:ios` or `flutter build apk --debug`).
3. Verify accessibility labeling on all tap targets.
4. See [mobile-testing.md](references/mobile-testing.md) and [mobile-debugging.md](references/mobile-debugging.md).

---

## Common Rationalizations

| Rationalization | Reality |
|---|---|
| "The list is small, ScrollView is fine" | Lists grow. ScrollView mounts all items immediately, causing memory leaks and UI stutter. Use FlatList/ListView.builder from day one. |
| "AsyncStorage is convenient for user tokens" | AsyncStorage is readable by anyone on rooted/jailbroken devices. Security is non-negotiable. Use Keychain/SecureStore. |
| "I'll just reuse the web styles and scale them down" | Mobile touch psychology is completely different from desktop click interactions. Touch targets must be much larger, with haptic feedback and distinct spacing. |
| "It works on the emulator, so it is ready" | Emulators run on powerful dev machines. Performance must be tested under limited conditions (CPU throttling, poor network, low battery). |
| "We don't need offline states since everyone has 5G" | Networks drop in tunnels, elevators, and remote areas. Apps must degrade gracefully rather than freezing or crashing. |

## Red Flags

- Using inline anonymous functions inside FlatList `renderItem` props
- Storing access tokens, auth states, or PII in AsyncStorage/unencrypted local DBs
- Touch target sizes under 44pt / 48dp / 48px
- Absolute dimensions that break on different screen sizes (e.g., iPhone SE vs iPad)
- Lack of loading indicator or error states for API-driven views
- Compiling code without running native build validations (`assembleDebug` or `run:android`)

## Verification

Before marking the task as complete, verify:

- [ ] Checkpoint is fully resolved (Platform, Framework, State management confirmed)
- [ ] No AsyncStorage used for credentials, tokens, or PII
- [ ] All lists are virtualized (`FlatList` / `FlashList` / `ListView.builder`)
- [ ] List items are memoized (`React.memo` or `const` constructors)
- [ ] No inline anonymous functions used in list rendering callbacks
- [ ] Primary buttons and CTAs reside within the natural Thumb Zone
- [ ] Accessibility labels (`accessibilityLabel` / `Semantics`) added to all icon buttons
- [ ] Offline handling implemented (graceful message, cache fallback)
- [ ] Mobile UX Audit script (`mobile_audit.py`) executed and passed
- [ ] Native build compiles successfully without errors
