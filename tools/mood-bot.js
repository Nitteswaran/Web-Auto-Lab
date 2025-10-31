function checkMood() {
    const mood = document.getElementById("moodInput").value.toLowerCase();
    const reply = document.getElementById('reply');

    if (mood.includes('sad')) {
        document.body.style.background = '#223';
        reply.textContent = "Its Okay to feel sad. Take a deep breath!";
    }
    else if (mood.includes('happy')) {
        document.body.style.background = "#252"
        reply.textContent = "Happiness is a state of mind. Keep Smiling!!";
    }
    else if (mood.includes('angry')) {
        document.body.style.background = "#522";
        reply.textContent = "Let it out slowly. You got this!";
    }
    else {
        reply.textContent = "Hmm...I'm not sure, but I hope you are doing well!"
    }
    
}

document.getElementById('moodInput').addEventListener('keydown', (e) => {
    e.target.value = e.target.value.replace(/[^a-zA-Z\s]/g, '');
    checkMood();
})