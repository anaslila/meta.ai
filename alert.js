// Bank Offers and Notifications Data
const bankOffers = [
    {
        id: "OFFER001",
        type: "Cashback",
        title: "UPI Cashback Bonanza",
        description: "Get 2% cashback on all UPI transactions above ₹500. Maximum cashback ₹100 per day. Valid for first 50 transactions each month.",
        validity: "31st December 2024",
        category: "digital_payments",
        priority: "high",
        targetCustomers: ["premium", "savings"],
        isActive: true,
        termsAndConditions: "Minimum transaction amount ₹500. Cashback will be credited within 48 hours.",
        maxBenefit: 3000,
        usageCount: 0,
        maxUsage: 50
    },
    {
        id: "OFFER002",
        type: "Loan",
        title: "Personal Loan at 9.99%",
        description: "Get instant personal loan up to ₹10 lakhs at attractive interest rates starting from 9.99% per annum. Quick approval in 2 hours.",
        validity: "15th November 2024",
        category: "lending",
        priority: "medium",
        targetCustomers: ["premium", "salary"],
        isActive: true,
        termsAndConditions: "Subject to credit approval. Processing fee applicable.",
        maxBenefit: 1000000,
        usageCount: 0,
        maxUsage: 1
    },
    {
        id: "OFFER003",
        type: "Investment",
        title: "Fixed Deposit Special Rate",
        description: "Earn up to 7.5% per annum on Fixed Deposits for tenure of 2 years and above. Senior citizens get additional 0.25% interest.",
        validity: "30th October 2024",
        category: "investment",
        priority: "medium",
        targetCustomers: ["all"],
        isActive: true,
        termsAndConditions: "Minimum deposit amount ₹25,000. Premature withdrawal penalties apply.",
        maxBenefit: null,
        usageCount: 0,
        maxUsage: null
    },
    {
        id: "OFFER004",
        type: "Credit Card",
        title: "Zero Annual Fee Credit Card",
        description: "Apply for Meta.ai Platinum Credit Card with zero annual fee for lifetime. Enjoy 5X reward points on dining and fuel.",
        validity: "31st January 2025",
        category: "cards",
        priority: "high",
        targetCustomers: ["savings", "premium"],
        isActive: true,
        termsAndConditions: "Annual income criteria applies. Subject to credit bureau checks.",
        maxBenefit: null,
        usageCount: 0,
        maxUsage: 1
    },
    {
        id: "OFFER005",
        type: "Insurance",
        title: "Health Insurance Premium Discount",
        description: "Get 25% discount on health insurance premium when you pay through Meta.ai Bank. Family floater plans starting ₹5,000 annually.",
        validity: "31st March 2025",
        category: "insurance",
        priority: "low",
        targetCustomers: ["all"],
        isActive: true,
        termsAndConditions: "Discount applicable on first-year premium only. Age restrictions apply.",
        maxBenefit: 15000,
        usageCount: 0,
        maxUsage: 1
    },
    {
        id: "OFFER006",
        type: "Rewards",
        title: "Refer & Earn Program",
        description: "Refer friends to open Meta.ai Bank account and earn ₹1,000 for each successful referral. Your friend also gets ₹500 welcome bonus.",
        validity: "31st December 2024",
        category: "referral",
        priority: "medium",
        targetCustomers: ["all"],
        isActive: true,
        termsAndConditions: "Referee must maintain minimum balance for 3 months. Maximum 10 referrals per customer.",
        maxBenefit: 10000,
        usageCount: 0,
        maxUsage: 10
    }
];

// System Notifications Data
const systemNotifications = [
    {
        id: "NOTIF001",
        type: "security",
        title: "Security Alert",
        message: "Your account was accessed from a new device on Sep 30, 2024. If this wasn't you, please contact us immediately.",
        priority: "high",
        timestamp: new Date('2024-09-30T16:15:00'),
        isRead: false,
        actionRequired: true,
        category: "security_alert"
    },
    {
        id: "NOTIF002",
        type: "transaction",
        title: "Large Transaction Alert",
        message: "A transaction of ₹25,000 was debited from your account today. Your current balance is ₹50,000.",
        priority: "medium",
        timestamp: new Date('2024-09-30T14:30:00'),
        isRead: false,
        actionRequired: false,
        category: "transaction_alert"
    },
    {
        id: "NOTIF003",
        type: "promotional",
        title: "New Feature Available",
        message: "Experience our new QR code payment feature! Scan and pay instantly at merchant locations.",
        priority: "low",
        timestamp: new Date('2024-09-30T09:00:00'),
        isRead: true,
        actionRequired: false,
        category: "feature_update"
    },
    {
        id: "NOTIF004",
        type: "reminder",
        title: "EMI Due Reminder",
        message: "Your personal loan EMI of ₹8,547 is due on October 5, 2024. Ensure sufficient balance to avoid penalties.",
        priority: "high",
        timestamp: new Date('2024-09-29T10:00:00'),
        isRead: false,
        actionRequired: true,
        category: "payment_reminder"
    },
    {
        id: "NOTIF005",
        type: "info",
        title: "Account Statement Ready",
        message: "Your monthly account statement for September 2024 is now available for download in your profile section.",
        priority: "low",
        timestamp: new Date('2024-09-28T18:00:00'),
        isRead: true,
        actionRequired: false,
        category: "statement_ready"
    }
];

// Alert Management System
class AlertManager {
    constructor() {
        this.alertContainer = null;
        this.activeAlerts = [];
        this.maxAlerts = 5;
        this.defaultDuration = 6000; // 6 seconds
        this.init();
    }

    init() {
        // Create alert container if it doesn't exist
        if (!document.getElementById('alertContainer')) {
            const container = document.createElement('div');
            container.id = 'alertContainer';
            container.className = 'alert-container';
            document.body.appendChild(container);
        }
        this.alertContainer = document.getElementById('alertContainer');
        
        // Add enhanced CSS styles for alerts
        this.injectAlertStyles();
    }

    injectAlertStyles() {
        const existingStyles = document.getElementById('alert-styles');
        if (existingStyles) return;

        const style = document.createElement('style');
        style.id = 'alert-styles';
        style.textContent = `
            .alert-container {
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 10001;
                pointer-events: none;
            }

            .alert {
                background: var(--white, #ffffff);
                border-radius: 15px;
                padding: 20px;
                margin-bottom: 15px;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
                border-left: 5px solid var(--primary-color, #580eeb);
                animation: slideInRight 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
                max-width: 400px;
                min-width: 320px;
                pointer-events: auto;
                position: relative;
                transform: translateX(0);
                transition: all 0.3s ease;
            }

            .alert.success {
                border-left-color: var(--success-color, #28a745);
            }

            .alert.error {
                border-left-color: var(--danger-color, #dc3545);
            }

            .alert.warning {
                border-left-color: var(--warning-color, #ffc107);
            }

            .alert.info {
                border-left-color: var(--primary-color, #580eeb);
            }

            .alert-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 10px;
            }

            .alert-icon {
                width: 24px;
                height: 24px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                margin-right: 12px;
                font-size: 12px;
                color: white;
            }

            .alert-icon.success {
                background: var(--success-color, #28a745);
            }

            .alert-icon.error {
                background: var(--danger-color, #dc3545);
            }

            .alert-icon.warning {
                background: var(--warning-color, #ffc107);
            }

            .alert-icon.info {
                background: var(--primary-color, #580eeb);
            }

            .alert-title {
                font-size: 16px;
                font-weight: 600;
                color: var(--text-primary, #2c3e50);
                margin: 0;
                display: flex;
                align-items: center;
                flex: 1;
            }

            .alert-message {
                color: var(--text-secondary, #6c757d);
                font-size: 14px;
                line-height: 1.5;
                margin: 0;
            }

            .alert-close {
                background: none;
                border: none;
                font-size: 20px;
                cursor: pointer;
                color: var(--text-secondary, #6c757d);
                padding: 0;
                width: 24px;
                height: 24px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
                transition: all 0.2s ease;
            }

            .alert-close:hover {
                background: rgba(0, 0, 0, 0.1);
                color: var(--text-primary, #2c3e50);
            }

            .alert-progress {
                position: absolute;
                bottom: 0;
                left: 0;
                height: 3px;
                background: rgba(0, 0, 0, 0.1);
                border-radius: 0 0 15px 15px;
                overflow: hidden;
            }

            .alert-progress-bar {
                height: 100%;
                background: var(--primary-color, #580eeb);
                width: 100%;
                transform-origin: left;
                animation: progressShrink var(--duration, 6s) linear forwards;
            }

            .alert-progress-bar.success {
                background: var(--success-color, #28a745);
            }

            .alert-progress-bar.error {
                background: var(--danger-color, #dc3545);
            }

            .alert-progress-bar.warning {
                background: var(--warning-color, #ffc107);
            }

            .alert.removing {
                animation: slideOutRight 0.3s ease forwards;
            }

            .alert.paused .alert-progress-bar {
                animation-play-state: paused;
            }

            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }

            @keyframes slideOutRight {
                from {
                    transform: translateX(0);
                    opacity: 1;
                    max-height: 200px;
                    margin-bottom: 15px;
                    padding: 20px;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                    max-height: 0;
                    margin-bottom: 0;
                    padding: 0;
                }
            }

            @keyframes progressShrink {
                from {
                    transform: scaleX(1);
                }
                to {
                    transform: scaleX(0);
                }
            }

            /* Responsive Design */
            @media (max-width: 480px) {
                .alert-container {
                    right: 10px;
                    left: 10px;
                    top: 10px;
                }

                .alert {
                    max-width: none;
                    min-width: auto;
                }
            }
        `;
        document.head.appendChild(style);
    }

    createAlert(type = 'info', message, title = null, duration = null, actions = null) {
        // Limit number of active alerts
        if (this.activeAlerts.length >= this.maxAlerts) {
            this.removeOldestAlert();
        }

        const alertId = `alert_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        const alertElement = this.buildAlertElement(alertId, type, message, title, duration, actions);
        
        this.alertContainer.appendChild(alertElement);
        this.activeAlerts.push({
            id: alertId,
            element: alertElement,
            type: type,
            createdAt: new Date(),
            duration: duration || this.defaultDuration
        });

        // Auto-remove after duration
        if (duration !== 0) { // 0 means persistent alert
            setTimeout(() => {
                this.removeAlert(alertId);
            }, duration || this.defaultDuration);
        }

        return alertId;
    }

    buildAlertElement(id, type, message, title, duration, actions) {
        const alert = document.createElement('div');
        alert.className = `alert ${type}`;
        alert.id = id;
        alert.setAttribute('data-type', type);

        const iconMap = {
            success: 'fas fa-check',
            error: 'fas fa-times',
            warning: 'fas fa-exclamation',
            info: 'fas fa-info'
        };

        const titleMap = {
            success: 'Success',
            error: 'Error',
            warning: 'Warning',
            info: 'Information'
        };

        const alertTitle = title || titleMap[type] || 'Notification';
        const icon = iconMap[type] || 'fas fa-bell';

        alert.innerHTML = `
            <div class="alert-header">
                <h4 class="alert-title">
                    <span class="alert-icon ${type}">
                        <i class="${icon}"></i>
                    </span>
                    ${alertTitle}
                </h4>
                <button class="alert-close" onclick="alertManager.removeAlert('${id}')" aria-label="Close alert">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <p class="alert-message">${message}</p>
            ${duration && duration !== 0 ? `
                <div class="alert-progress">
                    <div class="alert-progress-bar ${type}" style="--duration: ${duration}ms;"></div>
                </div>
            ` : ''}
        `;

        // Add pause/resume functionality on hover
        if (duration && duration !== 0) {
            alert.addEventListener('mouseenter', () => {
                alert.classList.add('paused');
            });

            alert.addEventListener('mouseleave', () => {
                alert.classList.remove('paused');
            });
        }

        return alert;
    }

    removeAlert(alertId) {
        const alertIndex = this.activeAlerts.findIndex(alert => alert.id === alertId);
        if (alertIndex === -1) return;

        const alert = this.activeAlerts[alertIndex];
        alert.element.classList.add('removing');

        setTimeout(() => {
            if (alert.element.parentNode) {
                alert.element.parentNode.removeChild(alert.element);
            }
            this.activeAlerts.splice(alertIndex, 1);
        }, 300);
    }

    removeOldestAlert() {
        if (this.activeAlerts.length > 0) {
            const oldestAlert = this.activeAlerts[0];
            this.removeAlert(oldestAlert.id);
        }
    }

    clearAllAlerts() {
        this.activeAlerts.forEach(alert => {
            this.removeAlert(alert.id);
        });
    }

    // Predefined alert methods
    success(message, title = null, duration = null) {
        return this.createAlert('success', message, title, duration);
    }

    error(message, title = null, duration = null) {
        return this.createAlert('error', message, title, duration);
    }

    warning(message, title = null, duration = null) {
        return this.createAlert('warning', message, title, duration);
    }

    info(message, title = null, duration = null) {
        return this.createAlert('info', message, title, duration);
    }
}

// Initialize Alert Manager
const alertManager = new AlertManager();

// Global function for easy access
function createAlert(type, message, title = null, duration = null) {
    return alertManager.createAlert(type, message, title, duration);
}

// Bank-specific alert functions
function showBankAlerts() {
    // Show welcome message on login
    setTimeout(() => {
        alertManager.success(
            "Welcome to Meta.ai Bank! Your digital banking experience starts here.",
            "Welcome Back",
            5000
        );
    }, 1000);

    // Show promotional offers periodically
    setTimeout(() => {
        showRandomOffer();
    }, 8000);

    // Show system notifications
    setTimeout(() => {
        showPendingNotifications();
    }, 12000);
}

function showRandomOffer() {
    const activeOffers = bankOffers.filter(offer => offer.isActive);
    if (activeOffers.length === 0) return;

    const randomOffer = activeOffers[Math.floor(Math.random() * activeOffers.length)];
    const offerTypeMap = {
        'Cashback': 'success',
        'Loan': 'info',
        'Investment': 'info',
        'Credit Card': 'warning',
        'Insurance': 'info',
        'Rewards': 'success'
    };

    alertManager.createAlert(
        offerTypeMap[randomOffer.type] || 'info',
        randomOffer.description,
        `🎉 ${randomOffer.title}`,
        8000
    );
}

function showPendingNotifications() {
    const unreadNotifications = systemNotifications.filter(notif => !notif.isRead);
    
    unreadNotifications.forEach((notification, index) => {
        setTimeout(() => {
            const typeMap = {
                'security': 'error',
                'transaction': 'warning',
                'promotional': 'info',
                'reminder': 'warning',
                'info': 'info'
            };

            const alertType = typeMap[notification.type] || 'info';
            const priority = notification.priority === 'high' ? 0 : 6000; // Persistent for high priority

            alertManager.createAlert(
                alertType,
                notification.message,
                notification.title,
                priority
            );

            // Mark as read
            notification.isRead = true;
        }, index * 2000);
    });
}

function showTransactionAlert(type, amount, recipient) {
    const messages = {
        sent: `Successfully sent ₹${amount} to ${recipient}`,
        received: `Received ₹${amount} from ${recipient}`,
        added: `Successfully added ₹${amount} to your account`
    };

    const alertTypes = {
        sent: 'success',
        received: 'success',
        added: 'success'
    };

    alertManager.createAlert(
        alertTypes[type] || 'info',
        messages[type] || `Transaction completed for ₹${amount}`,
        'Transaction Update',
        4000
    );
}

function showSecurityAlert(message, isHighPriority = false) {
    alertManager.createAlert(
        'error',
        message,
        '🔒 Security Alert',
        isHighPriority ? 0 : 10000 // Persistent for high priority
    );
}

function showOfferAlert(offerId) {
    const offer = bankOffers.find(o => o.id === offerId);
    if (!offer) return;

    const typeMap = {
        'Cashback': 'success',
        'Loan': 'info',
        'Investment': 'info',
        'Credit Card': 'warning',
        'Insurance': 'info',
        'Rewards': 'success'
    };

    alertManager.createAlert(
        typeMap[offer.type] || 'info',
        offer.description,
        `${offer.title}`,
        7000
    );
}

function showLowBalanceAlert(balance) {
    if (balance < 5000) {
        alertManager.createAlert(
            'warning',
            `Your account balance is ₹${balance.toLocaleString()}. Consider adding funds to avoid transaction failures.`,
            '⚠️ Low Balance Alert',
            8000
        );
    }
}

function showMaintenanceAlert() {
    alertManager.createAlert(
        'info',
        'Scheduled maintenance from 2:00 AM to 4:00 AM tomorrow. Some services may be temporarily unavailable.',
        'System Maintenance',
        0 // Persistent
    );
}

// Utility functions
function dismissAlert(alertId) {
    alertManager.removeAlert(alertId);
}

function clearAllAlerts() {
    alertManager.clearAllAlerts();
}

// Export for global access
window.alertManager = alertManager;
window.createAlert = createAlert;
window.showBankAlerts = showBankAlerts;
window.showTransactionAlert = showTransactionAlert;
window.showSecurityAlert = showSecurityAlert;
window.showOfferAlert = showOfferAlert;
window.showLowBalanceAlert = showLowBalanceAlert;
window.showMaintenanceAlert = showMaintenanceAlert;
window.bankOffers = bankOffers;
window.systemNotifications = systemNotifications;

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        console.log('Alert system initialized');
    });
} else {
    console.log('Alert system initialized');
}

// Periodic offer display (every 2 minutes)
setInterval(() => {
    if (typeof userProfile !== 'undefined' && document.getElementById('dashboardPage')?.classList.contains('active')) {
        if (Math.random() > 0.7) { // 30% chance
            showRandomOffer();
        }
    }
}, 120000);

console.log('Meta.ai Bank Alert System loaded successfully');
