import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class SecretKeyGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const secretKey = request.headers['secret-key'];

    if (secretKey !== process.env.SECRET_KEY) {
      throw new UnauthorizedException(
        'Unauthorized, secret key does not match',
      );
    } else {
      return true;
    }
  }
}
