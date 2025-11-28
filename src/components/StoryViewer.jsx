import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play, Pause, RotateCcw, ChevronDown, Menu, X, Volume2, VolumeX } from 'lucide-react';
import { story } from '../data/story';


const StoryViewer = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [speech, setSpeech] = useState(null);
    const [showScrollIndicator, setShowScrollIndicator] = useState(true);
    const [isFlipping, setIsFlipping] = useState(false);
    const [showIndex, setShowIndex] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [voicesReady, setVoicesReady] = useState(false);
    const textScrollRef = useRef(null);

    // Initialize voices and ensure they are loaded
    useEffect(() => {
        const loadVoices = () => {
            const voices = window.speechSynthesis.getVoices();
            if (voices.length > 0) {
                setVoicesReady(true);
            }
        };

        loadVoices();
        window.speechSynthesis.addEventListener('voiceschanged', loadVoices);
        return () => window.speechSynthesis.removeEventListener('voiceschanged', loadVoices);
    }, []);

    useEffect(() => {
        // Stop any ongoing speech when component unmounts or page changes
        window.speechSynthesis.cancel();

        const text = story[currentPage].text;
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'pt-BR';
        utterance.rate = 1.0;

        // Set female voice preference
        const voices = window.speechSynthesis.getVoices();
        const femaleVoice = voices.find(voice =>
            voice.lang.includes('pt-BR') &&
            (voice.name.toLowerCase().includes('female') ||
                voice.name.toLowerCase().includes('feminina') ||
                voice.name.toLowerCase().includes('luciana') ||
                voice.name.toLowerCase().includes('maria'))
        ) || voices.find(voice => voice.lang.includes('pt-BR'));

        if (femaleVoice) {
            utterance.voice = femaleVoice;
        }

        utterance.onend = () => {
            setIsPlaying(false);
        };

        setSpeech(utterance);

        // Auto-play on page load and page change (only if not muted)
        if (!isMuted) {
            const speakWhenReady = () => {
                const currentVoices = window.speechSynthesis.getVoices();
                if (currentVoices.length > 0) {
                    // Re-assign voice just in case
                    if (!utterance.voice && femaleVoice) {
                        utterance.voice = femaleVoice;
                    }
                    window.speechSynthesis.speak(utterance);
                    setIsPlaying(true);
                } else {
                    setTimeout(speakWhenReady, 100);
                }
            };

            // Small delay to ensure browser is ready
            setTimeout(speakWhenReady, 100);
        }

        // Reset scroll position when page changes
        if (textScrollRef.current) {
            textScrollRef.current.scrollTop = 0;
            setShowScrollIndicator(true);
            if (textScrollRef.current) {
                const { scrollHeight, clientHeight } = textScrollRef.current;
                setShowScrollIndicator(scrollHeight > clientHeight);
            }
        }

        checkScroll();
        window.addEventListener('resize', checkScroll);
        return () => window.removeEventListener('resize', checkScroll);
    }, [currentPage, isMuted]); // Re-run when page changes or mute state changes (to stop if muted)

    const toggleMute = () => {
        const newMutedState = !isMuted;
        setIsMuted(newMutedState);

        if (newMutedState) {
            window.speechSynthesis.cancel();
            setIsPlaying(false);
        } else {
            // If unmuting, we could optionally start playing, but let's just let the user play manually
            // or we could replay the current page. Let's keep it simple: just unmute.
            // If the user wants to hear, they can click play.
        }
    };

    const checkScroll = () => {
        if (textScrollRef.current) {
            const { scrollHeight, clientHeight } = textScrollRef.current;
            setShowScrollIndicator(scrollHeight > clientHeight);
        }
    };

    const handleScroll = () => {
        if (textScrollRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = textScrollRef.current;
            // Hide indicator when scrolled near bottom
            setShowScrollIndicator(scrollTop < scrollHeight - clientHeight - 50);
        }
    };

    const togglePlay = () => {
        if (isPlaying) {
            window.speechSynthesis.cancel();
            setIsPlaying(false);
        } else {
            if (speech && !isMuted) {
                window.speechSynthesis.speak(speech);
                setIsPlaying(true);
            }
        }
    };

    const handleNext = () => {
        if (currentPage < story.length - 1 && !isFlipping) {
            setIsFlipping(true);

            // Add animation class to right page
            const contentContainer = document.querySelector('.content-container');
            if (contentContainer) {
                contentContainer.classList.add('page-turning-right');
            }

            // Change content at midpoint
            setTimeout(() => {
                setCurrentPage(prev => prev + 1);
                setIsPlaying(false);
                window.speechSynthesis.cancel();
            }, 450);

            // Remove animation class
            setTimeout(() => {
                if (contentContainer) {
                    contentContainer.classList.remove('page-turning-right');
                }
                setIsFlipping(false);
            }, 900);
        }
    };

    const handlePrev = () => {
        if (currentPage > 0 && !isFlipping) {
            setIsFlipping(true);

            // Add animation class to left page
            const imageContainer = document.querySelector('.image-container');
            if (imageContainer) {
                imageContainer.classList.add('page-turning-left');
            }

            // Change content at midpoint
            setTimeout(() => {
                setCurrentPage(prev => prev - 1);
                setIsPlaying(false);
                window.speechSynthesis.cancel();
            }, 450);

            // Remove animation class
            setTimeout(() => {
                if (imageContainer) {
                    imageContainer.classList.remove('page-turning-left');
                }
                setIsFlipping(false);
            }, 900);
        }
    };

    const handleReplay = () => {
        window.speechSynthesis.cancel();
        if (speech && !isMuted) {
            window.speechSynthesis.speak(speech);
            setIsPlaying(true);
        }
    };

    const goToPage = (pageIndex) => {
        if (pageIndex !== currentPage && !isFlipping) {
            setCurrentPage(pageIndex);
            setIsPlaying(false);
            window.speechSynthesis.cancel();
            setShowIndex(false);
        }
    };

    return (
        <div className="story-container">
            {/* Index Toggle Button */}
            <button
                className="index-toggle-btn"
                onClick={() => setShowIndex(!showIndex)}
                title="Índice"
            >
                {showIndex ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Sidebar Index */}
            <div className={`sidebar-index ${showIndex ? 'show' : ''}`}>
                <div className="sidebar-header">
                    <h2>Índice</h2>
                </div>
                <div className="sidebar-content">
                    {story.map((page, index) => (
                        <div
                            key={page.id}
                            className={`index-item ${currentPage === index ? 'active' : ''}`}
                            onClick={() => goToPage(index)}
                        >
                            <div className="index-number">{index + 1}</div>
                            <div className="index-preview">
                                <img src={page.image} alt={`Página ${index + 1}`} />
                            </div>
                            <div className="index-text">
                                {page.text.substring(0, 60)}...
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="story-card">
                {/* Left Page - Image with Sidebar */}
                <div className="image-container">
                    <AnimatePresence mode="wait">
                        <motion.img
                            key={currentPage}
                            src={story[currentPage].image}
                            alt={story[currentPage].alt}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                            className="story-image"
                        />
                    </AnimatePresence>
                </div>


                {/* Book Spine */}
                <div className="book-spine"></div>

                {/* Right Page - Text Content */}
                <div className="content-container">
                    <div className="controls-header">
                        <span className="page-indicator">
                            {currentPage + 1} / {story.length}
                        </span>
                        <div className="audio-controls">
                            <button
                                onClick={togglePlay}
                                className="control-btn"
                                title={isPlaying ? "Pausar" : "Ler texto"}
                                disabled={isMuted}
                            >
                                {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                            </button>
                            <button
                                onClick={handleReplay}
                                className="control-btn"
                                title="Replay"
                                disabled={isMuted}
                            >
                                <RotateCcw size={20} />
                            </button>
                            <button
                                onClick={toggleMute}
                                className={`control-btn ${isMuted ? 'muted' : ''}`}
                                title={isMuted ? "Ativar áudio" : "Silenciar"}
                            >
                                {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                            </button>
                        </div>
                    </div>

                    {/* Scrollable Text Area */}
                    <div
                        className="text-scroll-container"
                        ref={textScrollRef}
                        onScroll={handleScroll}
                    >
                        <AnimatePresence mode="wait">
                            <motion.p
                                key={currentPage}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.4 }}
                                className="story-text"
                            >
                                {story[currentPage].text}
                            </motion.p>
                        </AnimatePresence>
                    </div>

                    {/* Scroll Indicator */}
                    {showScrollIndicator && (
                        <motion.div
                            className="scroll-indicator"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <ChevronDown size={24} />
                        </motion.div>
                    )}

                    {/* Page Number */}
                    <div className="page-number">{currentPage + 1}</div>
                </div>

                {/* Navigation Buttons */}
                <button
                    onClick={handlePrev}
                    disabled={currentPage === 0}
                    className="nav-button prev"
                >
                    <ChevronLeft size={32} />
                </button>

                <button
                    onClick={handleNext}
                    disabled={currentPage === story.length - 1}
                    className="nav-button next"
                >
                    <ChevronRight size={32} />
                </button>
            </div>
        </div>
    );
};

export default StoryViewer;
