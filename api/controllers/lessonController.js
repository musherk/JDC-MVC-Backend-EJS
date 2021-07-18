const Lesson = require("../models/lessonModel");
const Teacher = require("../models/teacherModel");


/**
 * Page permettant de lister les cours
 * @param {*} req 
 * @param {*} res 
 */
exports.pageLessons = (req, res) => {
    Lesson.getLessons((err, lessons) => {
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
                    res.render('pages/lessons/lessonList', { teachers, lessons });
                }
            })
        }
    })
}

/**
 * Page permettant d'ajouter un professeur
 * @param {*} req 
 * @param {*} res 
 */
exports.pageAddLesson = (req, res) => {
    Teacher.getTeachers((err, teachers) => {
        if (err) {
            res.status(500).send({
                message: "Une erreur s'est produite au niveau du serveur !",
                status: 500
            });
        } else {
            res.render('pages/lessons/lessonAdd', { message: '', isAdded: false, isError: false, teachers });
        }
    })

}


/**
 * Récupérer la liste des cours
 * @param {*} req 
 * @param {*} res 
 */
exports.getLessons = (req, res) => {
    Lesson.getLessons((err, data) => {
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
 * Récupérer un cours selon son identifiant
 * @param {*} req 
 * @param {*} res 
 */
exports.getLesson = (req, res) => {
    let id = req.params.id;
    Lesson.getLessonById(id, (err, data) => {
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
                    message: `Le cours avec l'id '${id}' n'existe pas !`,
                    status: 404
                });
            }
        }
    })
}

exports.getLessonsByTeacher = (req, res) => {
    let id = req.params.id;
    Lesson.getLessonsByTeacher(id, (err, data) => {
        if (err) {
            res.status(500).send({
                message: "Une erreur s'est produite au niveau du serveur !",
                status: 500
            });
        } else {
            res.status(200).send(data);
        }
    })
}

/**
 * Supprimer un cours à l'aide de son identifiant
 * @param {*} req 
 * @param {*} res 
 */
exports.deleteLesson = (req, res) => {
    let id = req.params.id;
    Lesson.deleteLesson(id, (err, data) => {
        if (err) {
            res.status(500).send({
                message: "Une erreur s'est produite au niveau du serveur !",
                status: 500
            });
        } else {
            if (data.affectedRows != 0) {
                res.redirect("/lessons");
            } else {
                res.status(404).send({ message: `Le cours avec l'id '${id}' n'existe pas !`, status: 404 });
            }
        }
    })
}

/**
 * Modifier les données d'un cours à l'aide de son identifiant 
 * et des données des cours à modifier
 * @param {*} req 
 * @param {*} res 
 */
exports.updateLesson = (req, res) => {
    let { name, teacher_id } = req.body;
    let id = req.params.id;
    Teacher.getTeacherById(teacher_id, (err, data) => {
        if (err) {
            res.status(500).send({
                message: "Une erreur s'est produite au niveau du serveur !",
                status: 500
            });
        } else {
            if (data) {
                let lesson = new Lesson(name, teacher_id);
                Lesson.updateLesson(id, lesson, (err, data) => {
                    if (err) {
                        if (err.code === 'ER_DUP_ENTRY') {
                            res.status(409).send({
                                message: "Ce cours existe déjà !",
                                status: 409
                            });
                        } else {
                            res.status(500).send({
                                message: "Une erreur s'est produite au niveau du serveur !",
                                status: 500
                            });
                        }
                    } else {
                        if (data.affectedRows) {
                            res.status(201).send({
                                message: "Modification effectuée avec succès",
                                status: 201
                            });
                        } else {
                            res.status(404).send({ message: `Le cours avec l'id '${id}' n'existe pas !`, status: 404 });
                        }
                    }
                })
            } else {
                res.status(404).send({
                    message: `Le cours n'a pas été modifié car le professeur avec l'id '${teacher_id}' n'existe pas !`,
                    status: 404
                });
            }
        }
    });

}

/**
 * Sauvegarder un cours
 * @param {*} req 
 * @param {*} res 
 */
exports.saveLesson = (req, res) => {
    let { name, teacher_id } = req.body;
    if (!name) {
        return res.status(400).send({
            message: "Le nom du cours n'est pas mentionné !",
            status: 400
        })
    }
    Teacher.getTeacherById(teacher_id, (err, data) => {
        if (err) {
            res.status(500).send({
                message: "Une erreur s'est produite au niveau du serveur !",
                status: 500
            });
        } else {
            if (data) {
                const lesson = new Lesson(name, teacher_id);
                lesson.saveLesson((err, data) => {
                    if (err) {
                        if (err.code === 'ER_DUP_ENTRY') {
                            Teacher.getTeachers((err, teachers) => {
                                if (err) {
                                    res.status(500).send({
                                        message: "Une erreur s'est produite au niveau du serveur !",
                                        status: 500
                                    });
                                } else {
                                    res.render('pages/lessons/lessonAdd', { message: "Ce cours existe déjà !", isError: true, isAdded: false, teachers });
                                }
                            })
                        } else {
                            res.status(500).send({
                                message: "Une erreur s'est produite au niveau du serveur !",
                                status: 500
                            });
                        }
                    } else {
                        if (data.affectedRows) {
                            Teacher.getTeachers((err, teachers) => {
                                if (err) {
                                    res.status(500).send({
                                        message: "Une erreur s'est produite au niveau du serveur !",
                                        status: 500
                                    });
                                } else {
                                    res.render('pages/lessons/lessonAdd', { message: `Le cours ${name} a été ajouté !`, isError: false, isAdded: true, teachers });
                                }
                            })
                        }
                    }
                });
            } else {
                res.status(404).send({
                    message: `Le cours n'a pas été ajouté car le professeur avec l'id '${teacher_id}' n'existe pas !`,
                    status: 404
                });
            }
        }
    });
};