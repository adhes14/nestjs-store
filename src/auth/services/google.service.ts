import { Injectable, NotFoundException } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class GoogleService {
  googleLogin(req: Request) {
    if (!req.user) throw new NotFoundException('No user from google');
    return {
      message: 'User information from google',
      user: req.user,
    };
  }
}
