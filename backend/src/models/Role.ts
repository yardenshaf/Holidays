import { AllowNull, Column, DataType, Default, HasMany, Index, Model, PrimaryKey, Table } from 'sequelize-typescript';
import User from './User';

@Table({
    underscored: true,
    timestamps: false,
})
export default class Role extends Model {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    id: string;

    @AllowNull(false)
    @Index({ unique: true })
    @Column(DataType.STRING(20))
    name: string;

    @HasMany(() => User)
    users: User[];
}
