export class ChatDto {
  room: 'world';
  text: string;
  timestamp: number;
  from: {
    id: string;
    nickname: string;
  };
}
