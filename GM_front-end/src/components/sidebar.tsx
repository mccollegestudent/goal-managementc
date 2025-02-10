import { ProSidebar, Menu, MenuItem, SidebarHeader, SidebarContent, SidebarFooter} from 'react-pro-sidebar';
import "@/styles/custom.scss"
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import { IconButton, Typography } from '@mui/material';
import AdsClickRoundedIcon from '@mui/icons-material/AdsClickRounded';
import { useState } from 'react';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import {useRouter} from '@tanstack/react-router'
import { useQueryClient } from '@tanstack/react-query';

export function SideBar(){
    const [isCollapsed, setIsCollapsed] = useState(false);
    const router = useRouter();
    const queryClient = useQueryClient();
    const handleLogout = () => {
        localStorage.removeItem("jwtToken"); 
        queryClient.invalidateQueries();
        router.navigate({ to: "/home" }); 
      };
    return <>
    <div className='min-h-screen not-sr-only'>
        <ProSidebar collapsed={isCollapsed}>
            <SidebarHeader>
                <div className="flex items-center justify-between p-5" >
                    {!isCollapsed && <Typography variant="h6">AIMZY</Typography>}
                    <IconButton color='default' onClick={() => setIsCollapsed(!isCollapsed)}><MenuRoundedIcon /></IconButton>
                </div>
            </SidebarHeader>
            <SidebarContent className='mt-5'>
                <Menu iconShape="circle">
                    <div className='mt-3'>
                        <MenuItem icon={<DashboardOutlinedIcon />} onClick={()=> router.navigate({ to: "/dashboard" })} >Dashboard</MenuItem>   
                    </div>
                    <div className="mt-3">
                        <MenuItem icon={<AdsClickRoundedIcon />} onClick={()=> router.navigate({ to: "/goals" })}>Goals</MenuItem>
                    </div>
                    <div className="mt-3">
                        <MenuItem icon={<CalendarMonthOutlinedIcon />} onClick={()=> router.navigate({ to: "/calendar" })}>Calendar</MenuItem>
                    </div>
                </Menu>
            </SidebarContent>
            <SidebarFooter>
                <Menu iconShape='circle'>
                    <MenuItem icon={<LogoutOutlinedIcon />} onClick={handleLogout}>LogOut</MenuItem>
                </Menu>
            </SidebarFooter>
        </ProSidebar>
    </div>
    </>
}