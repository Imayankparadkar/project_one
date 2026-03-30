export type EventType = "Create" | "Update" | "Delete";
export type ResourceType = "Company" | "Campaign" | "Product" | "Plan" | "Authorized User" | "Discord Server" | "Affiliate" | "App" | "Promo Code" | "Stripe Account";

export type AuditLog = {
    id: string;
    userId: string;
    eventType: EventType;
    resourceType: ResourceType;
    resourceId: string;
    changes: string;
    date: string; // ISO timestamp
};

// Generate some dates relative to a recent time, or just fixed past dates.
const today = new Date();
const subtractDays = (days: number) => {
    const d = new Date(today);
    d.setDate(d.getDate() - days);
    return d.toISOString();
};

export const mockAuditLogs: AuditLog[] = [
    {
        id: "1",
        userId: "usr_001",
        eventType: "Create",
        resourceType: "App",
        resourceId: "app_rewards",
        changes: "None",
        date: subtractDays(11),
    },
    {
        id: "2",
        userId: "usr_001",
        eventType: "Update",
        resourceType: "Product",
        resourceId: "prod_datapulse",
        changes: "Title changed from DataPulse to BBKI Pro Analytics",
        date: subtractDays(11),
    },
    {
        id: "3",
        userId: "usr_001",
        eventType: "Create",
        resourceType: "Campaign",
        resourceId: "cmp_001",
        changes: "None",
        date: subtractDays(12),
    },
    {
        id: "4",
        userId: "usr_002",
        eventType: "Create",
        resourceType: "Campaign",
        resourceId: "cmp_002",
        changes: "None",
        date: subtractDays(15),
    },
    {
        id: "5",
        userId: "usr_001",
        eventType: "Update",
        resourceType: "Campaign",
        resourceId: "cmp_001",
        changes: "Budget increased",
        date: subtractDays(15),
    },
    {
        id: "6",
        userId: "usr_003",
        eventType: "Create",
        resourceType: "Campaign",
        resourceId: "cmp_003",
        changes: "None",
        date: subtractDays(16),
    },
    {
        id: "7",
        userId: "usr_001",
        eventType: "Delete",
        resourceType: "Product",
        resourceId: "prod_old",
        changes: "None",
        date: subtractDays(16),
    },
    {
        id: "8",
        userId: "usr_001",
        eventType: "Create",
        resourceType: "Campaign",
        resourceId: "cmp_004",
        changes: "None",
        date: subtractDays(16),
    },
    {
        id: "9",
        userId: "usr_002",
        eventType: "Create",
        resourceType: "Campaign",
        resourceId: "cmp_005",
        changes: "None",
        date: subtractDays(18),
    },
    {
        id: "10",
        userId: "usr_002",
        eventType: "Update",
        resourceType: "Campaign",
        resourceId: "cmp_005",
        changes: "Category changed",
        date: subtractDays(18),
    },
    {
        id: "11",
        userId: "usr_001",
        eventType: "Create",
        resourceType: "Campaign",
        resourceId: "cmp_001",
        changes: "None",
        date: subtractDays(20),
    },
    {
        id: "12",
        userId: "usr_002",
        eventType: "Create",
        resourceType: "Product",
        resourceId: "prod_004",
        changes: "None",
        date: subtractDays(25),
    },
    {
        id: "13",
        userId: "usr_003",
        eventType: "Create",
        resourceType: "Campaign",
        resourceId: "cmp_003",
        changes: "None",
        date: subtractDays(40),
    },
    {
        id: "14",
        userId: "usr_001",
        eventType: "Create",
        resourceType: "Campaign",
        resourceId: "cmp_001",
        changes: "None",
        date: subtractDays(50),
    },
    {
        id: "15",
        userId: "usr_002",
        eventType: "Create",
        resourceType: "Product",
        resourceId: "prod_005",
        changes: "None",
        date: subtractDays(100),
    }
];
