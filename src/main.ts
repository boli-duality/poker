import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { TransformInterceptor } from './interceptors/transform/transform.interceptor';
import { HttpExceptionFilter } from './filters/http-exception/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  // app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(3000);
}
bootstrap();
