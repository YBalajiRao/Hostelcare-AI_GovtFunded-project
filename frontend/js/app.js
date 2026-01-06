const recordBtn = document.getElementById('recordBtn');
const output = document.getElementById('output');
const submitBtn = document.getElementById('submitBtn');
const successMsg = document.getElementById('successMsg');
const status = document.getElementById('status');

// Check browser support
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (!SpeechRecognition) {
    recordBtn.textContent = '❌ Use Chrome/Edge';
    recordBtn.disabled = true;
    status.textContent = 'Speech Recognition not supported. Please use Chrome or Edge browser.';
    status.style.color = 'red';
} else {
    
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.continuous = false;
    recognition.interimResults = false;

    let isRecording = false;
    let transcript = '';

    // Check microphone permission first
    recordBtn.addEventListener('click', async () => {
        
        // First, request microphone permission
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            stream.getTracks().forEach(track => track.stop()); // Stop the stream after getting permission
            
            if (!isRecording) {
                startRecording();
            }
        } catch (err) {
            console.error('Microphone error:', err);
            
            if (err.name === 'NotAllowedError') {
                status.textContent = '❌ Microphone blocked! Click the lock icon 🔒 in address bar → Allow microphone';
                status.style.color = 'red';
            } else if (err.name === 'NotFoundError') {
                status.textContent = '❌ No microphone found! Please connect a microphone.';
                status.style.color = 'red';
            } else {
                status.textContent = '❌ Microphone error: ' + err.message;
                status.style.color = 'red';
            }
        }
    });

    function startRecording() {
        try {
            recognition.start();
            isRecording = true;
            recordBtn.textContent = '🔴 Listening...';
            recordBtn.classList.add('recording');
            status.textContent = '🎤 Speak now... (speak clearly)';
            status.style.color = 'blue';
            successMsg.classList.add('hidden');
            transcript = '';
        } catch (err) {
            console.error('Recognition start error:', err);
            status.textContent = 'Error starting: ' + err.message;
            status.style.color = 'red';
        }
    }

    recognition.onstart = () => {
        console.log('Speech recognition started');
        status.textContent = '🎤 Listening... Speak now!';
        status.style.color = 'green';
    };

    recognition.onaudiostart = () => {
        console.log('Audio capturing started');
    };

    recognition.onsoundstart = () => {
        console.log('Sound detected');
        status.textContent = '🔊 Sound detected... keep speaking!';
    };

    recognition.onspeechstart = () => {
        console.log('Speech detected');
        status.textContent = '💬 Speech detected... listening!';
    };

    recognition.onresult = (event) => {
        console.log('Result received:', event.results);
        transcript = event.results[0][0].transcript;
        const confidence = Math.round(event.results[0][0].confidence * 100);
        output.textContent = transcript;
        status.textContent = `✅ Got it! (${confidence}% confident)`;
        status.style.color = 'green';
    };

    recognition.onspeechend = () => {
        console.log('Speech ended');
    };

    recognition.onend = () => {
        console.log('Recognition ended');
        isRecording = false;
        recordBtn.textContent = '🎤 Tap to Speak';
        recordBtn.classList.remove('recording');
        
        if (transcript) {
            status.textContent = '✅ Got it! Click Submit button.';
            status.style.color = 'green';
            submitBtn.disabled = false;
        } else {
            status.textContent = '⚠️ No speech detected. Try again and speak louder.';
            status.style.color = 'orange';
        }
    };

    recognition.onerror = (event) => {
        console.error('Recognition error:', event.error);
        isRecording = false;
        recordBtn.textContent = '🎤 Tap to Speak';
        recordBtn.classList.remove('recording');
        
        switch(event.error) {
            case 'no-speech':
                status.textContent = '⚠️ No speech heard. Speak louder and try again.';
                status.style.color = 'orange';
                break;
            case 'audio-capture':
                status.textContent = '❌ No microphone found. Check your mic connection.';
                status.style.color = 'red';
                break;
            case 'not-allowed':
                status.textContent = '❌ Microphone access denied. Click lock icon 🔒 → Allow mic';
                status.style.color = 'red';
                break;
            case 'network':
                status.textContent = '❌ Network error. Check your internet connection.';
                status.style.color = 'red';
                break;
            case 'aborted':
                status.textContent = '⚠️ Recording stopped.';
                status.style.color = 'orange';
                break;
            default:
                status.textContent = '❌ Error: ' + event.error;
                status.style.color = 'red';
        }
    };

    recognition.onnomatch = () => {
        status.textContent = '⚠️ Could not understand. Please speak clearly.';
        status.style.color = 'orange';
    };

    // Submit button
    submitBtn.addEventListener('click', async () => {
        if (!transcript) {
            alert('Please record your complaint first!');
            return;
        }

        const name = document.getElementById('studentName').value;
        const room = document.getElementById('roomNumber').value;

        submitBtn.disabled = true;
        submitBtn.textContent = '⏳ Submitting...';

        try {
            const response = await fetch('/api/complaints', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    studentName: name || 'Anonymous',
                    roomNumber: room || 'N/A',
                    complaint: transcript
                })
            });

            if (response.ok) {
                successMsg.classList.remove('hidden');
                submitBtn.textContent = '✅ Submitted!';
                status.textContent = '';
                
                // Speak confirmation
                if ('speechSynthesis' in window) {
                    const msg = new SpeechSynthesisUtterance('Complaint submitted successfully');
                    msg.rate = 0.9;
                    speechSynthesis.speak(msg);
                }

                // Reset after 3 seconds
                setTimeout(() => {
                    transcript = '';
                    output.textContent = 'Your speech will appear here...';
                    submitBtn.textContent = '📤 Submit Complaint';
                    submitBtn.disabled = true;
                }, 3000);
            } else {
                throw new Error('Server error');
            }
        } catch (err) {
            alert('Error submitting. Please try again.');
            submitBtn.textContent = '📤 Submit Complaint';
            submitBtn.disabled = false;
        }
    });
}

// Log browser info
console.log('Browser:', navigator.userAgent);
console.log('Speech Recognition supported:', !!SpeechRecognition);