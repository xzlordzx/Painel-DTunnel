import { AppLayoutUpdate } from './zod-schema';
import { MAX_LAYOUT_PERMITTED } from './defaults';
import prisma from '../../../config/prisma-client';
import SafeCallback from '../../../utils/safe-callback';
import Authentication from '../../../middlewares/authentication';
import { FastifyReply, FastifyRequest, RouteOptions } from 'fastify';

export default {
  url: '/app_layout/import',
  method: 'POST',
  onRequest: [Authentication.user],
  handler: async (req: FastifyRequest, reply: FastifyReply) => {
    const appLayoutCount = await prisma.appLayout.count({
      where: { user_id: req.user.id },
    });

    if (appLayoutCount >= MAX_LAYOUT_PERMITTED) {
      reply.status(409);
      throw new Error('Você antigiu o limite máximo de layout');
    }

    const is_active = appLayoutCount <= 0;
    const body = AppLayoutUpdate.parse(req.body);

    const createAppLayout = await SafeCallback(() =>
      prisma.appLayout.create({
        data: {
          is_active,
          user_id: req.user.id,
        },
      })
    );

    if (!createAppLayout) {
      throw new Error('Erro ao criar layout');
    }

    for (const AppLayout of body.app_config) {
      await SafeCallback(() => {
        const value =
          typeof AppLayout.value === 'object' && AppLayout.type == 'SELECT'
            ? AppLayout.value?.selected
            : AppLayout.value;

        return prisma.appLayoutStorage.create({
          data: {
            label: AppLayout.label,
            name: AppLayout.name,
            status: 'ACTIVE',
            type: AppLayout.type,
            value: String(value) == 'null' ? null : String(value),
            app_layout_id: createAppLayout.id,
          },
        });
      });
    }

    reply.status(201).send({});
  },
} as RouteOptions;
