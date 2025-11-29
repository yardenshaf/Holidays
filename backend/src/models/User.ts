import { Table, Model, Column, DataType, PrimaryKey, Default, AllowNull, Index, ForeignKey, BelongsTo, BelongsToMany } from 'sequelize-typescript';
import Role from './Role';
import Vacation from './Vacation';
import Like from './Like';

@Table({
    underscored: true,
    timestamps: true,
})
export default class User extends Model {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    id: string;

    @AllowNull(false)
    @Column(DataType.STRING(30))
    firstName: string;

    @AllowNull(false)
    @Column(DataType.STRING(30))
    lastName: string;

    @AllowNull(false)
    @Index({ unique: true })
    @Column(DataType.STRING)
    email: string;

    @AllowNull(false)
    @Column(DataType.STRING)
    password: string;

    @ForeignKey(() => Role)
    @AllowNull(false)
    @Column(DataType.UUID)
    roleId: string;

    @BelongsTo(() => Role)
    role: Role;

    @BelongsToMany(() => Vacation, () => Like, 'userId', 'vacationId')
    likedVacations: Vacation[];
}
