/* === Preloader === */
window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  if (preloader) {
    preloader.style.display = "none";
  }
});

/* === Profile Picture Upload === */
const uploadBtn = document.getElementById("uploadBtn");
const profilePreview = document.getElementById("profilePreview");

if (uploadBtn) {
  uploadBtn.addEventListener("change", function () {
    const file = this.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = function (e) {
        profilePreview.innerHTML = `<img src="${e.target.result}" alt="Profile Picture">`;
      };
      reader.readAsDataURL(file);
    } else {
      alert("Please upload a valid image file.");
    }
  });
}

/* === Star Rating === */
const stars = document.querySelectorAll(".rating-stars i");
if (stars.length > 0) {
  stars.forEach((star, index) => {
    star.addEventListener("mouseover", () => highlightStars(index));
    star.addEventListener("mouseout", () => resetStars());
    star.addEventListener("click", () => selectStars(index));
  });
}

let selectedRating = -1;

function highlightStars(index) {
  stars.forEach((star, i) => {
    star.style.color = i <= index ? "gold" : "#ccc";
  });
}

function resetStars() {
  stars.forEach((star, i) => {
    star.style.color = i <= selectedRating ? "gold" : "#ccc";
  });
}

function selectStars(index) {
  selectedRating = index;
  resetStars();
  alert(`You rated ${index + 1} stars. Thank you!`);
}

/* === Contact Form Validation & EmailJS === */
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !message) {
      formStatus.innerText = "⚠️ Please fill in all fields.";
      formStatus.style.color = "red";
      return;
    }

    // EmailJS Integration
    emailjs
      .sendForm("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", "#contactForm")
      .then(
        () => {
          formStatus.innerText = "✅ Message sent successfully!";
          formStatus.style.color = "green";
          contactForm.reset();
        },
        (error) => {
          formStatus.innerText = "❌ Failed to send. Try again later.";
          formStatus.style.color = "red";
          console.error("EmailJS Error:", error);
        }
      );
  });
}

/* === Chatbot === */
const chatToggle = document.getElementById("chatToggle");
const chatWindow = document.getElementById("chatWindow");
const chatMessages = document.getElementById("chatMessages");
const chatSend = document.getElementById("chatSend");
const chatInput = document.getElementById("chatInput");

if (chatToggle) {
  chatToggle.addEventListener("click", () => {
    chatWindow.classList.toggle("hidden");
  });
}

if (chatSend) {
  chatSend.addEventListener("click", sendMessage);
}
if (chatInput) {
  chatInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") sendMessage();
  });
}

function sendMessage() {
  const msg = chatInput.value.trim();
  if (!msg) return;

  // Display user message
  const userMsg = document.createElement("div");
  userMsg.textContent = "🧑: " + msg;
  chatMessages.appendChild(userMsg);

  // Auto reply (simple chatbot)
  const botMsg = document.createElement("div");
  setTimeout(() => {
    if (msg.toLowerCase().includes("hello")) {
      botMsg.textContent = "🤖: Hi there! How can I help you?";
    } else if (msg.toLowerCase().includes("contact")) {
      botMsg.textContent = "🤖: You can reach me via the Contact form!";
    } else {
      botMsg.textContent = "🤖: I'm still learning. Try asking about 'hello' or 'contact'.";
    }
    chatMessages.appendChild(botMsg);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }, 500);

  chatInput.value = "";
}
