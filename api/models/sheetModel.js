const db = require('../config/db.js');
const { getLessons } = require('./lessonModel.js');

class Sheet {

    constructor(local_number, description, lesson_id, teacher_id) {
        this.local_number = local_number;
        this.description = description;
        this.lesson_id = lesson_id;
        this.teacher_id = teacher_id;
    }

    /**
     * Get all sheets
     * @param {*} result 
     */
    static getSheets(result) {
        db.query(
            'SELECT * FROM sheets', (err, data) => {
                if (err) {
                    result(err, null)
                } else {
                    result(null, data);
                }
            }
        );
    }

    /**
     * Get sheets by the id of the lesson
     * @param {*} lesson_id 
     * @param {*} result 
     */
    static getSheetByLesson(lesson_id, result) {
        if (lesson_id && lesson_id != -1) {
            db.query(
                'SELECT * FROM sheets WHERE lesson_id = ?', [lesson_id], (err, data) => {
                    if (err) {
                        result(err, null)
                    } else {
                        result(null, data);
                    }
                }
            );
        } else {
            db.query(
                'SELECT * FROM sheets', (err, data) => {
                    if (err) {
                        result(err, null)
                    } else {
                        result(null, data);
                    }
                }
            );
        }
    }

    /**
     * Delete a sheet
     * @param {*} id 
     * @param {*} result 
     */
    static deleteSheet(id, result) {
        db.query("DELETE FROM sheets WHERE id = ?", [id], (err, data) => {
            if (err) {
                result(err, null)
            } else {
                result(null, data)
            }
        });
    }


    /**
     * Get a sheet by id
     * @param {*} id 
     * @param {*} result 
     */
    static getSheetById(id, result) {
        db.query(
            'SELECT * FROM sheets WHERE id = ?', [id], (err, data) => {
                if (err) {
                    result(err, null);
                } else {
                    result(null, data[0]);
                }
            }
        );
    }


    /**
     * Save a sheet
     * @param {*} result 
     */
    saveSheet(result) {
        db.query('INSERT INTO sheets SET ?', [this], (err, data) => {
            if (err) {
                result(err, null)
            } else {
                result(null, data);
            }
        });
    }

    /**
     * Update a sheet
     * @param {*} id 
     * @param {*} lesson 
     * @param {*} result 
     */
    static updateSheet(id, lesson, result) {
        db.query("UPDATE sheets SET ? WHERE id = ?", [lesson, id], (err, data) => {
            if (err) {
                result(err, null)
            } else {
                result(null, data);
            }
        });
    }
}

module.exports = Sheet;