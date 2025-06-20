import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// Date utilities
export const formatDate = (dateString, options = {}) => {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    const { format = 'short', includeYear = true } = options;
    
    const monthNames = {
        short: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        long: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    };
    
    const month = monthNames[format] ? monthNames[format][date.getMonth()] : monthNames.short[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    
    return includeYear ? `${month} ${day}, ${year}` : `${month} ${day}`;
};

export const calculateDateDifference = (startDate, endDate, unit = 'days') => {
    if (!startDate || !endDate) return 0;
    
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    
    const conversions = {
        days: 1000 * 60 * 60 * 24,
        hours: 1000 * 60 * 60,
        minutes: 1000 * 60,
        seconds: 1000
    };
    
    return Math.ceil(diffTime / (conversions[unit] || conversions.days));
};

export const calculateTimeProgress = (startDate, endDate, currentDate = new Date()) => {
    if (!startDate || !endDate) return 0;
    
    const start = new Date(startDate);
    const end = new Date(endDate);
    const current = new Date(currentDate);
    
    if (current < start) return 0;
    if (current > end) return 100;
    
    const total = end - start;
    const elapsed = current - start;
    return Math.round((elapsed / total) * 100);
};

// Status utilities
export const getStatusStyle = (status, type = 'badge') => {
    const statusConfig = {
        active: { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200' },
        pending: { bg: 'bg-yellow-50', text: 'text-yellow-700', border: 'border-yellow-200' },
        completed: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' },
        draft: { bg: 'bg-gray-50', text: 'text-gray-700', border: 'border-gray-200' },
        cancelled: { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200' },
        paused: { bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-200' }
    };
    
    const config = statusConfig[status] || statusConfig.draft;
    
    if (type === 'badge') {
        return `${config.bg} ${config.text}`;
    }
    
    return config;
};

// Number utilities
export const formatCurrency = (amount, currency = 'USD', options = {}) => {
    if (amount === null || amount === undefined) return '$0';
    
    const { minimumFractionDigits = 0, maximumFractionDigits = 2 } = options;
    
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency,
        minimumFractionDigits,
        maximumFractionDigits
    }).format(amount);
};

export const formatNumber = (number, options = {}) => {
    if (number === null || number === undefined) return '0';
    
    const { compact = false, precision = 0 } = options;
    
    if (compact) {
        return new Intl.NumberFormat('en-US', {
            notation: 'compact',
            maximumFractionDigits: precision
        }).format(number);
    }
    
    return new Intl.NumberFormat('en-US', {
        maximumFractionDigits: precision
    }).format(number);
};

export const calculatePercentage = (value, total, options = {}) => {
    if (!total || total === 0) return 0;
    
    const { precision = 0, clamp = true } = options;
    const percentage = (value / total) * 100;
    
    if (clamp) {
        return Math.max(0, Math.min(100, Math.round(percentage * Math.pow(10, precision)) / Math.pow(10, precision)));
    }
    
    return Math.round(percentage * Math.pow(10, precision)) / Math.pow(10, precision);
};

// Text utilities
export const truncateText = (text, maxLength = 100, suffix = '...') => {
    if (!text || text.length <= maxLength) return text || '';
    return text.substring(0, maxLength).trim() + suffix;
};

export const capitalizeFirst = (text) => {
    if (!text) return '';
    return text.charAt(0).toUpperCase() + text.slice(1);
};

export const slugify = (text) => {
    if (!text) return '';
    return text
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');
};

// Array utilities
export const groupBy = (array, key) => {
    return array.reduce((groups, item) => {
        const group = typeof key === 'function' ? key(item) : item[key];
        groups[group] = groups[group] || [];
        groups[group].push(item);
        return groups;
    }, {});
};

export const sortBy = (array, key, direction = 'asc') => {
    return [...array].sort((a, b) => {
        const aVal = typeof key === 'function' ? key(a) : a[key];
        const bVal = typeof key === 'function' ? key(b) : b[key];
        
        if (aVal < bVal) return direction === 'asc' ? -1 : 1;
        if (aVal > bVal) return direction === 'asc' ? 1 : -1;
        return 0;
    });
};

// Validation utilities
export const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export const isValidUrl = (url) => {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
};

// Object utilities
export const deepClone = (obj) => {
    return JSON.parse(JSON.stringify(obj));
};

export const isEmpty = (value) => {
    if (value === null || value === undefined) return true;
    if (typeof value === 'string') return value.trim().length === 0;
    if (Array.isArray(value)) return value.length === 0;
    if (typeof value === 'object') return Object.keys(value).length === 0;
    return false;
};
