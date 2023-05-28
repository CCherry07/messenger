export class CreateConversationDto {
  userId: number;
  isGroup?: boolean;
  members?: number[];
  name?: string;
}
