const audio = new Audio('sentmessage.mp3');

const contactString = `
  <div class="social">
    <a href="mailto:ashishvns272006@gmail.com"><div class="socialItem"><img class="socialItemI" src="gmail.svg" alt="Email Ashish"></div></a>
    <a target="_blank" rel="noopener noreferrer" href="https://github.com/AshishMishra2706"><div class="socialItem"><img class="socialItemI" src="github.svg" alt="Ashish's GitHub"></div></a>
    <a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/ashish-kumar-mishra-444625365"><div class="socialItem"><img class="socialItemI" src="linkedin.svg" alt="Ashish's LinkedIn"></div></a>
  </div>`;

const resumeString = "<div class='resume-card'><div class='resume-card-header'><span class='resume-initials'>AKM</span><div><strong>Ashish Kumar Mishra</strong><small>MCA Student & Web Developer</small></div></div><div class='resume-card-body'><div><strong>Education</strong><span>BCA - Jeevandeep Mahavidyalaya</span><span>MCA - Dr. Shakuntala Mishra National Rehabilitation University</span></div><div><strong>Skills</strong><span>HTML, CSS, JavaScript, React, Java, SQL</span></div></div></div><div class='downloadSpace'><div class='pdfname'><img src='pdf.png' alt='PDF'><label>Ashish Kumar Mishra Resume.pdf</label></div><a href='Ashish_Kumar_Mishra_Resume.pdf' download='Ashish_Kumar_Mishra_Resume.pdf'><img class='download' src='downloadIcon.svg' alt='Download resume'></a></div>";

function startFunction() {
  setLastSeen();
  waitAndResponse('intro');
}

function setLastSeen() {
  document.getElementById('lastseen').innerText = 'online portfolio';
}

function isEnter(event) {
  if (event.key === 'Enter') sendMsg();
}

function sendMsg() {
  const input = document.getElementById('inputMSG');
  const text = input.value.trim();
  if (!text) return;
  addMessage(text, 'sent');
  input.value = '';
  document.getElementById('lastseen').innerText = 'typing...';
  setTimeout(() => waitAndResponse(text), 550);
  playSound();
}

function waitAndResponse(inputText) {
  const command = inputText.toLowerCase().trim();
  const responses = {
    intro: `Hello there 👋<br><br>My name is <span class='bold'><a class='alink'>Ashish Kumar Mishra</a></span>.<br><br>I am an <span class='bold'>MCA student and aspiring web developer</span>. I enjoy building clean, responsive web experiences and strengthening my problem-solving skills.<br><br>Send <span class='bold'>'help'</span> to explore my portfolio.`,
    help: `<span class='sk'>What would you like to know?<br><br><span class='bold'>'skills'</span> - my technical skills<br><span class='bold'>'resume'</span> - download my resume<br><span class='bold'>'education'</span> - my academic background<br><span class='bold'>'projects'</span> - visit my GitHub projects<br><span class='bold'>'contact'</span> - connect with me<br><span class='bold'>'clear'</span> - restart the chat<br><span class='bold'>'about'</span> - about this portfolio</span>`,
    skills: `<span class='sk'>My current technical skills are:<br><br><span class='bold'>HTML<br>CSS<br>JavaScript<br>React<br>Java<br>SQL</span><br><br>I use GitHub to manage and share my work, and I am continuously learning through hands-on projects.</span>`,
    education: `I have completed my <span class='bold'>Bachelor of Computer Applications (BCA)</span> from <span class='bold'>Jeevandeep Mahavidyalaya</span>, affiliated with <span class='bold'>MGKVP</span>.<br><br>I am currently pursuing a <span class='bold'>Master of Computer Applications (MCA)</span> from <span class='bold'>Dr. Shakuntala Mishra National Rehabilitation University</span>.`,
    experience: `I am currently focused on MCA studies and building practical web-development projects. Please visit my GitHub profile to see my latest work.`,
    projects: `I am building my project portfolio and sharing my work on GitHub.<br><br><div class='social'><a target='_blank' rel='noopener noreferrer' href='https://github.com/AshishMishra2706'><div class='socialItem'><img class='socialItemI' src='github.svg' alt='Open GitHub'></div></a></div>`,
    contact: contactString,
    resume: resumeString,
    about: `This interactive portfolio is built with <span class='bold'>HTML, CSS and JavaScript</span> and presented in a chat-style interface.<br><br>Designed and personalized by <span class='bold'>Ashish Kumar Mishra</span>.`,
  };

  if (command === 'clear') {
    clearChat();
    return;
  }
  if (['hi', 'hello', 'hey'].includes(command)) {
    sendTextMessage(`Hi! 👋 Send <span class='bold'>'help'</span> to see what you can explore.`);
    return;
  }
  sendTextMessage(responses[command] || `I couldn't understand that message. Send <span class='bold'>'help'</span> to see the available options.`);
}

function clearChat() {
  document.getElementById('listUL').innerHTML = '';
  waitAndResponse('intro');
}

function addMessage(text, type) {
  const listItem = document.createElement('li');
  const wrapper = document.createElement('div');
  const bubble = document.createElement('div');
  const time = document.createElement('label');
  wrapper.className = type;
  bubble.className = type === 'sent' ? 'green' : 'grey';
  bubble.innerHTML = text;
  time.className = 'dateLabel';
  time.innerText = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  bubble.appendChild(time);
  wrapper.appendChild(bubble);
  listItem.appendChild(wrapper);
  document.getElementById('listUL').appendChild(listItem);
  const chat = document.getElementById('chatting');
  chat.scrollTop = chat.scrollHeight;
}

function sendTextMessage(text) {
  setLastSeen();
  addMessage(text, 'received');
  playSound();
}

function playSound() {
  audio.currentTime = 0;
  audio.play().catch(() => {});
}
