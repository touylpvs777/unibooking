import { Injectable } from '@nestjs/common';
import { Video } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

export interface VideoDto {
  id: string;
  title: string;
  thumbnailUrl: string | null;
  youtubeId: string | null;
  duration: string;
  start: number;
  end: number;
  createdAt: Date;
}

function toVideoDto(video: Video): VideoDto {
  return {
    id: video.id,
    title: video.title,
    thumbnailUrl: video.thumbnailUrl,
    youtubeId: video.youtubeId,
    duration: video.durationLabel,
    start: video.startSeconds,
    end: video.endSeconds,
    createdAt: video.createdAt,
  };
}

@Injectable()
export class VideosService {
  constructor(private readonly prisma: PrismaService) {}

  // Public -- powers the "Our Latest Videos" grid on the homepage.
  async findLatest(limit: number): Promise<VideoDto[]> {
    const videos = await this.prisma.video.findMany({
      orderBy: { createdAt: 'desc' },
      take: limit,
    });

    return videos.map(toVideoDto);
  }
}
