import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Get,
  Res,
} from '@nestjs/common';
import { UploadService } from './upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { resolve } from 'path';
import { Response } from 'express';
import { zip } from 'compressing';
@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {
    this.uploadService = uploadService;
  }

  @Post('album')
  @UseInterceptors(FileInterceptor('file'))
  upload(@UploadedFile() file) {
    return this.uploadService.create(file);
  }

  @Get('export')
  export(@Res() res: Response) {
    const url = resolve(
      process.cwd(),
      './upload/610b72411f35e9156e35bbb2a5fd5ac10b.png',
    );
    res.download(url);
  }

  @Get('stream')
  async stream(@Res() res: Response) {
    const tarStream = new zip.Stream();
    tarStream.addEntry(
      resolve(process.cwd(), './upload/610b72411f35e9156e35bbb2a5fd5ac10b.png'),
      {
        relativePath: '610b72411f35e9156e35bbb2a5fd5ac10b.png',
      },
    );
    res.setHeader('Content-Type', 'application/octet-stream');
    res.setHeader(
      'Content-Disposition',
      'attachment; filename=610b72411f35e9156e35bbb2a5fd5ac10b.zip',
    );
    tarStream.pipe(res);
  }
}
