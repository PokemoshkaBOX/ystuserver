const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const user = sequelize.define('user',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "USER"},
})

const aplicationsv = sequelize.define('applicationsv2',{
    ID: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, field: 'ID'},
    KodFL: {type: DataTypes.INTEGER, field: 'KodFL'}, // Код физлица
    D: {type: DataTypes.DATEONLY, field: 'D'}, // Дата заявления
    Osn: {type: DataTypes.STRING, field: 'Osn'}, // Основание поступления
    AppState: {type: DataTypes.STRING, field: 'AppState'}, // Состояние
    Priority: {type: DataTypes.STRING, field: 'Priority'}, // Приоритет
    orig: {type: DataTypes.BOOLEAN, field: 'orig'}, //Оригинал 1|0
    orig1: {type: DataTypes.STRING, field: 'orig1'}, //case when a.orig=1 and a.Priority=1 then 1 else 0 end  --Оригинал на 1-м приоритете
    AvgBall: {type: DataTypes.STRING, field: 'AvgBall'}, //Средний балл
    Exam: {type: DataTypes.STRING, field: 'Exam'}, //строка экзаменов
    SumBall: {type: DataTypes.INTEGER, field: 'SumBall'}, //сумма балов
    abrkngr: {type: DataTypes.STRING, field: 'abrkngr'}, //абривиатура конкурсной группы
    primech: {type: DataTypes.STRING, field: 'primech'},
    KGroup: {type: DataTypes.STRING, field: 'KGroup'}, //Доп приём, dop
    KGroup2: {type: DataTypes.STRING, field: 'KGroup2'}, // Конкурсная группа
    KodKG: {type: DataTypes.STRING, field: 'KodKG'},
    Campaign: {type: DataTypes.INTEGER, field: 'Campaign'}, // Конкурсная группа представлние
    KodTipPK: {type: DataTypes.INTEGER, field: 'KodTipPK'}, // Тип приемной кампании
    KodLevel: {type: DataTypes.INTEGER, field: 'KodLevel'}, // УровеньПодготовки.Код
    KodFO: {type: DataTypes.INTEGER, field: 'KodFO'}, // Код формы обучения
    Inst: {type: DataTypes.INTEGER, field: 'Inst'}, // Номер института
    Institut: {type: DataTypes.INTEGER, field: 'Institut'}, // Институт
    KodFac: {type: DataTypes.STRING, field: 'KodFac'}, // Код института
    Channel: {type: DataTypes.INTEGER, field: 'Channel'}, // ДоставкаДокументов.Код
    Consent: {type: DataTypes.STRING, field: 'Consent'}, // Согласие
    State: {type: DataTypes.STRING, field: 'State'}, // Регион
    Addr: {type: DataTypes.STRING, field: 'Addr'}, // Адрес
}, {
    freezeTableName: true, // Запрещает автоматическое изменение имен таблиц Sequelize
  timestamps: false, // Отключает автоматическое добавление полей createdAt
  tableName: 'applicationsv2' // явное указание имени таблицы
})

module.exports = {
    user,
    aplicationsv,
}