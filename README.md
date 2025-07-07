# Encrypted Calculator Browser Extension

A Chrome/Firefox browser extension that offers a full-featured scientific calculator. All computations are performed in-memory and results are encrypted using AES-GCM before being briefly displayed as an “**ENCRYPTION**” animation, then decrypted and shown to the user.

Chrome Webstore: https://chromewebstore.google.com/detail/encrypted-calculator/cmjikefegmcdkiicdcknjbbllnbdjpig

---

## Features

- Standard arithmetic: `+`, `-`, `*`, `/`, decimal points  
- Scientific functions:  
  - Square root (`²√`)  
  - Nth root (`ⁿ√`)  
  - Square (`x²`) and arbitrary power (`xⁿ`)  
  - Logarithm (`log`) and exponential (`eˣ`)  
  - Factorial (`x!`)  
  - Trigonometric: `sin`, `cos`, `tan`  
  - Constant π  
- Clear (`C`) and backspace (`⌫`) controls  
- Keyboard support for numbers, operators, parentheses, Enter (evaluate), Backspace/Delete/C (clear)  
- AES-GCM encryption/decryption of results using the Web Crypto API  
- Cross-browser support via manifest v2 (Chrome & Firefox/Gecko)

---

## Installation

### Chrome

1. Clone or download this repository.  
2. Open `chrome://extensions/` in your browser.  
3. Enable **Developer mode**.  
4. Click **Load unpacked** and select the project directory containing `manifest.json`.  

### Firefox

1. Clone or download this repository.  
2. Open `about:debugging#/runtime/this-firefox`.  
3. Click **Load Temporary Add-on…** and select `manifest.json`.

---

## Usage

1. Click the calculator icon in your toolbar to open the popup.  
2. Enter or click buttons to build an expression.  
3. Press `=` or Enter to evaluate.  
   - The display will read `** ENCRYPTION **` for a moment.  
   - Then the decrypted result will appear.  
4. Use **C** to clear the entire expression or **⌫** to delete the last character.  

---

## File Structure

```text
/
├─ manifest.json          # Extension metadata
├─ popup.html             # Calculator UI
├─ styles/
│  └─ styles.css          # Layout & styling
└─ scripts/
   ├─ math.js             # math.js library for expression evaluation
   ├─ popup.js            # UI logic & crypto routines
   └─ background.js       # (Reserved) background event handlers
```

---

## Encryption Details

- **AES-GCM** with 256-bit keys  
- A new random IV (12 bytes) is generated per result  
- Results are first encrypted, briefly replaced by an “** ENCRYPTION **” animation, then decrypted and displayed  
- Keys are generated once per browser session and stored in memory  

---

## Contributing

1. Fork the repository.  
2. Create a feature branch (`git checkout -b feature/new-feature`).  
3. Commit your changes (`git commit -am 'Add new feature'`).  
4. Push to the branch (`git push origin feature/new-feature`).  
5. Open a pull request.

---

## License

MIT License  
See [LICENSE](LICENSE) for details.
