const {aplicationsv} = require("../model/models");
const {Sequelize} = require("sequelize");
class monitorController {
    //функция создания
    async getMonitorZach(req, res) {
        let data = await aplicationsv.findAll({
            attributes: [
                [Sequelize.col('Institut'), 'Institut'],  // Выбираем дату
                [Sequelize.fn('COUNT', Sequelize.col('KodFL')), 'Count'] // Считаем количество заявлений
            ],
            group: ['Institut'], // Группируем по дате
            order: [['Count', 'DESC']]  // Сортируем по возрастанию даты
        });
        let data1 = await aplicationsv.findAll({
            attributes: [
                [Sequelize.col('Institut'), 'Institut'],  // Выбираем дату
                [Sequelize.fn('COUNT', Sequelize.col('KodFL')), 'Count'] // Считаем количество заявлений
            ],
            group: ['Institut'], // Группируем по дате
            order: [['Count', 'DESC']],  // Сортируем по возрастанию даты
            where: {
                AppState: 'Подано'
            }
        });
        let counts = data.map(item => item.dataValues.Count);
        let counts1 = data1.map(item => item.dataValues.Count);
        let dates = data.map(item => item.dataValues.Institut);

        return res.json({dates, counts, counts1});
    }

    async getStudents(req, res) {
        let data = await aplicationsv.findAll({
            attributes: [
                [Sequelize.fn('DISTINCT', Sequelize.col('KodFL')), 'KodFL']
            ],
        });
        console.log(data.length)
        return res.json(data.length)

    }

    async getRF(req, res) {
        let data = await aplicationsv.findAll({
            attributes: [
                [Sequelize.fn('DISTINCT', Sequelize.col('KodFL')), 'State']
            ],
            where: {
                State: 'россия'
            }
        });
        console.log(data.length)
        return res.json(data.length)

    }

    async getNotRF(req, res) {
        let data = await aplicationsv.findAll({
            attributes: [
                [Sequelize.fn('DISTINCT', Sequelize.col('KodFL')), 'State']
            ],
            where: {
                State: {
                    [Sequelize.Op.not]: 'россия' // Exclude Russia
                }
            }
        });
        console.log(data.length)
        return res.json(data.length)

    }

    async getAll(req, res) {
        let data = await aplicationsv.findAll({});
        console.log(data.length)
        return res.json(data.length)

    }

    async getAppSub(req, res) {
        let data = await aplicationsv.findAll({
            where: {
                AppState: 'Подано'
            },
            attributes: ['KodFL']
        });
        console.log(data.length)
        return res.json(data.length)

    }

   async getApplicationsCountByDate(req, res) {
       let data = await aplicationsv.findAll({
           attributes: [
                    [Sequelize.literal(`CONVERT(date, D)`), 'date'],
                    [Sequelize.fn('COUNT', Sequelize.col('KodFL')), 'application']
           ],
           group: [
               [Sequelize.literal(`CONVERT(date, D)`), 'date'],
           ], // Группируем по дате
           order: [['date', 'ASC']],
       });

       let counts = data.map(item => item.dataValues.application);
       let dates = data.map(item => item.dataValues.date);

       return res.json({dates, counts});
   }

    async getTable(req, res) {
        let data = await aplicationsv.findAll({
            attributes: [
                [Sequelize.col('KodLevel'), 'KodLevel'],
                [Sequelize.fn('COUNT', Sequelize.col('KodFL')), 'application']
            ],
            group: ['KodLevel'], // Группируем по дате
            order: [['application', 'DESC']], // Сортируем по возрастанию даты
        });
        let data1 = await aplicationsv.findAll({
            attributes: [
                [Sequelize.col('KodLevel'), 'KodLevel'],
                [Sequelize.fn('COUNT', Sequelize.col('KodFL')), 'application']
            ],
            group: ['KodLevel'], // Группируем по дате
            order: [['application', 'DESC']], // Сортируем по возрастанию даты
            where:{
                AppState: 'Подано'
            }
        });
        let counts = data.map(item => item.dataValues.application);
        let counts1 = data1.map(item => item.dataValues.application);
        let dates = data.map(item => item.dataValues.KodLevel);
        console.log("dwedwedwe", dates, counts, counts1)
        return res.json({dates, counts, counts1});
    }

    async getPart(req, res) {
        let data = await aplicationsv.findAll({
            attributes: [
                [Sequelize.col('KGroup'), 'KGroup'],
                [Sequelize.fn('COUNT', Sequelize.col('KodFL')), 'application']
            ],
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
                ]
            },
            group: ['KGroup'], // Группируем по дате
            order: [['application', 'DESC']]  // Сортируем по возрастанию даты
        });
        let counts = data.map(item => item.dataValues.application);
        let dates = data.map(item => item.dataValues.KGroup);

        return res.json({dates, counts});
    }

    async getStud(req, res) {
        let data = await aplicationsv.findAll({
            attributes: [
                [Sequelize.col('KodFO'), 'KodFO'],
                [Sequelize.fn('COUNT', Sequelize.col('KodFL')), 'KodTipPK']
            ],
            group: ['KodFO'],
            order: [['KodFO', 'ASC']]
        });
        let counts = data.map(item => item.dataValues.KodTipPK);
        let dates = data.map(item => item.dataValues.KodFO);
        console.log("Кол-во:", dates)
        return res.json({dates, counts});
    }

    async getFin(req, res) {
        let data = await aplicationsv.findAll({
            attributes: [
                [Sequelize.col('Osn'), 'Osn'],
                [Sequelize.fn('COUNT', Sequelize.col('KodFL')), 'KodTipPK']
            ],
            group: ['Osn'], // Группируем по дате
            order: [['KodTipPK', 'DESC']]  // Сортируем по возрастанию даты
        });
        let counts = data.map(item => item.dataValues.KodTipPK);
        let dates = data.map(item => item.dataValues.Osn);
        console.log("Кол-во:", dates)
        return res.json({dates, counts});
    }

    async getObl(req, res) {
        let data = await aplicationsv.findAll({
            attributes: [
                [
                    Sequelize.literal(`
                CASE 
                    WHEN Addr LIKE 'РОССИЯ,%' THEN 
                        SUBSTRING(Addr, CHARINDEX(',', Addr, CHARINDEX(',', Addr) + 1) + 2, 
                                  CASE 
                                      WHEN CHARINDEX(',', Addr, CHARINDEX(',', Addr, CHARINDEX(',', Addr) + 1) + 1) - CHARINDEX(',', Addr, CHARINDEX(',', Addr) + 1) - 2 < 0 
                                      THEN 0 
                                      ELSE CHARINDEX(',', Addr, CHARINDEX(',', Addr, CHARINDEX(',', Addr) + 1) + 1) - CHARINDEX(',', Addr, CHARINDEX(',', Addr) + 1) - 2 
                                  END) 
                    ELSE 
                        SUBSTRING(Addr, CHARINDEX(',', Addr) + 2, 
                                  CASE 
                                      WHEN CHARINDEX(',', Addr, CHARINDEX(',', Addr) + 1) - CHARINDEX(',', Addr) - 2 < 0 
                                      THEN 0 
                                      ELSE CHARINDEX(',', Addr, CHARINDEX(',', Addr) + 1) - CHARINDEX(',', Addr) - 2 
                                  END) 
                END
            `),
                    'region'
                ],
                [Sequelize.fn('COUNT', Sequelize.col('*')), 'count']
            ],
            where: {
                [Sequelize.Op.or]: [
                    {Addr: {[Sequelize.Op.like]: 'РОССИЯ,%'}},
                    {Addr: {[Sequelize.Op.notLike]: 'РОССИЯ,%'}}
                ]
            },
            group: [
                Sequelize.literal(`
            CASE 
                WHEN Addr LIKE 'РОССИЯ,%' THEN 
                    SUBSTRING(addr, CHARINDEX(',', Addr, CHARINDEX(',', Addr) + 1) + 2, 
                              CASE 
                                  WHEN CHARINDEX(',', Addr, CHARINDEX(',', Addr, CHARINDEX(',', Addr) + 1) + 1) - CHARINDEX(',', Addr, CHARINDEX(',', Addr) + 1) - 2 < 0 
                                  THEN 0 
                                  ELSE CHARINDEX(',', Addr, CHARINDEX(',', Addr, CHARINDEX(',', Addr) + 1) + 1) - CHARINDEX(',', Addr, CHARINDEX(',', Addr) + 1) - 2 
                              END) 
                ELSE 
                    SUBSTRING(addr, CHARINDEX(',', Addr) + 2, 
                              CASE 
                                  WHEN CHARINDEX(',', Addr, CHARINDEX(',', Addr) + 1) - CHARINDEX(',', Addr) - 2 < 0 
                                  THEN 0 
                                  ELSE CHARINDEX(',', Addr, CHARINDEX(',', Addr) + 1) - CHARINDEX(',', Addr) - 2 
                              END) 
            END
        `)
            ],
            having: Sequelize.literal('COUNT(*) > 0'),
            order: [
                [Sequelize.literal('count'), 'DESC']
            ],
            limit: 15
        });

        let counts = data.map(item => item.dataValues.count);
        let dates = data.map(item => item.dataValues.region);

        return res.json({dates, counts});
    }

    async getChan(req, res) {
        let data = await aplicationsv.findAll({
            attributes: [
                [Sequelize.col('Channel'), 'Channel'],
                [Sequelize.fn('COUNT', Sequelize.col('KodFL')), 'ID']
            ],
            group: ['Channel'], // Группируем по дате
            order: [['ID', 'DESC']]  // Сортируем по возрастанию даты
        });
        let counts = data.map(item => item.dataValues.ID);
        let dates = data.map(item => item.dataValues.Channel);
        console.log("Кол-во:", dates)
        return res.json({dates, counts});
    }
    async getAvgBall(req, res) {
          const data = await aplicationsv.findAll({
            attributes: [
              [
                Sequelize.literal(`
                  CASE 
                    WHEN TRY_CONVERT(float, AvgBall) BETWEEN 25 AND 30 THEN '25-30'
                    WHEN TRY_CONVERT(float, AvgBall) BETWEEN 30 AND 35 THEN '30-35'
                    WHEN TRY_CONVERT(float, AvgBall) BETWEEN 35 AND 40 THEN '35-40'
                    WHEN TRY_CONVERT(float, AvgBall) BETWEEN 40 AND 45 THEN '40-45'
                    WHEN TRY_CONVERT(float, AvgBall) BETWEEN 45 AND 50 THEN '45-50'
                    WHEN TRY_CONVERT(float, AvgBall) BETWEEN 50 AND 55 THEN '50-55'
                    WHEN TRY_CONVERT(float, AvgBall) BETWEEN 55 AND 60 THEN '55-60'
                    WHEN TRY_CONVERT(float, AvgBall) BETWEEN 60 AND 65 THEN '60-65'
                    WHEN TRY_CONVERT(float, AvgBall) BETWEEN 65 AND 70 THEN '65-70'
                    WHEN TRY_CONVERT(float, AvgBall) BETWEEN 70 AND 75 THEN '70-75'
                    WHEN TRY_CONVERT(float, AvgBall) BETWEEN 75 AND 80 THEN '75-80'
                    WHEN TRY_CONVERT(float, AvgBall) BETWEEN 80 AND 85 THEN '80-85'
                    WHEN TRY_CONVERT(float, AvgBall) BETWEEN 85 AND 90 THEN '85-90'
                    WHEN TRY_CONVERT(float, AvgBall) BETWEEN 90 AND 95 THEN '90-95'
                    WHEN TRY_CONVERT(float, AvgBall) BETWEEN 95 AND 100 THEN '95-100'
                    
                  END
                `),
                'BallRange'
              ],
              [Sequelize.fn('COUNT', Sequelize.col('KodFL')), 'StudentCount']
            ],
            where: {
              AvgBall: {
                [Sequelize.Op.ne]: 'NULL'
              }
            },
            group: [
              Sequelize.literal(`
                CASE 
                  WHEN TRY_CONVERT(float, AvgBall) BETWEEN 25 AND 30 THEN '25-30'
                  WHEN TRY_CONVERT(float, AvgBall) BETWEEN 30 AND 35 THEN '30-35'
                  WHEN TRY_CONVERT(float, AvgBall) BETWEEN 35 AND 40 THEN '35-40'
                  WHEN TRY_CONVERT(float, AvgBall) BETWEEN 40 AND 45 THEN '40-45'
                  WHEN TRY_CONVERT(float, AvgBall) BETWEEN 45 AND 50 THEN '45-50'
                  WHEN TRY_CONVERT(float, AvgBall) BETWEEN 50 AND 55 THEN '50-55'
                  WHEN TRY_CONVERT(float, AvgBall) BETWEEN 55 AND 60 THEN '55-60'
                  WHEN TRY_CONVERT(float, AvgBall) BETWEEN 60 AND 65 THEN '60-65'
                  WHEN TRY_CONVERT(float, AvgBall) BETWEEN 65 AND 70 THEN '65-70'
                  WHEN TRY_CONVERT(float, AvgBall) BETWEEN 70 AND 75 THEN '70-75'
                  WHEN TRY_CONVERT(float, AvgBall) BETWEEN 75 AND 80 THEN '75-80'
                  WHEN TRY_CONVERT(float, AvgBall) BETWEEN 80 AND 85 THEN '80-85'
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
                    WHEN TRY_CONVERT(float, AvgBall) BETWEEN 25 AND 30 THEN '25-30'
                    WHEN TRY_CONVERT(float, AvgBall) BETWEEN 30 AND 35 THEN '30-35'
                    WHEN TRY_CONVERT(float, AvgBall) BETWEEN 35 AND 40 THEN '35-40'
                    WHEN TRY_CONVERT(float, AvgBall) BETWEEN 40 AND 45 THEN '40-45'
                    WHEN TRY_CONVERT(float, AvgBall) BETWEEN 45 AND 50 THEN '45-50'
                    WHEN TRY_CONVERT(float, AvgBall) BETWEEN 50 AND 55 THEN '50-55'
                    WHEN TRY_CONVERT(float, AvgBall) BETWEEN 55 AND 60 THEN '55-60'
                    WHEN TRY_CONVERT(float, AvgBall) BETWEEN 60 AND 65 THEN '60-65'
                    WHEN TRY_CONVERT(float, AvgBall) BETWEEN 65 AND 70 THEN '65-70'
                    WHEN TRY_CONVERT(float, AvgBall) BETWEEN 70 AND 75 THEN '70-75'
                    WHEN TRY_CONVERT(float, AvgBall) BETWEEN 75 AND 80 THEN '75-80'
                    WHEN TRY_CONVERT(float, AvgBall) BETWEEN 80 AND 85 THEN '80-85'
                    WHEN TRY_CONVERT(float, AvgBall) BETWEEN 85 AND 90 THEN '85-90'
                    WHEN TRY_CONVERT(float, AvgBall) BETWEEN 90 AND 95 THEN '90-95'
                    WHEN TRY_CONVERT(float, AvgBall) BETWEEN 95 AND 100 THEN '95-100'
                    ELSE NULL
                  END
                `),
                'BallRange'
              ],
              [Sequelize.fn('COUNT', Sequelize.col('KodFL')), 'StudentCount']
            ],
            where: {
              AvgBall: {
                [Sequelize.Op.ne]: 'NULL'
              },
              AppState: 'Подано'
            },
            group: [
              Sequelize.literal(`
                CASE 
                  WHEN TRY_CONVERT(float, AvgBall) BETWEEN 25 AND 30 THEN '25-30'
                  WHEN TRY_CONVERT(float, AvgBall) BETWEEN 30 AND 35 THEN '30-35'
                  WHEN TRY_CONVERT(float, AvgBall) BETWEEN 35 AND 40 THEN '35-40'
                  WHEN TRY_CONVERT(float, AvgBall) BETWEEN 40 AND 45 THEN '40-45'
                  WHEN TRY_CONVERT(float, AvgBall) BETWEEN 45 AND 50 THEN '45-50'
                  WHEN TRY_CONVERT(float, AvgBall) BETWEEN 50 AND 55 THEN '50-55'
                  WHEN TRY_CONVERT(float, AvgBall) BETWEEN 55 AND 60 THEN '55-60'
                  WHEN TRY_CONVERT(float, AvgBall) BETWEEN 60 AND 65 THEN '60-65'
                  WHEN TRY_CONVERT(float, AvgBall) BETWEEN 65 AND 70 THEN '65-70'
                  WHEN TRY_CONVERT(float, AvgBall) BETWEEN 70 AND 75 THEN '70-75'
                  WHEN TRY_CONVERT(float, AvgBall) BETWEEN 75 AND 80 THEN '75-80'
                  WHEN TRY_CONVERT(float, AvgBall) BETWEEN 80 AND 85 THEN '80-85'
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
          console.log("Кол-во сложный запрос:", dates);
          return res.json({ dates, counts, counts1});
        }

         async getOrig(req, res) {
            let data = await aplicationsv.findAll({
                attributes: [
                    [Sequelize.col('KGroup2'), 'KGroup2'],
                    [Sequelize.fn('COUNT', Sequelize.col('KodFL')), 'application']
                ],
                where: {
                    KGroup2: {
                        [Sequelize.Op.like]: '%ЗФО%',  // Используем Sequelize.Op.like для условия LIKE
                    }
                },
                group: ['KGroup2'], // Группируем по дате
                order: [['application', 'DESC']],  // Сортируем по возрастанию даты
                limit: 15
            });
            let counts = data.map(item => item.dataValues.application);
            let dates = data.map(item => item.dataValues.KGroup2);
            console.log("counts: ", counts, "dates:", dates)
            return res.json({dates, counts});
        }

        async getAllObl(req, res) {
        let data = await aplicationsv.findAll({
            attributes: [
                [
                    Sequelize.literal(`
                CASE 
                    WHEN Addr LIKE 'РОССИЯ,%' THEN 
                        SUBSTRING(Addr, CHARINDEX(',', Addr, CHARINDEX(',', Addr) + 1) + 2, 
                                  CASE 
                                      WHEN CHARINDEX(',', Addr, CHARINDEX(',', Addr, CHARINDEX(',', Addr) + 1) + 1) - CHARINDEX(',', Addr, CHARINDEX(',', Addr) + 1) - 2 < 0 
                                      THEN 0 
                                      ELSE CHARINDEX(',', Addr, CHARINDEX(',', Addr, CHARINDEX(',', Addr) + 1) + 1) - CHARINDEX(',', Addr, CHARINDEX(',', Addr) + 1) - 2 
                                  END) 
                    ELSE 
                        SUBSTRING(Addr, CHARINDEX(',', Addr) + 2, 
                                  CASE 
                                      WHEN CHARINDEX(',', Addr, CHARINDEX(',', Addr) + 1) - CHARINDEX(',', Addr) - 2 < 0 
                                      THEN 0 
                                      ELSE CHARINDEX(',', Addr, CHARINDEX(',', Addr) + 1) - CHARINDEX(',', Addr) - 2 
                                  END) 
                END
            `),
                    'region'
                ],
                [Sequelize.fn('COUNT', Sequelize.col('*')), 'count']
            ],
            where: {
                [Sequelize.Op.or]: [
                    {Addr: {[Sequelize.Op.like]: 'РОССИЯ,%'}},
                    {Addr: {[Sequelize.Op.notLike]: 'РОССИЯ,%'}}
                ]
            },
            group: [
                Sequelize.literal(`
            CASE 
                WHEN Addr LIKE 'РОССИЯ,%' THEN 
                    SUBSTRING(addr, CHARINDEX(',', Addr, CHARINDEX(',', Addr) + 1) + 2, 
                              CASE 
                                  WHEN CHARINDEX(',', Addr, CHARINDEX(',', Addr, CHARINDEX(',', Addr) + 1) + 1) - CHARINDEX(',', Addr, CHARINDEX(',', Addr) + 1) - 2 < 0 
                                  THEN 0 
                                  ELSE CHARINDEX(',', Addr, CHARINDEX(',', Addr, CHARINDEX(',', Addr) + 1) + 1) - CHARINDEX(',', Addr, CHARINDEX(',', Addr) + 1) - 2 
                              END) 
                ELSE 
                    SUBSTRING(addr, CHARINDEX(',', Addr) + 2, 
                              CASE 
                                  WHEN CHARINDEX(',', Addr, CHARINDEX(',', Addr) + 1) - CHARINDEX(',', Addr) - 2 < 0 
                                  THEN 0 
                                  ELSE CHARINDEX(',', Addr, CHARINDEX(',', Addr) + 1) - CHARINDEX(',', Addr) - 2 
                              END) 
            END
        `)
            ],
            having: Sequelize.literal('COUNT(*) > 0'),
            order: [
                [Sequelize.literal('count'), 'DESC']
            ],
        });

        let counts = data.map(item => item.dataValues.count);
        let dates = data.map(item => item.dataValues.region);

        return res.json({dates, counts});
    }
}

module.exports = new monitorController()