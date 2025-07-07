# Encrypted Calculator Browser Extension

An open-source browser extension that provides a scientific calculator with AES-GCM encryption/decryption for calculation results. Results appear as an “**ENCRYPTION**” animation before being decrypted and displayed, demonstrating quick in-browser cryptography.

Chrome: https://chromewebstore.google.com/detail/encrypted-calculator/cmjikefegmcdkiicdcknjbbllnbdjpig

---

## Table of Contents

1. [Features](#features)  
2. [Demo](#demo)  
3. [Installation](#installation)  
4. [Usage](#usage)  
5. [File Structure](#file-structure)  
6. [Technical Details](#technical-details)  
7. [Contributing](#contributing)  
8. [License](#license)  

---

## Features

- Standard and scientific operations:  
  • Basic arithmetic (+, –, ×, ÷)  
  • Exponents, roots, logarithms, factorial, trigonometry, constants (π)  
- AES-GCM encryption of calculation results  
- Animated “**ENCRYPTION**” placeholder before decryption  
- Keyboard and mouse input support  
- Works in Chrome, Firefox (manifest v2 + browser-specific settings)  

---

## Demo

1. Enter an expression (e.g., `sqrt(25)+sin(pi/2)`).  
2. Press **=** or hit **Enter**.  
3. See “**ENCRYPTION**” text for 1 second.  
4. Decrypted result is displayed.

---

## Technical Details

* Encryption
** Algorithm: AES-GCM (256-bit key)
** Key is generated once per session and held in memory
** Initialization Vector (IV): 12-byte random per encryption
* Crypto APIs
** Uses Web Crypto Subtle API (crypto.subtle.generateKey, .encrypt, .decrypt)
* Expression Evaluation
** Uses Math.js for robust parsing and computing scientific operations
* UI
** Responsive popup design in popup.html + styles/styles.css
** Button clicks and keyboard events are handled in popup.js


