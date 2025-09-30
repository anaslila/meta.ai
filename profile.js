// User Profile Data for Meta.ai Bank
// This file contains all user account information and authentication details

const userProfile = {
    // Authentication Details
    loginId: "anaslila",
    password: "MdAnasLila@989230",
    
    // Personal Information
    accountHolderName: "Anas Hanif Lila",
    mobileNumber: "+91 98923 01965",
    profilePhoto: "https://media.licdn.com/dms/image/v2/D4D03AQHdREF9JrFrDA/profile-displayphoto-shrink_400_400/B4DZbyq1D5GYAo-/0/1747828036502?e=1762387200&v=beta&t=HcEiIw4qFPaZ-D6RUogA-u3Iu9bjW-2MAF2oW6990O8",
    
    // Account Details
    accountNumber: "3847592016834759",
    ifscCode: "METAI0001426",
    branchName: "Jogeshwari West Branch",
    accountType: "Premium Savings Account",
    accountCreated: "2023-01-15T10:30:00Z",
    
    // Card Information
    debitCardNumber: "4532 1234 5678 9012",
    debitCardType: "Visa Platinum",
    debitCardExpiry: "12/28",
    debitCardCvv: "123", // Note: In real apps, this should never be stored
    
    creditCardNumber: "5155 4004 3113 2020",
    creditCardType: "Mastercard Gold",
    creditCardExpiry: "06/27",
    creditCardCvv: "456", // Note: In real apps, this should never be stored
    creditLimit: 500000,
    
    // Additional Profile Information
    dateOfBirth: "2001-04-18",
    email: "lilaanas6@egmail.com",
    address: {
        street: "F-11, Memon Colony",
        area: "Jogeshwari West",
        city: "Mumbai",
        state: "Maharashtra",
        pincode: "400102",
        country: "India"
    },
    
    // Employment Details
    occupation: "Assistant Manager",
    employer: "ANAROCK Property Private Limited",
    monthlyIncome: 85000,
    
    // Account Settings
    transactionLimit: {
        daily: 100000,
        monthly: 1000000
    },
    
    // Notification Preferences
    notifications: {
        sms: true,
        email: true,
        push: true,
        transactionAlerts: true,
        offerUpdates: true
    },
    
    // Security Settings
    twoFactorAuth: true,
    biometricAuth: true,
    lastLogin: new Date().toISOString(),
    
    // KYC Status
    kycStatus: "Verified",
    kycDocuments: {
        aadhar: "****-****-9818",
        pan: "BAEP****G",
        passport: "Z12****89"
    },
    
    // Banking Preferences
    preferredLanguage: "English",
    currency: "INR",
    statementFrequency: "Monthly"
};

// Alternative User Profiles for Testing (Optional)
const testProfiles = {
    // Test Profile 1
    demo1: {
        loginId: "demo123",
        password: "demo123",
        accountHolderName: "Demo User",
        mobileNumber: "+91 87654 32109",
        accountNumber: "1234567890123456",
        ifscCode: "METAI0001002",
        branchName: "Delhi Main Branch",
        accountType: "Basic Savings Account",
        accountCreated: "2023-06-10T14:20:00Z",
        debitCardNumber: "4532 9876 5432 1098",
        debitCardType: "Visa Classic",
        creditCardNumber: "5555 1111 2222 3333",
        creditCardType: "Mastercard Silver",
        profilePhoto: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    },
    
    // Test Profile 2
    demo2: {
        loginId: "testuser",
        password: "test@456",
        accountHolderName: "Priya Singh",
        mobileNumber: "+91 76543 21098",
        accountNumber: "9876543210987654",
        ifscCode: "METAI0001003",
        branchName: "Bangalore Tech Park Branch",
        accountType: "Salary Account",
        accountCreated: "2023-09-05T09:15:00Z",
        debitCardNumber: "4532 5555 6666 7777",
        debitCardType: "Visa Gold",
        creditCardNumber: "5555 8888 9999 0000",
        creditCardType: "Mastercard Platinum",
        profilePhoto: "https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=150&h=150&fit=crop&crop=face"
    }
};

// Account Balance History (for analytics)
const balanceHistory = [
    { date: "2024-09-01", balance: 45000.00 },
    { date: "2024-09-05", balance: 52000.00 },
    { date: "2024-09-10", balance: 48500.00 },
    { date: "2024-09-15", balance: 51200.00 },
    { date: "2024-09-20", balance: 49800.00 },
    { date: "2024-09-25", balance: 54800.00 },
    { date: "2024-09-30", balance: 50000.00 }
];

// Beneficiaries List (for quick transfers)
const savedBeneficiaries = [
    {
        id: "BEN001",
        name: "Amit Patel",
        accountNumber: "1111222233334444",
        ifscCode: "HDFC0001234",
        bankName: "HDFC Bank",
        relation: "Friend",
        verified: true,
        addedDate: "2023-02-15"
    },
    {
        id: "BEN002",
        name: "Sunita Sharma",
        accountNumber: "5555666677778888",
        ifscCode: "ICIC0005678",
        bankName: "ICICI Bank",
        relation: "Family",
        verified: true,
        addedDate: "2023-03-10"
    },
    {
        id: "BEN003",
        name: "Tech Solutions Ltd",
        accountNumber: "9999888877776666",
        ifscCode: "AXIS0009876",
        bankName: "Axis Bank",
        relation: "Business",
        verified: true,
        addedDate: "2023-01-20"
    }
];

// UPI IDs for quick payments
const savedUPIIds = [
    {
        id: "UPI001",
        upiId: "amit.patel@paytm",
        name: "Amit Patel",
        verified: true,
        lastUsed: "2024-09-28"
    },
    {
        id: "UPI002",
        upiId: "sunita@phonepe",
        name: "Sunita Sharma", 
        verified: true,
        lastUsed: "2024-09-25"
    },
    {
        id: "UPI003",
        upiId: "9876543210@ybl",
        name: "Delivery Partner",
        verified: false,
        lastUsed: "2024-09-20"
    }
];

// Investment Portfolio (if applicable)
const investmentPortfolio = {
    mutualFunds: [
        {
            fundName: "Meta Growth Fund",
            units: 150.25,
            currentValue: 45075.50,
            investedAmount: 40000.00,
            returns: 5075.50,
            returnPercentage: 12.69
        },
        {
            fundName: "Meta Balanced Fund",
            units: 200.75,
            currentValue: 25093.75,
            investedAmount: 25000.00,
            returns: 93.75,
            returnPercentage: 0.38
        }
    ],
    
    fixedDeposits: [
        {
            fdNumber: "FD123456789",
            principalAmount: 100000.00,
            interestRate: 6.5,
            maturityDate: "2025-03-15",
            currentValue: 106500.00,
            tenure: 12 // months
        },
        {
            fdNumber: "FD987654321",
            principalAmount: 50000.00,
            interestRate: 7.0,
            maturityDate: "2024-12-20",
            currentValue: 51750.00,
            tenure: 6 // months
        }
    ],
    
    totalInvestmentValue: 227919.25,
    totalInvestmentAmount: 215000.00,
    totalReturns: 12919.25,
    overallReturnPercentage: 6.01
};

// Loan Information (if applicable)
const loanDetails = {
    personalLoan: {
        loanNumber: "PL2023001234",
        principalAmount: 300000.00,
        outstandingAmount: 180000.00,
        interestRate: 11.5,
        emi: 8547.00,
        tenure: 36, // months
        remainingTenure: 21, // months
        nextEmiDate: "2024-10-05",
        loanStatus: "Active"
    },
    
    creditCardDues: {
        totalDue: 25000.00,
        minimumDue: 2500.00,
        dueDate: "2024-10-15",
        availableLimit: 475000.00,
        cashAdvanceLimit: 100000.00
    }
};

// Account Activity Summary
const accountSummary = {
    currentMonth: {
        totalCredits: 95000.00,
        totalDebits: 32000.00,
        transactionCount: 18,
        largestTransaction: 25000.00,
        averageTransactionAmount: 3555.56
    },
    
    lastMonth: {
        totalCredits: 88000.00,
        totalDebits: 45000.00,
        transactionCount: 24,
        largestTransaction: 15000.00,
        averageTransactionAmount: 2708.33
    },
    
    yearToDate: {
        totalCredits: 1050000.00,
        totalDebits: 425000.00,
        transactionCount: 156,
        averageMonthlyBalance: 52500.00
    }
};

// Reward Points and Cashback
const rewardsInfo = {
    totalRewardPoints: 15420,
    cashbackEarned: 2340.50,
    
    recentRewards: [
        {
            date: "2024-09-28",
            description: "UPI Transaction Cashback",
            points: 25,
            cashback: 12.50
        },
        {
            date: "2024-09-25",
            description: "Online Shopping Bonus",
            points: 150,
            cashback: 75.00
        },
        {
            date: "2024-09-20",
            description: "Bill Payment Reward",
            points: 50,
            cashback: 25.00
        }
    ],
    
    redemptionOptions: [
        {
            option: "Cash Credit",
            minimumPoints: 1000,
            conversionRate: 0.25 // points to rupees
        },
        {
            option: "Shopping Vouchers",
            minimumPoints: 2000,
            conversionRate: 0.30
        },
        {
            option: "Flight Miles",
            minimumPoints: 5000,
            conversionRate: 0.50
        }
    ]
};

// Export profile data for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    // Node.js environment
    module.exports = {
        userProfile,
        testProfiles,
        balanceHistory,
        savedBeneficiaries,
        savedUPIIds,
        investmentPortfolio,
        loanDetails,
        accountSummary,
        rewardsInfo
    };
} else {
    // Browser environment - make available globally
    window.userProfile = userProfile;
    window.testProfiles = testProfiles;
    window.balanceHistory = balanceHistory;
    window.savedBeneficiaries = savedBeneficiaries;
    window.savedUPIIds = savedUPIIds;
    window.investmentPortfolio = investmentPortfolio;
    window.loanDetails = loanDetails;
    window.accountSummary = accountSummary;
    window.rewardsInfo = rewardsInfo;
}

// Utility Functions for Profile Management
const ProfileUtils = {
    // Get masked account number
    getMaskedAccountNumber: function() {
        return '****' + userProfile.accountNumber.slice(-4);
    },
    
    // Get masked card numbers
    getMaskedDebitCard: function() {
        return '****-****-****-' + userProfile.debitCardNumber.slice(-4);
    },
    
    getMaskedCreditCard: function() {
        return '****-****-****-' + userProfile.creditCardNumber.slice(-4);
    },
    
    // Get formatted mobile number
    getFormattedMobile: function() {
        const mobile = userProfile.mobileNumber.replace(/\D/g, '');
        return `+91 ${mobile.slice(-10, -5)} ${mobile.slice(-5)}`;
    },
    
    // Get full address
    getFullAddress: function() {
        const addr = userProfile.address;
        return `${addr.street}, ${addr.area}, ${addr.city}, ${addr.state} - ${addr.pincode}`;
    },
    
    // Calculate account age
    getAccountAge: function() {
        const created = new Date(userProfile.accountCreated);
        const now = new Date();
        const diffTime = Math.abs(now - created);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        const years = Math.floor(diffDays / 365);
        const months = Math.floor((diffDays % 365) / 30);
        
        if (years > 0) {
            return `${years} year${years > 1 ? 's' : ''} ${months} month${months > 1 ? 's' : ''}`;
        } else {
            return `${months} month${months > 1 ? 's' : ''}`;
        }
    },
    
    // Validate login credentials
    validateCredentials: function(loginId, password) {
        return loginId === userProfile.loginId && password === userProfile.password;
    },
    
    // Check if user can switch to test profile
    switchToTestProfile: function(profileKey) {
        if (testProfiles[profileKey]) {
            // Merge test profile with main structure
            Object.assign(userProfile, testProfiles[profileKey]);
            return true;
        }
        return false;
    },
    
    // Get user's investment summary
    getInvestmentSummary: function() {
        return {
            totalValue: investmentPortfolio.totalInvestmentValue,
            totalReturns: investmentPortfolio.totalReturns,
            returnPercentage: investmentPortfolio.overallReturnPercentage
        };
    },
    
    // Get loan summary
    getLoanSummary: function() {
        let totalOutstanding = 0;
        let totalEMI = 0;
        
        if (loanDetails.personalLoan.loanStatus === 'Active') {
            totalOutstanding += loanDetails.personalLoan.outstandingAmount;
            totalEMI += loanDetails.personalLoan.emi;
        }
        
        totalOutstanding += loanDetails.creditCardDues.totalDue;
        
        return {
            totalOutstanding,
            totalEMI,
            nextDueDate: loanDetails.personalLoan.nextEmiDate
        };
    }
};

// Make utility functions available globally
if (typeof window !== 'undefined') {
    window.ProfileUtils = ProfileUtils;
}

// Initialize profile on load
console.log('Profile data loaded for:', userProfile.accountHolderName);
console.log('Account created:', ProfileUtils.getAccountAge(), 'ago');
