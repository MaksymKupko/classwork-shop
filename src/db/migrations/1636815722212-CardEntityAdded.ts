import {MigrationInterface, QueryRunner} from "typeorm";

export class CardEntityAdded1636815722212 implements MigrationInterface {
    name = 'CardEntityAdded1636815722212'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "cards" ("id" SERIAL NOT NULL, "createDate" TIMESTAMP NOT NULL DEFAULT now(), "updateDate" TIMESTAMP NOT NULL DEFAULT now(), "deleteDate" TIMESTAMP, "type" character varying NOT NULL, "number" integer NOT NULL, "expire" character varying NOT NULL, "cvv" integer NOT NULL, "userId" integer, CONSTRAINT "PK_5f3269634705fdff4a9935860fc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "cards" ADD CONSTRAINT "FK_7b7230897ecdeb7d6b0576d907b" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cards" DROP CONSTRAINT "FK_7b7230897ecdeb7d6b0576d907b"`);
        await queryRunner.query(`DROP TABLE "cards"`);
    }

}
