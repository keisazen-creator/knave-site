// --- Fake Sound Toggle ---
const soundBtn = document.getElementById('soundToggle');
let soundOn = true;
soundBtn.addEventListener('click', () => {
  soundOn = !soundOn;
  soundBtn.innerHTML = soundOn ? '<i class="fas fa-volume-up"></i>' : '<i class="fas fa-volume-mute"></i>';
});

// --- FETCH GITHUB REPOS (BOUNTIES) ---
async function fetchRepos() {
  const projectsGrid = document.getElementById('projectsGrid');
  try {
    const response = await fetch('https://api.github.com/users/keisazen-creator/repos?sort=updated');
    const repos = await response.json();
    projectsGrid.innerHTML = ''; 
    
    repos.slice(0, 6).forEach(repo => {
      const card = document.createElement('div');
      card.className = 'comic-box project-card';
      
      // Generate a random high bounty number for fun
      const bounty = Math.floor(Math.random() * 900) + 100;

      card.innerHTML = `
        <div class="bounty-tag"><i class="fas fa-coins"></i> ${bounty},000,000</div>
        <h3>${repo.name}</h3>
        <p>${repo.description || 'Description'}</p>
        <div class="project-meta">
          <span style="font-weight: 700; color: var(--blue);"><i class="fas fa-code"></i> ${repo.language || 'Unknown'}</span>
          <a href="${repo.html_url}" target="_blank" class="comic-btn" style="padding: 8px 16px; font-size: 0.9rem;">Plunder Code</a>
        </div>
      `;
      projectsGrid.appendChild(card);
    });
  } catch (error) {
    projectsGrid.innerHTML = '<h3>Failed to load bounties. The World Government blocked us!</h3>';
  }
}
fetchRepos();

// --- CONTACT FORM ---
document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const btn = this.querySelector('button');
  btn.innerHTML = 'Sent via News Coo! 🕊️';
  setTimeout(() => {
    btn.innerHTML = 'Fire the Cannons! 💣';
    this.reset();
  }, 3000);
});

// --- CHATBOT LOGIC ---
(function() {
  const OPENAI_API_KEY = ""; // 🔑 Put your key here
  const OWNER_NAME = "Knave";
  const chatWindow = document.getElementById("knave-chat-window");
  const chatMessages = document.getElementById("knave-chat-messages");
  const chatInput = document.getElementById("knave-chat-input");
  const sendBtn = document.getElementById("knave-send-btn");

  window.toggleKnaveChat = function() {
    const isVisible = chatWindow.style.display === "flex";
    chatWindow.style.display = isVisible ? "none" : "flex";
    if (!isVisible && chatMessages.children.length === 0) {
      addMessage("Ahoy! I'm the crew's Navigator. Need help reading the Log Pose?", "bot");
    }
  };

  function addMessage(text, side) {
    const typingEl = document.querySelector('.knave-msg.bot.typing');
    if (typingEl) typingEl.remove();
    
    const div = document.createElement("div");
    div.className = `knave-msg ${side}`;
    div.innerText = text;
    chatMessages.appendChild(div);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function showTyping() {
    const div = document.createElement("div");
    div.className = "knave-msg bot typing";
    div.innerHTML = `<div class="typing-dots"><span></span><span></span><span></span></div>`;
    chatMessages.appendChild(div);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  async function fetchWikipedia(query) {
    try {
      const res = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`);
      const data = await res.json();
      return data.extract ? `My maps show this: ${data.extract}` : null;
    } catch (e) { return null; }
  }

  async function fetchOpenAI(query) {
    if (!OPENAI_API_KEY) return null;
    try {
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${OPENAI_API_KEY}` },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            { role: "system", content: `You are a pirate navigator for ${OWNER_NAME}'s crew. Keep responses under 3 sentences. One piece theme.` },
            { role: "user", content: query }
          ]
        })
      });
      const data = await res.json();
      return data.choices[0].message.content;
    } catch (e) { return null; }
  }

  async function getBotResponse(userText) {
    let response = await fetchOpenAI(userText);
    if (response) return response;
    response = await fetchWikipedia(userText);
    if (response) return response;
    return "Shiver me timbers! That's a mystery even for the Grand Line!";
  }

  async function handleSend() {
    const text = chatInput.value.trim();
    if (!text) return;
    addMessage(text, "user");
    chatInput.value = "";
    showTyping();
    setTimeout(async () => {
      const botResponse = await getBotResponse(text);
      addMessage(botResponse, "bot");
    }, 1200);
  }

  sendBtn.onclick = handleSend;
  chatInput.onkeypress = (e) => { if (e.key === 'Enter') handleSend(); };
})();
