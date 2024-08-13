import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import * as path from 'path';
import { Request, Response } from 'express';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  // Create the NestJS application
  const app = await NestFactory.create(AppModule);

  // Initialize the logger
  const logger = new Logger('Bootstrap');
  logger.log('Application is starting...');

  // Enable CORS
  app.enableCors({
    origin: 'http://localhost:3000', // Adjust to the port your React app is running on
  });

  // Define the build directory path
  const buildPath = path.resolve(__dirname, '..', '..', 'frontend', 'build');

  // Serve static files from the React app's build directory
  app.use(express.static(buildPath));

  // Handle all other routes by serving the React app's index.html
  app.use((req: Request, res: Response, next) => {
    next();
  });

  // Start the application
  const port = 3001; // Or another port if needed
  await app.listen(port);
  logger.log(`Application is listening on port ${port}`);
}

bootstrap();
