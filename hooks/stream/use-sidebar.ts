import {create} from "zustand"

interface SidebarStore {
    collapsed: boolean;
    hideAll: boolean;
    onExpand: () => void
    onCollapsed: () => void;
    onHide: () => void;
    onShow: () => void
}

export const useSidebar = create<SidebarStore>((set) =>({
    collapsed: false,
    hideAll: false,
    onExpand: () => set(() => ({collapsed: false})),
    onCollapsed: () => set(() => ({collapsed: true})),
    onHide: () => set(() => ({hideAll: true})),
    onShow: () => set(() => ({collapsed: true, hideAll:false})),
}))
