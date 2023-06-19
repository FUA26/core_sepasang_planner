import { User } from 'src/modules/user/entities/user.entity';

export class ResponseDto {
  accessToken: string;
  user: User;
}
