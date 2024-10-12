import {create} from "zustand"

interface CreatorSidebarStore {
    collapsed: boolean;
    hideAll: boolean;
    onExpand: () => void
    onCollapsed: () => void;
    onHide: () => void;
    onShow: () => void
}

export const useCreatorSidebar = create<CreatorSidebarStore>((set) =>({
    collapsed: false,
    hideAll: false,
    onExpand: () => set(() => ({collapsed: false})),
    onCollapsed: () => set(() => ({collapsed: true})),
    onHide: () => set(() => ({hideAll: true})),
    onShow: () => set(() => ({collapsed: true, hideAll:false})),
}))
