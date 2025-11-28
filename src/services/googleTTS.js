// Google Cloud Text-to-Speech Service
// This service uses the Google Cloud TTS REST API to generate natural-sounding speech

class GoogleTTSService {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.baseUrl = 'https://texttospeech.googleapis.com/v1/text:synthesize';
        this.currentAudio = null;
        this.isPlaying = false;
    }

    async speak(text, options = {}) {
        const {
            voiceName = 'pt-BR-Neural2-A', // Female neural voice
            languageCode = 'pt-BR',
            speakingRate = 1.0,
            pitch = 0.0,
            volumeGainDb = 0.0
        } = options;

        try {
            const response = await fetch(`${this.baseUrl}?key=${this.apiKey}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    input: { text },
                    voice: {
                        languageCode,
                        name: voiceName,
                    },
                    audioConfig: {
                        audioEncoding: 'MP3',
                        speakingRate,
                        pitch,
                        volumeGainDb,
                    },
                }),
            });

            if (!response.ok) {
                throw new Error(`Google TTS API error: ${response.status}`);
            }

            const data = await response.json();

            // Convert base64 audio to blob
            const audioContent = data.audioContent;
            const audioBlob = this.base64ToBlob(audioContent, 'audio/mp3');
            const audioUrl = URL.createObjectURL(audioBlob);

            // Stop any currently playing audio
            this.stop();

            // Create and play new audio
            this.currentAudio = new Audio(audioUrl);
            this.isPlaying = true;

            return new Promise((resolve, reject) => {
                this.currentAudio.onended = () => {
                    this.isPlaying = false;
                    URL.revokeObjectURL(audioUrl);
                    resolve();
                };

                this.currentAudio.onerror = (error) => {
                    this.isPlaying = false;
                    URL.revokeObjectURL(audioUrl);
                    reject(error);
                };

                this.currentAudio.play().catch(reject);
            });
        } catch (error) {
            console.error('Error generating speech:', error);
            throw error;
        }
    }

    stop() {
        if (this.currentAudio) {
            this.currentAudio.pause();
            this.currentAudio.currentTime = 0;
            this.isPlaying = false;
        }
    }

    pause() {
        if (this.currentAudio && this.isPlaying) {
            this.currentAudio.pause();
            this.isPlaying = false;
        }
    }

    resume() {
        if (this.currentAudio && !this.isPlaying) {
            this.currentAudio.play();
            this.isPlaying = true;
        }
    }

    base64ToBlob(base64, mimeType) {
        const byteCharacters = atob(base64);
        const byteNumbers = new Array(byteCharacters.length);

        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }

        const byteArray = new Uint8Array(byteNumbers);
        return new Blob([byteArray], { type: mimeType });
    }

    getPlayingState() {
        return this.isPlaying;
    }
}

export default GoogleTTSService;
