import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { UserService } from './user.service';
import { PrismaService } from './prisma.service';
import { ConfigModule } from '@nestjs/config';

describe('AppController', () => {
  let app: TestingModule;
  const userService = {
    users: jest.fn(() => [{ email: 'test@example.com' }]),
  };

  beforeAll(async () => {
    app = await Test.createTestingModule({
      imports: [ConfigModule.forRoot()],
      controllers: [AppController],
      providers: [PrismaService, UserService],
    })
      .overrideProvider(UserService)
      .useValue(userService)
      .compile();
  });

  describe('getHello', () => {
    it('should return "Hello World!"', async () => {
      const appController = app.get(AppController);
      expect(await appController.getHello()).toBe(
        `Hello ${userService.users()[0].email}!`,
      );
    });
  });
});
