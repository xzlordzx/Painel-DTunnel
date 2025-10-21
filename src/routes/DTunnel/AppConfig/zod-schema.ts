import { z } from 'zod';

const mode = z.enum([
  'SSH_DIRECT',
  'SSH_PROXY',
  'SSH_DNSTT',
  'SSL_DIRECT',
  'SSL_PROXY',
  'OVPN_PROXY',
  'OVPN_SSL',
  'OVPN_SSL_PROXY',
  'V2RAY',
  'HYSTERIA',
]);

export const CategorySchema = z.object({
  id: z.number().optional(),
  user_id: z.string().optional(),
  name: z.string().max(100),
  color: z.string(),
  sorter: z.number(),
  status: z.enum(['ACTIVE', 'INACTIVE']).optional(),
});

export const AppConfigSchema = z.object({
  category_id: z.number().optional(),
  name: z.string().max(100),
  description: z.string().max(100).optional(),
  mode: mode,
  sorter: z.number(),
  status: z.enum(['ACTIVE', 'INACTIVE']),
  auth: z
    .object({
      username: z.string().optional().nullable(),
      password: z.string().optional().nullable(),
      v2ray_uuid: z.string().optional().nullable(),
    })
    .optional(),
  category: CategorySchema,
  config_openvpn: z.string().optional().nullable(),
  config_payload: z
    .object({
      payload: z.string().optional().nullable(),
      sni: z.string().optional().nullable(),
    })
    .optional(),
  config_v2ray: z.string().optional().nullable(),
  dns_server: z
    .object({
      dns1: z.string().nullable(),
      dns2: z.string().nullable(),
    })
    .optional()
    .nullable(),
  icon: z.string(),
  proxy: z
    .object({
      host: z.string().nullable(),
      port: z.number().nullable(),
    })
    .optional()
    .nullable(),
  server: z
    .object({
      host: z.string().nullable(),
      port: z.number().nullable(),
    })
    .optional()
    .nullable(),
  dnstt_key: z.string().optional().nullable(),
  dnstt_name_server: z.string().optional().nullable(),
  dnstt_server: z.string().optional().nullable(),
  hy_obfs: z.string().optional().nullable(),
  hy_insecure: z.boolean().optional().nullable(),
  hy_port: z.string().optional().nullable(),
  hy_up_mbps: z.number().optional().nullable(),
  hy_down_mbps: z.number().optional().nullable(),
  hy_version: z.number().optional().nullable(),
  tls_version: z.enum(['TLSv1.3', 'TLSv1.2', 'TLSv1.1']).optional().nullable(),
  udp_ports: z.array(z.number()).optional().nullable(),
  url_check_user: z.string(),
});

export const AppConfigImport = z.object({
  items: z.array(AppConfigSchema),
});

export const AppConfigSelect = {
  auth_password: true,
  auth_username: true,
  auth_v2ray_uuid: true,
  category: true,
  category_id: true,
  config_openvpn: true,
  config_payload_payload: true,
  config_payload_sni: true,
  config_v2ray: true,
  description: true,
  dns_server_dns1: true,
  dns_server_dns2: true,
  icon: true,
  id: true,
  mode: true,
  name: true,
  proxy_host: true,
  proxy_port: true,
  server_host: true,
  server_port: true,
  dnstt_key: true,
  dnstt_name_server: true,
  dnstt_server: true,
  hy_obfs: true,
  hy_insecure: true,
  hy_port: true,
  hy_up_mbps: true,
  hy_down_mbps: true,
  hy_version: true,
  sorter: true,
  status: true,
  tls_version: true,
  updated_at: true,
  created_at: true,
  udp_ports: true,
  url_check_user: true,
  user_id: false,
};

export const getDateCreateAppConfig = (appconfig: z.infer<typeof AppConfigSchema>) => {
  return {
    mode: appconfig.mode,
    name: appconfig.name,
    description: appconfig.description,
    sorter: appconfig.sorter,
    status: appconfig.status,
    auth_username: appconfig.auth?.username,
    auth_password: appconfig.auth?.password,
    auth_v2ray_uuid: appconfig.auth?.v2ray_uuid,
    config_payload_payload: appconfig.config_payload?.payload,
    config_payload_sni: appconfig.config_payload?.sni,
    config_v2ray: appconfig.config_v2ray,
    config_openvpn: appconfig.config_openvpn,
    dns_server_dns1: appconfig.dns_server?.dns1,
    dns_server_dns2: appconfig.dns_server?.dns2,
    icon: appconfig.icon,
    proxy_host: appconfig.proxy?.host,
    proxy_port: appconfig.proxy?.port,
    server_host: appconfig.server?.host,
    server_port: appconfig.server?.port,
    dnstt_key: appconfig.dnstt_key ? appconfig.dnstt_key : '',
    dnstt_name_server: appconfig.dnstt_name_server ? appconfig.dnstt_name_server : '',
    dnstt_server: appconfig.dnstt_server ? appconfig.dnstt_server : '',
    hy_obfs: appconfig.hy_obfs ? appconfig.hy_obfs : '',
    hy_insecure: appconfig.hy_insecure ? appconfig.hy_insecure : true,
    hy_port: appconfig.hy_port ? appconfig.hy_port : '13375',
    hy_up_mbps: appconfig.hy_up_mbps ? appconfig.hy_up_mbps : 100,
    hy_down_mbps: appconfig.hy_down_mbps ? appconfig.hy_down_mbps : 150,
    hy_version: appconfig.hy_version ? appconfig.hy_version : 1,
    tls_version: appconfig.tls_version,
    udp_ports: appconfig.udp_ports?.join(',') ?? '7300',
    url_check_user: appconfig.url_check_user,
  };
};
