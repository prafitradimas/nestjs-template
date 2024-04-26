import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as bodyParser from 'body-parser';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { PublicModule } from './modules/public/public.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const host: string = process.env.APP_HOST ?? '0.0.0.0';
  const port: number = process.env.APP_PORT ?? 3000;
  const appName: string = process.env.APP_NAME ?? '';

  app.enableCors();
  app.use(helmet());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  const publicApi = new DocumentBuilder()
    .setTitle(`${appName} Public`)
    .setDescription('')
    .setVersion('0.1')
    .build();

  const publicApiSwagger = SwaggerModule.createDocument(app, publicApi, {
    deepScanRoutes: true,
    include: [PublicModule],
  });

  SwaggerModule.setup('docs/public', app, publicApiSwagger, {
    swaggerOptions: {
      tagsSorter: 'alpha',
    },
  });

  await app.listen(port, host, () =>
    console.log(`Application running on ${host}:${port}`),
  );
}
bootstrap();
