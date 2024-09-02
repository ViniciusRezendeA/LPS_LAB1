import React, { useState } from 'react';

import FactCheckIcon from '@mui/icons-material/FactCheck';
import { Box } from '@mui/system';
import PrimarySearchAppBar from '../components/Navbar';
import CustomSidebar, { SidebarItem } from '../components/Sidebar';
interface DashboardLayoutProps {
    children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
    const [openNavBar, setOpenNavBar] = useState<boolean>(false);
    const data = [

        { id: 1, icon: <FactCheckIcon />, label: 'Matricula', location: '/registration' },
        { id: 1, icon: <FactCheckIcon />, label: 'Disciplinas', location: '/disciplines' },
        { id: 1, icon: <FactCheckIcon />, label: 'Materias', location: '/subjects' },
        { id: 1, icon: <FactCheckIcon />, label: 'Cursos', location: '/course' },
        { id: 1, icon: <FactCheckIcon />, label: 'Curriculos', location: '/curriculum' },
        { id: 1, icon: <FactCheckIcon />, label: 'Estudantes', location: '/student' },
        { id: 1, icon: <FactCheckIcon />, label: 'Professores', location: '/teacher' },
    ];

    return (
        <Box sx={{ minHeight: '100svh', display: 'flex', flexDirection: 'column' }}>
            <PrimarySearchAppBar openSideBar={openNavBar} setOpenSideBar={setOpenNavBar} />
            <Box display={'flex'} sx={{ backgroundColor: '#f3f4f6', flexGrow: 1 }}>
                <CustomSidebar openSideBar={openNavBar} setOpenSideBar={setOpenNavBar}>
                    {data.map((item) => (
                        <SidebarItem key={item.id} icon={item.icon} text={item.label} location={item.location} />
                    ))}
                </CustomSidebar>
                <main style={{ width: '100%', margin: '16px' }}>{children}</main>
            </Box>
        </Box>
    );
};
