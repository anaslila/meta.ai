// Global Variables
let currentUser = null;
let currentBalance = 50000.00;
let transactionHistory = [
    {
        id: 'TXN001',
        type: 'received',
        amount: 5000,
        description: 'Salary Credit',
        recipient: 'Company ABC',
        date: new Date('2024-09-25T10:30:00'),
        note: 'Monthly salary'
    },
    {
        id: 'TXN002',
        type: 'sent',
        amount: 1200,
        description: 'Grocery Payment',
        recipient: 'BigBasket Store',
        date: new Date('2024-09-28T14:15:00'),
        note: 'Monthly groceries'
    },
    {
        id: 'TXN003',
        type: 'added',
        amount: 10000,
        description: 'Account Top-up',
        recipient: 'Self',
        date: new Date('2024-09-29T09:20:00'),
        note: 'Added via debit card'
    }
];
let filteredTransactions = [...transactionHistory];

// DOM Elements
let loginPage, dashboardPage, sidebar, mainContent;
let loginForm, sendMoneyForm, addMoneyForm, qrUpload;
let accountBalanceElement, recentTransactionsElement, allTransactionsElement;
let transactionSearchElement, allTransactionSearchElement;

// Initialize App
document.addEventListener('DOMContentLoaded', function() {
    initializeElements();
    initializeEventListeners();
    loadUserProfile();
    showAlerts();
    
    // Show login page by default
    showLoginPage();
});

// Initialize DOM Elements
function initializeElements() {
    // Pages
    loginPage = document.getElementById('loginPage');
    dashboardPage = document.getElementById('dashboardPage');
    
    // Layout Elements
    sidebar = document.getElementById('sidebar');
    mainContent = document.querySelector('.main-content');
    
    // Forms
    loginForm = document.getElementById('loginForm');
    sendMoneyForm = document.getElementById('sendMoneyForm');
    addMoneyForm = document.getElementById('addMoneyForm');
    qrUpload = document.getElementById('qrUpload');
    
    // Display Elements
    accountBalanceElement = document.getElementById('accountBalance');
    recentTransactionsElement = document.getElementById('recentTransactions');
    allTransactionsElement = document.getElementById('allTransactions');
    
    // Search Elements
    transactionSearchElement = document.getElementById('transactionSearch');
    allTransactionSearchElement = document.getElementById('allTransactionSearch');
}

// Initialize Event Listeners
function initializeEventListeners() {
    // Login Form
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    // Money Transfer Forms
    if (sendMoneyForm) {
        sendMoneyForm.addEventListener('submit', handleSendMoney);
    }
    
    if (addMoneyForm) {
        addMoneyForm.addEventListener('submit', handleAddMoney);
    }
    
    // QR Upload
    if (qrUpload) {
        qrUpload.addEventListener('change', handleQRUpload);
    }
    
    // Search Functionality
    if (transactionSearchElement) {
        transactionSearchElement.addEventListener('input', handleTransactionSearch);
    }
    
    if (allTransactionSearchElement) {
        allTransactionSearchElement.addEventListener('input', handleAllTransactionSearch);
    }
    
    // Close modals when clicking outside
    window.addEventListener('click', function(event) {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });
    });
}

// Authentication Functions
function handleLogin(event) {
    event.preventDefault();
    
    const loginId = document.getElementById('loginId').value.trim();
    const password = document.getElementById('password').value.trim();
    
    // Validate against profile data
    if (validateLogin(loginId, password)) {
        currentUser = userProfile;
        showDashboard();
        updateUserInterface();
        showAlert('success', 'Login successful! Welcome to Meta.ai Bank');
    } else {
        showAlert('error', 'Invalid User Login. Please check your credentials.');
    }
}

function validateLogin(loginId, password) {
    // Check against profile.js data
    return loginId === userProfile.loginId && password === userProfile.password;
}

function logout() {
    if (confirm('Are you sure you want to logout?')) {
        currentUser = null;
        currentBalance = 50000.00;
        showLoginPage();
        showAlert('info', 'You have been logged out successfully');
    }
}

// Page Navigation Functions
function showLoginPage() {
    if (loginPage && dashboardPage) {
        loginPage.classList.add('active');
        dashboardPage.classList.remove('active');
    }
}

function showDashboard() {
    if (loginPage && dashboardPage) {
        loginPage.classList.remove('active');
        dashboardPage.classList.add('active');
    }
    
    // Show dashboard content by default
    showPage('dashboard');
}

function showPage(pageName) {
    // Remove active class from all nav items and content sections
    const navItems = document.querySelectorAll('.nav-item');
    const contentSections = document.querySelectorAll('.content-section');
    
    navItems.forEach(item => item.classList.remove('active'));
    contentSections.forEach(section => section.classList.remove('active'));
    
    // Add active class to current nav item and content section
    const activeNavItem = document.querySelector(`[onclick="showPage('${pageName}')"]`);
    const activeContentSection = document.getElementById(`${pageName}Content`);
    
    if (activeNavItem) {
        activeNavItem.classList.add('active');
    }
    
    if (activeContentSection) {
        activeContentSection.classList.add('active');
    }
    
    // Load specific page content
    switch(pageName) {
        case 'dashboard':
            updateDashboard();
            break;
        case 'transactions':
            updateAllTransactions();
            break;
        case 'profile':
            updateProfile();
            break;
        case 'offers':
            updateOffers();
            break;
    }
}

// Update User Interface
function updateUserInterface() {
    if (currentUser) {
        // Update user name in header
        const userNameElement = document.getElementById('userName');
        if (userNameElement) {
            userNameElement.textContent = currentUser.accountHolderName;
        }
        
        // Update profile picture
        const profilePics = document.querySelectorAll('.profile-pic');
        profilePics.forEach(pic => {
            if (currentUser.profilePhoto) {
                pic.src = currentUser.profilePhoto;
            }
        });
    }
}

// Dashboard Functions
function updateDashboard() {
    updateBalance();
    updateRecentTransactions();
}

function updateBalance() {
    if (accountBalanceElement) {
        accountBalanceElement.textContent = formatAmount(currentBalance);
    }
}

function updateRecentTransactions() {
    if (!recentTransactionsElement) return;
    
    // Get last 5 transactions
    const recentTransactions = transactionHistory.slice(-5).reverse();
    
    if (recentTransactions.length === 0) {
        recentTransactionsElement.innerHTML = '<p class="no-transactions">No transactions found</p>';
        return;
    }
    
    recentTransactionsElement.innerHTML = recentTransactions.map(transaction => 
        createTransactionHTML(transaction)
    ).join('');
}

function updateAllTransactions() {
    if (!allTransactionsElement) return;
    
    if (filteredTransactions.length === 0) {
        allTransactionsElement.innerHTML = '<p class="no-transactions">No transactions found</p>';
        return;
    }
    
    const sortedTransactions = [...filteredTransactions].reverse();
    allTransactionsElement.innerHTML = sortedTransactions.map(transaction => 
        createTransactionHTML(transaction)
    ).join('');
}

function createTransactionHTML(transaction) {
    const amountClass = transaction.type === 'sent' ? 'negative' : 'positive';
    const amountPrefix = transaction.type === 'sent' ? '-' : '+';
    const iconClass = getTransactionIcon(transaction.type);
    
    return `
        <div class="transaction-item">
            <div class="transaction-info">
                <div class="transaction-icon ${transaction.type}">
                    <i class="${iconClass}"></i>
                </div>
                <div class="transaction-details">
                    <h4>${transaction.description}</h4>
                    <p>${transaction.recipient}${transaction.note ? ' • ' + transaction.note : ''}</p>
                </div>
            </div>
            <div class="transaction-amount">
                <div class="amount ${amountClass}">
                    ${amountPrefix}₹${formatAmount(transaction.amount)}
                </div>
                <div class="time">${formatDate(transaction.date)}</div>
            </div>
        </div>
    `;
}

function getTransactionIcon(type) {
    switch(type) {
        case 'sent': return 'fas fa-arrow-up';
        case 'received': return 'fas fa-arrow-down';
        case 'added': return 'fas fa-plus';
        default: return 'fas fa-exchange-alt';
    }
}

// Transaction Functions
function handleSendMoney(event) {
    event.preventDefault();
    
    const transferType = document.getElementById('transferType').value;
    const recipient = document.getElementById('recipient').value.trim();
    const amount = parseFloat(document.getElementById('sendAmount').value);
    const note = document.getElementById('sendNote').value.trim() || 'Money transfer';
    
    // Validation
    if (!recipient || amount <= 0) {
        showAlert('error', 'Please enter valid recipient and amount');
        return;
    }
    
    if (amount > currentBalance) {
        showAlert('error', 'Insufficient balance');
        return;
    }
    
    // Process transaction
    const transaction = {
        id: generateTransactionId(),
        type: 'sent',
        amount: amount,
        description: `${transferType.toUpperCase()} Transfer`,
        recipient: recipient,
        date: new Date(),
        note: note
    };
    
    // Update balance and history
    currentBalance -= amount;
    transactionHistory.push(transaction);
    filteredTransactions = [...transactionHistory];
    
    // Update UI
    updateBalance();
    updateRecentTransactions();
    updateAllTransactions();
    
    // Close modal and show success
    closeModal('sendMoney');
    showAlert('success', `₹${formatAmount(amount)} sent successfully to ${recipient}`);
    
    // Reset form
    sendMoneyForm.reset();
}

function handleAddMoney(event) {
    event.preventDefault();
    
    const amount = parseFloat(document.getElementById('addAmount').value);
    const paymentMethod = document.getElementById('paymentMethod').value;
    
    // Validation
    if (amount <= 0) {
        showAlert('error', 'Please enter a valid amount');
        return;
    }
    
    // Simulate payment processing
    simulatePaymentProcessing(() => {
        // Process transaction
        const transaction = {
            id: generateTransactionId(),
            type: 'added',
            amount: amount,
            description: 'Account Top-up',
            recipient: 'Self',
            date: new Date(),
            note: `Added via ${paymentMethod}`
        };
        
        // Update balance and history
        currentBalance += amount;
        transactionHistory.push(transaction);
        filteredTransactions = [...transactionHistory];
        
        // Update UI
        updateBalance();
        updateRecentTransactions();
        updateAllTransactions();
        
        // Close modal and show success
        closeModal('addMoney');
        showAlert('success', `₹${formatAmount(amount)} added successfully to your account`);
        
        // Reset form
        addMoneyForm.reset();
    });
}

function simulatePaymentProcessing(callback) {
    // Show loading state
    const submitBtn = document.querySelector('#addMoneyModal .modal-btn');
    if (submitBtn) {
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<div class="loading"></div> Processing...';
        submitBtn.disabled = true;
        
        // Simulate processing delay
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            callback();
        }, 2000);
    } else {
        callback();
    }
}

// QR Scanner Functions
function handleQRUpload(event) {
    const file = event.target.files[0];
    const qrResult = document.getElementById('qrResult');
    
    if (!file) return;
    
    // Simulate QR scanning
    simulateQRScan(file, (result) => {
        if (qrResult) {
            qrResult.style.display = 'block';
            if (result.success) {
                qrResult.innerHTML = `
                    <div class="qr-success">
                        <i class="fas fa-check-circle success"></i>
                        <h4>QR Code Detected</h4>
                        <p><strong>Merchant:</strong> ${result.merchant}</p>
                        <p><strong>Amount:</strong> ₹${result.amount}</p>
                        <button class="curvy-btn" onclick="processQRPayment('${result.merchant}', ${result.amount})">
                            <i class="fas fa-credit-card"></i>
                            Pay Now
                        </button>
                    </div>
                `;
            } else {
                qrResult.innerHTML = `
                    <div class="qr-error">
                        <i class="fas fa-exclamation-circle error"></i>
                        <h4>Invalid QR Code</h4>
                        <p>Please upload a valid payment QR code</p>
                    </div>
                `;
            }
        }
    });
}

function simulateQRScan(file, callback) {
    // Simulate scanning delay
    setTimeout(() => {
        // Random success/failure for demo
        const isValid = Math.random() > 0.3;
        
        if (isValid) {
            const merchants = ['Coffee Shop', 'Grocery Store', 'Restaurant ABC', 'Gas Station', 'BookStore'];
            const amounts = [250, 450, 1200, 800, 350];
            
            const randomIndex = Math.floor(Math.random() * merchants.length);
            
            callback({
                success: true,
                merchant: merchants[randomIndex],
                amount: amounts[randomIndex]
            });
        } else {
            callback({ success: false });
        }
    }, 1500);
}

function processQRPayment(merchant, amount) {
    if (amount > currentBalance) {
        showAlert('error', 'Insufficient balance for this payment');
        return;
    }
    
    // Process QR payment
    const transaction = {
        id: generateTransactionId(),
        type: 'sent',
        amount: amount,
        description: 'QR Payment',
        recipient: merchant,
        date: new Date(),
        note: 'Paid via QR scan'
    };
    
    // Update balance and history
    currentBalance -= amount;
    transactionHistory.push(transaction);
    filteredTransactions = [...transactionHistory];
    
    // Update UI
    updateBalance();
    updateRecentTransactions();
    updateAllTransactions();
    
    // Close modal and show success
    closeModal('qrScanner');
    showAlert('success', `₹${formatAmount(amount)} paid successfully to ${merchant}`);
}

// Search Functions
function handleTransactionSearch(event) {
    const searchTerm = event.target.value.toLowerCase().trim();
    
    if (searchTerm === '') {
        // Show recent transactions when no search term
        updateRecentTransactions();
        return;
    }
    
    // Filter transactions based on search term
    const filtered = transactionHistory.filter(transaction => 
        transaction.description.toLowerCase().includes(searchTerm) ||
        transaction.recipient.toLowerCase().includes(searchTerm) ||
        transaction.note.toLowerCase().includes(searchTerm)
    );
    
    // Update recent transactions display with filtered results
    if (recentTransactionsElement) {
        if (filtered.length === 0) {
            recentTransactionsElement.innerHTML = '<p class="no-transactions">No matching transactions found</p>';
        } else {
            const displayTransactions = filtered.slice(-5).reverse();
            recentTransactionsElement.innerHTML = displayTransactions.map(transaction => 
                createTransactionHTML(transaction)
            ).join('');
        }
    }
}

function handleAllTransactionSearch(event) {
    const searchTerm = event.target.value.toLowerCase().trim();
    
    if (searchTerm === '') {
        filteredTransactions = [...transactionHistory];
    } else {
        filteredTransactions = transactionHistory.filter(transaction => 
            transaction.description.toLowerCase().includes(searchTerm) ||
            transaction.recipient.toLowerCase().includes(searchTerm) ||
            transaction.note.toLowerCase().includes(searchTerm) ||
            transaction.id.toLowerCase().includes(searchTerm)
        );
    }
    
    updateAllTransactions();
}

// Profile Functions
function loadUserProfile() {
    // This will be called after profile.js loads
    if (typeof userProfile !== 'undefined') {
        updateProfileDisplay();
    }
}

function updateProfile() {
    updateProfileDisplay();
}

function updateProfileDisplay() {
    if (typeof userProfile === 'undefined') return;
    
    // Update profile information
    const profileElements = {
        'profileName': userProfile.accountHolderName,
        'profileMobile': userProfile.mobileNumber,
        'profileAccount': '****' + userProfile.accountNumber.slice(-4),
        'profileIFSC': userProfile.ifscCode,
        'profileBranch': userProfile.branchName,
        'profileAccountType': userProfile.accountType,
        'profileDebitCard': '****' + userProfile.debitCardNumber.slice(-4),
        'profileCreditCard': '****' + userProfile.creditCardNumber.slice(-4),
        'accountCreated': formatDate(new Date(userProfile.accountCreated))
    };
    
    Object.entries(profileElements).forEach(([id, value]) => {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = value;
        }
    });
    
    // Update profile photo
    const profilePhoto = document.getElementById('profilePhoto');
    if (profilePhoto && userProfile.profilePhoto) {
        profilePhoto.src = userProfile.profilePhoto;
    }
}

// Offers Functions
function updateOffers() {
    const offersList = document.getElementById('offersList');
    if (!offersList || typeof bankOffers === 'undefined') return;
    
    offersList.innerHTML = bankOffers.map(offer => `
        <div class="offer-card">
            <div class="offer-header">
                <h3 class="offer-title">${offer.title}</h3>
                <span class="offer-badge">${offer.type}</span>
            </div>
            <p class="offer-description">${offer.description}</p>
            <div class="offer-validity">Valid until: ${offer.validity}</div>
        </div>
    `).join('');
}

// Modal Functions
function showModal(modalName) {
    const modal = document.getElementById(`${modalName}Modal`);
    if (modal) {
        modal.style.display = 'block';
        
        // Reset QR result if it's QR scanner modal
        if (modalName === 'qrScanner') {
            const qrResult = document.getElementById('qrResult');
            if (qrResult) {
                qrResult.style.display = 'none';
                qrResult.innerHTML = '';
            }
            // Reset file input
            if (qrUpload) {
                qrUpload.value = '';
            }
        }
    }
}

function closeModal(modalName) {
    const modal = document.getElementById(`${modalName}Modal`);
    if (modal) {
        modal.style.display = 'none';
    }
}

// Utility Functions
function togglePassword() {
    const passwordInput = document.getElementById('password');
    const toggleIcon = document.querySelector('.toggle-password');
    
    if (!passwordInput || !toggleIcon) return;
    
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    
    toggleIcon.classList.toggle('fa-eye');
    toggleIcon.classList.toggle('fa-eye-slash');
}

function toggleSidebar() {
    if (sidebar) {
        sidebar.classList.toggle('active');
    }
}

function generateTransactionId() {
    const timestamp = Date.now().toString();
    const random = Math.random().toString(36).substr(2, 5);
    return `TXN${timestamp.slice(-6)}${random.toUpperCase()}`;
}

function formatAmount(amount) {
    return new Intl.NumberFormat('en-IN', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(amount);
}

function formatDate(date) {
    return new Intl.DateTimeFormat('en-IN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    }).format(new Date(date));
}

function showAlert(type, message) {
    // This function will work with alert.js
    if (typeof createAlert === 'function') {
        createAlert(type, message);
    } else {
        // Fallback to browser alert
        alert(message);
    }
}

function showAlerts() {
    // This function will work with alert.js to show bank offers
    if (typeof showBankAlerts === 'function') {
        showBankAlerts();
    }
}

// Responsive Functions
function handleResize() {
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile && sidebar) {
        sidebar.classList.remove('active');
    }
}

// Initialize responsive behavior
window.addEventListener('resize', handleResize);

// Export functions for global access (if needed)
window.showPage = showPage;
window.logout = logout;
window.showModal = showModal;
window.closeModal = closeModal;
window.togglePassword = togglePassword;
window.toggleSidebar = toggleSidebar;
window.processQRPayment = processQRPayment;

// Initialize app when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        console.log('Meta.ai Bank Application Initialized');
    });
} else {
    console.log('Meta.ai Bank Application Initialized');
}
