(() => {
    // Get the display element
    const display = document.getElementById("display");
  
    // Initialize the current expression
    let currentExpression = "";
    let isTyping = false;
  
    // Function to generate a random key for encryption
    async function generateKey() {
      const key = await crypto.subtle.generateKey(
        {
          name: "AES-GCM",
          length: 256,
        },
        true,
        ["encrypt", "decrypt"]
      );
      return key;
    }
  
    // Function to get the encryption key
    let encryptionKey;
    async function getEncryptionKey() {
      if (!encryptionKey) {
        encryptionKey = await generateKey();
      }
      return encryptionKey;
    }
  
    // Function to encrypt data
    async function encryptData(data) {
      const key = await getEncryptionKey();
      try {
        const iv = crypto.getRandomValues(new Uint8Array(12));
        const encryptedData = await crypto.subtle.encrypt(
          {
            name: "AES-GCM",
            iv: iv,
          },
          key,
          new TextEncoder().encode(data)
        );
        return { iv, encryptedData };
      } catch (error) {
        console.error("Error encrypting data:", error);
        throw new Error("Failed to encrypt data");
      }
    }
  
    // Function to decrypt data
    async function decryptData(iv, encryptedData) {
      const key = await getEncryptionKey();
      try {
        const decryptedData = await crypto.subtle.decrypt(
          {
            name: "AES-GCM",
            iv: iv,
          },
          key,
          encryptedData
        );
        return new TextDecoder().decode(decryptedData);
      } catch (error) {
        console.error("Error decrypting data:", error);
        throw new Error("Failed to decrypt data");
      }
    }
  
    // Function to handle button clicks
    async function handleButtonClick(event) {
      try {
        event.preventDefault();
        event.stopPropagation();
        const buttonValue = event.target.getAttribute("data-value");
  
        switch (buttonValue) {
          case "=":
            // Evaluate the expression when the equals button is clicked
            try {
              const { iv: ivResult, encryptedData: encryptedResult } =
                await encryptData(math.evaluate(currentExpression).toString());
              const animationText = "** ENCRYPTION **";
              display.value = animationText;
              const decryptAndDisplay = async () => {
                try {
                  const decryptedResult = await decryptData(
                    ivResult,
                    encryptedResult
                  );
                  display.value = decryptedResult;
                  currentExpression = decryptedResult;
                } catch (error) {
                  console.error("Error decrypting data:", error);
                  display.value = "Error";
                  currentExpression = "";
                }
              };
              setTimeout(decryptAndDisplay, 1000);
            } catch (error) {
              console.error("Error evaluating expression:", error);
              display.value = "Error";
              currentExpression = "";
            }
            break;
          case "C":
            // Clear the display when the clear button is clicked
            display.value = "";
            currentExpression = "";
            break;
          case "CE":
            // Delete the last character from the current expression when the clear symbol button is clicked
            if (currentExpression.length > 0) {
              currentExpression = currentExpression.slice(0, -1);
              display.value = currentExpression;
            }
            break;
          default:
            appendToExpression(buttonValue);
        }
      } catch (error) {
        console.error("Error handling button click:", error);
      }
    }
  
    // Function to handle keyboard input
    async function handleKeyboardInput(event) {
      event.preventDefault();
      event.stopPropagation();
      if (isTyping) return;
  
      const keyValue = event.key;
  
      switch (keyValue) {
        case "Enter":
          try {
            const { iv: ivResult, encryptedData: encryptedResult } =
              await encryptData(math.evaluate(currentExpression).toString());
            const animationText = "** ENCRYPTION **";
            display.value = animationText;
            const decryptAndDisplay = async () => {
              try {
                const decryptedResult = await decryptData(
                  ivResult,
                  encryptedResult
                );
                display.value = decryptedResult;
                currentExpression = decryptedResult;
              } catch (error) {
                console.error("Error decrypting data:", error);
                display.value = "Error";
                currentExpression = "";
              }
            };
            setTimeout(decryptAndDisplay, 1000);
          } catch (error) {
            console.error("Error evaluating expression:", error);
            display.value = "Error";
            currentExpression = "";
          }
          break;
        case "Backspace":
          if (currentExpression.length > 0) {
            currentExpression = currentExpression.slice(0, -1);
            display.value = currentExpression;
          }
          break;
        case "Delete":
        case "c":
          display.value = "";
          currentExpression = "";
          break;
        default:
          if (
            ["+", "-", "*", "/"].includes(keyValue) ||
            ["(", ")"].includes(keyValue) ||
            !isNaN(keyValue) ||
            [".", ","].includes(keyValue)
          ) {
            appendToExpression(keyValue);
          }
          break;
      }
    }
  
    // Function to handle display input
    function handleDisplayInput() {
      try {
        if (isTyping) return;
        isTyping = true;
        currentExpression = display.value;
        isTyping = false;
      } catch (error) {
        console.error("Error handling display input:", error);
      }
    }
  
    // Function to append a value to the current expression
    function appendToExpression(value) {
      currentExpression += value;
      display.value = currentExpression;
    }
  
    // Add event listeners to all buttons
    document.querySelectorAll(".btn").forEach((button) => {
      button.addEventListener("click", handleButtonClick);
    });
  
    // Add event listener to the document for keyboard input
    document.addEventListener("keydown", handleKeyboardInput);
  
    // Add event listener to the display for input
    display.addEventListener("input", handleDisplayInput);
  })();
  