import {dashboard, expenses, Investor, transactions, trend} from '../utils/Icons'

// export const menuItems = [
//     {
//         id: 1,
//         title: 'Dashboard',
//         icon: dashboard,
//         link: '/dashboard'
//     },
//     {
//         id: 2,
//         title: "View Transactions",
//         icon: transactions,
//         link: "/dashboard",
//     },
//     {
//         id: 3,
//         title: "Incomes",
//         icon: trend,
//         link: "/dashboard",
//     },
//     {
//         id: 4,
//         title: "Expenses",
//         icon: expenses,
//         link: "/dashboard",
//     },
// ]

export const menuItems = [
    {
        id: 1,
        title: 'Dashboard',
        icon: dashboard,
        link: '/dashboard'
    },
    {
        id: 2,
        title: "Incomes",
        icon: trend,
        link: "/dashboard",
    },
    {
        id: 3,
        title: "Expenses",
        icon: expenses,
        link: "/dashboard",
    },
    {
        id: 4,
        title: "Financial Proposals",
        icon: Investor,
        link: "/dashboard",
    },
    {
        id: 5,
        title: "Summary",
        icon: transactions,
        link: "/dashboard",
    },
]