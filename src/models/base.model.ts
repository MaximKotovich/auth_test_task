import {
  CreateDateColumn, PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'

export class BaseModel {
  @PrimaryGeneratedColumn('uuid')
    id: string

  /**
   * Дата создания
   */
  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
    createdAt: Date

  /**
   * Дата обновления
   */
  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
    updatedAt: Date
}
