export declare function OrderPlacedEmail({ companyName, customerName, planName, billingCycle, price, paymentStatus, orderDate, renewalDate, orderPlacedBy, mailReply, productName, orderType, }: {
    companyName: string;
    customerName: string;
    planName: string;
    billingCycle: string;
    price: number;
    paymentStatus: string;
    orderDate: string;
    renewalDate: string;
    orderPlacedBy: string;
    mailReply: string;
    productName: string;
    orderType?: "Created" | "Updated" | "Placed";
}): any;
