import { DateTime } from 'luxon';

export class BaseEntity {
  created_at: Date;

  updated_at: Date;

  deleted_at: Date;

  active: boolean;

  beforeInsert() {
    this.created_at = DateTime.now()
      .setZone(process.env.TIMEZONE ?? 'Asia/Jakarta')
      .toJSDate();
  }
}
