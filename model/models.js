const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const aplicationsv = sequelize.define('applicationsv2',{
    KodFL: {type: DataTypes.STRING, field: 'KodFL'}, // Код физлица
    D: {type: DataTypes.DATE, field: 'D'}, // Дата заявления
    Osn: {type: DataTypes.STRING, field: 'Osn'}, // Основание поступления
    AppState: {type: DataTypes.STRING, field: 'AppState'}, // Состояние
    Priority: {type: DataTypes.INTEGER, field: 'Priority'}, // Приоритет
    orig: {type: DataTypes.INTEGER, field: 'orig'}, //Оригинал 1|0
    orig1: {type: DataTypes.INTEGER, field: 'orig1'}, //case when a.orig=1 and a.Priority=1 then 1 else 0 end  --Оригинал на 1-м приоритете
    AvgBall: {type: DataTypes.STRING, field: 'AvgBall'}, //Средний балл
    Exam: {type: DataTypes.STRING, field: 'Exam'}, //строка экзаменов
    SumBall: {type: DataTypes.INTEGER, field: 'SumBall'}, //сумма балов
    abrkngr: {type: DataTypes.STRING, field: 'abrkngr'}, //абривиатура конкурсной группы
    primech: {type: DataTypes.STRING, field: 'primech'},
    KGroup: {type: DataTypes.STRING, field: 'KGroup'}, //Доп приём, dop
    KGroup2: {type: DataTypes.STRING, field: 'KGroup2'}, // Конкурсная группа
    KodKG: {type: DataTypes.STRING, field: 'KodKG'},
    Campaign: {type: DataTypes.STRING, field: 'Campaign'}, // Конкурсная группа представлние
    KodTipPK: {type: DataTypes.STRING, field: 'KodTipPK'}, // Тип приемной кампании
    KodLevel: {type: DataTypes.INTEGER, field: 'KodLevel'}, // УровеньПодготовки.Код
    KodFO: {type: DataTypes.STRING, field: 'KodFO'}, // Код формы обучения
    Inst: {type: DataTypes.INTEGER, field: 'Inst'}, // Номер института
    Institut: {type: DataTypes.STRING, field: 'Institut'}, // Институт
    KodFac: {type: DataTypes.STRING, field: 'KodFac'}, // Код института
    Channel: {type: DataTypes.STRING, field: 'Channel'}, // ДоставкаДокументов.Код
    Consent: {type: DataTypes.STRING, field: 'Consent'}, // Согласие
    State: {type: DataTypes.STRING, field: 'State'}, // Регион
    Addr: {type: DataTypes.STRING, field: 'Addr'}, // Адрес
}, {
    freezeTableName: true, // Запрещает автоматическое изменение имен таблиц Sequelize
  timestamps: false, // Отключает автоматическое добавление полей createdAt
  tableName: 'applicationsv2' // явное указание имени таблицы
})

module.exports = {
    aplicationsv,
}