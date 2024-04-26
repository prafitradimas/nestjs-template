import { SetMetadata } from '@nestjs/common';

export const PUBLIC_ENDPOINT: unique symbol = Symbol('IsPublicEndpoint');
export const PublicEndpoint = () => SetMetadata(PUBLIC_ENDPOINT, true);
