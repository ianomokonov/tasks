import { Controller, Get, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { path as rootPath } from 'app-root-path';
import * as path from 'path';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getClient(@Res() res) {
    console.log(rootPath);

    res.sendFile('index.html', { root: path.join(rootPath, 'client') });
  }
}
