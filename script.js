/* script.js */

// ------------------------
// Terminal functionality
// ------------------------
const terminalInput = document.getElementById('terminal-input');
const terminalOutput = document.querySelector('.terminal-body .output');

if (terminalInput && terminalOutput) {
  // Define available commands
  const commands = {
    help: "Available commands: about, characters, science, clear",
    about: "Ex Machina is a 2014 sci-fi thriller about AI and humanity. It explores themes of consciousness, ethics, and the Turing Test.",
    characters: `
      <strong>Ava</strong>: An advanced AI with human-like consciousness.<br>
      <strong>Nathan</strong>: A reclusive genius who created Ava.<br>
      <strong>Caleb</strong>: A programmer tasked with evaluating Ava's intelligence.
    `,
    science: "Ex Machina raises questions about AI ethics, the Turing Test, and the nature of consciousness. It reflects real-world debates about AI development and its implications.",
    clear: () => {
      terminalOutput.innerHTML = '';
      return '';
    }
  };

  // Listen for Enter key on the terminal input
  terminalInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const input = terminalInput.value.trim().toLowerCase();
      terminalInput.value = '';

      if (commands[input]) {
        const response = typeof commands[input] === 'function' ? commands[input]() : commands[input];
        terminalOutput.innerHTML += `<p><span class="prompt">user@exmachina:~$</span> ${input}</p>`;
        terminalOutput.innerHTML += `<p>${response}</p>`;
      } else {
        terminalOutput.innerHTML += `<p><span class="prompt">user@exmachina:~$</span> ${input}</p>`;
        terminalOutput.innerHTML += `<p>Command not found. Type <span class="command">help</span> for a list of commands.</p>`;
      }

      // Scroll to the bottom of the terminal output
      terminalOutput.scrollTop = terminalOutput.scrollHeight;
    }
  });
}

// ------------------------
// Enable Sound Button
// ------------------------
const enableSoundBtn = document.getElementById("enable-sound");
if (enableSoundBtn) {
  enableSoundBtn.addEventListener("click", function () {
    const video = document.getElementById("bg-video");
    if (video) {
      video.muted = false;
      video.play();
      sessionStorage.setItem("videoMuted", false);
    }
    enableSoundBtn.style.display = "none";
  });
}

// ------------------------
// Save Video State on Unload
// ------------------------
window.addEventListener("beforeunload", function () {
  const video = document.getElementById("bg-video");
  if (video) {
    sessionStorage.setItem("videoTime", video.currentTime);
    sessionStorage.setItem("videoMuted", video.muted);
  }
});

// ------------------------
// Restore Video State on Load
// ------------------------
document.addEventListener("DOMContentLoaded", function () {
  const video = document.getElementById("bg-video");
  if (video) {
    const savedTime = sessionStorage.getItem("videoTime");
    if (savedTime) {
      // If video metadata is already loaded, set currentTime immediately;
      // otherwise wait for the metadata to load.
      if (video.readyState > 0) {
        video.currentTime = parseFloat(savedTime);
      } else {
        video.addEventListener("loadedmetadata", function () {
          video.currentTime = parseFloat(savedTime);
        });
      }
    }
    const savedMuted = sessionStorage.getItem("videoMuted");
    if (savedMuted !== null) {
      video.muted = (savedMuted === "true");
    }
  }
});
