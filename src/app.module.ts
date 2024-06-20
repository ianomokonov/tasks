import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TasksModule } from './tasks/tasks.module';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { path as rootPath } from 'app-root-path';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/tasksdb'),
    TasksModule,
    ServeStaticModule.forRoot({
      rootPath: join(rootPath, 'client', 'dist'),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
