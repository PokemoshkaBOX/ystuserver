const {institute}  = require('.././model/models')
const ApiError = require('../error/ApiError')
const {aplicationsv} = require("../model/models");
const {Sequelize} = require("sequelize");
const { QueryTypes } = require('sequelize');
const db    = require('../db')
class DidgitalSystemController {
    //функция создания
    async getMonitorZach(req, res) {
        let {Inst} = req.query
        let data = await aplicationsv.findAll({
            attributes: [
                [Sequelize.col('KGroup'), 'KGroup'],
                [Sequelize.fn('COUNT', Sequelize.col('ID')), 'Count'],
                [Sequelize.fn('COUNT', Sequelize.col('AppState')), 'AppState']
            ],
            group: ['KGroup'],
            order: [['Count', 'DESC']],
            where: {
                [Sequelize.Op.and]: [
                    {
                        KGroup: {
                            [Sequelize.Op.notLike]: '%Целевой прием%',  // Используем Sequelize.Op.like для условия LIKE
                        }
                    },
                    {
                        KGroup: {
                            [Sequelize.Op.notLike]: '%ЗФО%',  // Используем Sequelize.Op.like для условия LIKE
                        }
                    },
                    {
                        KGroup: {
                            [Sequelize.Op.notLike]: '%целевой пием%',  // Используем Sequelize.Op.like для условия LIKE
                        }
                    },

                ],
                Inst: Inst
            }
        });
        let data1 = await aplicationsv.findAll({
            attributes: [
                [Sequelize.col('KGroup'), 'KGroup'],
                [Sequelize.fn('COUNT', Sequelize.col('ID')), 'Count'],
                [Sequelize.fn('COUNT', Sequelize.col('AppState')), 'AppState']
            ],
            group: ['KGroup'],
            order: [['Count', 'DESC']],
            where: {
                [Sequelize.Op.and]: [
                    {
                        KGroup: {
                            [Sequelize.Op.notLike]: '%Целевой прием%',  // Используем Sequelize.Op.like для условия LIKE
                        }
                    },
                    {
                        KGroup: {
                            [Sequelize.Op.notLike]: '%ЗФО%',  // Используем Sequelize.Op.like для условия LIKE
                        }
                    },
                    {
                        KGroup: {
                            [Sequelize.Op.notLike]: '%целевой пием%',  // Используем Sequelize.Op.like для условия LIKE
                        }
                    },
                    {
                        AppState: 'Подано',
                    }
                ],
                Inst: Inst
            }
        });
        let counts = data.map(item => item.dataValues.Count);
        let dates = data.map(item => item.dataValues.KGroup);
        let counts1 = data1.map(item => item.dataValues.AppState);
        console.log("Средний балл по направлениям:",dates, counts, counts1)
        return res.json({dates, counts, counts1});
    }

    async getStudents(req, res) {
        let {Inst} = req.query
        let data = await aplicationsv.findAll({
            attributes: [
                [Sequelize.fn('DISTINCT', Sequelize.col('KodFL')), 'KodFL']
            ],
            where:{
                Inst: Inst
            }
        });
        return res.json(data.length)

    }

    async getRF(req, res) {
        let {Inst} = req.query
        let data = await aplicationsv.findAll({
            attributes: [
                [Sequelize.fn('DISTINCT', Sequelize.col('KodFL')), 'State']
            ],
            where: {

                State: 'россия',
                Inst: Inst
            }
        });
        return res.json(data.length)

    }

    async getNotRF(req, res) {
        let {Inst} = req.query
        let data = await aplicationsv.findAll({
            attributes: [
                [Sequelize.fn('DISTINCT', Sequelize.col('KodFL')), 'State']
            ],
            where: {
                State: {
                    [Sequelize.Op.not]: 'россия',
                },
                Inst: Inst
            }
        });
        return res.json(data.length)
    }

    async getAll(req, res) {
        let {Inst} = req.query
        let data = await aplicationsv.findAll({
            where:{
                Inst: Inst
            }
        });
        return res.json(data.length)

    }

    async getAppSub(req, res) {
        let {Inst} = req.query
        let data = await aplicationsv.findAll({
            where: {
                AppState: 'Подано',
                Inst: Inst
            },
            attributes: ['KodFL']
        });
        return res.json(data.length)

    }

    async getApplicationsCountByDate(req, res) {
        let {Inst} = req.query
        let data = await aplicationsv.findAll({
            attributes: [
                [Sequelize.col('D'), 'date'],  // Выбираем дату
                [Sequelize.fn('COUNT', Sequelize.col('ID')), 'application'] // Считаем количество заявлений
            ],
            group: ['D'], // Группируем по дате
            order: [['D', 'ASC']],  // Сортируем по возрастанию даты
            where:{
                Inst: Inst
            }
        });
        let counts = data.map(item => item.dataValues.application);
        let dates = data.map(item => item.dataValues.date);
        return res.json({dates, counts});
    }

    async getTable(req, res) {
        let {Inst} = req.query
        let data = await aplicationsv.findAll({
            attributes: [
                [Sequelize.col('KGroup'), 'KGroup'],
                [Sequelize.fn('COUNT', Sequelize.col('ID')), 'application']
            ],
            group: ['KGroup'], // Группируем по дате
            order: [['application', 'DESC']], // Сортируем по возрастанию даты
            where:{
                Inst: Inst
            }
        });
        let counts = data.map(item => item.dataValues.application);
        let dates = data.map(item => item.dataValues.k_group);

        return res.json({dates, counts});
    }

    async getPart(req, res) {
        let {Inst} = req.query
        let data = await aplicationsv.findAll({
            attributes: [
                [Sequelize.col('KGroup'), 'KGroup'],
                [Sequelize.fn('COUNT', Sequelize.col('ID')), 'application']
            ],
            group: ['KGroup'], // Группируем по дате
            order: [['application', 'DESC']],  // Сортируем по возрастанию даты
            where: {
                [Sequelize.Op.and]: [
                    {
                        KGroup: {
                            [Sequelize.Op.notLike]: '%Целевой прием%',  // Используем Sequelize.Op.like для условия LIKE
                        }
                    },
                    {
                        KGroup: {
                            [Sequelize.Op.notLike]: '%ЗФО%',  // Используем Sequelize.Op.like для условия LIKE
                        }
                    },
                    {
                        KGroup: {
                            [Sequelize.Op.notLike]: '%целевой пием%',  // Используем Sequelize.Op.like для условия LIKE
                        }
                    },
                ],
                Inst: Inst
            },
        });
        let counts = data.map(item => item.dataValues.application);
        let dates = data.map(item => item.dataValues.KGroup);
        return res.json({dates, counts});
    }

    async getStud(req, res) {
        let {Inst} = req.query
        let data = await aplicationsv.findAll({
            attributes: [
                [Sequelize.col('KodFO'), 'KodFO'],
                [Sequelize.fn('COUNT', Sequelize.col('ID')), 'KodTipPK']
            ],
            group: ['KodFO'],
            order: [['KodFO', 'ASC']],
            where: {
                Inst: Inst
            }
        });
        let counts = data.map(item => item.dataValues.KodTipPK);
        let dates = data.map(item => item.dataValues.KodFO);
        return res.json({dates, counts});
    }

    async getFin(req, res) {
        let {Inst} = req.query
        let data = await aplicationsv.findAll({
            attributes: [
                [Sequelize.col('KGroup'), 'KGroup'],
                [Sequelize.fn('COUNT', Sequelize.col('ID')), 'Count']
            ],
            group: ['KGroup'],
            order: [['Count', 'DESC']],
            where: {
                [Sequelize.Op.or]: [
                    {
                        KGroup: {
                            [Sequelize.Op.like]: '%Целевой прием%',  // Используем Sequelize.Op.like для условия LIKE
                        }
                    },
                    {
                        KGroup: {
                            [Sequelize.Op.like]: '%ЗФО%',  // Используем Sequelize.Op.like для условия LIKE
                        }
                    },
                    {
                        KGroup: {
                            [Sequelize.Op.like]: '%целевой пием%',  // Используем Sequelize.Op.like для условия LIKE
                        }
                    },
                ],
                Inst: Inst
            }
        });
        let counts = data.map(item => item.dataValues.Count);
        let dates = data.map(item => item.dataValues.KGroup);
        return res.json({dates, counts});
    }

    async getObl(req, res) {
        let {Inst} = req.query
        let data = await aplicationsv.findAll({
            attributes: [
                [Sequelize.col('KGroup'), 'KGroup'], // Включаем название группы
                [Sequelize.fn('ROUND', Sequelize.fn('AVG', Sequelize.cast(Sequelize.col('AvgBall'), 'float')), 1), 'AvgBall']// Вычисляем средний балл для каждой группы
            ],
            group: ['KGroup'], // Группируем по названию группы
            order: [['AvgBall', 'DESC']],  // Сортируем по убыванию среднего балла
            where: {
                Inst: Inst,
                AvgBall: {[Sequelize.Op.ne]: 'NULL'}
            }
        });
        let data1 = await aplicationsv.findAll({
            attributes: [
                [Sequelize.col('KGroup'), 'KGroup'], // Включаем название группы
                [Sequelize.fn('ROUND', Sequelize.fn('AVG', Sequelize.cast(Sequelize.col('AvgBall'), 'float')), 1), 'AvgBall']// Вычисляем средний балл для каждой группы
            ],
            group: ['KGroup'], // Группируем по названию группы
            order: [['AvgBall', 'DESC']],  // Сортируем по убыванию среднего балла
            where: {
                Inst: Inst,
                AvgBall: {[Sequelize.Op.ne]: 'NULL'},
                AppState: 'Подано'
            }
        });

        let counts = data.map(item => item.dataValues.AvgBall);
        let counts1 = data1.map(item => item.dataValues.AvgBall);
        let dates = data.map(item => item.dataValues.KGroup);
        return res.json({dates, counts, counts1});
    }

    async getChan(req, res) {
        let {Inst} = req.query
        let data = await aplicationsv.findAll({
            attributes: [
                [Sequelize.col('Channel'), 'Channel'],
                [Sequelize.fn('COUNT', Sequelize.col('ID')), 'ID']
            ],
            group: ['Channel'], // Группируем по дате
            order: [['ID', 'DESC']],  // Сортируем по возрастанию даты
            where:{
                Inst: Inst
            }
        });
        let counts = data.map(item => item.dataValues.ID);
        let dates = data.map(item => item.dataValues.Channel);
        return res.json({dates, counts});
    }
    async getAvgBall(req, res) {
        let {Inst} = req.query
          const data = await aplicationsv.findAll({
            attributes: [
              [
                Sequelize.literal(`
                  CASE 
                    WHEN TRY_CONVERT(float, AvgBall) BETWEEN 45 AND 50 THEN '45-50'
                    WHEN TRY_CONVERT(float, AvgBall) BETWEEN 50 AND 55 THEN '50-55'
                    WHEN TRY_CONVERT(float, AvgBall) BETWEEN 55 AND 60 THEN '55-60'
                    WHEN TRY_CONVERT(float, AvgBall) BETWEEN 60 AND 65 THEN '60-65'
                    WHEN TRY_CONVERT(float, AvgBall) BETWEEN 65 AND 70 THEN '65-70'
                    WHEN TRY_CONVERT(float, AvgBall) BETWEEN 70 AND 85 THEN '70-85'
                    WHEN TRY_CONVERT(float, AvgBall) BETWEEN 85 AND 90 THEN '85-90'
                    WHEN TRY_CONVERT(float, AvgBall) BETWEEN 90 AND 95 THEN '90-95'
                    WHEN TRY_CONVERT(float, AvgBall) BETWEEN 95 AND 100 THEN '95-100'
                    ELSE NULL
                  END
                `),
                'BallRange'
              ],
              [Sequelize.fn('COUNT', Sequelize.col('ID')), 'StudentCount']
            ],
            where: {
                AvgBall: {
                    [Sequelize.Op.ne]: 'NULL'
                },
                Inst: Inst
            },
            group: [
              Sequelize.literal(`
                CASE 
                  WHEN TRY_CONVERT(float, AvgBall) BETWEEN 45 AND 50 THEN '45-50'
                  WHEN TRY_CONVERT(float, AvgBall) BETWEEN 50 AND 55 THEN '50-55'
                  WHEN TRY_CONVERT(float, AvgBall) BETWEEN 55 AND 60 THEN '55-60'
                  WHEN TRY_CONVERT(float, AvgBall) BETWEEN 60 AND 65 THEN '60-65'
                  WHEN TRY_CONVERT(float, AvgBall) BETWEEN 65 AND 70 THEN '65-70'
                  WHEN TRY_CONVERT(float, AvgBall) BETWEEN 70 AND 85 THEN '70-85'
                  WHEN TRY_CONVERT(float, AvgBall) BETWEEN 85 AND 90 THEN '85-90'
                  WHEN TRY_CONVERT(float, AvgBall) BETWEEN 90 AND 95 THEN '90-95'
                  WHEN TRY_CONVERT(float, AvgBall) BETWEEN 95 AND 100 THEN '95-100'
                  ELSE NULL
                END
              `)
            ],
              order: [['BallRange', 'ASC']]
          });
          const data1 = await aplicationsv.findAll({
            attributes: [
              [
                Sequelize.literal(`
                  CASE 
                    WHEN TRY_CONVERT(float, AvgBall) BETWEEN 45 AND 50 THEN '45-50'
                    WHEN TRY_CONVERT(float, AvgBall) BETWEEN 50 AND 55 THEN '50-55'
                    WHEN TRY_CONVERT(float, AvgBall) BETWEEN 55 AND 60 THEN '55-60'
                    WHEN TRY_CONVERT(float, AvgBall) BETWEEN 60 AND 65 THEN '60-65'
                    WHEN TRY_CONVERT(float, AvgBall) BETWEEN 65 AND 70 THEN '65-70'
                    WHEN TRY_CONVERT(float, AvgBall) BETWEEN 70 AND 85 THEN '70-85'
                    WHEN TRY_CONVERT(float, AvgBall) BETWEEN 85 AND 90 THEN '85-90'
                    WHEN TRY_CONVERT(float, AvgBall) BETWEEN 90 AND 95 THEN '90-95'
                    WHEN TRY_CONVERT(float, AvgBall) BETWEEN 95 AND 100 THEN '95-100'
                    ELSE NULL
                  END
                `),
                'BallRange'
              ],
              [Sequelize.fn('COUNT', Sequelize.col('ID')), 'StudentCount']
            ],
            where: {
                AvgBall: {
                    [Sequelize.Op.ne]: 'NULL'
                },
                Inst: Inst,
                AppState: 'Подано'
            },
            group: [
              Sequelize.literal(`
                CASE 
                  WHEN TRY_CONVERT(float, AvgBall) BETWEEN 45 AND 50 THEN '45-50'
                  WHEN TRY_CONVERT(float, AvgBall) BETWEEN 50 AND 55 THEN '50-55'
                  WHEN TRY_CONVERT(float, AvgBall) BETWEEN 55 AND 60 THEN '55-60'
                  WHEN TRY_CONVERT(float, AvgBall) BETWEEN 60 AND 65 THEN '60-65'
                  WHEN TRY_CONVERT(float, AvgBall) BETWEEN 65 AND 70 THEN '65-70'
                  WHEN TRY_CONVERT(float, AvgBall) BETWEEN 70 AND 85 THEN '70-85'
                  WHEN TRY_CONVERT(float, AvgBall) BETWEEN 85 AND 90 THEN '85-90'
                  WHEN TRY_CONVERT(float, AvgBall) BETWEEN 90 AND 95 THEN '90-95'
                  WHEN TRY_CONVERT(float, AvgBall) BETWEEN 95 AND 100 THEN '95-100'
                  ELSE NULL
                END
              `)
            ],
              order: [['BallRange', 'ASC']]
          });

          let counts = data.map(item => item.dataValues.StudentCount);
          let dates = data.map(item => item.dataValues.BallRange);
          let counts1 = data1.map(item => item.dataValues.StudentCount);
          return res.json({ dates, counts, counts1});
        }
}

module.exports = new DidgitalSystemController()