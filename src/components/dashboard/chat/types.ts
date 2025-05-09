
export interface ChatMessage {
  isUser: boolean;
  text: string;
  gif?: string;
  timestamp: number;
}

export interface AIChatProps {
  courseAvatar: string;
  userName: string;
}

export interface Progress {
  completed: number;
  total: number;
  percentage: number;
}
