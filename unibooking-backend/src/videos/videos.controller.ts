import { Controller, Get, Query } from '@nestjs/common';
import { VideosQueryDto } from './dto/videos-query.dto';
import { VideoDto, VideosService } from './videos.service';

@Controller('videos')
export class VideosController {
  constructor(private readonly videosService: VideosService) {}

  // Public -- no auth needed to browse the homepage video grid.
  @Get('latest')
  findLatest(@Query() query: VideosQueryDto): Promise<VideoDto[]> {
    return this.videosService.findLatest(query.limit);
  }
}
