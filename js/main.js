document.addEventListener('DOMContentLoaded', function() {
    // Define lab experiments
    const labExperiments = [
        {
            id: 'exp1',
            title: 'Tables & Constraints',
            icon: '📝',
            link: 'exp1.html'
        },
        {
            id: 'exp2',
            title: 'Advanced Queries',
            icon: '🔍',
            link: 'exp2.html'
        },
        {
            id: 'exp3',
            title: 'Aggregate & Views',
            icon: '📊',
            link: 'exp3.html'
        },
        {
            id: 'exp4',
            title: 'String & Date Functions',
            icon: '📅',
            link: 'exp4.html'
        },
        {
            id: 'exp5',
            title: 'PL/SQL Programming part 1',
            icon: '🔧',
            link: 'exp5.html'
        },
        {
            id: 'exp6',
            title: 'PL/SQL Programming part 2',
            icon: '🔧',
            link: 'exp6.html'
        },
        {
            id: 'exp7',
            title: 'Nested if, CASE and CASE Expression',
            icon: '🔧',
            link: 'exp7.html'
        },
        {
            id: 'exp8',
            title: 'Loops and Exception Handling',
            icon: '🔧',
            link: 'exp8.html'
        },
        {
            id: 'exp9',
            title: 'Procedures in PL/SQL',
            icon: '🔧',
            link: 'exp9.html'
        },
        {
            id: 'exp10',
            title: 'Stored Functions in PL/SQL',
            icon: '🔧',
            link: 'exp10.html'
        },
        {
            id: 'exp11',
            title: 'Cursors in PL/SQL',
            icon: '🔧',
            link: 'exp11.html'
        },
        {
            id: 'exp12',
            title: 'Triggers in PL/SQL',
            icon: '🔧',
            link: 'exp12.html'
        },
        {
            id: 'exp13',
            title: 'Database Indexing',
            icon: '🔍',
            link: 'exp13.html'
        },
        {
            id: 'exp14',
            title: 'JDBC Database Connectivity',
            icon: '🔗',
            link: 'exp14.html'
        },
        {
            id: 'exp15',
            title: 'JDBC Insert values',
            icon: '🔗',
            link: 'exp15.html'
        },
        {
            id: 'exp16',
            title: 'JDBC Delete values',
            icon: '🔗',
            link: 'exp16.html'
        }
    ];

    // Generate sidebar content
    function generateSidebar() {
        const sidebar = document.getElementById('sidebar');
        if (!sidebar) return;

        const currentPage = window.location.pathname.split('/').pop();

        // Create header
        const header = `
            <div class="mb-8">
                <h2 class="text-2xl font-bold mb-2">DBMS Lab</h2>
                <p class="text-gray-400 text-sm">Oracle SQL Experiments</p>
            </div>
        `;

        // Create navigation links
        const navLinks = labExperiments.map(exp => {
            const isActive = currentPage === exp.link;
            return `
                <li class="${isActive ? 'bg-blue-700' : 'bg-blue-600'} rounded-lg p-3 transition-all hover:bg-blue-700">
                    <a href="${exp.link}" class="flex items-center">
                        <span class="mr-2">${exp.icon}</span>
                        Experiment ${exp.id.replace('exp', '')}: ${exp.title}
                    </a>
                </li>
            `;
        }).join('');

        // Combine all elements
        sidebar.innerHTML = `
            ${header}
            <nav>
                <ul class="space-y-3">
                    ${navLinks}
                </ul>
            </nav>
        `;
    }

    // Mobile menu functionality
    function setupMobileMenu() {
        const menuButton = document.getElementById('menuButton');
        const sidebar = document.getElementById('sidebar');
        
        if (menuButton && sidebar) {
            menuButton.addEventListener('click', () => {
                sidebar.classList.toggle('hidden');
            });

            // Hide sidebar when clicking outside
            document.addEventListener('click', (e) => {
                if (window.innerWidth < 768) {
                    if (!sidebar.contains(e.target) && !menuButton.contains(e.target)) {
                        sidebar.classList.add('hidden');
                    }
                }
            });

            // Ensure sidebar is visible on larger screens
            window.addEventListener('resize', () => {
                if (window.innerWidth >= 768) {
                    sidebar.classList.remove('hidden');
                }
            });
        }
    }
    
    // Initialize copy buttons functionality
    function initializeCopyButtons() {
        document.querySelectorAll('.copy-button').forEach(button => {
            button.addEventListener('click', function() {
                window.copyCode(this);
            });
        });
    }

    // Global copy function for inline onclick handlers
    window.copyCode = function(button) {
        const codeBlock = button.closest('div').querySelector('code');
        const text = codeBlock.innerText;
        
        // Create temporary textarea
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        
        try {
            // Execute copy command
            document.execCommand('copy');
            
            // Visual feedback
            const originalText = button.innerText;
            button.innerText = 'Copied!';
            button.classList.remove('bg-blue-500', 'hover:bg-blue-600');
            button.classList.add('bg-green-500', 'hover:bg-green-600');
            
            // Reset button after 2 seconds
            setTimeout(() => {
                button.innerText = originalText;
                button.classList.remove('bg-green-500', 'hover:bg-green-600');
                button.classList.add('bg-blue-500', 'hover:bg-blue-600');
            }, 2000);
        } catch (err) {
            console.error('Failed to copy text:', err);
            
            // Error feedback
            button.innerText = 'Failed to copy';
            button.classList.add('bg-red-500', 'hover:bg-red-600');
            
            setTimeout(() => {
                button.innerText = 'Copy';
                button.classList.remove('bg-red-500', 'hover:bg-red-600');
                button.classList.add('bg-blue-500', 'hover:bg-blue-600');
            }, 2000);
        } finally {
            document.body.removeChild(textarea);
        }
    }

    // Initialize sidebar and copy buttons when DOM is loaded
    function initializePage() {
        // Create sidebar content
        generateSidebar();

        // Initialize copy buttons
        initializeCopyButtons();
    }

    // Initialize sidebar and mobile menu
    generateSidebar();
    setupMobileMenu();

    // Call initialization function
    initializePage();
});
