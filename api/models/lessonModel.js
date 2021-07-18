const db = require('../config/db.js');

class Lesson {

    constructor(name, teacher_id) {
        this.name = name;
        this.teacher_id = teacher_id;
    }

    /**
     * get all lessons
     * @param {*} result is a callback
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
     * Delete a lesson
     * @param {*} id the id of the lesson to delete
     * @param {*} result result is a callback
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
     * Delete all lessons by teacher identifier 
     * @param {*} id the id of the lesson to delete
     * @param {*} result result is a callback
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
     * get lessons by name
     * @param {*} name the name of the lesson 
     * @param {*} result result is the callback
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
     * get lesson by id
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
     * save a lesson
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
     * update a lesson
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