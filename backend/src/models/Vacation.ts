import { AllowNull, BelongsToMany, Column, DataType, Default, Model, PrimaryKey, Table } from 'sequelize-typescript';
import Like from './Like';
import User from './User';

@Table({
    underscored: true,
    timestamps: true,
})
export default class Vacation extends Model {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    id: string;

    @AllowNull(false)
    @Column(DataType.STRING(40))
    destination: string;

    @AllowNull(false)
    @Column(DataType.TEXT)
    description: string;

    @AllowNull(false)
    @Column(DataType.DATE)
    startDate: Date;

    @AllowNull(false)
    @Column(DataType.DATE)
    endDate: Date;

    @AllowNull(false)
    @Column(DataType.FLOAT)
    price: number;

    @AllowNull(true)
    @Column(DataType.STRING)
    file: string | null;

    @BelongsToMany(() => User, () => Like, 'vacationId', 'userId')
    likedBy: User[];
}
