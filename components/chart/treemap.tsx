import { UserRole } from "@prisma/client";
import { ResponsiveContainer, Treemap as TreeMapChart, Tooltip } from "recharts";
import { Skeleton } from "../ui/skeleton";
import { format } from "date-fns";

interface User {
    name: string;
    email: string;
    createdAt: Date; // Thêm createdAt vào giao diện User
}

interface RoleData {
    role: UserRole;
    user: User[];
}

interface TreeMapProps {
    data: RoleData[];
    loading: boolean;
}

const sizeMapping: { [key in UserRole]: number } = {
    USER: 100,
    STAFF: 220,
    GUEST: 120,
    ADMIN: 300,
    SHIPPER: 150,
    MARKETING: 250,
};

// Tạo một hệ số để điều chỉnh kích thước của user
const userSizeFactor = 0.2; // Kích thước của user sẽ là 20% của kích thước role

const TreeMap = ({ data, loading }: TreeMapProps) => {
    if (loading) {
        return (
            <ResponsiveContainer width="100%" height={350}>
                <div className="flex justify-center h-full">
                    <Skeleton className="h-[350px] w-full max-w-5xl rounded-md" />
                </div>
            </ResponsiveContainer>
        );
    }
    
    if (!data) {
        return (
            <div className="w-full h-[350px] flex items-center justify-center">
                <span className="text-center">Please select date to find data...</span>
            </div>
        );
    }

    const treemapData = data?.map(roleData => {
        const roleSize = sizeMapping[roleData.role];

        return {
            name: roleData.role,
            children: roleData.user.map(user => ({
                name: user.name,
                email: user.email, // Thêm email vào data
                createdAt: user.createdAt, // Thêm createdAt vào data
                role: roleData.role, // Thêm role vào data
                size: roleSize * userSizeFactor, // Kích thước của user sẽ nhỏ hơn kích thước của role
                fill: '#8884d8', // Màu sắc của user
            })),
        };
    });

    // Tooltip content
    const renderTooltip = (props: any) => {
        const { payload, label } = props;
        if (!payload || payload.length === 0) return null;

        const { name, email, role, createdAt } = payload[0].payload;

        return (
            <div style={{ backgroundColor: '#fff', padding: '10px', border: '1px solid #ccc' }}>
                <p><strong>Name:</strong> {name}</p>
                <p><strong>Email:</strong> {email}</p>
                <p><strong>Role:</strong> {role}</p>
                <p><strong>Created At:</strong> {createdAt ? format(new Date(createdAt), "E '-' dd/MM/yyyy '-' HH:mm:ss a") : 'N/A'}</p>
            </div>
        );
    };

    return (
        <ResponsiveContainer width="100%" height={350}>
            <TreeMapChart
                width={730}
                height={250}
                data={treemapData}
                dataKey="size"
                aspectRatio={4 / 3}
                stroke="#fff"
                fill="#8884d8"
            >
                <Tooltip content={renderTooltip} />
            </TreeMapChart>
        </ResponsiveContainer>
    );
};

export default TreeMap;
