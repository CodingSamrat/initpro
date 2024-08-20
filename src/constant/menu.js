import { Icons } from "./icon";

export const RootMenu = [
    {
        title: 'Home',
        pathName: '/',
        icon: Icons.home,
        hidden: false
    },
    {
        title: 'About',
        pathName: '/about',
        icon: Icons.about,
        hidden: false
    },
    {
        title: 'Contact',
        pathName: '/contact',
        icon: Icons.contact,
        hidden: false
    },
]



// Used for Admin Panel
export const AdminMenu = [
    {
        title: 'Dashboard',
        pathName: '/admin/dashboard',
        icon: Icons.admin,
        hidden: false
    },
]