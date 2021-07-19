module.exports = (app) => {

    /**Home */
    app.get('/', (req, res) => {
        res.render('pages/home');
    })

    /** Teacher */
    const teachers = require('./controllers/teacherController.js');

    app.get('/teachers', teachers.pageTeachers);
    app.get('/teachers/add', teachers.pageAddTeacher);
    app.get('/teachers/edit/:id', teachers.pageEditTeacher);

    app.get('/api/teachers', teachers.getTeachers);
    app.get('/api/teachers/:id', teachers.getTeacher);
    app.post('/api/teachers', teachers.saveTeacher);;
    app.get('/teachers/delete/:id', teachers.deleteTeacher);
    app.post('/teachers/edit/:id', teachers.updateTeacher);

    /**Lesson */
    const lessons = require('./controllers/lessonController.js');
    app.get('/lessons', lessons.pageLessons);
    app.get('/lessons/add', lessons.pageAddLesson);
    app.get('/lessons/edit/:id', lessons.pageEditLesson);

    app.get('/api/lessons', lessons.getLessons);
    app.get('/api/lessons/:id', lessons.getLesson);
    app.get('/api/lessons/teacher/:id', lessons.getLessonsByTeacher);
    app.post('/api/lessons', lessons.saveLesson);;
    app.get('/lessons/delete/:id', lessons.deleteLesson);
    app.post('/lessons/edit/:id', lessons.updateLesson);


    /**Sheet */
    const sheets = require('./controllers/sheetController.js');
    app.get('/sheets', sheets.pageSheets);
    app.post('/sheets/filter', sheets.pageSheetsFilter);
    app.get('/sheets/edit/:id', sheets.pageEditSheet);

    app.get('/sheets/add', sheets.pageAddSheet);
    app.get('/api/sheets', sheets.getSheets);
    app.get('/api/sheets/:id', sheets.getSheet);
    app.get('/api/sheets/lesson/:lesson', sheets.getSheetsByLesson)
    app.post('/api/sheets', sheets.saveSheet);;
    app.get('/sheets/delete/:id', sheets.deleteSheet);
    app.post('/sheets/edit/:id', sheets.updateSheet);

}