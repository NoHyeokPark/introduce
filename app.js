// Resume Interactive Features
document.addEventListener('DOMContentLoaded', function() {
    // Initialize skill bars
    initializeSkillBars();
    
    // Setup intersection observer for animations
    setupIntersectionObserver();
    
    // Setup smooth scrolling
    setupSmoothScrolling();
    
    // Setup print functionality
    setupPrintFunctionality();
    
    // Setup contact link interactions
    setupContactInteractions();
    
    // Initialize enhanced features
    initializeEnhancedFeatures();
});

// Initialize skill bars with proper widths
function initializeSkillBars() {
    const skillBars = document.querySelectorAll('.skill-level');
    
    skillBars.forEach(bar => {
        const level = bar.getAttribute('data-level');
        if (level) {
            bar.style.setProperty('--skill-width', level + '%');
        }
    });
}

// Setup intersection observer for scroll animations
function setupIntersectionObserver() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate skill bars when they come into view
                if (entry.target.classList.contains('skills-section')) {
                    animateSkillBars(entry.target);
                }
                
                // Animate project items
                if (entry.target.classList.contains('project-item')) {
                    entry.target.style.animationDelay = Math.random() * 0.3 + 's';
                    entry.target.classList.add('animate-in');
                }
                
                // Animate timeline items
                if (entry.target.classList.contains('timeline-item')) {
                    entry.target.classList.add('animate-in');
                }
            }
        });
    }, observerOptions);

    // Observe skill section
    const skillsSection = document.querySelector('.skills-section');
    if (skillsSection) {
        observer.observe(skillsSection);
    }

    // Observe project items
    const projectItems = document.querySelectorAll('.project-item');
    projectItems.forEach(item => {
        observer.observe(item);
    });

    // Observe timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach(item => {
        observer.observe(item);
    });
}

// Animate skill bars
function animateSkillBars(skillsSection) {
    const skillBars = skillsSection.querySelectorAll('.skill-level');
    
    skillBars.forEach((bar, index) => {
        setTimeout(() => {
            const level = bar.getAttribute('data-level');
            if (level) {
                bar.style.width = level + '%';
                bar.classList.add('animate');
            }
        }, index * 200); // Stagger animation
    });
}

// Setup smooth scrolling for any anchor links
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Setup print functionality with improved handling
function setupPrintFunctionality() {
    const printBtn = document.querySelector('.print-btn');
    if (printBtn) {
        printBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            console.log('Print button clicked');
            
            // Add print-specific class before printing
            document.body.classList.add('printing');
            
            // Ensure skill bars are fully visible for printing
            const skillBars = document.querySelectorAll('.skill-level');
            skillBars.forEach(bar => {
                const level = bar.getAttribute('data-level');
                if (level) {
                    bar.style.width = level + '%';
                    bar.style.transition = 'none';
                }
            });
            
            // Small delay to ensure styles are applied
            setTimeout(() => {
                try {
                    window.print();
                    console.log('Print dialog opened');
                } catch (error) {
                    console.error('Print failed:', error);
                    alert('인쇄 기능을 사용할 수 없습니다. 브라우저 메뉴에서 인쇄를 선택해주세요.');
                }
                
                // Clean up
                document.body.classList.remove('printing');
                skillBars.forEach(bar => {
                    bar.style.transition = '';
                });
            }, 100);
        });
    }

    // Handle print events
    window.addEventListener('beforeprint', function() {
        console.log('Before print event');
        document.body.classList.add('printing');
        
        // Ensure skill bars are fully visible for printing
        const skillBars = document.querySelectorAll('.skill-level');
        skillBars.forEach(bar => {
            const level = bar.getAttribute('data-level');
            if (level) {
                bar.style.width = level + '%';
            }
        });
    });
    
    window.addEventListener('afterprint', function() {
        console.log('After print event');
        document.body.classList.remove('printing');
    });
}

// Setup contact link interactions
function setupContactInteractions() {
    const contactLinks = document.querySelectorAll('.contact-item a');
    
    contactLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            console.log('Contact link clicked:', this.href);
            
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // For external links, ensure they open in new tab
            if (this.href.startsWith('http')) {
                this.target = '_blank';
                this.rel = 'noopener noreferrer';
            }
        });
    });

    // Email link functionality
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    emailLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const email = this.getAttribute('href').replace('mailto:', '');
            console.log('Opening email client for:', email);
        });
    });
}

// Add scroll progress indicator
function addScrollProgressIndicator() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: var(--color-primary);
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);

    const updateProgress = throttle(function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollProgress = (scrollTop / scrollHeight) * 100;
        progressBar.style.width = Math.min(100, Math.max(0, scrollProgress)) + '%';
    }, 16);

    window.addEventListener('scroll', updateProgress);
}

// Keyboard navigation enhancement
function setupKeyboardNavigation() {
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + P for print
        if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
            e.preventDefault();
            const printBtn = document.querySelector('.print-btn');
            if (printBtn) {
                printBtn.click();
            }
        }
        
        // Esc to close any modals or overlays (future enhancement)
        if (e.key === 'Escape') {
            document.body.classList.remove('printing');
        }
    });
}

// Theme detection and handling
function handleThemePreference() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    
    function updateTheme(e) {
        if (e.matches) {
            document.documentElement.setAttribute('data-color-scheme', 'dark');
        } else {
            document.documentElement.setAttribute('data-color-scheme', 'light');
        }
    }
    
    // Initial theme setup
    updateTheme(prefersDark);
    
    // Listen for changes
    prefersDark.addEventListener('change', updateTheme);
}

// Performance optimization: Throttle scroll events
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add enhanced interactions
function addEnhancedInteractions() {
    // Add hover effects for skill tags
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.05)';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add click effects for project items
    const projectItems = document.querySelectorAll('.project-item');
    projectItems.forEach(item => {
        item.addEventListener('click', function(e) {
            // Don't trigger if clicking on a link
            if (e.target.tagName === 'A') return;
            
            // Add a subtle pulse effect
            this.style.animation = 'pulse 0.3s ease-in-out';
            setTimeout(() => {
                this.style.animation = '';
            }, 300);
        });
    });
}

// Initialize enhanced features
function initializeEnhancedFeatures() {
    // Add scroll progress indicator
    addScrollProgressIndicator();
    
    // Setup keyboard navigation
    setupKeyboardNavigation();
    
    // Handle theme preference
    handleThemePreference();
    
    // Add enhanced interactions
    addEnhancedInteractions();
    
    // Add dynamic animations
    addDynamicAnimations();
    
    // Improve accessibility
    improveAccessibility();
}

// Add CSS animations dynamically
function addDynamicAnimations() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.02); }
            100% { transform: scale(1); }
        }
        
        .animate-in {
            animation: slideInFromBottom 0.6s ease-out forwards;
        }
        
        @keyframes slideInFromBottom {
            0% {
                opacity: 0;
                transform: translateY(30px);
            }
            100% {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .printing .skill-level {
            animation: none !important;
            transition: none !important;
        }
        
        .printing .skill-level::after {
            display: none !important;
        }
        
        .printing .resume-header::before {
            display: none !important;
        }
        
        .printing * {
            animation: none !important;
            transition: none !important;
        }
    `;
    document.head.appendChild(style);
}

// Accessibility improvements
function improveAccessibility() {
    // Add ARIA labels where needed
    const skillBars = document.querySelectorAll('.skill-level');
    skillBars.forEach(bar => {
        const level = bar.getAttribute('data-level');
        const skillName = bar.closest('.skill-item')?.querySelector('.skill-name')?.textContent;
        if (skillName && level) {
            bar.setAttribute('aria-label', `${skillName} 기술 수준: ${level}%`);
            bar.setAttribute('role', 'progressbar');
            bar.setAttribute('aria-valuenow', level);
            bar.setAttribute('aria-valuemin', '0');
            bar.setAttribute('aria-valuemax', '100');
        }
    });

    // Improve focus management
    const focusableElements = document.querySelectorAll('a, button, [tabindex]');
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.setAttribute('data-focused', 'true');
        });
        
        element.addEventListener('blur', function() {
            this.removeAttribute('data-focused');
        });
    });
    
    // Add skip link for keyboard navigation
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.className = 'skip-link sr-only';
    skipLink.textContent = '본문으로 바로가기';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: var(--color-primary);
        color: var(--color-btn-primary-text);
        padding: 8px;
        text-decoration: none;
        border-radius: 4px;
        z-index: 10000;
        transition: top 0.2s ease;
    `;
    
    skipLink.addEventListener('focus', function() {
        this.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', function() {
        this.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
}

// Analytics tracking (placeholder for future implementation)
function trackUserInteraction(action, element) {
    // This would integrate with analytics services
    console.log(`사용자 상호작용: ${action} - ${element}`);
}

// Add interaction tracking
function setupInteractionTracking() {
    const contactLinks = document.querySelectorAll('.contact-item a');
    contactLinks.forEach(link => {
        link.addEventListener('click', function() {
            trackUserInteraction('클릭', 'contact-link');
        });
    });
    
    const printBtn = document.querySelector('.print-btn');
    if (printBtn) {
        printBtn.addEventListener('click', function() {
            trackUserInteraction('클릭', 'print-button');
        });
    }
}

// Initialize interaction tracking
document.addEventListener('DOMContentLoaded', function() {
    setupInteractionTracking();
});

// Error handling wrapper
function safeExecute(func, context = 'Unknown') {
    try {
        return func();
    } catch (error) {
        console.error(`Error in ${context}:`, error);
        return null;
    }
}

// Global error handler
window.addEventListener('error', function(e) {
    console.error('Global error:', e.error);
});

// Performance monitoring
function monitorPerformance() {
    if ('performance' in window) {
        window.addEventListener('load', function() {
            setTimeout(function() {
                const perfData = performance.getEntriesByType('navigation')[0];
                if (perfData) {
                    console.log('Page load time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
                }
            }, 0);
        });
    }
}

// Initialize performance monitoring
monitorPerformance();

// Export functions for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initializeSkillBars,
        animateSkillBars,
        setupSmoothScrolling,
        setupPrintFunctionality,
        throttle,
        safeExecute
    };
}