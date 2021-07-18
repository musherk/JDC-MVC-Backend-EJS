const Lesson = require("../models/lessonModel");
const Teacher = require("../models/teacherModel")


/**
 * Page permettant de lister les professeurs
 * @param {*} req 
 * @param {*} res 
 */
exports.pageTeachers = (req, res) => {
    Teacher.getTeachers((err, teachers) => {
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
                    res.render('pages/teachers/teacherList', { teachers, lessons });
                }
            })
        }
    })
}

/**
 * Récupérer la liste des professeurs
 * @param {*} req 
 * @param {*} res 
 */
exports.getTeachers = (req, res) => {
    Teacher.getTeachers((err, data) => {
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
 * Récupérer un professeur selon son identifiant
 * @param {*} req 
 * @param {*} res 
 */
exports.getTeacher = (req, res) => {
    let id = req.params.id;
    Teacher.getTeacherById(id, (err, data) => {
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
                    message: `Le professeur avec l'id '${id}' n'existe pas !`,
                    status: 404
                });
            }
        }
    })
}

/**
 * Supprimer un professeur à l'aide de son identifiant
 * @param {*} req 
 * @param {*} res 
 */
exports.deleteTeacher = (req, res) => {
    let id = req.params.id;
    Lesson.deleteLessonByTeacher(id, (err, data) => {
        if (err) {
            res.status(500).send({
                message: "Une erreur s'est produite au niveau du serveur !",
                status: 500
            });
        } else {
            Teacher.deleteTeacher(id, (err, data) => {
                if (err) {
                    res.status(500).send({
                        message: "Une erreur s'est produite au niveau du serveur !",
                        status: 500
                    });
                } else {
                    if (data.affectedRows != 0) {
                        res.redirect("/teachers");
                    } else {
                        res.status(404).send({ message: `Le professeur avec l'id '${id}' n'existe pas !`, status: 404 });
                    }
                }
            });
        }
    })

}

/**
 * Modifier les données d'un professeur à l'aide de son identifiant 
 * et des données à modifier
 * @param {*} req 
 * @param {*} res 
 */
exports.updateTeacher = (req, res) => {
    let name = req.body.name;
    let id = req.params.id;
    let teacher = new Teacher(name);
    Teacher.updateTeacher(id, teacher, (err, data) => {
        if (err) {
            if (err.code === 'ER_DUP_ENTRY') {
                res.status(409).send({
                    message: "Ce professeur existe déjà !",
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
                res.status(404).send({ message: `Le professeur avec l'id '${id}' n'existe pas !`, status: 404 });
            }
        }
    })
}


exports.saveTeacher = (req, res) => {
    let name = req.body.name;
    if (!name) {
        return res.status(400).send({
            message: "Le nom du professeur n'est pas mentionné !",
            status: 400
        })
    }
    const teacher = new Teacher(name);
    teacher.saveTeacher((err, data) => {
        if (err) {
            if (err.code === 'ER_DUP_ENTRY') {
                res.status(409).send({
                    message: "Ce professeur existe déjà !",
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
                    message: `Le professeur ${name} a été ajouté !`,
                    status: 201
                });
            }
        }
    })
};