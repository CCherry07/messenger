import { Injectable } from '@nestjs/common';
import { UpdateUploadDto } from './dto/update-upload.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Upload } from './entities/upload.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UploadService {
  constructor(
    @InjectRepository(Upload) private uploadRepository: Repository<Upload>,
  ) {
    this.uploadRepository = uploadRepository;
  }
  async create(file: Express.Multer.File) {
    return await this.uploadRepository.save({
      name: file.originalname,
      type: file.mimetype,
      size: file.size,
      path: file.path,
      url: `http://localhost:3000/upload/${file.filename}`,
    });
  }

  findAll() {
    return `This action returns all upload`;
  }

  findOne(id: number) {
    return `This action returns a #${id} upload`;
  }

  update(id: number, updateUploadDto: UpdateUploadDto) {
    return `This action updates a #${id} upload`;
  }

  remove(id: number) {
    return `This action removes a #${id} upload`;
  }
}
