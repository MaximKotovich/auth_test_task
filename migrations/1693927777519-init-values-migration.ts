import { type MigrationInterface, type QueryRunner } from 'typeorm'
import * as bcrypt from 'bcrypt'

export class InitValuesMigration1693927777519 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    const hashPass = async (pass) => {
      return bcrypt.hash(pass, 12)
    }
    await queryRunner.manager.query(`
                INSERT INTO public."users" (id, created_at, updated_at, username, "password", "refreshToken")
                VALUES (uuid_generate_v4(),  now(), now(), 'test1', '${await hashPass('test1')}', null)
                `)
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.query(`
                DELETE FROM public."users"
                WHERE username IN ('test1');
                `)
  }
}
