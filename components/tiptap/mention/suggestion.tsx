import axios from "axios";
import { ReactRenderer } from "@tiptap/react";
import tippy, { Instance } from "tippy.js";
import { Editor } from "@tiptap/core";
import MentionList from "./MentionList";
import { useParams } from "next/navigation";
import "./MentionList.scss";
import { User } from "@prisma/client";

interface MentionPluginProps {
  editor: Editor;
  query: string;
  clientRect?: DOMRect;
  event?: React.KeyboardEvent;
}

interface PluginReturnType {
  onStart?: (props: MentionPluginProps) => void;
  onUpdate?: (props: MentionPluginProps) => void;
  onKeyDown?: (props: MentionPluginProps) => boolean | undefined;
  onExit?: () => void;
  // Add more properties as needed
}

const getReferenceClientRect = (clientRect: DOMRect): (() => DOMRect) => {
  return () => clientRect;
};

const MentionPlugin = () => {
  const params = useParams(); // Move this inside a component
  // Hàm này sẽ lấy danh sách email từ API
  const fetchEmails = async (): Promise<string[]> => {
    try {
      const response = await axios.get(`/api/${params.storeId}/managestaff`);
      return response.data.map((staff: User) => staff.email); // Giả sử email được lấy từ trường 'email' của dữ liệu
    } catch (error) {
      console.error("Error fetching emails:", error);
      return [];
    }
  };

  const mentionPlugin = {
    items: async ({ query }: MentionPluginProps) => {
      // Lấy danh sách email từ API
      const emails = await fetchEmails();
      // Lọc và trả về các email khớp với query
      return emails
        .filter((email) => email.toLowerCase().startsWith(query.toLowerCase()))
        .slice(0, 5);
    },

    render: () => {
      let component: ReactRenderer | null = null;
      let popup: Instance | null = null;

      return {
        onStart: (props: MentionPluginProps) => {
          component = new ReactRenderer(MentionList, {
            props,
            editor: props.editor,
          });

          if (!props.clientRect) {
            return;
          }

          // Thêm lớp overlay
          const overlay = document.createElement("div");
          overlay.classList.add("overlay");
          document.body.appendChild(overlay);

          popup = tippy(document.body, {
            appendTo: () => document.body,
            content: component.element,
            showOnCreate: true,
            followCursor: "initial", // Disable followCursor
            interactive: true,
            trigger: "manual",
            placement: "bottom-start",
            animation: "shift-away",
            onShow(instance) {
              instance.popper.style.willChange = "transform"; // Apply GPU acceleration
            },
            onHide() {
              overlay.style.display = "none"; // Ẩn lớp overlay khi popup bị ẩn
            },
            popperOptions: {
              strategy: "fixed",
              modifiers: [
                {
                  name: "flip",
                  options: {
                    fallbackPlacements: ["bottom", "right"],
                  },
                },
                {
                  name: "preventOverflow",
                  options: {
                    altAxis: true,
                    tether: false,
                  },
                },
              ],
            },
          });
        },

        onUpdate: (props: MentionPluginProps) => {
          if (!component) return;
          component.updateProps(props);

          if (!props.clientRect || !popup) {
            return;
          }

          popup.setProps({
            getReferenceClientRect: getReferenceClientRect(props.clientRect),
          });
        },

        onKeyDown: (props: MentionPluginProps) => {
          if (props.event?.key === "Escape" && popup) {
            popup.hide();
            return true;
          }

          return (component?.ref as { onKeyDown: (props: MentionPluginProps) => boolean }).onKeyDown(props)
        },

        onExit: () => {
          if (popup) popup.destroy();
          if (component) component.destroy();
        },
      } as Record<string,PluginReturnType>;
    },
  };

  return mentionPlugin;
};

export default MentionPlugin;
