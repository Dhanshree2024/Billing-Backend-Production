"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTenantRepository = getTenantRepository;
async function getTenantRepository(dataSource, entity, schema) {
    const queryRunner = dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.query(`SET search_path TO ${schema}, public`);
    return queryRunner.manager.getRepository(entity);
}
