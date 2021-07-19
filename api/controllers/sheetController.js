const Lesson = require("../models/lessonModel");
const Sheet = require("../models/sheetModel");
const Teacher = require("../models/teacherModel");

/**
 * Page permettant de lister les fiches
 * @param {*} req 
 * @param {*} res 
 */
exports.pageSheets = (req, res) => {
    Sheet.getSheetByLesson(req.body.lesson_id, (err, sheets) => {
        if (err) {
            res.status(500).send({
                message: "Une erreur s'est produite au niveau du serveur !",
                status: 500
            });
        } else {
            Teacher.getTeachers((err, teachers) => {
                if (err) {
                    res.status(500).send({
                        message: "Une erreur s'est produite au niveau du serveur !",
                        status: 500
                    });
                } else {
                    Lesson.getLessons((err, lessons) => {
                        res.render('pages/sheets/sheetList', { sheets, teachers, lessons, pageName: 'sheet' });
                    })
                }
            });
        }
    })
}

/**
 * Permet de filtrer les fiches selon un cours précis
 * @param {*} req Dans le req, on récupère lesson_id qui contient l'identifiant du cours sur lequel filtrer
 * @param {*} res 
 */
exports.pageSheetsFilter = (req, res) => {
    this.pageSheets(req, res);
}

/**
 * Page permettant d'ajouter une fiche
 * @param {*} req 
 * @param {*} res 
 */
exports.pageAddSheet = (req, res) => {
    Lesson.getLessons((err, lessons) => {
        if (err) {
            res.status(500).send({
                message: "Une erreur s'est produite au niveau du serveur !",
                status: 500
            });
        } else {
            res.render('pages/sheets/sheetAdd', { message: '', isAdded: false, isError: false, lessons, pageName: 'sheet' });
        }
    })
}

/**
 * Page permettant d'éditer une fiche
 * @param {*} req 
 * @param {*} res 
 */
exports.pageEditSheet = (req, res) => {
    Sheet.getSheetById(req.params.id, (err, sheet) => {
        if (err) {
            res.status(500).send({
                message: "Une erreur s'est produite au niveau du serveur !",
                status: 500
            });
        } else {
            Lesson.getLessons((err, lessons) => {
                if (err) {
                    res.status(500).send({
                        message: "Une erreur s'est produite au niveau du serveur !",
                        status: 500
                    });
                } else {
                    res.render('pages/sheets/sheetEdit', { message: '', isAdded: false, isError: false, lessons, sheet, pageName: 'sheet' });
                }
            })
        }
    })
}


/**
 * Récupérer la liste des fiches
 * @param {*} req 
 * @param {*} res 
 */
exports.getSheets = (req, res) => {
    Sheet.getSheets((err, data) => {
        if (err) {
            res.status(500).send({
                message: "Une erreur s'est produite au niveau du serveur !",
                status: 500
            });
        } else {
            res.status(200).send(data);
        }
    })
};

/**
 * Récupérer une fiche selon son identifiant
 * @param {*} req 
 * @param {*} res 
 */
exports.getSheet = (req, res) => {
    let id = req.params.id;
    Sheet.getSheetById(id, (err, data) => {
        if (err) {
            res.status(500).send({
                message: "Une erreur s'est produite au niveau du serveur !",
                status: 500
            });
        } else {
            if (data) {
                res.status(200).send(data);
            } else {
                res.status(404).send({
                    message: `La fiche avec l'id '${id}' n'existe pas !`,
                    status: 404
                });
            }
        }
    })
}

/**
 * Récupérer la liste des fiches selon le cours indiqué
 * @param {*} req 
 * @param {*} res 
 */
exports.getSheetsByLesson = (req, res) => {
    let lesson = req.params.lesson;
    Lesson.getLessonsByName(lesson, (err, data) => {
        if (err) {
            res.status(500).send({
                message: "Une erreur s'est produite au niveau du serveur !",
                status: 500
            });
        } else {
            if (data) {
                Sheet.getSheetByLesson(data.id, (err, data) => {
                    if (err) {
                        res.status(500).send({
                            message: "Une erreur s'est produite au niveau du serveur !",
                            status: 500
                        });
                    } else {
                        if (data) {
                            res.status(200).send(data);
                        }
                    }
                })
            } else {
                res.status(404).send({ message: `Le cours ${lesson} n'existe pas !`, status: 404 });
            }
        }
    });

}



/**
 * Supprimer une fiche à l'aide de son identifiant
 * @param {*} req 
 * @param {*} res 
 */
exports.deleteSheet = (req, res) => {
    let id = req.params.id;
    Sheet.deleteSheet(id, (err, data) => {
        if (err) {
            res.status(500).send({
                message: "Une erreur s'est produite au niveau du serveur !",
                status: 500
            });
        } else {
            if (data.affectedRows != 0) {
                res.redirect("/sheets");
            } else {
                res.status(404).send({ message: `La fiche avec l'id '${id}' n'existe pas !`, status: 404 });
            }
        }
    })
}

/**
 * Modifier les données d'une fiche à l'aide de son identifiant 
 * et des données de la fiche à modifier
 * @param {*} req 
 * @param {*} res 
 */
exports.updateSheet = (req, res) => {
    let { local_number, description, lesson_id } = req.body;
    let id = req.params.id;
    Lesson.getLessonById(lesson_id, (err, lesson) => {
        if (err) {
            res.status(500).send({
                message: "Une erreur s'est produite au niveau du serveur !",
                status: 500
            });
        } else {
            if (lesson) {
                let sheet = new Sheet(local_number, description, lesson_id, lesson.teacher_id);
                Sheet.updateSheet(id, sheet, (err, data) => {
                    if (err) {
                        res.status(500).send({
                            message: "Une erreur s'est produite au niveau du serveur !",
                            status: 500
                        });
                    } else {
                        if (data.affectedRows) {
                            Lesson.getLessons((err, lessons) => {
                                if (err) {
                                    res.status(500).send({
                                        message: "Une erreur s'est produite au niveau du serveur !",
                                        status: 500
                                    });
                                } else {
                                    res.render('pages/sheets/sheetEdit', { message: 'Modification effectuée avec succès', isAdded: true, isError: false, lessons, sheet: { id, local_number, description, lesson_id, teacher_id: lesson.teacher_id, pageName: 'sheet' } });
                                }
                            })
                        } else {
                            res.status(404).send({ message: `La fiche avec l'id '${id}' n'existe pas !`, status: 404 });
                        }
                    }
                });
            } else {
                res.status(404).send({ message: `La fiche n'a pas été modifiée car le cours avec l'id '${lesson_id}' n'existe pas !`, status: 404 });
            }
        }
    })
}

/**
 * Sauvegarder une fiche
 * @param {*} req 
 * @param {*} res 
 */
exports.saveSheet = (req, res) => {
    let { local_number, description, lesson_id } = req.body;
    Lesson.getLessonById(lesson_id, (err, data) => {
        if (err) {
            res.status(500).send({
                message: "Une erreur s'est produite au niveau du serveur !",
                status: 500
            });
        } else {
            if (data) {
                const sheet = new Sheet(local_number, description, lesson_id, data.teacher_id);
                sheet.saveSheet((err, data) => {
                    if (err) {
                        res.status(500).send({
                            message: "Une erreur s'est produite au niveau du serveur !",
                            status: 500
                        });
                    } else {
                        if (data.affectedRows) {
                            Lesson.getLessons((err, lessons) => {
                                if (err) {
                                    res.status(500).send({
                                        message: "Une erreur s'est produite au niveau du serveur !",
                                        status: 500
                                    });
                                } else {
                                    res.render('pages/sheets/sheetAdd', { message: `La fiche a été ajoutée !`, isError: false, isAdded: true, lessons, pageName: 'sheet' });
                                }
                            })
                        }
                    }
                });
            } else {
                res.status(404).send({
                    message: `La fiche n'a pas été ajouté car le cours avec l'id '${lesson_id}' n'existe pas !`,
                    status: 404
                });
            }
        }
    });
};