
import { ClientOptions } from "@nestjs/microservices";

export const userServiceClient: ClientOptions = {
  transport: 5,
  options: {
    urls: [`amqp://user:password@rabbitmq:5672`],
    queue: 'USER_QUEUE',
  },
};