const db = require('../config/db.js');

class Lesson {

    constructor(name, teacher_id) {
        this.name = name;
        this.teacher_id = teacher_id;
    }

    /**
     * Récupérer tous les cours
     * @param {*} result est un callback
     */
    static getLessons(result) {
        db.query(
            'SELECT * FROM lessons', (err, data) => {
                if (err) {
                    result(err, null)
                } else {
                    result(null, data);
                }
            }
        );
    }

    /**
     * Récupérer les cours selon un professeur en particulier
     * @param {*} id 
     * @param {*} result 
     */
    static getLessonsByTeacher(id, result) {
        db.query(
            'SELECT * FROM lessons WHERE teacher_id = ?', [id], (err, data) => {
                if (err) {
                    result(err, null)
                } else {
                    result(null, data);
                }
            }
        );
    }

    /**
     * Supprimer un cours
     * @param {*} id 
     * @param {*} result
     */
    static deleteLesson(id, result) {
        db.query("DELETE FROM lessons WHERE id = ?", [id], (err, data) => {
            if (err) {
                result(err, null)
            } else {
                result(null, data)
            }
        });
    }

    /**
     * Supprimer les cours liés à un professeur
     * @param {*} id 
     * @param {*} result 
     */
    static deleteLessonByTeacher(id, result) {
        db.query("DELETE FROM lessons WHERE teacher_id = ?", [id], (err, data) => {
            if (err) {
                result(err, null)
            } else {
                result(null, data)
            }
        });
    }

    /**
     * Récupérer les cours à l'aide du nom
     * @param {*} name 
     * @param {*} result 
     */
    static getLessonsByName(name, result) {
        db.query(
            'SELECT * FROM lessons WHERE name = ?', [name], (err, data) => {
                if (err) {
                    result(err, null);
                } else {
                    result(null, data[0]);
                }
            }
        );
    }


    /**
     * Récupérer un cours par son identifiant
     * @param {*} id 
     * @param {*} result 
     */
    static getLessonById(id, result) {
        db.query(
            'SELECT * FROM lessons WHERE id = ?', [id], (err, data) => {
                if (err) {
                    result(err, null);
                } else {
                    result(null, data[0]);
                }
            }
        );
    }


    /**
     * Sauvegarder un professeur
     * @param {*} result 
     */
    saveLesson(result) {
        db.query('INSERT INTO lessons SET ?', [this], (err, data) => {
            if (err) {
                result(err, null)
            } else {
                result(null, data);
            }
        });
    }

    /**
     * Modifier un professeur
     * @param {*} id 
     * @param {*} lesson 
     * @param {*} result 
     */
    static updateLesson(id, lesson, result) {
        db.query("UPDATE lessons SET ? WHERE id = ?", [lesson, id], (err, data) => {
            if (err) {
                result(err, null)
            } else {
                result(null, data);
            }
        });
    }
}

module.exports = Lesson;