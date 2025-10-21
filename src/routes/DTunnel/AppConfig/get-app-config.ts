import { z } from 'zod';
import { AppConfigSelect } from './zod-schema';
import prisma from '../../../config/prisma-client';
import Authentication from '../../../middlewares/authentication';
import { AppConfigParser } from '../../../utils/parsers/app-config-parser';
import { FastifyReply, FastifyRequest, RouteOptions } from 'fastify';

const querySchema = z.object({
  offset: z.string().optional().default('1'),
  limit: z.string().optional().default('20'),
  search: z.string().optional().default(''),
  status: z.enum(['INACTIVE', 'ACTIVE', '']).default(''),
});

export default {
  url: '/configs_list',
  method: 'GET',
  onRequest: [Authentication.user],
  handler: async (req: FastifyRequest, reply: FastifyReply) => {
    const query = querySchema.parse(req.query);

    const limit = parseInt(query.limit);
    const offset = parseInt(query.offset);

    const response = {
      status: 200,
      data: {
        total: 0,
        count: 0,
        limit,
        offset,
        result: [],
      },
    } as any;

    const total = await prisma.appConfig.count({
      where: { user_id: req.user.id },
    });

    const configs = (
      await prisma.appConfig.findMany({
        where: {
          user_id: req.user.id,
          status: query.status ? query.status : undefined,
          name: { contains: query.search },
        },
        select: AppConfigSelect,
        skip: (offset - 1) * limit,
        take: limit,
      })
    ).map((config) => AppConfigParser(config));

    response.data.total = total;
    response.data.count = configs.length;
    response.data.result = configs;

    reply.send(response);
  },
} as RouteOptions;
