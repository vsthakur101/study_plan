// Learning Roadmap Tracker Application
class RoadmapTracker {
    constructor() {
        this.db = null;
        this.currentRoadmap = null;
        this.roadmaps = [];
        this.currentView = 'tasks'; // 'tasks' or 'calendar'
        this.currentCalendarDate = new Date();
        this.autoSaveInterval = null;
        this.init();
    }

    async init() {
        await this.initDatabase();
        await this.loadRoadmaps();
        this.setupEventListeners();
        this.loadCurrentRoadmap();
        this.updateStreak();
    }

    // Initialize IndexedDB
    async initDatabase() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open('RoadmapTrackerDB', 2);

            request.onerror = () => reject(request.error);
            request.onsuccess = () => {
                this.db = request.result;
                resolve();
            };

            request.onupgradeneeded = (event) => {
                const db = event.target.result;
                const oldVersion = event.oldVersion;

                // Create object stores (version 1)
                if (!db.objectStoreNames.contains('progress')) {
                    const progressStore = db.createObjectStore('progress', { keyPath: 'id' });
                    progressStore.createIndex('roadmapId', 'roadmapId', { unique: false });
                    progressStore.createIndex('taskId', 'taskId', { unique: false });
                    progressStore.createIndex('date', 'date', { unique: false });
                }

                if (!db.objectStoreNames.contains('roadmaps')) {
                    const roadmapsStore = db.createObjectStore('roadmaps', { keyPath: 'id' });
                    roadmapsStore.createIndex('title', 'title', { unique: false });
                }

                if (!db.objectStoreNames.contains('dailyStats')) {
                    const statsStore = db.createObjectStore('dailyStats', { keyPath: 'date' });
                    statsStore.createIndex('date', 'date', { unique: true });
                }

                // Add dailyLogs store (version 2)
                if (oldVersion < 2 && !db.objectStoreNames.contains('dailyLogs')) {
                    const logsStore = db.createObjectStore('dailyLogs', { keyPath: 'id' });
                    logsStore.createIndex('date', 'date', { unique: false });
                    logsStore.createIndex('roadmapId', 'roadmapId', { unique: false });
                    logsStore.createIndex('dateRoadmap', ['date', 'roadmapId'], { unique: true });
                    logsStore.createIndex('status', 'status', { unique: false });
                }
            };
        });
    }

    // Load roadmap definitions
    async loadRoadmaps() {
        this.roadmaps = [
            {
                id: 'typescript',
                title: 'TypeScript Learning Plan',
                description: 'Complete TypeScript learning path from beginner to advanced',
                icon: 'fa-code',
                color: 'blue',
                phases: [
                    {
                        id: 'foundations',
                        title: 'Foundations',
                        duration: 'Week 1',
                        tasks: [
                            { id: 'ts-setup', title: 'Setup and Basic Concepts', estimatedTime: '2-3 hours' },
                            { id: 'ts-types', title: 'Basic Types', estimatedTime: '3-4 hours' },
                            { id: 'ts-interfaces', title: 'Interfaces and Types', estimatedTime: '3-4 hours' }
                        ]
                    },
                    {
                        id: 'core-features',
                        title: 'Core TypeScript Features',
                        duration: 'Weeks 2-3',
                        tasks: [
                            { id: 'ts-functions', title: 'Functions and Objects', estimatedTime: '4-5 hours' },
                            { id: 'ts-generics', title: 'Generics and Advanced Types', estimatedTime: '5-6 hours' },
                            { id: 'ts-classes', title: 'Classes and Inheritance', estimatedTime: '4-5 hours' }
                        ]
                    },
                    {
                        id: 'practical',
                        title: 'Practical Application',
                        duration: 'Weeks 4-6',
                        tasks: [
                            { id: 'ts-react', title: 'TypeScript with React', estimatedTime: '6-8 hours' },
                            { id: 'ts-node', title: 'Node.js with TypeScript', estimatedTime: '5-7 hours' },
                            { id: 'ts-project', title: 'Build a TypeScript Project', estimatedTime: '10-12 hours' }
                        ]
                    }
                ]
            },
            {
                id: 'best-practices',
                title: 'Programming Best Practices',
                description: 'Essential programming practices for code quality and maintainability',
                icon: 'fa-star',
                color: 'green',
                phases: [
                    {
                        id: 'code-quality',
                        title: 'Code Quality and Style',
                        duration: 'Week 1',
                        tasks: [
                            { id: 'bp-readability', title: 'Readability First', estimatedTime: '3-4 hours' },
                            { id: 'bp-organization', title: 'Code Organization', estimatedTime: '2-3 hours' },
                            { id: 'bp-comments', title: 'Effective Comments', estimatedTime: '2-3 hours' }
                        ]
                    },
                    {
                        id: 'testing',
                        title: 'Testing and Quality Assurance',
                        duration: 'Week 2',
                        tasks: [
                            { id: 'bp-unit-tests', title: 'Unit Testing', estimatedTime: '4-5 hours' },
                            { id: 'bp-integration-tests', title: 'Integration Testing', estimatedTime: '3-4 hours' },
                            { id: 'bp-tdd', title: 'Test-Driven Development', estimatedTime: '5-6 hours' }
                        ]
                    },
                    {
                        id: 'version-control',
                        title: 'Version Control and Collaboration',
                        duration: 'Week 3',
                        tasks: [
                            { id: 'bp-git-basics', title: 'Git Best Practices', estimatedTime: '3-4 hours' },
                            { id: 'bp-code-review', title: 'Code Reviews', estimatedTime: '2-3 hours' },
                            { id: 'bp-collaboration', title: 'Team Collaboration', estimatedTime: '3-4 hours' }
                        ]
                    }
                ]
            },
            {
                id: 'frontend-system-design',
                title: 'Frontend System Design',
                description: 'System design patterns and architecture for frontend developers',
                icon: 'fa-sitemap',
                color: 'purple',
                phases: [
                    {
                        id: 'architecture',
                        title: 'Frontend Architecture',
                        duration: 'Weeks 1-2',
                        tasks: [
                            { id: 'fsd-components', title: 'Component Architecture', estimatedTime: '5-6 hours' },
                            { id: 'fsd-state', title: 'State Management Architecture', estimatedTime: '6-7 hours' },
                            { id: 'fsd-performance', title: 'Performance Architecture', estimatedTime: '4-5 hours' }
                        ]
                    },
                    {
                        id: 'patterns',
                        title: 'Design Patterns',
                        duration: 'Weeks 3-4',
                        tasks: [
                            { id: 'fsd-component-patterns', title: 'Component Design Patterns', estimatedTime: '6-7 hours' },
                            { id: 'fsd-state-patterns', title: 'State Management Patterns', estimatedTime: '5-6 hours' },
                            { id: 'fsd-architectural-patterns', title: 'Architectural Patterns', estimatedTime: '7-8 hours' }
                        ]
                    },
                    {
                        id: 'advanced',
                        title: 'Advanced Topics',
                        duration: 'Weeks 5-6',
                        tasks: [
                            { id: 'fsd-micro-frontends', title: 'Micro-Frontend Architecture', estimatedTime: '8-10 hours' },
                            { id: 'fsd-scalability', title: 'Scalability Patterns', estimatedTime: '6-7 hours' },
                            { id: 'fsd-optimization', title: 'Performance Optimization', estimatedTime: '7-8 hours' }
                        ]
                    }
                ]
            },
            {
                id: 'cybersecurity',
                title: 'Cybersecurity Learning Plan',
                description: 'Comprehensive cybersecurity learning path from basics to advanced',
                icon: 'fa-shield-alt',
                color: 'red',
                phases: [
                    {
                        id: 'foundations',
                        title: 'Cybersecurity Foundations',
                        duration: 'Months 1-3',
                        tasks: [
                            { id: 'cs-core-concepts', title: 'Core Security Concepts', estimatedTime: '20-25 hours' },
                            { id: 'cs-network-security', title: 'Network Security Fundamentals', estimatedTime: '25-30 hours' },
                            { id: 'cs-cryptography', title: 'Cryptography Basics', estimatedTime: '15-20 hours' }
                        ]
                    },
                    {
                        id: 'technical-skills',
                        title: 'Technical Skills',
                        duration: 'Months 4-6',
                        tasks: [
                            { id: 'cs-web-security', title: 'Web Application Security', estimatedTime: '30-35 hours' },
                            { id: 'cs-penetration-testing', title: 'Penetration Testing Tools', estimatedTime: '25-30 hours' },
                            { id: 'cs-incident-response', title: 'Incident Response', estimatedTime: '20-25 hours' }
                        ]
                    },
                    {
                        id: 'specialization',
                        title: 'Specialization Paths',
                        duration: 'Months 7-9',
                        tasks: [
                            { id: 'cs-offensive-security', title: 'Offensive Security', estimatedTime: '40-45 hours' },
                            { id: 'cs-defensive-security', title: 'Defensive Security', estimatedTime: '40-45 hours' },
                            { id: 'cs-application-security', title: 'Application Security', estimatedTime: '35-40 hours' }
                        ]
                    }
                ]
            },
            {
                id: 'aws',
                title: 'AWS Learning Plan',
                description: 'Complete AWS learning path from beginner to professional certification',
                icon: 'fa-cloud',
                color: 'orange',
                phases: [
                    {
                        id: 'aws-foundations',
                        title: 'AWS Foundations',
                        duration: 'Weeks 1-4',
                        tasks: [
                            { id: 'aws-basics', title: 'Cloud Computing Basics', estimatedTime: '10-15 hours' },
                            { id: 'aws-core-services', title: 'Core AWS Services', estimatedTime: '20-25 hours' },
                            { id: 'aws-security', title: 'AWS Security Fundamentals', estimatedTime: '15-20 hours' }
                        ]
                    },
                    {
                        id: 'aws-core',
                        title: 'Core Services Deep Dive',
                        duration: 'Weeks 5-12',
                        tasks: [
                            { id: 'aws-compute', title: 'Advanced Compute Services', estimatedTime: '25-30 hours' },
                            { id: 'aws-storage', title: 'Storage and Databases', estimatedTime: '30-35 hours' },
                            { id: 'aws-networking', title: 'Networking and CDN', estimatedTime: '25-30 hours' }
                        ]
                    },
                    {
                        id: 'aws-advanced',
                        title: 'Advanced Topics',
                        duration: 'Weeks 13-24',
                        tasks: [
                            { id: 'aws-architecture', title: 'Cloud Architecture', estimatedTime: '40-45 hours' },
                            { id: 'aws-devops', title: 'DevOps on AWS', estimatedTime: '35-40 hours' },
                            { id: 'aws-specialization', title: 'Specialization Paths', estimatedTime: '50-60 hours' }
                        ]
                    }
                ]
            },
            {
                id: 'frontend-patterns',
                title: 'Frontend Design Patterns',
                description: 'Comprehensive guide to frontend design patterns and best practices',
                icon: 'fa-puzzle-piece',
                color: 'indigo',
                phases: [
                    {
                        id: 'component-patterns',
                        title: 'Component Design Patterns',
                        duration: 'Weeks 1-2',
                        tasks: [
                            { id: 'fp-container-presentational', title: 'Container/Presentational Pattern', estimatedTime: '4-5 hours' },
                            { id: 'fp-hoc', title: 'Higher-Order Components', estimatedTime: '3-4 hours' },
                            { id: 'fp-render-props', title: 'Render Props Pattern', estimatedTime: '3-4 hours' },
                            { id: 'fp-custom-hooks', title: 'Custom Hooks Pattern', estimatedTime: '5-6 hours' }
                        ]
                    },
                    {
                        id: 'state-patterns',
                        title: 'State Management Patterns',
                        duration: 'Weeks 3-4',
                        tasks: [
                            { id: 'fp-context-api', title: 'Context API Pattern', estimatedTime: '4-5 hours' },
                            { id: 'fp-redux', title: 'Redux Pattern', estimatedTime: '6-7 hours' },
                            { id: 'fp-state-reducer', title: 'State Reducer Pattern', estimatedTime: '4-5 hours' },
                            { id: 'fp-observer', title: 'Observer Pattern', estimatedTime: '3-4 hours' }
                        ]
                    },
                    {
                        id: 'architectural-patterns',
                        title: 'Architectural Patterns',
                        duration: 'Weeks 5-6',
                        tasks: [
                            { id: 'fp-micro-frontends', title: 'Micro-Frontend Architecture', estimatedTime: '6-7 hours' },
                            { id: 'fp-plugin', title: 'Plugin Architecture', estimatedTime: '5-6 hours' },
                            { id: 'fp-service-layer', title: 'Service Layer Pattern', estimatedTime: '4-5 hours' },
                            { id: 'fp-performance', title: 'Performance Patterns', estimatedTime: '5-6 hours' }
                        ]
                    }
                ]
            }
        ];
    }

    // Setup event listeners
    setupEventListeners() {
        // Roadmap selection
        document.getElementById('changeRoadmapBtn').addEventListener('click', () => {
            this.showRoadmapSelection();
        });

        // Statistics modal
        document.getElementById('statsBtn').addEventListener('click', () => {
            this.showStatistics();
        });

        document.getElementById('closeStatsBtn').addEventListener('click', () => {
            this.hideStatistics();
        });

        // Export data
        document.getElementById('exportBtn').addEventListener('click', () => {
            this.exportData();
        });

        // Reset data
        document.getElementById('resetBtn').addEventListener('click', () => {
            if (confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
                this.resetAllData();
            }
        });

        // Quick actions
        document.getElementById('markAllTodayBtn').addEventListener('click', () => {
            this.markAllTodayComplete();
        });

        document.getElementById('unmarkAllTodayBtn').addEventListener('click', () => {
            this.unmarkAllToday();
        });

        // View toggle
        document.getElementById('tasksViewBtn').addEventListener('click', () => {
            this.switchView('tasks');
        });

        document.getElementById('calendarViewBtn').addEventListener('click', () => {
            this.switchView('calendar');
        });

        // Calendar navigation
        document.getElementById('prevMonthBtn').addEventListener('click', () => {
            this.navigateCalendar('prev');
        });

        document.getElementById('nextMonthBtn').addEventListener('click', () => {
            this.navigateCalendar('next');
        });

        document.getElementById('todayBtn').addEventListener('click', () => {
            this.navigateCalendar('today');
        });

        // Daily log modal
        document.getElementById('closeDailyLogBtn').addEventListener('click', () => {
            this.closeDailyLogModal();
        });

        document.getElementById('cancelDailyLogBtn').addEventListener('click', () => {
            this.closeDailyLogModal();
        });

        document.getElementById('saveDailyLogBtn').addEventListener('click', () => {
            this.saveDailyLogFromModal();
        });

        // Close modals on backdrop click
        document.getElementById('statsModal').addEventListener('click', (e) => {
            if (e.target.id === 'statsModal') {
                this.hideStatistics();
            }
        });

        document.getElementById('dailyLogModal').addEventListener('click', (e) => {
            if (e.target.id === 'dailyLogModal') {
                this.closeDailyLogModal();
            }
        });
    }

    // Render roadmap selection
    showRoadmapSelection() {
        const selection = document.getElementById('roadmapSelection');
        const current = document.getElementById('currentRoadmap');
        const grid = document.getElementById('roadmapGrid');

        selection.classList.remove('hidden');
        current.classList.add('hidden');

        grid.innerHTML = this.roadmaps.map(roadmap => `
            <div class="roadmap-card bg-white rounded-lg shadow-sm border border-gray-200 p-6 cursor-pointer hover:border-${roadmap.color}-300"
                 onclick="tracker.selectRoadmap('${roadmap.id}')">
                <div class="flex items-center mb-4">
                    <div class="w-12 h-12 bg-${roadmap.color}-100 rounded-lg flex items-center justify-center mr-4">
                        <i class="fas ${roadmap.icon} text-${roadmap.color}-600 text-xl"></i>
                    </div>
                    <div>
                        <h3 class="text-lg font-semibold text-gray-900">${roadmap.title}</h3>
                        <p class="text-sm text-gray-600">${roadmap.phases.length} phases</p>
                    </div>
                </div>
                <p class="text-gray-600 text-sm mb-4">${roadmap.description}</p>
                <div class="flex items-center justify-between">
                    <span class="text-xs text-gray-500">Click to start</span>
                    <i class="fas fa-arrow-right text-gray-400"></i>
                </div>
            </div>
        `).join('');
    }

    // Select a roadmap
    async selectRoadmap(roadmapId) {
        this.currentRoadmap = this.roadmaps.find(r => r.id === roadmapId);
        
        // Save to localStorage
        localStorage.setItem('currentRoadmap', roadmapId);
        
        // Save to IndexedDB
        await this.saveRoadmapToDB(this.currentRoadmap);
        
        // Show current roadmap view
        this.renderCurrentRoadmap();
    }

    // Load current roadmap from storage
    async loadCurrentRoadmap() {
        const savedRoadmapId = localStorage.getItem('currentRoadmap');
        
        if (savedRoadmapId) {
            this.currentRoadmap = this.roadmaps.find(r => r.id === savedRoadmapId);
            if (this.currentRoadmap) {
                await this.saveRoadmapToDB(this.currentRoadmap);
                this.renderCurrentRoadmap();
                return;
            }
        }
        
        // Show roadmap selection if no current roadmap
        this.showRoadmapSelection();
    }

    // Save roadmap to IndexedDB
    async saveRoadmapToDB(roadmap) {
        const transaction = this.db.transaction(['roadmaps'], 'readwrite');
        const store = transaction.objectStore('roadmaps');
        await store.put(roadmap);
    }

    // Render current roadmap
    async renderCurrentRoadmap() {
        if (!this.currentRoadmap) return;

        const selection = document.getElementById('roadmapSelection');
        const current = document.getElementById('currentRoadmap');
        
        selection.classList.add('hidden');
        current.classList.remove('hidden');

        // Update header
        document.getElementById('currentRoadmapTitle').textContent = this.currentRoadmap.title;
        document.getElementById('currentRoadmapDescription').textContent = this.currentRoadmap.description;

        // Load progress
        const progress = await this.getRoadmapProgress(this.currentRoadmap.id);
        
        // Update statistics
        this.updateProgressStats(progress);
        
        // Render today's tasks
        this.renderTodayTasks(progress);
        
        // Render all phases
        this.renderPhases(progress);
    }

    // Get roadmap progress from IndexedDB
    async getRoadmapProgress(roadmapId) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['progress'], 'readonly');
            const store = transaction.objectStore('progress');
            const index = store.index('roadmapId');
            const request = index.getAll(roadmapId);
            
            request.onsuccess = () => {
                const progress = {};
                request.result.forEach(item => {
                    progress[item.taskId] = item;
                });
                resolve(progress);
            };
            
            request.onerror = () => reject(request.error);
        });
    }

    // Update progress statistics
    updateProgressStats(progress) {
        const allTasks = this.currentRoadmap.phases.flatMap(phase => phase.tasks);
        const completedTasks = allTasks.filter(task => progress[task.id]?.completed);
        const today = new Date().toDateString();
        const todayCompleted = allTasks.filter(task => 
            progress[task.id]?.completed && 
            progress[task.id]?.lastCompleted === today
        );

        // Update counters
        document.getElementById('tasksCompleted').textContent = completedTasks.length;
        document.getElementById('totalTasks').textContent = allTasks.length;
        
        // Calculate overall progress
        const overallProgress = Math.round((completedTasks.length / allTasks.length) * 100);
        document.getElementById('overallProgress').textContent = `${overallProgress}%`;
        
        // Update progress circle
        const circle = document.getElementById('progressCircle');
        const circumference = 2 * Math.PI * 25;
        const offset = circumference - (overallProgress / 100) * circumference;
        circle.style.strokeDashoffset = offset;
        
        // Update current phase
        const currentPhaseIndex = this.getCurrentPhaseIndex(completedTasks, allTasks);
        const currentPhase = this.currentRoadmap.phases[currentPhaseIndex];
        document.getElementById('currentPhase').textContent = currentPhase ? currentPhase.title : 'Completed';
    }

    // Get current phase index
    getCurrentPhaseIndex(completedTasks, allTasks) {
        for (let i = 0; i < this.currentRoadmap.phases.length; i++) {
            const phaseTasks = this.currentRoadmap.phases[i].tasks;
            const phaseCompleted = phaseTasks.filter(task => 
                completedTasks.some(completed => completed.id === task.id)
            ).length;
            
            if (phaseCompleted < phaseTasks.length) {
                return i;
            }
        }
        return this.currentRoadmap.phases.length - 1;
    }

    // Render today's tasks
    renderTodayTasks(progress) {
        const container = document.getElementById('todayProgress');
        const today = new Date().toDateString();
        
        // Get tasks that should be done today (simplified - in real app, this would be based on schedule)
        const allTasks = this.currentRoadmap.phases.flatMap(phase => phase.tasks);
        const incompleteTasks = allTasks.filter(task => !progress[task.id]?.completed);
        const todayTasks = incompleteTasks.slice(0, 6); // Show up to 6 tasks for today

        if (todayTasks.length === 0) {
            container.innerHTML = `
                <div class="col-span-full text-center py-8 bg-green-50 rounded-lg border border-green-200">
                    <i class="fas fa-check-circle text-green-600 text-3xl mb-2"></i>
                    <p class="text-green-800 font-medium">Great job! All tasks are completed.</p>
                    <p class="text-green-600 text-sm mt-1">Time to move on to the next phase!</p>
                </div>
            `;
            return;
        }

        container.innerHTML = todayTasks.map(task => {
            const taskProgress = progress[task.id];
            const isCompleted = taskProgress?.completed;
            const isTodayCompleted = taskProgress?.lastCompleted === today;
            
            return `
                <div class="task-item bg-white border border-gray-200 rounded-lg p-4 ${isCompleted ? 'completed' : ''}">
                    <div class="flex items-start">
                        <input type="checkbox" 
                               id="today-${task.id}" 
                               class="checkbox-custom mt-1 mr-3 w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500"
                               ${isCompleted ? 'checked' : ''}
                               onchange="tracker.toggleTask('${task.id}')">
                        <div class="flex-1">
                            <label for="today-${task.id}" class="block font-medium text-gray-900 cursor-pointer">
                                ${task.title}
                            </label>
                            <p class="text-sm text-gray-500 mt-1">${task.estimatedTime}</p>
                            ${isTodayCompleted ? '<span class="inline-block mt-2 px-2 py-1 bg-green-100 text-green-800 text-xs rounded">Completed today</span>' : ''}
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }

    // Render all phases
    renderPhases(progress) {
        const container = document.getElementById('phasesContainer');
        
        container.innerHTML = this.currentRoadmap.phases.map((phase, phaseIndex) => {
            const phaseTasks = phase.tasks;
            const completedPhaseTasks = phaseTasks.filter(task => progress[task.id]?.completed);
            const phaseProgress = Math.round((completedPhaseTasks.length / phaseTasks.length) * 100);
            
            return `
                <div class="bg-white border border-gray-200 rounded-lg overflow-hidden">
                    <div class="phase-header p-4 border-b border-gray-200" onclick="tracker.togglePhase('phase-${phaseIndex}')">
                        <div class="flex items-center justify-between">
                            <div class="flex items-center">
                                <i class="fas fa-chevron-right mr-3 text-gray-400 transition-transform" id="phase-chevron-${phaseIndex}"></i>
                                <div>
                                    <h4 class="font-semibold text-gray-900">${phase.title}</h4>
                                    <p class="text-sm text-gray-600">${phase.duration}</p>
                                </div>
                            </div>
                            <div class="flex items-center">
                                <div class="mr-4">
                                    <span class="text-sm font-medium text-gray-900">${phaseProgress}%</span>
                                    <div class="w-24 bg-gray-200 rounded-full h-2 mt-1">
                                        <div class="bg-indigo-600 h-2 rounded-full transition-all duration-300" style="width: ${phaseProgress}%"></div>
                                    </div>
                                </div>
                                <span class="text-sm text-gray-500">${completedPhaseTasks.length}/${phaseTasks.length}</span>
                            </div>
                        </div>
                    </div>
                    <div id="phase-${phaseIndex}" class="hidden">
                        <div class="p-4 space-y-3">
                            ${phaseTasks.map(task => {
                                const taskProgress = progress[task.id];
                                const isCompleted = taskProgress?.completed;
                                const lastCompleted = taskProgress?.lastCompleted;
                                
                                return `
                                    <div class="task-item flex items-center p-3 rounded-lg ${isCompleted ? 'bg-green-50' : 'bg-gray-50'}">
                                        <input type="checkbox" 
                                               id="task-${task.id}" 
                                               class="checkbox-custom mr-3 w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
                                               ${isCompleted ? 'checked' : ''}
                                               onchange="tracker.toggleTask('${task.id}')">
                                        <div class="flex-1">
                                            <label for="task-${task.id}" class="block font-medium text-gray-900 cursor-pointer">
                                                ${task.title}
                                            </label>
                                            <div class="flex items-center mt-1 text-sm text-gray-500">
                                                <span>${task.estimatedTime}</span>
                                                ${lastCompleted ? `<span class="ml-3 text-green-600">Completed ${this.formatDate(lastCompleted)}</span>` : ''}
                                            </div>
                                        </div>
                                    </div>
                                `;
                            }).join('')}
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }

    // Toggle phase visibility
    togglePhase(phaseId) {
        const phase = document.getElementById(phaseId);
        const chevron = document.getElementById(phaseId.replace('phase-', 'phase-chevron-'));
        
        phase.classList.toggle('hidden');
        chevron.classList.toggle('rotate-90');
    }

    // Toggle task completion
    async toggleTask(taskId) {
        const today = new Date().toDateString();
        const transaction = this.db.transaction(['progress'], 'readwrite');
        const store = transaction.objectStore('progress');
        
        // Get existing progress
        const existingProgress = await new Promise((resolve, reject) => {
            const request = store.get(`${this.currentRoadmap.id}-${taskId}`);
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
        
        if (existingProgress) {
            // Toggle completion
            existingProgress.completed = !existingProgress.completed;
            existingProgress.lastCompleted = existingProgress.completed ? today : null;
            await store.put(existingProgress);
        } else {
            // Create new progress entry
            const newProgress = {
                id: `${this.currentRoadmap.id}-${taskId}`,
                roadmapId: this.currentRoadmap.id,
                taskId: taskId,
                completed: true,
                lastCompleted: today,
                createdAt: new Date().toISOString()
            };
            await store.add(newProgress);
        }
        
        // Update daily stats
        await this.updateDailyStats(today);

        // Update daily log
        await this.updateDailyLogFromTaskToggle(today);

        // Re-render
        this.renderCurrentRoadmap();
        this.updateStreak();

        // Refresh calendar if in calendar view
        if (this.currentView === 'calendar') {
            await this.renderCalendar();
        }
    }

    // Update daily statistics
    async updateDailyStats(date) {
        const transaction = this.db.transaction(['dailyStats'], 'readwrite');
        const store = transaction.objectStore('dailyStats');
        
        // Get today's stats
        const existingStats = await new Promise((resolve, reject) => {
            const request = store.get(date);
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
        
        // Count completed tasks for today
        const progress = await this.getRoadmapProgress(this.currentRoadmap.id);
        const todayCompleted = Object.values(progress).filter(p => 
            p.completed && p.lastCompleted === date
        ).length;
        
        if (existingStats) {
            existingStats.tasksCompleted = todayCompleted;
            existingStats.lastUpdated = new Date().toISOString();
            await store.put(existingStats);
        } else {
            const newStats = {
                date: date,
                roadmapId: this.currentRoadmap.id,
                tasksCompleted: todayCompleted,
                createdAt: new Date().toISOString(),
                lastUpdated: new Date().toISOString()
            };
            await store.add(newStats);
        }
    }

    // === Daily Log Methods ===

    // Get daily log for specific date and roadmap
    async getDailyLog(date, roadmapId) {
        const transaction = this.db.transaction(['dailyLogs'], 'readonly');
        const store = transaction.objectStore('dailyLogs');
        const id = `${date}-${roadmapId}`;

        return new Promise((resolve, reject) => {
            const request = store.get(id);
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    // Save daily log
    async saveDailyLog(logData) {
        const transaction = this.db.transaction(['dailyLogs'], 'readwrite');
        const store = transaction.objectStore('dailyLogs');

        return new Promise((resolve, reject) => {
            const request = store.put(logData);
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    // Calculate day status based on thresholds
    calculateDayStatus(tasksCompleted, totalTasks) {
        if (tasksCompleted === 0) return 'none';

        const percentage = (tasksCompleted / totalTasks) * 100;
        const meetsPercentage = percentage >= 70;
        const meetsAbsolute = tasksCompleted >= 3;

        return (meetsPercentage || meetsAbsolute) ? 'success' : 'partial';
    }

    // Get task completion summary for a specific date
    async getDayTasksSummary(date, roadmapId) {
        const progress = await this.getRoadmapProgress(roadmapId);
        const roadmap = this.roadmaps.find(r => r.id === roadmapId);

        if (!roadmap) return { tasksCompleted: 0, totalTasks: 0, completionRate: 0 };

        const allTasks = roadmap.phases.flatMap(phase => phase.tasks);
        const totalTasks = allTasks.length;

        const tasksCompletedOnDate = Object.values(progress).filter(p =>
            p.completed && p.lastCompleted === date
        ).length;

        const completionRate = totalTasks > 0 ? (tasksCompletedOnDate / totalTasks) * 100 : 0;

        return {
            tasksCompleted: tasksCompletedOnDate,
            totalTasks: totalTasks,
            completionRate: Math.round(completionRate * 10) / 10
        };
    }

    // Update daily log when tasks are toggled
    async updateDailyLogFromTaskToggle(date) {
        if (!this.currentRoadmap) return;

        const roadmapId = this.currentRoadmap.id;
        const summary = await this.getDayTasksSummary(date, roadmapId);
        const status = this.calculateDayStatus(summary.tasksCompleted, summary.totalTasks);

        const logId = `${date}-${roadmapId}`;
        const existingLog = await this.getDailyLog(date, roadmapId);

        if (existingLog) {
            // Update existing log
            existingLog.tasksCompleted = summary.tasksCompleted;
            existingLog.totalTasks = summary.totalTasks;
            existingLog.completionRate = summary.completionRate;
            existingLog.status = status;
            existingLog.lastUpdated = new Date().toISOString();
            await this.saveDailyLog(existingLog);
        } else {
            // Create new log if tasks were completed
            if (summary.tasksCompleted > 0) {
                const newLog = {
                    id: logId,
                    date: date,
                    roadmapId: roadmapId,
                    tasksCompleted: summary.tasksCompleted,
                    totalTasks: summary.totalTasks,
                    completionRate: summary.completionRate,
                    status: status,
                    notes: {
                        topicsCovered: '',
                        keyLearnings: '',
                        challengesFaced: '',
                        timeSpent: { hours: 0, minutes: 0 },
                        additionalNotes: ''
                    },
                    createdAt: new Date().toISOString(),
                    lastUpdated: new Date().toISOString()
                };
                await this.saveDailyLog(newLog);
            }
        }
    }

    // Get all daily logs for a specific roadmap
    async getDailyLogsForRoadmap(roadmapId) {
        const transaction = this.db.transaction(['dailyLogs'], 'readonly');
        const store = transaction.objectStore('dailyLogs');
        const index = store.index('roadmapId');

        return new Promise((resolve, reject) => {
            const request = index.getAll(roadmapId);
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    // Format date to YYYY-MM-DD
    formatDateToISO(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    // Check if date is today
    isToday(date) {
        const today = new Date();
        return this.formatDateToISO(date) === this.formatDateToISO(today);
    }

    // Check if date is in the future
    isFuture(date) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const checkDate = new Date(date);
        checkDate.setHours(0, 0, 0, 0);
        return checkDate > today;
    }

    // Update streak
    async updateStreak() {
        const streak = await this.calculateStreak();
        document.getElementById('streakCount').textContent = streak;
    }

    // Calculate current streak
    async calculateStreak() {
        const transaction = this.db.transaction(['dailyStats'], 'readonly');
        const store = transaction.objectStore('dailyStats');
        
        return new Promise((resolve, reject) => {
            const request = store.getAll();
            request.onsuccess = () => {
                const stats = request.result;
                if (stats.length === 0) {
                    resolve(0);
                    return;
                }
                
                // Sort by date
                stats.sort((a, b) => new Date(b.date) - new Date(a.date));
                
                let streak = 0;
                const today = new Date();
                
                for (let i = 0; i < stats.length; i++) {
                    const statDate = new Date(stats[i].date);
                    const expectedDate = new Date(today);
                    expectedDate.setDate(today.getDate() - i);
                    
                    if (statDate.toDateString() === expectedDate.toDateString() && stats[i].tasksCompleted > 0) {
                        streak++;
                    } else {
                        break;
                    }
                }
                
                resolve(streak);
            };
            
            request.onerror = () => reject(request.error);
        });
    }

    // Mark all today tasks complete
    async markAllTodayComplete() {
        const today = new Date().toDateString();
        const allTasks = this.currentRoadmap.phases.flatMap(phase => phase.tasks);
        const incompleteTasks = allTasks.filter(task => {
            const checkbox = document.getElementById(`today-${task.id}`);
            return checkbox && !checkbox.checked;
        });
        
        for (const task of incompleteTasks) {
            await this.toggleTask(task.id);
        }
    }

    // Unmark all today tasks
    async unmarkAllToday() {
        const today = new Date().toDateString();
        const allTasks = this.currentRoadmap.phases.flatMap(phase => phase.tasks);
        const todayCompleted = allTasks.filter(task => {
            const checkbox = document.getElementById(`today-${task.id}`);
            return checkbox && checkbox.checked;
        });
        
        for (const task of todayCompleted) {
            await this.toggleTask(task.id);
        }
    }

    // Show statistics modal
    async showStatistics() {
        const modal = document.getElementById('statsModal');
        const content = document.getElementById('statsContent');
        
        // Get statistics
        const stats = await this.getStatistics();
        
        content.innerHTML = `
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="bg-gray-50 rounded-lg p-6">
                    <h4 class="font-semibold text-gray-900 mb-4">Overall Progress</h4>
                    <div class="space-y-3">
                        <div class="flex justify-between">
                            <span class="text-gray-600">Total Roadmaps</span>
                            <span class="font-medium">${stats.totalRoadmaps}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Current Roadmap</span>
                            <span class="font-medium">${stats.currentRoadmap}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Overall Completion</span>
                            <span class="font-medium">${stats.overallCompletion}%</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Current Streak</span>
                            <span class="font-medium">${stats.currentStreak} days</span>
                        </div>
                    </div>
                </div>
                
                <div class="bg-gray-50 rounded-lg p-6">
                    <h4 class="font-semibold text-gray-900 mb-4">Task Statistics</h4>
                    <div class="space-y-3">
                        <div class="flex justify-between">
                            <span class="text-gray-600">Tasks Completed</span>
                            <span class="font-medium">${stats.tasksCompleted}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Total Tasks</span>
                            <span class="font-medium">${stats.totalTasks}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Tasks Today</span>
                            <span class="font-medium">${stats.tasksToday}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Best Day</span>
                            <span class="font-medium">${stats.bestDay} tasks</span>
                        </div>
                    </div>
                </div>
                
                <div class="bg-gray-50 rounded-lg p-6 md:col-span-2">
                    <h4 class="font-semibold text-gray-900 mb-4">Recent Activity</h4>
                    <div class="space-y-2">
                        ${stats.recentActivity.map(activity => `
                            <div class="flex items-center justify-between py-2 border-b border-gray-200">
                                <span class="text-gray-600">${activity.date}</span>
                                <span class="font-medium">${activity.tasks} tasks completed</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
        
        modal.classList.remove('hidden');
    }

    // Get comprehensive statistics
    async getStatistics() {
        const progress = await this.getRoadmapProgress(this.currentRoadmap?.id || '');
        const allTasks = this.currentRoadmap ? this.currentRoadmap.phases.flatMap(phase => phase.tasks) : [];
        const completedTasks = allTasks.filter(task => progress[task.id]?.completed);
        const today = new Date().toDateString();
        const todayCompleted = allTasks.filter(task => 
            progress[task.id]?.completed && 
            progress[task.id]?.lastCompleted === today
        );
        
        // Get daily stats
        const transaction = this.db.transaction(['dailyStats'], 'readonly');
        const store = transaction.objectStore('dailyStats');
        
        const dailyStats = await new Promise((resolve, reject) => {
            const request = store.getAll();
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
        
        // Calculate best day
        const bestDay = dailyStats.length > 0 ? Math.max(...dailyStats.map(s => s.tasksCompleted)) : 0;
        
        // Get recent activity (last 7 days)
        const recentActivity = dailyStats
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, 7)
            .map(stat => ({
                date: this.formatDate(stat.date),
                tasks: stat.tasksCompleted
            }));
        
        return {
            totalRoadmaps: this.roadmaps.length,
            currentRoadmap: this.currentRoadmap?.title || 'None',
            overallCompletion: allTasks.length > 0 ? Math.round((completedTasks.length / allTasks.length) * 100) : 0,
            currentStreak: await this.calculateStreak(),
            tasksCompleted: completedTasks.length,
            totalTasks: allTasks.length,
            tasksToday: todayCompleted.length,
            bestDay: bestDay,
            recentActivity: recentActivity
        };
    }

    // === Calendar Methods ===

    // Switch between tasks and calendar view
    switchView(view) {
        this.currentView = view;
        const tasksView = document.getElementById('tasksView');
        const calendarView = document.getElementById('calendarView');
        const tasksBtn = document.getElementById('tasksViewBtn');
        const calendarBtn = document.getElementById('calendarViewBtn');

        if (view === 'calendar') {
            tasksView.classList.add('hidden');
            calendarView.classList.remove('hidden');
            tasksBtn.classList.remove('active');
            calendarBtn.classList.add('active');
            this.renderCalendar();
        } else {
            tasksView.classList.remove('hidden');
            calendarView.classList.add('hidden');
            tasksBtn.classList.add('active');
            calendarBtn.classList.remove('active');
        }
    }

    // Render calendar
    async renderCalendar() {
        if (!this.currentRoadmap) return;

        const year = this.currentCalendarDate.getFullYear();
        const month = this.currentCalendarDate.getMonth();

        // Update header
        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                           'July', 'August', 'September', 'October', 'November', 'December'];
        document.getElementById('calendarMonthYear').textContent = `${monthNames[month]} ${year}`;

        // Render calendar grid
        await this.renderCalendarGrid(year, month);
    }

    // Render calendar grid
    async renderCalendarGrid(year, month) {
        const calendarGrid = document.getElementById('calendarGrid');
        calendarGrid.innerHTML = '';

        // Get first day of month and number of days
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDayOfWeek = firstDay.getDay();

        // Get logs for current roadmap and month
        const logs = await this.getDailyLogsForRoadmap(this.currentRoadmap.id);
        const logsMap = new Map(logs.map(log => [log.date, log]));

        // Add empty cells for days before month starts
        for (let i = 0; i < startingDayOfWeek; i++) {
            const emptyCell = document.createElement('div');
            emptyCell.className = 'calendar-day other-month';
            calendarGrid.appendChild(emptyCell);
        }

        // Add day cells
        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(year, month, day);
            const dateString = this.formatDateToISO(date);
            const log = logsMap.get(dateString);

            const dayCell = await this.renderDayCell(date, dateString, log);
            calendarGrid.appendChild(dayCell);
        }
    }

    // Render individual day cell
    async renderDayCell(date, dateString, log) {
        const dayCell = document.createElement('div');
        dayCell.className = 'calendar-day';
        const dayNumber = date.getDate();

        // Add classes
        if (this.isToday(date)) {
            dayCell.classList.add('today');
        }

        if (this.isFuture(date)) {
            dayCell.classList.add('future');
        } else {
            // Add status class
            if (log) {
                dayCell.classList.add(log.status);

                // Add icon
                const icon = document.createElement('i');
                icon.className = 'calendar-day-icon fas ';
                if (log.status === 'success') {
                    icon.classList.add('fa-check-circle', 'text-green-600');
                } else if (log.status === 'partial') {
                    icon.classList.add('fa-circle', 'text-yellow-600');
                }
                dayCell.appendChild(icon);

                // Add tasks count
                const tasksSpan = document.createElement('span');
                tasksSpan.className = 'calendar-day-tasks';
                tasksSpan.textContent = `${log.tasksCompleted}/${log.totalTasks} tasks`;
                dayCell.appendChild(tasksSpan);
            } else {
                dayCell.classList.add('none');
            }
        }

        // Add day number
        const dayNum = document.createElement('div');
        dayNum.className = 'calendar-day-number';
        dayNum.textContent = dayNumber;
        dayCell.insertBefore(dayNum, dayCell.firstChild);

        // Add click handler
        if (!this.isFuture(date)) {
            dayCell.addEventListener('click', () => {
                this.showDailyLogModal(dateString);
            });
        }

        return dayCell;
    }

    // Navigate calendar
    navigateCalendar(direction) {
        if (direction === 'prev') {
            this.currentCalendarDate.setMonth(this.currentCalendarDate.getMonth() - 1);
        } else if (direction === 'next') {
            this.currentCalendarDate.setMonth(this.currentCalendarDate.getMonth() + 1);
        } else if (direction === 'today') {
            this.currentCalendarDate = new Date();
        }
        this.renderCalendar();
    }

    // === Daily Log Modal Methods ===

    // Show daily log modal
    async showDailyLogModal(dateString) {
        if (!this.currentRoadmap) return;

        const modal = document.getElementById('dailyLogModal');
        const dateObj = new Date(dateString + 'T12:00:00'); // Add time to avoid timezone issues

        // Format date for display
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = dateObj.toLocaleDateString('en-US', options);

        // Update modal header
        document.getElementById('dailyLogDate').textContent = formattedDate;
        document.getElementById('dailyLogRoadmap').textContent = this.currentRoadmap.title;

        // Get or create daily log
        let log = await this.getDailyLog(dateString, this.currentRoadmap.id);
        const summary = await this.getDayTasksSummary(dateString, this.currentRoadmap.id);

        if (!log) {
            // Create new log
            const status = this.calculateDayStatus(summary.tasksCompleted, summary.totalTasks);
            log = {
                id: `${dateString}-${this.currentRoadmap.id}`,
                date: dateString,
                roadmapId: this.currentRoadmap.id,
                tasksCompleted: summary.tasksCompleted,
                totalTasks: summary.totalTasks,
                completionRate: summary.completionRate,
                status: status,
                notes: {
                    topicsCovered: '',
                    keyLearnings: '',
                    challengesFaced: '',
                    timeSpent: { hours: 0, minutes: 0 },
                    additionalNotes: ''
                },
                createdAt: new Date().toISOString(),
                lastUpdated: new Date().toISOString()
            };
        }

        // Update task summary
        document.getElementById('dailyLogTaskCount').textContent =
            `${summary.tasksCompleted}/${summary.totalTasks}`;
        document.getElementById('dailyLogProgressBar').style.width =
            `${summary.completionRate}%`;

        // Update status badge
        const statusEl = document.getElementById('dailyLogStatus');
        statusEl.className = 'px-3 py-1 rounded-full text-sm font-medium';

        if (log.status === 'success') {
            statusEl.className += ' bg-green-100 text-green-800';
            statusEl.innerHTML = '<i class="fas fa-check-circle mr-1"></i> Success';
        } else if (log.status === 'partial') {
            statusEl.className += ' bg-yellow-100 text-yellow-800';
            statusEl.innerHTML = '<i class="fas fa-circle mr-1"></i> Partial';
        } else {
            statusEl.className += ' bg-gray-100 text-gray-800';
            statusEl.innerHTML = '<i class="fas fa-minus-circle mr-1"></i> No Activity';
        }

        // Populate form
        document.getElementById('topicsCovered').value = log.notes.topicsCovered || '';
        document.getElementById('keyLearnings').value = log.notes.keyLearnings || '';
        document.getElementById('challengesFaced').value = log.notes.challengesFaced || '';
        document.getElementById('timeHours').value = log.notes.timeSpent.hours || '';
        document.getElementById('timeMinutes').value = log.notes.timeSpent.minutes || '';
        document.getElementById('additionalNotes').value = log.notes.additionalNotes || '';

        // Store current date for saving
        modal.dataset.currentDate = dateString;

        // Show modal
        modal.classList.remove('hidden');

        // Start auto-save
        if (this.autoSaveInterval) {
            clearInterval(this.autoSaveInterval);
        }
        this.autoSaveInterval = setInterval(() => {
            this.autoSaveDraft();
        }, 30000);
    }

    // Save daily log from modal
    async saveDailyLogFromModal() {
        const modal = document.getElementById('dailyLogModal');
        const dateString = modal.dataset.currentDate;

        if (!dateString || !this.currentRoadmap) return;

        // Get form values
        const topicsCovered = document.getElementById('topicsCovered').value.trim();
        const keyLearnings = document.getElementById('keyLearnings').value.trim();
        const challengesFaced = document.getElementById('challengesFaced').value.trim();
        const timeHours = parseInt(document.getElementById('timeHours').value) || 0;
        const timeMinutes = parseInt(document.getElementById('timeMinutes').value) || 0;
        const additionalNotes = document.getElementById('additionalNotes').value.trim();

        // Validate time
        if (timeHours < 0 || timeHours > 24 || timeMinutes < 0 || timeMinutes > 59) {
            alert('Please enter valid time values (0-24 hours, 0-59 minutes)');
            return;
        }

        // Get current task summary
        const summary = await this.getDayTasksSummary(dateString, this.currentRoadmap.id);
        const status = this.calculateDayStatus(summary.tasksCompleted, summary.totalTasks);

        // Create or update log
        const log = {
            id: `${dateString}-${this.currentRoadmap.id}`,
            date: dateString,
            roadmapId: this.currentRoadmap.id,
            tasksCompleted: summary.tasksCompleted,
            totalTasks: summary.totalTasks,
            completionRate: summary.completionRate,
            status: status,
            notes: {
                topicsCovered: topicsCovered,
                keyLearnings: keyLearnings,
                challengesFaced: challengesFaced,
                timeSpent: { hours: timeHours, minutes: timeMinutes },
                additionalNotes: additionalNotes
            },
            createdAt: (await this.getDailyLog(dateString, this.currentRoadmap.id))?.createdAt || new Date().toISOString(),
            lastUpdated: new Date().toISOString()
        };

        // Save to database
        await this.saveDailyLog(log);

        // Close modal
        this.closeDailyLogModal();

        // Refresh calendar if in calendar view
        if (this.currentView === 'calendar') {
            await this.renderCalendar();
        }

        // Show success message briefly
        this.showNotification('Learning log saved successfully!', 'success');
    }

    // Auto-save draft
    async autoSaveDraft() {
        const modal = document.getElementById('dailyLogModal');
        if (modal.classList.contains('hidden')) return;

        const dateString = modal.dataset.currentDate;
        if (!dateString || !this.currentRoadmap) return;

        try {
            // Get form values
            const topicsCovered = document.getElementById('topicsCovered').value.trim();
            const keyLearnings = document.getElementById('keyLearnings').value.trim();
            const challengesFaced = document.getElementById('challengesFaced').value.trim();
            const timeHours = parseInt(document.getElementById('timeHours').value) || 0;
            const timeMinutes = parseInt(document.getElementById('timeMinutes').value) || 0;
            const additionalNotes = document.getElementById('additionalNotes').value.trim();

            // Only save if there's some content
            if (!topicsCovered && !keyLearnings && !challengesFaced && !additionalNotes) return;

            // Get current task summary
            const summary = await this.getDayTasksSummary(dateString, this.currentRoadmap.id);
            const status = this.calculateDayStatus(summary.tasksCompleted, summary.totalTasks);

            // Save draft
            const log = {
                id: `${dateString}-${this.currentRoadmap.id}`,
                date: dateString,
                roadmapId: this.currentRoadmap.id,
                tasksCompleted: summary.tasksCompleted,
                totalTasks: summary.totalTasks,
                completionRate: summary.completionRate,
                status: status,
                notes: {
                    topicsCovered: topicsCovered,
                    keyLearnings: keyLearnings,
                    challengesFaced: challengesFaced,
                    timeSpent: { hours: timeHours, minutes: timeMinutes },
                    additionalNotes: additionalNotes
                },
                createdAt: (await this.getDailyLog(dateString, this.currentRoadmap.id))?.createdAt || new Date().toISOString(),
                lastUpdated: new Date().toISOString()
            };

            await this.saveDailyLog(log);

            // Show auto-save indicator
            const indicator = document.querySelector('#autoSaveIndicator span');
            indicator.classList.add('visible');
            setTimeout(() => {
                indicator.classList.remove('visible');
            }, 2000);

        } catch (error) {
            console.error('Auto-save failed:', error);
        }
    }

    // Close daily log modal
    closeDailyLogModal() {
        const modal = document.getElementById('dailyLogModal');
        modal.classList.add('hidden');

        // Clear auto-save interval
        if (this.autoSaveInterval) {
            clearInterval(this.autoSaveInterval);
            this.autoSaveInterval = null;
        }

        // Reset form
        document.getElementById('dailyLogForm').reset();
    }

    // Show notification
    showNotification(message, type = 'success') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `fixed top-20 right-4 px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in ${
            type === 'success' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
        }`;
        notification.innerHTML = `
            <div class="flex items-center">
                <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'} mr-2"></i>
                <span>${message}</span>
            </div>
        `;

        document.body.appendChild(notification);

        // Remove after 3 seconds
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    // Hide statistics modal
    hideStatistics() {
        document.getElementById('statsModal').classList.add('hidden');
    }

    // Export data
    async exportData() {
        const data = {
            currentRoadmap: this.currentRoadmap?.id || null,
            roadmaps: this.roadmaps,
            progress: {},
            dailyStats: [],
            dailyLogs: [],
            exportDate: new Date().toISOString(),
            version: '2.0'
        };

        // Get all progress
        const transaction = this.db.transaction(['progress', 'dailyStats', 'dailyLogs'], 'readonly');
        const progressStore = transaction.objectStore('progress');
        const statsStore = transaction.objectStore('dailyStats');
        const logsStore = transaction.objectStore('dailyLogs');

        // Get progress data
        const progressData = await new Promise((resolve, reject) => {
            const request = progressStore.getAll();
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });

        // Get daily stats
        const statsData = await new Promise((resolve, reject) => {
            const request = statsStore.getAll();
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });

        // Get daily logs
        const logsData = await new Promise((resolve, reject) => {
            const request = logsStore.getAll();
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });

        data.progress = progressData;
        data.dailyStats = statsData;
        data.dailyLogs = logsData;

        // Create and download file
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `roadmap-progress-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    // Reset all data
    async resetAllData() {
        // Clear IndexedDB
        const transaction = this.db.transaction(['progress', 'roadmaps', 'dailyStats', 'dailyLogs'], 'readwrite');
        const progressStore = transaction.objectStore('progress');
        const roadmapsStore = transaction.objectStore('roadmaps');
        const statsStore = transaction.objectStore('dailyStats');
        const logsStore = transaction.objectStore('dailyLogs');

        await progressStore.clear();
        await roadmapsStore.clear();
        await statsStore.clear();
        await logsStore.clear();
        
        // Clear localStorage
        localStorage.removeItem('currentRoadmap');
        
        // Reset state
        this.currentRoadmap = null;
        
        // Show roadmap selection
        this.showRoadmapSelection();
        this.updateStreak();
    }

    // Format date for display
    formatDate(dateString) {
        const date = new Date(dateString);
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        
        if (date.toDateString() === today.toDateString()) {
            return 'Today';
        } else if (date.toDateString() === yesterday.toDateString()) {
            return 'Yesterday';
        } else {
            return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
        }
    }
}

// Initialize the application
const tracker = new RoadmapTracker();