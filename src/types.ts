
export interface Stock {
    ticker: string;
    price: number;
    change: number;
    changePercent: number;
}

export interface Message {
    sender: 'user' | 'ai';
    text: string;
}
